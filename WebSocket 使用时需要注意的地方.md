# WebSocket 使用时需要注意的地方

| [日期：2019-02-08] | 来源：Linux社区 作者：jieerma666 | [字体：[大](javascript:ContentSize(16)) [中](javascript:ContentSize(0)) [小](javascript:ContentSize(12))] |
| ------------------ | -------------------------------- | ------------------------------------------------------------ |
|                    |                                  |                                                              |

最近在做一个项目，需要用WebSocket与另外一个平台建立通讯，来获取项目业务需要的实时数据，因此项目一启动，后台就要与另外一个平台建立WebSocket连接并且要保证他们的之间有且只有一条持续畅通可用的连接（就是要保证这条连接不能断开，一断开就要尝试进行重连），说说我在这个过程中，遇到的一些问题以及解决的方法：

1、WebSocket连接正常，部分请求无响应

原因分析：

服务端/客户端接收到客户端/服务端一次性发来的几百条或更多的请求，瞬间都堆积在会话的缓冲区，又没做多线程处理，并且每接收到一条请求还要查询阿里云服务器数据库，加上网络带宽过小，处理一条请求就要花费几十秒；导致线程队列严重堵塞，无法及时响应处理后续的其他请求。

解决方法：

使用了线程池开启多条线程同时进行处理，将数据库配置设置为127.0.0.1，这样就不会经过公网绕一圈回来，这样大大缩短了一条请求处理要花费的时间，由之前的几十秒缩短为几百毫秒。

  // 创建线程池
  //private static ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
  private static ExecutorService fixedThreadPool = Executors.newFixedThreadPool(3);

注意几种线程池的区别，cachedThreadPool只有非核心线程，最大线程数很大，它会为每一个任务添加一个新的线程，它有一个超时机制，当空闲的线程超过60s内没有用到的话，就会被回收。cachedThreadPool缺点就是没有考虑到系统的实际内存大小。fixedThreadPool是一个可以指定线程数的线程池，有核心的线程，里面有固定的线程数量，响应的速度快。正规的并发线程，多用于服务器。核心线程是没有超时机制的，队列大小没有限制，除非线程池关闭了核心线程才会被回收。还有singleThreadPoll、scheduledThreadPoll这里就不做过多的介绍了。

  @OnMessage
  public void onMessage(String datas,Session session) {
    Runnable t = new Runnable() {
      
      @Override
      public void run() {
        // TODO Auto-generated method stub
        // 业务代码
      }
    };
    
    //cachedThreadPool.submit(t);
    fixedThreadPool.submit(t);
  }

 

注意，要给session加上同步锁，否则会出现多个线程同时往同一个session写数据，导致报错的情况。

  public void send(String data) throws Exception {
    synchronized (session) {
      session.getBasicRemote().sendText(data);
    }
  }

2、发现WebSocket连接老是每隔一、两分钟就断开重连

原因分析：

一段时间内，WebSocket连接无数据传输就会自动断开连接

解决方法：

增加心跳机制维持连接，每隔一段时间就向服务端发送一次自定义请求，或者调用sendPing()来保持住连接。

3、WebSocket定时发送sendPing()后，还会反复出现接收/发送几个请求就断开连接的情况

原因分析：

无论是作服务端还是客户端，发现每次都是接收到同一个请求的信息后连接就断开了，经过反复的摸索发现，是由于接收到的这个请求传输的数据量过大，超出了WebSocket会话接收信息的缓冲区的大小（可使用session.getMaxTextMessageBufferSize()查看缓冲大小，默认为8192），引起的WebSocket连接的异常断开。

解决方法：

重新设置WebSocket缓冲区大小，

int maxSize = 200 * 1024;　　// 200K

// 可以缓冲的传入二进制消息的最大长度

session.setMaxBinaryMessageBufferSize(maxSize);

// 可以缓冲的传入文本消息的最大长度

session.setMaxTextMessageBufferSize(maxSize);