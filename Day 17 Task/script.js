let countriesData = []; 

document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.getElementById("countries");
  const loader = document.getElementById("loader");
  const scroll = document.getElementById("scroll");

  let currentIndex = 0;
  const itemsPerPage = 12;


  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      countriesData = data;
      loadMoreCountries();
      scroll.addEventListener("scroll", handleScroll);
    })
    .catch((error) => console.error("Error fetching country data:", error));


  function createCountryCard(country) {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4 d-flex justify-content-center";

    const cardInner = `
                <div class="card text-center border border-white card-hover-effect" style="padding: 20px; width: 18rem; height: 450px; background: transparent; backdrop-filter: brightness(0.5);">
                  <div class="card-header" style="color: white;">${country.name.common}</div>
                  <img src="${country.flags.png}" class="card-img-top" style="border: 2px solid white;" alt="...">
                  <div class="card-body" style="color: white;">
                    <p class="card-text">Capital : ${country.capital ? country.capital[0] : "N/A"}</p>
                    <p class="card-text">Region : ${country.region}</p>
                    <p class="card-text">Country Code : ${country.cca3}</p>
                    <button class="btn btn-primary weather-btn" data-country-name="${country.name.common}" data-bs-toggle="popover" data-bs-placement="top" data-bs-trigger="focus" data-bs-content="">Click for Weather</button>
                  </div>
                </div>
                `;

    card.innerHTML = cardInner;
    return card;
  }


  function loadMoreCountries() {
    loader.style.display = "block";
    setTimeout(() => {
      for (
        let i = currentIndex;
        i < currentIndex + itemsPerPage && i < countriesData.length;
        i++
      ) {
        const countryCard = createCountryCard(countriesData[i]);
        countriesContainer.appendChild(countryCard);
      }
      currentIndex += itemsPerPage;
      loader.style.display = "none";


      const popoverTriggerList = document.querySelectorAll(
        '[data-bs-toggle="popover"]'
      );
      const popoverList = [...popoverTriggerList].map(
        (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
      );
    }, 1000); 
  }


  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      loadMoreCountries();
    }
  }


  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("weather-btn")) {
      const countryName = e.target.getAttribute("data-country-name");
      const country = countriesData.find(
        (country) => country.name.common === countryName
      );
      ClickforWeather(country.latlng[0], country.latlng[1], countryName, e.target);
    }
  });
});

function ClickforWeather(lat, lon,countryName, weatherBtn) {
  const apiKey = "6a2bdf05c97172fe39f33c7d6ff1f9f4";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherContent = `Country Name : ${countryName}, Temperature : ${data.main.temp} °C, Weather : ${data.weather[0].description}`;
      weatherBtn.setAttribute("data-bs-content", weatherContent);


      const popover = bootstrap.Popover.getInstance(weatherBtn);
      if (popover) {
        popover.dispose(); 
      }
      new bootstrap.Popover(weatherBtn); 
      const newPopover = bootstrap.Popover.getInstance(weatherBtn); 
      newPopover.show(); 
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}
