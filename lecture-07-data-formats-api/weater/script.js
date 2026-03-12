const cityText = document.getElementById("city");
const temperatureText = document.getElementById("temperature");
const windText = document.getElementById("wind");
const timeText = document.getElementById("time");
const output = document.getElementById("output");

function log(message) {
    output.textContent += message + "\n"
}

function clearOutput() {
    output.textContent = ""
}

document.getElementById("btnLoadWeatherKuopio").onclick = () => loadWeatherByCity("Kuopio", "62.8924", "27.6770");
document.getElementById("btnLoadWeatherHelsinki").onclick = () => loadWeatherByCity("Helsinki", "60.1699", "24.9384");
document.getElementById("btnLoadWeatherOulu").onclick = () => loadWeatherByCity("Oulu", "65.0121", "25.4651");

async function loadWeatherByCity(cityName, latitude, longitude) {
    clearOutput()

    try{
        // TODO: fetch data from API
        // Part A: First API request
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&current=temperature_2m,wind_speed_10m");
        
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }
        
        const data = await response.json();
        
        console.log(data);

        // Part B: Read the correct fields

        const temp = data.current.temperature_2m;
        const wSpeed = data.current.wind_speed_10m;
        const t = new Date(data.current.time);

        if (temp < 0) { // need to modify the CSS to impact background color
            document.body.className = "cold"
        } else {
            document.body.className = "mild"
        }


        days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        cityText.innerText = cityName;
        temperatureText.innerText = temp + " °C";
        windText.innerText = wSpeed + " km/h";
        timeText.innerText = "Last fetch: " + days[t.getDay()] + " " + t.getDate() + "/" + (t.getMonth()+1) + "/" + t.getFullYear() + " at "+t.getHours() + ":" + t.getMinutes();

    } catch(error) {
        log("Error: " + error.message);
    }
}