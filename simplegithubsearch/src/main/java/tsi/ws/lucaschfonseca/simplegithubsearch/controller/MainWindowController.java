package tsi.ws.lucaschfonseca.simplegithubsearch.controller;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.ProgressBar;
import javafx.scene.control.TextField;
import javafx.scene.layout.Pane;

public class MainWindowController {

    @FXML
    private TextField userNameTextField;

    @FXML
    private Button fetchButton;

    @FXML
    private Pane progressPane;

    @FXML
    private ProgressBar progressBar;

    @FXML
    void fetch(ActionEvent event) {

    }

}
