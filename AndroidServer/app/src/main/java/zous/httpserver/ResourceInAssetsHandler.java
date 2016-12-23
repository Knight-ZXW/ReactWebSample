package zous.httpserver;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

public class ResourceInAssetsHandler implements IResourceUriHandler {
  private String acceptPrefix = "/static/";

  @Override public boolean accept(String uri) {
    return uri.startsWith(acceptPrefix);
  }

  @Override public void handle(String uri, HttpContext httpContext) throws IOException {
    OutputStream nos = httpContext.getUnderlySocket().getOutputStream();
    PrintWriter writer = new PrintWriter(nos);
    writer.println("HTTP/1.1 200 OK");
    writer.println();
    writer.print("from resource in assets handler");
    writer.flush();
  }
}
