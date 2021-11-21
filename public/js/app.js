const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const errorMessage = document.querySelector("#error-message");
const locationMessage = document.querySelector("#location-message");
const forcastMessage = document.querySelector("#forecast-message");

weatherForm.addEventListener("submit", (e) =>{
    e.preventDefault(); 
    const location = search.value;

    errorMessage.textContent = "Loading...";
    locationMessage.textContent = "";
    forcastMessage.textContent = "";

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                errorMessage.textContent = data.error || "Please try again!";
            }
            else{
                const { place, longtitude, latitude, forecastData} = data || {};
                errorMessage.textContent = "";
                locationMessage.textContent = place;
                forcastMessage.textContent = forecastData;
            }
        })
    })
   
});