function dummyPerson(pic) {
    var container = document.querySelector("#result");
  
    var gender = pic.meta.gender[0];
    var age = pic.meta.age[0];
  
    $.getJSON("https://raw.githubusercontent.com/lucaschf/Webservices2021/main/PersonDataGenerator/dummy_person.json", function (data) {
      $.each(data, function (index, el) {
        el.pictures = pic.urls;
        el.ethnicity = pic.meta.ethnicity[0];
        el.age = age;
        el.gender = gender;
  
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
        image.src = el.pictures[4]["512"];
  
        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
  
        var cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = el.name.first_name + " " + el.name.last_name;
  
        cardBody.append(cardTitle);
        card.appendChild(image);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
        container.appendChild(cardContainer);
  
        card.onclick = function () {
          showPersonDetails(el);
        }
      });
    });
  }
  
  function dummyFaces() {
    $.getJSON("https://raw.githubusercontent.com/lucaschf/Webservices2021/main/PersonDataGenerator/dummy_faces.json", function (data) {
      $.each(data.faces, function (key, el) {
        // console.log( el.urls[4]["512"]);
  
        dummyPerson(el);
      });
    });
  }