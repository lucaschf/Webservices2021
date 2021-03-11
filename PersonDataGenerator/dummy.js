var mock = [];

function dummyPerson(face_data) {
  let container = document.querySelector("#result");
  let url = "https://raw.githubusercontent.com/lucaschf/Webservices2021/main/PersonDataGenerator/dummy_person.json";

  $.getJSON(url, function (data) {
    data.face_data = face_data;

    var cardContainer = document.createElement("div");
    cardContainer.classList.add("col-md-3");
    cardContainer.classList.add("col-lg-3");
    cardContainer.classList.add("col-sm-2");

    var card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("pointer");
    card.classList.add("zoom");
    card.classList.add("shadowed");
    card.classList.add("mb-3");

    var image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = data.face_data.urls[4]["512"];

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    var cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = data.name.first_name + " " + data.name.last_name;

    cardBody.append(cardTitle);
    card.appendChild(image);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
    container.appendChild(cardContainer);

    mock.push(data);

    card.onclick = function () {
      showPersonDetails(data);
    }
  });
}

function dummy() {
  inProgress(true);
  mock = [];

  $.getJSON("https://raw.githubusercontent.com/lucaschf/Webservices2021/main/PersonDataGenerator/dummy_faces.json", function (data) {
    $.each(data.faces, function (key, el) {
      dummyPerson(el);
    });

    document.getElementById("btnDownload").onclick = function () {
      download(JSON.stringify(mock), "dummy.json", 'text/plain')
    };
  });

  setTimeout(function () {
    inProgress(false);
  }, 500);
}