let generated_photos_key = "YOUR_GENERATED_PHOTOS_KEY_HERE";
var mock = [];

function generatePhotosUrl() {
  let photoGeneratorUrl = "https://api.generated.photos/api/v1/faces?per_page=10&api_key=" + generated_photos_key;
  let gender = $('input[name=gender]:checked').val();
  let ethnicity = $('input[name=ethnicity]:checked').val();
  let age = $('input[name=age]:checked').val();
  let hairLength = $('input[name=hairLength]:checked').val();
  let emotion = $('input[name=emotion]:checked').val();

  if (!age.isEmpty())
    photoGeneratorUrl += ("&age=" + age);
  if (!gender.isEmpty())
    photoGeneratorUrl += ("&gender=" + gender);
  if (!ethnicity.isEmpty())
    photoGeneratorUrl += ("&ethnicity=" + ethnicity);
  if (!hairLength.isEmpty())
    photoGeneratorUrl += ("&hair_length=" + hairLength);
  if (!emotion.isEmpty())
    photoGeneratorUrl += ("&emotion=" + emotion);

  return photoGeneratorUrl;
}

function fetchData() {
  mock = [];

  inProgress(true);

  $.ajax({
    type: 'GET',
    dataType: "json",
    url: generatePhotosUrl(),
    success: function (response) {
      data = $.parseJSON(JSON.stringify(response));

      document.getElementById("btnDownload").onclick = function () {
        download(JSON.stringify(mock), "dummy.json", 'text/plain')
      };

      $.each(data.faces, function (index, el) {
        generateCard(el);
      });
      setTimeout(function () {
        inProgress(false);
      }, 500);
    },
    error: function (xhr, status, error) {
      inProgress(false);

      var message = (status + " " + error + " " + xhr.status + " " + xhr.statusText)
      showError(message)
    }
  });
}

function generateCard(face_data) {
  let key = "YOUR_MOCKAROO_API_KEY_HERE"; // mockaroo key for api needed
  let dataUrl = "https://my.api.mockaroo.com/person_generation_schema/";

  var gender = face_data.meta.gender[0];
  var age = face_data.meta.age[0];

  dataUrl += (gender);
  dataUrl += "/" + age;
  dataUrl += ("?key=" + key);

  $.ajax({
    type: 'GET',
    dataType: "json",
    url: dataUrl,
    success: function (response) {
      var data;

      try {
        data = $.parseJSON(JSON.stringify(response));
        var container = document.querySelector("#result");

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

        card.onclick = function () {
          showPersonDetails(data);
        }

        mock.push(data);
      } catch (e) {
        console.log(e);
      }
    },
    error: function (xhr, status, error) {
      let message = status + " " + error + " " + xhr.status + " " + xhr.statusText;
      console.log(message);

      showError(message)
    }
  });
}

String.prototype.isEmpty = function () {
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

  tableBody.appendChild(generateRow("Gender", person.face_data.meta.gender[0]));
  tableBody.appendChild(generateRow("Language", person.language));
  tableBody.appendChild(generateRow("Title", person.title));
  tableBody.appendChild(generateRow("Age", person.age));
  tableBody.appendChild(generateRow("Ethnicity", person.face_data.meta.ethnicity[0]));
  tableBody.appendChild(generateRow("Phone", person.phone));
  tableBody.appendChild(generateRow("E-mail", person.email));
  tableBody.appendChild(generateRow("Occupation", person.professional_info.title));
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
  document.querySelector("#personPicture").src = person.face_data.urls[4]["512"];
  $("#pictureUrl").attr("href", person.face_data.urls[4]["512"]);

  initMap(
    person.location.latitude,
    person.location.longitude,
    person.name.first_name
  );

  $("#persomModal").modal("show");
}

function inProgress(inProgress) {
  var dataContainer = $("#result");

  $("#tip").hide();

  if (inProgress) {
    toggleErrorVisibility(false);
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

function showError(message) {
  console.log(message);
  document.querySelector("#errorMessage").textContent = (message);
  toggleErrorVisibility(true);
}

function toggleErrorVisibility(visible) {
  if (visible) {
    $("#result").hide();
    $("#error").show();
    $("#btnDownload").hide();
  } else {
    $("#error").hide();
    $("#result").show();
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
  var file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}