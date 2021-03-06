package tsi.ws.lucaschfonseca.simplegithubsearch.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GitRepository {
    private String id;
    private String name;
    private String full_name;
    private owner owner;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class owner {
        private String login;
    }
}
