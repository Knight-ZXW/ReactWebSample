package zous.httpserver;

import java.io.IOException;

public interface IResourceUriHandler {
  boolean accept(String uri);
  void handle(String uri,HttpContext httpContext) throws IOException;
}
