async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const resultBox = document.getElementById("weatherResult");
    const loader = document.getElementById("loader");

    if (city === "") {
        alert("Enter city name");
        return;
    }

    resultBox.classList.add("hidden");
    loader.classList.remove("hidden");

    const apiKey = "c702d67f71514df394f184138262802";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        loader.classList.add("hidden");
        resultBox.classList.remove("hidden");

        if (data.error) {
            resultBox.innerHTML = `<p>${data.error.message}</p>`;
            return;
        }

        resultBox.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <img src="https:${data.current.condition.icon}" />
            <p>${data.current.condition.text}</p>
            <h3>${data.current.temp_c} °C</h3>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind: ${data.current.wind_kph} km/h</p>
        `;

    } catch (error) {
        loader.classList.add("hidden");
        resultBox.classList.remove("hidden");
        resultBox.innerHTML = "Error fetching data";
    }
}