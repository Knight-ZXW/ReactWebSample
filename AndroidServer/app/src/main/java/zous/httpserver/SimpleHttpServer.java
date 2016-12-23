package zous.httpserver;

import android.util.Log;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SimpleHttpServer {
  private static final String TAG = "HTTP_SERVER";
  private final WebConfiguration webConfig;
  private final ExecutorService threadPool;
  private boolean isEnable;
  private ServerSocket socket;
  //处理handler
  private Set<IResourceUriHandler> resourceHandlers;

  public SimpleHttpServer(WebConfiguration webConfiguration) {
    webConfig = webConfiguration;
    threadPool = Executors.newCachedThreadPool();
    resourceHandlers = new HashSet<>();
  }

  public void startAsync() {
    isEnable = true;
    new Thread(new Runnable() {
      @Override public void run() {
        Log.w(TAG, "start, accepting");
        doProcSync();
      }
    }).start();
  }

  public void stopAsync() throws IOException {
    if (!isEnable) {
      return;
    }
    isEnable = false;
    socket.close();
    socket = null;
  }

  public void registerResourceHandler(IResourceUriHandler handler) {
    resourceHandlers.add(handler);
  }

  private void onAcceptRemotePeer(Socket remotePeer) {
    try {
      HttpContext httpContext = new HttpContext();
      httpContext.setUnderlySocket(remotePeer);
      remotePeer.getOutputStream().write("you  get it".getBytes());
      InputStream nis = remotePeer.getInputStream();
      String headerLine = null;
      String resourceUri = headerLine = StreamToolKit.readLine(nis).split(" ")[1];
      while ((headerLine = StreamToolKit.readLine(nis)) != null) {
        if (headerLine.equals("\r\n")) { // 说明头数据结束了
          break;
        }
        String[] pair = headerLine.split(": ");
        httpContext.addRequestHeader(pair[0], pair[1]);
        Log.d(TAG, headerLine);
      }
      for (IResourceUriHandler handler :
          resourceHandlers) {
        if (!handler.accept(resourceUri)){
          continue;
        }
        handler.handle(resourceUri,httpContext);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private void doProcSync() {
    InetSocketAddress socketAddr = new InetSocketAddress(webConfig.getPort());
    try {
      socket = new ServerSocket();
      socket.bind(socketAddr);
      while (isEnable) {
        final Socket remotePeer = socket.accept();
        threadPool.submit(new Runnable() {
          @Override public void run() {
            Log.d(TAG,
                "a remote peer accepted ..." + remotePeer.getRemoteSocketAddress().toString());
            onAcceptRemotePeer(remotePeer);
          }
        });
      }
    } catch (IOException e) {
      Log.e(TAG, e.toString());
    }
  }
}
