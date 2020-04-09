/* Global Variables */
let baseURL = 'api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=39067274dbce3644a3b8ef7c8c34939b';
const imperial = '&units=imperial'


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const newZip =  document.getElementById('zip').value;
getZip(baseURL,newZip, apiKey)

.then(
    updateUI()
  )
}
const getZip = async (baseURL, zip, key)=>{

  const res = await fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zip+key+imperial)
  try {

    const data = await res.json();
  
    console.log(data);

    //This is getting the name from the data 
    let name = data.name;
    //This adds the name  to the answer div
    document.getElementById('name').innerHTML = name;

    //This is getting the temp from the data 
    let temp = data.main.temp;
    //This adds the temp to the answer div
    document.getElementById('temp').innerHTML = temp;

    //This is getting the value from the input box feelings
    const feelings =  document.getElementById('feelings').value;
    //This is adding the input to the answer div
    document.getElementById('content').innerHTML = feelings;

    // Create a new date instance dynamically with JS
    let d = new Date();
     let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
    //This is adding the date to the answer div
    document.getElementById('date').innerHTML = newDate;


    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}


