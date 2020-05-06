const cityForm = document.querySelector(".cityForm");
const card = document.querySelector(".card");
const time = document.querySelector(".card img");
const icon = document.querySelector(".icon img");
const details = document.querySelector(".details");

// forecast object
const forecast = new Forecast();

// updateUI function
const updateUI = (data) => {
  const cityDetails = data.cityDetails;
  const weatherDetails = data.weatherDetails;

  const template = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <h5 class="my-3">${cityDetails.Country.EnglishName}</h5>
        <div class="my-3">${weatherDetails.WeatherText}</div>
        <div class="display-4 my-4">
          <span>${weatherDetails.Temperature.Metric.Value.toFixed()}</span>
          <span>&deg;C</span>
        </div>
        `;
  details.innerHTML = template;

  // remove d-none class
  card.classList.remove("d-none");

  // change day/night image
  if (weatherDetails.IsDayTime) {
    time.setAttribute("src", "img/day.svg");
  } else {
    time.setAttribute("src", "img/night.svg");
  }

  // change weather icons
  icon.setAttribute("src", `img/icons/${weatherDetails.WeatherIcon}.svg`);
};

// cityForm eventListener
cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get input value
  const city = cityForm.city.value.trim();

  // reset form
  cityForm.reset();

  // call async updateCity function and updateUI from forecast Object
  forecast
    .updateCity(city)
    .then((data) => {
      updateUI(data);
    })

    .catch((error) => {
      console.log(error);
    });

  // set local storage of user input
  localStorage.setItem("city", city);
});

// updateUI with localstorage city
if (localStorage.getItem("city")) {
  let city = localStorage.getItem("city");
  forecast
    .updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
