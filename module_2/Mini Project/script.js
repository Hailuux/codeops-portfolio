
const state = {
  currentCity: null,

  currentWeather: null,

  favorites:
    JSON.parse(
      localStorage.getItem('favorites')
    ) || [],

  suggestions: [],

  isLoading: false,

  favoritesOpen: false,

  suggestionsOpen: false
};

const cityInput =
  document.getElementById('city-input');

const searchBtn =
  document.getElementById('search-btn');

const favBtn =
  document.getElementById('fav-btn');

const suggestionsList =
  document.getElementById('suggestions-list');

const favoritesToggle =
  document.getElementById('favorites-toggle');

const favoritesList =
  document.getElementById('favorites-list');

const favoritesCount =
  document.getElementById('favorites-count');

const cityNameEl =
  document.getElementById('city-name');

const weatherIconEl =
  document.getElementById('weather-icon');

const temperatureEl =
  document.getElementById('temperature');

const weatherDescEl =
  document.getElementById('weather-desc');

const humidityEl =
  document.getElementById('humidity');

const windSpeedEl =
  document.getElementById('wind-speed');

const forecastContainer =
  document.getElementById('forecast-container');



const weatherIcons = {

  0: {
    text: 'Clear sky',
    icon: 'icons/sunny.svg'
  },

  1: {
    text: 'Mainly clear',
    icon: 'icons/sunny.svg'
  },

  2: {
    text: 'Partly cloudy',
    icon: 'icons/partly-cloudy.svg'
  },

  3: {
    text: 'Overcast',
    icon: 'icons/cloudy.svg'
  },

  45: {
    text: 'Fog',
    icon: 'icons/fog.svg'
  },

  48: {
    text: 'Fog',
    icon: 'icons/fog.svg'
  },

  51: {
    text: 'Light drizzle',
    icon: 'icons/rain.svg'
  },

  53: {
    text: 'Drizzle',
    icon: 'icons/rain.svg'
  },

  55: {
    text: 'Heavy drizzle',
    icon: 'icons/rain.svg'
  },

  61: {
    text: 'Slight rain',
    icon: 'icons/rain.svg'
  },

  63: {
    text: 'Moderate rain',
    icon: 'icons/rain.svg'
  },

  65: {
    text: 'Heavy rain',
    icon: 'icons/rain.svg'
  },

  71: {
    text: 'Slight snow',
    icon: 'icons/cloudy.svg'
  },

  73: {
    text: 'Snow',
    icon: 'icons/cloudy.svg'
  },

  75: {
    text: 'Heavy snow',
    icon: 'icons/cloudy.svg'
  },

  80: {
    text: 'Rain showers',
    icon: 'icons/rain.svg'
  },

  81: {
    text: 'Rain showers',
    icon: 'icons/rain.svg'
  },

  82: {
    text: 'Heavy rain showers',
    icon: 'icons/rain.svg'
  },

  95: {
    text: 'Thunderstorm',
    icon: 'icons/thunderstorm.svg'
  },

  96: {
    text: 'Thunderstorm with hail',
    icon: 'icons/thunderstorm.svg'
  },

  99: {
    text: 'Thunderstorm with hail',
    icon: 'icons/thunderstorm.svg'
  }

};


function decodeWeatherCode(code) {

  return weatherIcons[code] || {

    text: 'Unknown',

    icon: 'icons/cloudy.svg'

  };

}



async function getCoordinates(city) {

  const url =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(city)}` +
    `&count=1` +
    `&countryCode=ET` +
    `&language=en` +
    `&format=json`;

  const response =
    await fetch(url);

  if (!response.ok) {

    throw new Error(
      'Could not contact the city search service.'
    );

  }

  const data =
    await response.json();

  if (
    !data.results ||
    data.results.length === 0
  ) {

    throw new Error(
      `Could not find an Ethiopian city called "${city}".`
    );

  }

  const place =
    data.results[0];

  return {

    latitude:
      place.latitude,

    longitude:
      place.longitude,

    name:
      place.name,

    admin1:
      place.admin1 || ''

  };

}


async function getCitySuggestions(query) {

  const url =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(query)}` +
    `&count=5` +
    `&countryCode=ET` +
    `&language=en` +
    `&format=json`;

  const response =
    await fetch(url);

  if (!response.ok) {

    throw new Error(
      'Suggestion request failed.'
    );

  }

  const data =
    await response.json();

  return data.results || [];

}
async function getWeather(
  latitude,
  longitude
) {

  const url =
    `https://api.open-meteo.com/v1/forecast` +

    `?latitude=${latitude}` +

    `&longitude=${longitude}` +

    `&current=` +
    `temperature_2m,` +
    `relative_humidity_2m,` +
    `wind_speed_10m,` +
    `weather_code` +

    `&daily=` +
    `weather_code,` +
    `temperature_2m_max,` +
    `temperature_2m_min` +

    `&timezone=auto` +

    `&forecast_days=4`;

  const response =
    await fetch(url);

  if (!response.ok) {

    throw new Error(
      'Could not retrieve weather data.'
    );

  }

  return await response.json();

}


async function loadWeatherForCity(city) {

  try {

    state.isLoading = true;

    weatherDescEl.textContent =
      'Loading weather...';

    searchBtn.disabled = true;

    const weatherData =
      await getWeather(
        city.latitude,
        city.longitude
      );

    

    state.currentCity =
      city;

    state.currentWeather =
      weatherData;

   

    displayWeather(
      city.name,
      weatherData
    );

    updateFavoriteButton();

  }

  catch (error) {

    weatherDescEl.textContent =
      'Something went wrong.';

    alert(
      error.message
    );

    console.error(error);

  }

  finally {

    state.isLoading = false;

    searchBtn.disabled = false;

  }

}


function displayWeather(
  cityName,
  weatherData
) {

  const current =
    weatherData.current;

  const weatherInfo =
    decodeWeatherCode(
      current.weather_code
    );

  cityNameEl.textContent =
    cityName;

  temperatureEl.textContent =
    `${Math.round(
      current.temperature_2m
    )}°C`;

  weatherDescEl.textContent =
    weatherInfo.text;

  humidityEl.textContent =
    `${current.relative_humidity_2m}%`;

  windSpeedEl.textContent =
    `${Math.round(
      current.wind_speed_10m
    )} km/h`;

  weatherIconEl.src =
    weatherInfo.icon;

  weatherIconEl.alt =
    weatherInfo.text;

  displayForecast(
    weatherData.daily
  );

}



function displayForecast(daily) {

  forecastContainer.innerHTML =
    '';

  for (
    let i = 1;
    i <= 3;
    i++
  ) {

    const date =
      new Date(
        `${daily.time[i]}T12:00:00`
      );

    const dayName =
      date.toLocaleDateString(
        'en-US',
        {
          weekday: 'short'
        }
      );

    const weatherInfo =
      decodeWeatherCode(
        daily.weather_code[i]
      );

    const maxTemp =
      Math.round(
        daily.temperature_2m_max[i]
      );

    const minTemp =
      Math.round(
        daily.temperature_2m_min[i]
      );

    const card =
      document.createElement('div');

    card.className =
      'forecast-card';

    card.innerHTML = `

      <strong>
        ${dayName}
      </strong>

      <img
        src="${weatherInfo.icon}"
        alt="${weatherInfo.text}"
      >

      <span>
        ${maxTemp}° / ${minTemp}°
      </span>

    `;

    forecastContainer.appendChild(
      card
    );

  }

}


function persistFavorites() {

  localStorage.setItem(
    'favorites',
    JSON.stringify(
      state.favorites
    )
  );

}


function renderFavorites() {

  favoritesList.innerHTML =
    '';

  favoritesCount.textContent =
    state.favorites.length;

  if (
    state.favorites.length === 0
  ) {

    const empty =
      document.createElement('div');

    empty.className =
      'favorites-empty';

    empty.textContent =
      'No favorite cities yet.';

    favoritesList.appendChild(
      empty
    );

    return;

  }

  state.favorites.forEach(
    (city) => {

      const row =
        document.createElement('div');

      row.className =
        'favorite-item';

      const loadButton =
        document.createElement('button');

      loadButton.className =
        'favorite-city-button';

      loadButton.type =
        'button';

      loadButton.textContent =
        city;

      loadButton.addEventListener(
        'click',
        () => {

          cityInput.value =
            city;

          hideFavorites();

          handleSearch();

        }
      );

      const removeButton =
        document.createElement('button');

      removeButton.className =
        'remove-favorite';

      removeButton.type =
        'button';

      removeButton.textContent =
        '×';

      removeButton.title =
        `Remove ${city} from favorites`;

      removeButton.addEventListener(
        'click',
        () => {

          removeFavorite(
            city
          );

        }
      );

      row.appendChild(
        loadButton
      );

      row.appendChild(
        removeButton
      );

      favoritesList.appendChild(
        row
      );

    }
  );

}



function addFavorite(cityName) {

  if (
    !state.favorites.includes(
      cityName
    )
  ) {

    state.favorites.push(
      cityName
    );

    persistFavorites();

    renderFavorites();

  }

  updateFavoriteButton();

}



function removeFavorite(cityName) {

  state.favorites =
    state.favorites.filter(
      (city) =>
        city !== cityName
    );

  persistFavorites();

  renderFavorites();

  updateFavoriteButton();

}



function updateFavoriteButton() {

  if (
    !state.currentCity
  ) {

    favBtn.textContent =
      '★ Save to Favorites';

    return;

  }

  if (
    state.favorites.includes(
      state.currentCity.name
    )
  ) {

    favBtn.textContent =
      '★ Saved to Favorites';

  }

  else {

    favBtn.textContent =
      '★ Save to Favorites';

  }

}


function hideFavorites() {

  state.favoritesOpen =
    false;

  favoritesList.classList.add(
    'hidden'
  );

  favoritesToggle.setAttribute(
    'aria-expanded',
    'false'
  );

}



favoritesToggle.addEventListener(
  'click',
  () => {

    state.favoritesOpen =
      !state.favoritesOpen;

    if (
      state.favoritesOpen
    ) {

      favoritesList.classList.remove(
        'hidden'
      );

      favoritesToggle.setAttribute(
        'aria-expanded',
        'true'
      );

    }

    else {

      hideFavorites();

    }

  }
);


function debounce(
  fn,
  delay
) {

  let timer;

  return function (...args) {

    clearTimeout(timer);

    timer =
      setTimeout(
        () => fn(...args),
        delay
      );

  };

}



function showSuggestions(results) {

  state.suggestions =
    results;

  suggestionsList.innerHTML =
    '';

  if (
    state.suggestions.length === 0
  ) {

    hideSuggestions();

    return;

  }

  state.suggestions.forEach(
    (place) => {

      const item =
        document.createElement('div');

      item.className =
        'suggestion-item';

      const name =
        document.createElement('div');

      name.textContent =
        place.name;

      item.appendChild(
        name
      );

      if (
        place.admin1
      ) {

        const region =
          document.createElement('div');

        region.className =
          'region';

        region.textContent =
          place.admin1;

        item.appendChild(
          region
        );

      }

      item.addEventListener(
        'click',
        async () => {

          cityInput.value =
            place.name;

          hideSuggestions();

          await loadWeatherForCity({

            name:
              place.name,

            latitude:
              place.latitude,

            longitude:
              place.longitude,

            admin1:
              place.admin1 || ''

          });

        }
      );

      suggestionsList.appendChild(
        item
      );

    }
  );

  state.suggestionsOpen =
    true;

  suggestionsList.classList.remove(
    'hidden'
  );

}


function hideSuggestions() {

  state.suggestions =
    [];

  state.suggestionsOpen =
    false;

  suggestionsList.classList.add(
    'hidden'
  );

  suggestionsList.innerHTML =
    '';

}


const handleTyping =
  debounce(
    async (query) => {

      if (
        query.length < 2
      ) {

        hideSuggestions();

        return;

      }

      try {

        const results =
          await getCitySuggestions(
            query
          );

        showSuggestions(
          results
        );

      }

      catch (error) {

        console.error(
          error
        );

      }

    },
    300
  );


async function handleSearch() {

  const city =
    cityInput.value.trim();

  // Empty search is not allowed

  if (!city) {

    alert(
      'Please enter a city name.'
    );

    cityInput.focus();

    return;

  }

  hideSuggestions();

  hideFavorites();

  try {

    const coords =
      await getCoordinates(
        city
      );

    await loadWeatherForCity(
      coords
    );

  }

  catch (error) {

    weatherDescEl.textContent =
      'City not found.';

    alert(
      error.message
    );

    console.error(
      error
    );

  }

}

searchBtn.addEventListener(
  'click',
  handleSearch
);

cityInput.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key === 'Enter'
    ) {

      handleSearch();

    }

  }
);



cityInput.addEventListener(
  'input',
  (event) => {

    const query =
      event.target.value.trim();

    handleTyping(
      query
    );

  }
);

document.addEventListener(
  'click',
  (event) => {

    if (

      !suggestionsList.contains(
        event.target
      ) &&

      event.target !== cityInput

    ) {

      hideSuggestions();

    }

    if (

      !favoritesList.contains(
        event.target
      ) &&

      !favoritesToggle.contains(
        event.target
      )

    ) {

      hideFavorites();

    }

  }
);



favBtn.addEventListener(
  'click',
  () => {

    if (
      !state.currentCity
    ) {

      alert(
        'Search for a city first.'
      );

      return;

    }

    addFavorite(
      state.currentCity.name
    );

  }
);

renderFavorites();

updateFavoriteButton();

(async function initializeApp() {

  await loadWeatherForCity({

    name:
      'Addis Ababa',

    latitude:
      9.03,

    longitude:
      38.74

  });

})();