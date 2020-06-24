// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['born in cameroon','Born in 2000','Favorite movie transformers'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function getParameters(){
    const param1 = document.getElementById('param1').value,
        param2 = document.getElementById('param2').value;

    return [param1, param2];
}

function getComments() {
  fetch('/data')  // sends a request to /my-data-url
  .then(response => response.json()) // parses the response as JSON
  .then((comments) => { // now we can reference the fields in myObject!
    console.log(comments);

    const listComments = document.getElementById('comments-container');
    listComments.innerHTML= '';
    comments.forEach((comment) => {
        listComments.appendChild(createParagraphElement(comment));
        listComments.appendChild(document.createElement('hr'));
    });
});
}

function createParagraphElement(text) {
  const liElement = document.createElement('p');
  liElement.innerText = text;

  return liElement;
}

function createLink(text) {
  const liElement = document.createElement('a');
  liElement.innerText = text;
  return liElement;
}

function getStatus(){
    fetch('/status', {method: 'GET'})
    .then(response => response.text())
    .then((status) => {
        console.log(status)
        var input_elems = document.getElementsByTagName("input");

        if (status == 0) {
        for (elem of input_elems) { //Hide the input elements until the user logs in
            type_value = elem.getAttributeNode("type");
            type_value.value = "hidden";
        }
            link = document.getElementById("anchor");
            link.innerText="Log in To Comment";
        } else {
            link = document.getElementById("anchor");
            link.innerText="Log Out";
            type_value = link.getAttributeNode("href");
            type_value.value = "/logout";
        }
    });
}

function createMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 5.9631, lng: 10.1591 },
    zoom: 8,
    styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
        }
        ]
  });
  
  var locations = [
    [5.9631, 10.1591, "Cameroon, on the Gulf of Guinea, is a Central African country of varied terrain and wildlife. Its inland capital, Yaoundé, and its biggest city, the seaport Douala, are transit points to ecotourism sites as well as beach resorts like Kribi – near the Chutes de la Lobé waterfalls, which plunge directly into the sea – and Limbe, where the Limbe Wildlife Centre houses rescued primates."],
    [25.2048, 55.2708, "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline. At its foot lies Dubai Fountain, with jets and lights choreographed to music. On artificial islands just offshore is Atlantis, The Palm, a resort with water and marine-animal parks"],
    [16.5004, 151.7415, "Bora Bora is a small South Pacific island northwest of Tahiti in French Polynesia. Surrounded by sand-fringed motus (islets) and a turquoise lagoon protected by a coral reef, it’s known for its scuba diving. It's also a popular luxury resort destination where some guest bungalows are perched over the water on stilts. At the island's center rises Mt. Otemanu, a 727m dormant volcano."],
    [35.6804, 139.7690, "Japan is an island country in East Asia located in the northwest Pacific Ocean. It borders the Sea of Japan to the west, and extends from the Sea of Okhotsk in the north to the East China Sea and Taiwan in the south."]
    ];
  
  var len = locations.length;
  var i;
  var locationMarker;
  var locationInfoWindow;
  for (i = 0; i < len; i++) {
      locationMarker = addMarker(locations[i][0], locations[i][1], map);
      locationInfoWindow = addInfoWindow(locations[2]);
      markerListener(locationMarker, locationInfoWindow, map);
   }
}

function addMarker(coord1, coord2, mMap ){
    var marker = new google.maps.Marker({
    position: {lat: coord1, lng: coord2},
    map: mMap
  });

  return marker;
}

function addInfoWindow(content){
  var infoWindow = new google.maps.InfoWindow({
        content: content
        });
  return infoWindow;
}

function markerListener (marker, infoWindow, map) {
      marker.addListener('click', function() {
          infoWindow.open(map, marker);
      });
  }
