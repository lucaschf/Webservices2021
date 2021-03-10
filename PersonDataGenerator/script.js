var latitude;
var longitude;

function fetchData() {

  inProgress(true);
  let photoGeneratorUrl = "https://api.generated.photos/api/v1/faces?api_key=d1776Wt1UAhyMCPOjlIO0w&per_page=10"
  var gender = $('input[name=gender]:checked').val();
  var ethnicity = $('input[name=ethnicity]:checked').val();
  var age = $('input[name=age]:checked').val();
  var hairLength = $('input[name=hairLength]:checked').val();
  var emotion = $('input[name=emotion]:checked').val();

  if (!age.isNullOrEmpty())
    photoGeneratorUrl.append("&age=" + age);
  if (!gender.isNullOrEmpty())
    photoGeneratorUrl.append("&gender=" + gender);
  if (!ethnicity.isNullOrEmpty())
    photoGeneratorUrl.append("&ethnicity=" + ethnicity);
  if (!hairLength.isNullOrEmpty())
    photoGeneratorUrl.append("&hairLength=" + hairLength);
  if (!emotion.isNullOrEmpty())
    photoGeneratorUrl.append("&emotion=" + emotion);

  $.ajax({
    type: 'GET',
    dataType: "json",
    url: photoGeneratorUrl,
    success: function (response) {
      data = $.parseJSON(JSON.stringify(response));
      $.each(data.faces, function (index, el) {
        generateCard(el);
      });
    },
    error: function (xhr, status, error) {
      inProgress(false);
      alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
    }
  });

  inProgress(false);
}


function generateCard(pic){
  let key = "51566a40";
  let dataUrl = "https://my.api.mockaroo.com/person_generation_schema/";

  var gender = pic.meta.gender[0];
  var age = pic.meta.age[0];

  dataUrl+=(gender);
  dataUrl+="/" + age;
  dataUrl+=("?key=" + key);

  console.log(dataUrl);

  $.ajax({
    type: 'GET',
    dataType: "json",
    url: dataUrl,
    success: function (response) {
      var data;

      try {
        data = $.parseJSON(JSON.stringify(response));
        var container = document.querySelector("#result");

        $.each(data, function (index, el) {
          el.picture = pic.urls[0];

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
          image.src = el.picture;

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

          card.onclick=new Function("alert('oi from " + el.first_name + "')");
        });
      } catch (e) {
        alert(e);
        data = null;
      }

      inProgress(false);
    },
    error: function (xhr, status, error) {
      console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
    }
  });
}

String.prototype.isNullOrEmpty = function() {
  return (this.length === 0 || !this.trim());
};

function showPersonDetails(person) {
  var table = $("<table class='table'><tr><th></th></tr>");

  table.append("<tr><th>Nome</th><td>" + person.first_name + " " + person.last_name + "</td></tr>");
  table.append("<tr><th>Idade</th><td>" + person.age + "</td></tr>");
  table.append("<tr<th>Genero</th><td>" + person.gender + "</td></tr>");
  table.append("<tr<th>Comprimento do cabelo</th><td>" + person.hair_length + "</td></tr>");
  table.append("<tr<th>Idioma</th><td>" + person.language + "</td></tr>");
  table.append("<tr><th>E-mail</th><td>" + person.email + "</td></tr>");
  table.append("<tr><th>Emoção</th><td>" + person.emotion + "</td></tr>");
  table.append("<tr><th>hair_color</th><td>" + person.hair_color + "</td></tr>");
  table.append("<tr><th>Etnia</th><td>" + person.ethnicity + "</td></tr>");
  table.append("<tr><th>Universidade</th><td>" + person.university + "</td></tr>");
  table.append("<tr><th>Empresa</th><td>" + person.company + "</td></tr>");
  table.append("<tr><th>Departamento</th><td>" + person.departament + "</td></tr>");
  table.append("<tr><th>Buzzword</th><td>" + person.buzzword + "</td></tr>");
  table.append("<tr><th>JobTitle</th><td>" + person.job_title + "</td></tr>");
  table.append("<tr><th>Titulo</th><td>" + person.title + "</td></tr>");

  var container = document.querySelector("#personContent");
  container.appendChild(table)

  var image = document.querySelector("#personPicture")
  image.src = person.picture;
}

function showModal() {
  var image = document.querySelector("#personPicture")
  image.src = "https://images.generated.photos/5wh575MvTYRK8WLlYCjMORzHXVRaRfJQ3sQsAShLlDg/rs:fit:256:256/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zLzA5/OTk5MTcuanBn.jpg"
  $("#staticBackdrop").modal("show");
}

function inProgress(inProgress) {
  if (inProgress) {
    $("#result").html('');
    $("#progress").show();
    $("#btnFetch").hide();
  }
  else {
    $("#btnFetch").show();
    $("#progress").hide();
  }
}

function dummyPerson() {   
  $.getJSON( "https://raw.githubusercontent.com/lucaschf/Webservices2021/main/PersonDataGenerator/dummy_person.json", function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      console.log(val)
    });
  });
}