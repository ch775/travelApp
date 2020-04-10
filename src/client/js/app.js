/* Global Variables for GeoNames*/
let baseURL = 'http://api.geonames.org/searchJSON?q='
const apiKey = '&username=ch3b3ts';
/* Global Variables for Weatherbit*/
let baseURLweather = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const apiKeyWeather = 'b6622d7bbf6843c1b92e82c0c44cc8a9';


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
  
    //This is getting the value from the input box for the start date
    const vacaDate =  document.getElementById('date').value;

    //This is getting the value from the input box for the end date
    const vacaDateEnd =  document.getElementById('dateEnd').value;
    console.log(vacaDate);
    console.log(vacaDateEnd);


    // Create a new date instance dynamically with JS
     let d = new Date();
     let newDate = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

    // parse a date in yyyy-mm-dd format
    function parseDate(input) {
    let parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
   }

   console.log(parseDate(newDate));
   console.log(parseDate(vacaDate));

   // To calculate the time difference of two dates 
   var Difference_In_Time = parseDate(vacaDate).getTime() - parseDate(newDate).getTime(); 
  
   // To calculate the no. of days between two dates 
   var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
   console.log(Difference_In_Days);

    //This is getting the country name from the data 
    let country = data.geonames[0].countryName;
    //This adds the name  to the results div
    document.getElementById('country').innerHTML = country;

    //This is getting the logitude from the data 
    let long = data.geonames[0].lng;
    //This adds the temp to the results div
    document.getElementById('long').innerHTML = long;

    //This is getting the value of latitude
    const lat =  data.geonames[0].lat;
    //This is adding the input to the results div
    document.getElementById('lat').innerHTML = lat;

    //This is getting the number of days until the vacation
    const daysAway = Difference_In_Days;
    //This is adding the input to the results div
    document.getElementById('daysAway').innerHTML = daysAway + ' days!';


    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

/*This is the function for the Weatherbit API*/ 
function performActionWeather(e){
  const newLat =  document.getElementById('lat').value;
  const newLong =  document.getElementById('long').value;
getLocation(baseURLweather, newLat, newLong, apiKeyWeather)

.then(
    updateUI()
  )
}
const getLocation = async (baseURLweather, newLat, newLong, apiKeyWeather)=>{

  const res = await fetch('https://api.weatherbit.io/v2.0/forecast/daily?'+'lat='+ newLat +'&lon='+ newLong +'&key='+apiKeyWeather)
  try {

    const dataWeather = await res.json();
    console.log(dataWeather);
    console.log(newLat);



    return dataWeather;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

/*End of weather API function */ 


export { performAction }
export { performActionWeather }