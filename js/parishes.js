

let divContent;
let rowNumber = 0;


document.addEventListener('DOMContentLoaded', function () {
  divContent = document.getElementById('content');
  loadPage()
    .then(parishes => showParishes(parishes));
});



async function loadPage() {

  const url = "http://localhost:8082/api/parishes/"

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



async function showParishes(parishes){
  return await parishes.forEach(showOneParish);
}





function showOneParish(parish){
  rowNumber++;

  // kopierer allerede lavet row (som er hidden)
  const row = document.createElement('div');
  row.classList.add('row');

  //editButton
  const editButton = document.getElementById('editButton');
  const editButtonClone = editButton.cloneNode(true);
  editButtonClone.id = 'editButton' + rowNumber;
  editButtonClone.innerHTML = '<i class="fas fa-pencil-alt" aria-hidden="true"></i>';
  editButtonClone.addEventListener('click', function(){
     localStorage.setItem('parishToEdit', JSON.stringify(parish));
     window.location.replace('../templates/editParish.html');
     ;})

  // checkmark
  /*
  <div className="group col-md-2" id="checkmark">
    <div className="double">
      <input class="form-check-input right" type="checkbox" id="gridCheck">
    */
  const outerDivCheckmark = document.createElement('div');
  outerDivCheckmark.classList.add('group');
  outerDivCheckmark.classList.add('col-md-2');
  outerDivCheckmark.id = 'checkmark' + rowNumber;

  const innerDivCheckmark = document.createElement('div');
  innerDivCheckmark.classList.add('double');

  const checkmark = document.getElementById('gridCheck');
  const checkmarkClone = checkmark.cloneNode(true);
  checkmarkClone.id = 'checkmark' + rowNumber;
  checkmarkClone.checked = parish.isOnLockdown;

  innerDivCheckmark.appendChild(checkmarkClone);
  outerDivCheckmark.appendChild(innerDivCheckmark);


  // code
  const code = document.getElementById('code');
  const codeClone = code.cloneNode(true);
  codeClone.id = 'code' + rowNumber;
  codeClone.innerText = parish.code;
  // name
  const name = document.getElementById('name');
  const nameClone = name.cloneNode(true);
  nameClone.id = 'name' + rowNumber;
  nameClone.innerText = parish.name;

  // rNumber
  const rNumber = document.getElementById('rNumber');
  const rNumberClone = rNumber.cloneNode(true);
  rNumberClone.id = 'rNumber' + rowNumber;
  rNumberClone.innerText = parish.currentRNumber;

  // municipalityCode
  const municipalityCode = document.getElementById('municipalityCode');
  const municipalityCodeClone = municipalityCode.cloneNode(true);
  municipalityCodeClone.id = 'municipalityCode' + rowNumber;
  municipalityCodeClone.innerText = parish.municipalityCode;


  row.appendChild(editButtonClone);
  row.appendChild(outerDivCheckmark);
  row.appendChild(codeClone);
  row.appendChild(nameClone);
  row.appendChild(rNumberClone);
  row.appendChild(municipalityCodeClone);

  console.log(row)

  divContent.appendChild(row);



  /*
editButtonNumber++;


// kopierer allerede lavet row (som er hidden)
const row = document.getElementById('row');
const rowClone = row.cloneNode(true);
//rowClone.hidden = false;

console.log(rowClone);


const editButton = document.getElementById('editButton');
//editButton.id = 'editButton' + editButtonNumber;
//editButton.innerHTML = "LOOOOOOOOOOOOOOL";
editButton.addEventListener('click', function(){
    localStorage.setItem('parishToEdit', JSON.stringify(parish));
    window.location.replace('../templates/editParish.html');
    ;})

// checkmark
const checkmark = document.getElementById('gridCheck');
checkmark.checked = parish.isOnLockdown;

// code
const code = document.getElementById('code');
code.innerText = parish.code;
// name
const name = document.getElementById('name');
name.innerText = parish.name;

// rNumber
const rNumber = document.getElementById('rNumber');
rNumber.innerText = parish.currentRNumber;

// municipalityCode
const municipalityCode = document.getElementById('municipalityCode');
municipalityCode.innerText = parish.municipalityCode;

divContent.appendChild(rowClone);
*/


  /*


  const parishWrapper = document.createElement('div');
  parishWrapper.style.position = 'relative';
  parishWrapper.classList.add('form-group');

  // titel
  const parishName = document.createElement('a');
  parishName.classList.add("parish-name");
  parishName.classList.add('form-inp');
  parishName.setAttribute('href', `editParish.html`);
  parishName.addEventListener('click', function(){
    localStorage.setItem('editId', parish.id);
  })
  parishName.innerText = parish.name;


  const checkboxWrapper = document.createElement('div');
  checkboxWrapper.classList.add('double');
  checkboxWrapper.classList.add('form-inp');

  const inpParish = document.createElement('input');
  inpParish.type = 'checkbox';
  inpParish.checked = parish.isOnLockdown;
  inpParish.addEventListener('change', changeLockDown);

  checkboxWrapper.appendChild(inpParish);
  parishWrapper.appendChild(checkboxWrapper);
  parishWrapper.appendChild(parishName);
  divContent.appendChild(parishWrapper);

   */






  /*
    const pId = parish.id;

  // hele boks/knap
  const liParish = document.createElement('li');
  liParish.setAttribute('id', `liParish${pId}`);
  liParish.classList.add("btn", "btn-dark", "li-width", "ui-sortable-handle");

  // link titel
  const aName = document.createElement('a');
  aName.classList.add("parish-name");
  aName.setAttribute('href', `editParish.html`);
  aName.addEventListener('click', function(){
    localStorage.setItem('editId', pId);
  })
  aName.innerText = parish.name;

  // checkboks
  const inpParish = document.createElement('input');
  inpParish.setAttribute("id", `inpParish${pId}`)
  inpParish.classList.add("form-check-input");
  inpParish.type = 'checkbox';
  inpParish.checked = parish.isOnLockdown;
  inpParish.addEventListener('change', changeLockDown);

  const labelIndex = document.createElement('label');
  labelIndex.classList.add("custom-checkbox");
  labelIndex.setAttribute('for', `liParish${parish.id}`)

  const deleteIndex = document.createElement('a');
  deleteIndex.classList.add("delete");
  deleteIndex.addEventListener('click', function(){deleteSlide(parish.id)});


  liParish.appendChild(inpParish);
  liParish.appendChild(aName);
  liParish.appendChild(labelIndex);
  liParish.appendChild(deleteIndex);
  divContent.appendChild(liParish);

   */


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








