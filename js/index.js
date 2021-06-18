
let divContent;

// når siden er loadet
document.addEventListener('DOMContentLoaded', function () {
  divContent = document.getElementById('content');

  // tilføj kommuner
  loadPage()
    .then(municipalities => showMunicipalities(municipalities));
});



async function loadPage() {

  const url = "http://localhost:8082/api/municipalities/"

  return await postFormDataAsJson(url);
}

// fetcher alle parishes
async function postFormDataAsJson(url) {

  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: 'follow'
  };

  const response = await fetch(url, fetchOptions);

  // !  her skal jeg tage højde for de statuskoder jeg har sendt retur fra controlleren
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}



async function showMunicipalities(muns){
  return await muns.forEach(showOneMunicipality);
}



function showOneMunicipality(mun){

  // kopierer allerede lavet row (som er hidden)
  const row = document.getElementById('row');
  const rowClone = row.cloneNode(true);
  //rowClone.hidden = false;

  // code
  const code = document.getElementById('code');
  code.innerText = mun.code;
  // name
  const name = document.getElementById('name');
  name.innerText = mun.name;

  // rNumber
  const rNumber = document.getElementById('rNumber');
  rNumber.innerText = mun.currentRNumber;

  divContent.appendChild(rowClone);
}

function changeLockDown(){

}

function deleteSlide(parishId){
  const url = `http://localhost:8082/api/parishes/${parishId}`;


  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json', // betyder == vi sender et json i string-format
    },
    //redirect: 'follow'
  };

  function checkIfSuccess(response, parishId){
    if(response.status >= 200 && response.status < 300){
      document.getElementById(`liParish${parishId}`).remove();
    }
    else if(response.status === 409){
      alert("Der er gået noget galt");
    }
    // else bliver den catchet i fetch
  }
  fetch(url, requestOptions)
    .then(data => checkIfSuccess(data, slideId))
    .catch(error => console.log("Fejl i fetch, index.js: ", error));
}








