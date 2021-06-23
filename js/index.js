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
  rowClone.hidden = false; // @ 1f - linje tilføjet

  // code
  rowClone.getElementsByClassName('code')[0].innerText = mun.code;
  /* @ Før:
    const code = document.getElementById('code');
    code.innerText = mun.code;
  * */

  // name
  rowClone.getElementsByClassName('name')[0].innerText = mun.name;

  // rNumber
  rowClone.getElementsByClassName('rNumber')[0].innerText = mun.currentRNumber;

  divContent.appendChild(rowClone);
}







