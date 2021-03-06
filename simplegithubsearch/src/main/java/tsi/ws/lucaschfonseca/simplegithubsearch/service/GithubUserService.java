package tsi.ws.lucaschfonseca.simplegithubsearch.service;

import tsi.ws.lucaschfonseca.simplegithubsearch.model.GitRepository;
import tsi.ws.lucaschfonseca.simplegithubsearch.model.GitUser;

import java.util.List;

public class GithubUserService extends HttpService{
    private final String BASE_URL = "https://api.github.com/users/";

    public GitUser fetchUserData(String username) {
        return null;
    }

    public List<GitRepository> fetchFollowers(String username) {
        String url = BASE_URL + username + "/followers";

        return null;
    }
}
