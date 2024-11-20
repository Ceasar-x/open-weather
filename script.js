const APIKey = "92fbe088b91d5ad6795a134539b4496f";

const searchBox = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".not-found");

searchButton.addEventListener("click", () => {
    const city = searchBox.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod === "404") {
                notFound.style.visibility = "visible";
                weatherBox.style.visibility = "hidden";
                weatherDetails.style.visibility = "hidden";
                return;
            }

            notFound.style.visibility = "hidden";
            weatherBox.style.visibility = "visible";
            weatherDetails.style.visibility = "visible";

            const temperature = document.querySelector(".temperature");
            const description = document.querySelector(".description");
            const humidity = document.querySelector(".info-humidity span");
            const wind = document.querySelector(".info-wind span");
            const weatherImg = document.querySelector(".weather img");

            
            temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
            description.innerHTML = data.weather[0].description;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${data.wind.speed}km/h`;

            
            const condition = data.weather[0].main.toLowerCase();
            if (condition.includes("rain")) {
                weatherImg.src = "wea/rain-removebg-preview.png";
            } else if (condition.includes("snow")) {
                weatherImg.src = "wea/snow-removebg-preview.png";
            } else if (condition.includes("mist") || condition.includes("haze")) {
                weatherImg.src = "wea/mist-removebg-preview.png";
            } else if (condition.includes("clear")) {
                weatherImg.src = "wea/sunny-removebg-preview.png";
            } else if (condition.includes("cloud")) {
                weatherImg.src = "wea/cloud-removebg-preview.png";
            } else {
                weatherImg.src = "wea/cloud-removebg-preview.png"; // Default image for undefined conditions
            }
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("An error occurred while fetching the weather data. Please try again.");
        });
});
