/* Global Variables */
//let baseURL = 'api.openweathermap.org/data/2.5/weather?zip='
let baseURL = 'http://api.geonames.org/searchJSON?q='
const apiKey = '&username=ch3b3ts';
//const imperial = '&units=imperial'


function performAction(e){
const newCity =  document.getElementById('city').value;
getCity(baseURL,newCity, apiKey)

.then(
    updateUI()
  )
}
const getCity = async (baseURL, city, key)=>{

  const res = await fetch('http://api.geonames.org/searchJSON?q='+city+key)
  try {

    const data = await res.json();
  
    //console.log(geomames[""0""].countryName);
    console.log(data.geonames[0])
    

    //This is getting the country name from the data 
    let country = data.geonames[0].countryName;
    //This adds the name  to the answer div
    document.getElementById('country').innerHTML = country;

    //This is getting the temp from the data 
    let long = data.geonames[0].lng;
    //This adds the temp to the answer div
    document.getElementById('long').innerHTML = long;

    //This is getting the value from the input box feelings
    const lat =  data.geonames[0].lat;
    //This is adding the input to the answer div
    document.getElementById('lat').innerHTML = lat;


    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}


export { performAction }