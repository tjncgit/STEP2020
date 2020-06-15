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
    let param1 = document.getElementById('param1').value,
     param2 = document.getElementById('param2').value;
    console.log(param1);
    console.log(param2);

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
        listComments.appendChild(createParaElement(comment));
        listComments.appendChild(document.createElement('hr'));
    });
});
}

function createParaElement(text) {
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

        if(status == 0) {
        for(elem of input_elems){ //Hide the input elements until the user logs in
        type_value = elem.getAttributeNode("type");
        type_value.value = "hidden";
        console.log(type_value);
        }
        link = document.getElementById("anchor");
        link.innerText="Log in To Comment";} 
        else {
        link = document.getElementById("anchor");
        link.innerText="Log Out";
        type_value = link.getAttributeNode("href");
        type_value.value = "/logout";
        console.log(type_value);
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

  const birthMarker = new google.maps.Marker({
    position: {lat: 5.9631, lng: 10.1591},
    map: map,
    title: 'This is where I was born'
  });

  travelLocations = {
    "duabi":[25.2048, 55.2708],
    "bora bora":[16.5004, 151.7415],
    'tokyo':[35.6804, 139.7690]
  }

  for(let [key, value] of Object.entries(travelLocations) ){
      var latLang = new google.maps.LatLng(value[0],value[1]);
      var marker = new google.maps.Marker({
          position: latLang,
          map : map,
          title: key
      });
      console.log();
  }
}