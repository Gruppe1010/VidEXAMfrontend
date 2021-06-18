const parish = JSON.parse(localStorage.getItem('parishToEdit'));
let updateForm;

async function deleteParish(){

    if(confirm("ADVARSEL! \r\nDu er ved at slette et sogn! \r\nEr du sikker på at du vil slette?")){
      const url = `http://localhost:8082/api/parishes/${parish.id}`;

      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // betyder == vi sender et json i string-format
        },
        //redirect: 'follow'
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      alert(`\"${parish.name}\" er slettet`);
      window.location.replace("../templates/parishes.html");

    }
}

function addParishToPage(){

  const header = document.getElementById('header');
  header.innerText = "Rediger i \"" + parish.name + "\"";

  // slet
  const deleteButton = document.getElementById('deleteButton');
  deleteButton.addEventListener('click', deleteParish);

  // gem
  updateForm.addEventListener('submit', handleFormSubmit);

  // checkmark
  const checkmark = document.getElementById('gridCheck');
  checkmark.checked = parish.isOnLockdown;

  // code
  const code = document.getElementById('code');
  code.placeholder = parish.code;
  code.value = parish.code;
  // name
  const name = document.getElementById('name');
  name.placeholder = parish.name;
  name.value = parish.name;

  // rNumber
  const rNumber = document.getElementById('currentRNumber');
  rNumber.placeholder = parish.currentRNumber;
  rNumber.value = parish.currentRNumber;

  // municipalityCode
  const municipalityCode = document.getElementById('municipalityCode');
  municipalityCode.placeholder = parish.municipalityCode;
  municipalityCode.value = parish.municipalityCode;
}

document.addEventListener('DOMContentLoaded', function () {
  updateForm = document.getElementById('updateForm');
  // sætter formens action til dynamisk parishId
  updateForm.action = updateForm.action + parish.id;
  console.log(updateForm.action);

  addParishToPage();
});

// https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/
async function handleFormSubmit(event) {
  //vi handler submitten i stedet for default
  event.preventDefault();

  const updateForm = event.currentTarget;

  const url = updateForm.action;
  console.log(url);

  try {
    const formData = new FormData(updateForm);

    //console.log(formData.get('isOnLockdown'));
    //tjek om dataen har ændret sig
    if(hasDataChanged(formData)){
      console.log("data has changed!");
      const responseData = await postFormDataAsJson(url, formData);

      // når vi har oprettet sognet
      alert(formData.get('name') + ' er gemt');
      window.location.replace("../templates/parishes.html");

    }else alert("Du skal ændre i sognet for at kunne gemme");



  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

function hasDataChanged(formData){
  // tjekker om der er bare ét af inputfelterne, som har en anden værdi end hvad den startede med
  return (formData.get('isOnLockdown') != parish.isOnLockdown ? 1 : 0 ||
  formData.get('code') != parish.code ||
  formData.get('name') != parish.name ||
  formData.get('currentRNumber') != parish.currentRNumber ||
  formData.get('municipalityCode') != parish.municipalityCode);
}

async function postFormDataAsJson(url, formData) {


  console.log("check", formData.get('isOnLockdown'));

  // laver formData til JSON
  const plainFormData = Object.fromEntries(formData.entries());

  // hvis checkboksen ER checked --> disables hidden-inputfeltet
  if(document.getElementById("gridCheck").checked) {
    //document.getElementById('inpLockdownHidden').disable = true;
    plainFormData.isOnLockdown = true;
  }
  else{
    plainFormData.isOnLockdown = false;
  }

  const formDataJsonString = JSON.stringify(plainFormData);

  console.log(formDataJsonString);

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);

  // !  her skal jeg tage højde for de statuskoder jeg har sendt retur fra controlleren
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}





