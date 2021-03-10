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

function generateCard(pic) {
  let key = "51566a40";
  let dataUrl = "https://my.api.mockaroo.com/person_generation_schema/";

  var gender = pic.meta.gender[0];
  var age = pic.meta.age[0];

  dataUrl += (gender);
  dataUrl += "/" + age;
  dataUrl += ("?key=" + key);

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
          el.picture = pic.urls;
          el.ethnicity = meta.ethnicity[0];

          var cardContainer = document.createElement("div");
          cardContainer.classList.add("col-md-4");
          cardContainer.classList.add("col-lg-3");
          cardContainer.classList.add("col-auto");
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

String.prototype.isNullOrEmpty = function () {
  return (this.length === 0 || !this.trim());
};

function generateRow(name, data) {
  var tr = document.createElement('TR');

  var th = document.createElement('th');
  th.appendChild(document.createTextNode(name));
  tr.appendChild(th);

  var td = document.createElement('TD');
  td.appendChild(document.createTextNode(data));
  tr.appendChild(td);

  return tr;
}

function showPersonDetails(person) {
    
  var table = document.createElement('TABLE');
  table.classList.add("table");
  table.classList.add("table-responsive");

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  tableBody.appendChild(generateRow("Gender", person.gender));
  tableBody.appendChild(generateRow("Language", person.language));
  tableBody.appendChild(generateRow("Title", person.title));
  tableBody.appendChild(generateRow("Age", person.age));
  tableBody.appendChild(generateRow("Ethnicity", person.ethnicity));

  tableBody.appendChild(generateRow("Phone", person.phone));
  tableBody.appendChild(generateRow("E-mail", person.email));

  tableBody.appendChild(generateRow("Job", person.professional_info.title));
  tableBody.appendChild(generateRow("Department", person.professional_info.department));
  tableBody.appendChild(generateRow("Company", person.professional_info.company_name));
  tableBody.appendChild(generateRow("Buzzword", person.professional_info.buzzword));
  tableBody.appendChild(generateRow("Company slogan", person.professional_info.slogan));

  tableBody.appendChild(generateRow("Country", person.location.country));
  tableBody.appendChild(generateRow("Country code", person.location.country_code));
  tableBody.appendChild(generateRow("State", person.location.state));
  tableBody.appendChild(generateRow("City", person.location.city_name));
  tableBody.appendChild(generateRow("Postal code", person.location.postal_code));
  tableBody.appendChild(generateRow("Address", person.location.street_address));
  tableBody.appendChild(generateRow("Time Zone", person.location.time_zone));

  
  var container = document.querySelector("#personContent");
  container.innerHTML = "";
  container.appendChild(table);
  
  document.querySelector("#personName").innerHTML = (person.name.first_name + " " + person.name.last_name);
  document.querySelector("#personPicture").src = person.pictures[4]["512"];
  $("#pictureUrl").attr("href", person.pictures[4]["512"]);

  initMap(person.location.latitude, person.location.longitude, person.name.first_name);
  
  $("#persomModal").modal("show");
}

function inProgress(inProgress) {
  var dataContainer = $("#result");

  if (inProgress) {
    document.querySelector("#result").innerHTML = '';
    dataContainer.hide();
    $("#progress").show();
    $("#btnFetch").hide();
    $("#btnDownload").hide();
  }
  else {
    dataContainer.show();
    $("#btnFetch").show();
    $("#btnDownload").show();
    $("#progress").hide();
  }
}

let map;

function initMap(latitude, longitude, title) {

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: Number(latitude), lng: Number(longitude) },
    zoom: 8,
  });

  let coord = new google.maps.LatLng(latitude, longitude);
  marker = new google.maps.Marker({
    position: coord, 
    map: map,
    title: title
  });
}

function download(data, filename, type) {
  var file = new Blob([data], {type: type});
  if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
      var a = document.createElement("a"),
              url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 0); 
  }
}