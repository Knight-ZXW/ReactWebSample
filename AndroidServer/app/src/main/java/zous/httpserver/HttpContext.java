package zous.httpserver;

import java.net.Socket;
import java.util.HashMap;

public class HttpContext {
  private Socket underlySocket;
  private HashMap<String, String> requestHeaders;

  public HttpContext() {
    requestHeaders = new HashMap<>();
  }

  public void addRequestHeader(String headerName, String headerValue) {
    requestHeaders.put(headerName, headerValue);
  }

  public String getRequestHeaderValue(String headerName) {
    return requestHeaders.get(headerName);
  }

  public Socket getUnderlySocket() {
    return underlySocket;
  }

  public void setUnderlySocket(Socket underlySocket) {
    this.underlySocket = underlySocket;
  }
}
