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
  
    //This is getting the value from the input box for the date
    const vacaDate =  document.getElementById('date').value;

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


export { performAction }