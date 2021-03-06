module tsi.ws.lucaschfonseca.simplegithubsearch {
    requires javafx.controls;
    requires javafx.fxml;
    requires lombok;

    opens tsi.ws.lucaschfonseca.simplegithubsearch to javafx.fxml;
    opens tsi.ws.lucaschfonseca.simplegithubsearch.controller;
    exports tsi.ws.lucaschfonseca.simplegithubsearch;
    exports tsi.ws.lucaschfonseca.simplegithubsearch.controller;
}