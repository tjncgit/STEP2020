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
        listComments.appendChild(createParagraphElement(comment));
        listComments.appendChild(document.createElement('hr'));
    });
});
}

function createListElement(text) {
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
    fetch('/login-status', {method: 'GET'})
    .then(response => response.text())
    .then((status) => {
        console.log(status)

        var i = 0;
        var input_elems = document.getElementsByTagName("input");

        if(status == 0) {
            for(elem of input_elems){ //Hide the input elements until the user logs in
                type_value = elem.getAttributeNode("type");
                type_value.value = "hidden";
        }
            link = document.getElementById("anchor");
            link.innerText="Log in";
            } 
        else {
            link = document.getElementById("anchor");
            link.innerText="Log Out";
            type_value = link.getAttributeNode("href");
            type_value.value = "/logout";
        }
    });

function createParagraphElement(text) {
  const paraElement = document.createElement('p');
  paraElement.innerText = text;
  return paraElement;
}