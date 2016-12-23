package zous.httpserver;

import android.app.Activity;
import android.os.Bundle;
import java.io.IOException;

public class MainActivity extends Activity {

  private SimpleHttpServer shs;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    WebConfiguration wc = new WebConfiguration();
    wc.setPort(8081);
    wc.setMaxParallels(50);
    shs = new SimpleHttpServer(wc);
    shs.registerResourceHandler(new ResourceInAssetsHandler());
    shs.registerResourceHandler(new UploadImageHandler());
    shs.startAsync();
  }

  @Override protected void onDestroy() {
    super.onDestroy();
    try {
      shs.stopAsync();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
