const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer =  document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const cityForm = document.querySelector('[data-js="change-location"]')
const timeIconConContainer = document.querySelector('[data-js="time-icon"]')
let timeImg = document.querySelector('[data-js="time"]')

const insertContentIntoTag = (tag, property, content) => tag[property] = content

const createIconHTML = WeatherIcon => 
  `<img src="../src/icons/${WeatherIcon}.svg" />`

cityForm.addEventListener('submit', async event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = 
    await getCityWeather(Key)
  const timeIcon = createIconHTML(WeatherIcon)
  const isCityCardHidden = cityCard.classList.contains('d-none')
  const showCityCard = () => cityCard.classList.remove('d-none')

  if (isCityCardHidden) {
    showCityCard()
  }

  timeImg.src = IsDayTime ? '../src/day.svg' : '../src/night.svg'
  
  insertContentIntoTag(timeIconConContainer, 'innerHTML', timeIcon)
  insertContentIntoTag(cityNameContainer, 'textContent', LocalizedName)
  insertContentIntoTag(cityWeatherContainer, 'textContent', WeatherText)
  insertContentIntoTag(cityTemperatureContainer, 'textContent', Temperature.Metric.Value)
  
  event.target.reset()
})