

document.addEventListener('DOMContentLoaded', createFormEventListener);

let parishForm;

function createFormEventListener(){
  parishForm = document.getElementById("newParishForm");

  /**
   * We'll define the `handleFormSubmit()` event handler function in the next step.
   */
  parishForm.addEventListener("submit", handleFormSubmit);
}


// https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/
async function handleFormSubmit(event) {


  //vi handler submitten i stedet for default
  event.preventDefault();

  const form = event.currentTarget;

  const url = form.action;

  try {
    const formData = new FormData(form);



    console.log(formData.get('isOnLockdown'));

    //console.log("her", form.elements['isOnLockdown'].value);
    const responseData = await postFormDataAsJson(url, formData);

    // når vi har oprettet sognet
    alert(formData.get('name') + ' er oprettet');
    window.location.replace("../templates/parishes.html");

  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

async function postFormDataAsJson(url, formData) {

  // hvis checkboksen ER checked --> disables hidden-inputfeltet

  console.log(formData.get('isOnLockdown'));

  // laver formData til JSON
  const plainFormData = Object.fromEntries(formData.entries());

  if(document.getElementById("inpLockdown").checked) {
    //document.getElementById('inpLockdownHidden').disable = true;
    plainFormData.isOnLockdown = true;
  }

  const formDataJsonString = JSON.stringify(plainFormData);

  console.log(formDataJsonString);

  const fetchOptions = {
    method: "POST",
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






// få input fra checkbox

var checkedValue = null;
var inputElements = document.getElementsByClassName('messageCheckbox');
for(var i=0; inputElements[i]; ++i){
  if(inputElements[i].checked){
    checkedValue = inputElements[i].value;
    break;
  }
}







