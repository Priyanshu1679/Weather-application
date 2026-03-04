async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Please enter city name");
        return;
    }

    const apiKey = "c702d67f71514df394f184138262802";

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById("weatherResult").innerHTML =
                `<p>❌ ${data.error.message}</p>`;
            return;
        }

        document.getElementById("weatherResult").innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p>🌡 Temperature: ${data.current.temp_c} °C</p>
            <p>☁ Condition: ${data.current.condition.text}</p>
            <p>💧 Humidity: ${data.current.humidity}%</p>
            <p>🌬 Wind Speed: ${data.current.wind_kph} km/h</p>
        `;

    } catch (error) {
        console.error(error);
        document.getElementById("weatherResult").innerHTML =
            "<p>⚠ Unable to fetch weather data</p>";
    }
}