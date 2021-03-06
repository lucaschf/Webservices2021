package tsi.ws.lucaschfonseca.simplegithubsearch.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class GitUser {

    private String login;
    private float id;
    private String url;
    private String html_url;
    private String followers_url;
    private String following_url;
    private String gists_url;
    private String starred_url;
    private String subscriptions_url;
    private String organizations_url;
    private String repos_url;
    private String events_url;
    private String received_events_url;
    private String type;
    private boolean site_admin;
    private String name = null;
    private String company = null;
    private String blog;
    private String location = null;
    private String email = null;
    private String bio;
    private float public_repos;
    private float public_gists;
    private float followers;
    private float following;
    private String created_at;
    private String updated_at;
}