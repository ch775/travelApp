/* Global Variables for GeoNames*/
let baseURL = 'http://api.geonames.org/searchJSON?q='
const apiKey = '&username=ch3b3ts';
/* Global Variables for Weatherbit*/
let baseURLweather = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const apiKeyWeather = 'b6622d7bbf6843c1b92e82c0c44cc8a9';
/* Global Variables for Pixabay*/
let baseURLimages = 'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/'
const apiKeyImages = '?key=16027588-fcf7b42ae8f04c207e0c5e1d0';


function performAction(e){
const newCity =  document.getElementById('city').value;
getCity(baseURL,newCity, apiKey);


}
const getCity = async (baseURL, city, key)=>{

  const res = await fetch('http://api.geonames.org/searchJSON?q='+city+key)
  try {

    const data = await res.json();
  
    //This is getting the value from the input box for the start date
    const vacaDate =  document.getElementById('date').value;

    //This is getting the value from the input box for the end date
    const vacaDateEnd =  document.getElementById('dateEnd').value;
    
    


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

   // To calculate the time difference of current date and vacation date
   var Difference_In_Time = parseDate(vacaDate).getTime() - parseDate(newDate).getTime(); 

    // To calculate the time difference of vacation date start and vacation date end
    var Difference_In_Vacation = parseDate(vacaDateEnd).getTime() - parseDate(vacaDate).getTime(); 
  
   // To calculate the no. of days between two dates 
   var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
   console.log(Difference_In_Days);

   // To calculate the no. of days between two dates 
   var Difference_In_Vacation_In_Days = Difference_In_Vacation / (1000 * 3600 * 24);
   console.log(Difference_In_Vacation_In_Days);


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
    document.getElementById('daysAway').innerHTML = daysAway + ' days away!';

    //This is getting the number of days until total for the vacation
    const daysTotal = Difference_In_Vacation_In_Days;
    //This is adding the input to the results div
    document.getElementById('tripLength').innerHTML = daysTotal + ' days.';

    //Fetching the weather API
    const weatherInfo = fetch('https://api.weatherbit.io/v2.0/forecast/daily?'+'lat='+ lat +'&lon='+ long +'&key='+apiKeyWeather).then( (weatherResponse) => {
       return weatherResponse.json(); 
    })
    .then((dataWeather) => {
      console.log(dataWeather);
      console.log(dataWeather.data[15].weather.description);
      //Defining weather Description
      const weatherDescription = dataWeather.data[15].weather.description;
       //Defining weather high temp
       const highTemp = dataWeather.data[15].high_temp;
       //Defining weather low temp
       const lowTemp = dataWeather.data[15].low_temp;

       //Adding to the weather div
      document.getElementById('weather').innerHTML = weatherDescription + '<br/>High Temp:'+ highTemp + '<br/>Low Temp:' + lowTemp;

           //Fetching the image API
           const imageInfo = fetch('https://cors-anywhere.herokuapp.com/https://pixabay.com/api/'+ apiKeyImages + '&q=' + city + '+city' + '&image_type=photo')
           .then( (imageResponse) => {
           return imageResponse.json(); 
           })
           .then((dataImage) => {
           console.log(dataImage.hits[0].largeImageURL);
           //Defining image src
           const imageSrc = dataImage.hits[0].largeImageURL;
           //Adding src to image div
           document.getElementById('imgDiv').innerHTML = '<img class="imgClass" src="' + imageSrc + '" />';
          });

          console.log(imageInfo);
          //End of image API
    });

    console.log(weatherInfo);
    //End of weather API


    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}



export { performAction }

