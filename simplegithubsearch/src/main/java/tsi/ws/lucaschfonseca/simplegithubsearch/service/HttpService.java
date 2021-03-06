package tsi.ws.lucaschfonseca.simplegithubsearch.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public abstract class HttpService {
    protected HttpURLConnection consume(String urlAddress) throws IOException {
        var url = new URL(urlAddress);

        return (HttpURLConnection) url.openConnection();
    }
}
