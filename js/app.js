const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer =  document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const cityForm = document.querySelector('[data-js="change-location"]')
const timeIconConContainer = document.querySelector('[data-js="time-icon"]')
let timeImg = document.querySelector('[data-js="time"]')


let Key = null
const timeIconInfo = { tag: timeIconConContainer, propertyName: 'innerHTML' }
const localizedNameInfo = { 
  tag: cityNameContainer, 
  propertyName: 'textContent' 
}

const weatherTextInfo = { 
  tag: cityWeatherContainer,
  propertyName: 'textContent' 
}

const temperatureInfo = { 
  tag: cityTemperatureContainer, 
  propertyName: 'textContent' 
}


const displayCityCard = () => {
  const isCityCardHidden = cityCard.classList.contains('d-none')
  const showCityCard = () => cityCard.classList.remove('d-none')

  if (isCityCardHidden) {
    showCityCard()
  }
}

const createIconHTML = WeatherIcon => 
  `<img src="../src/icons/${WeatherIcon}.svg" />`

const displayWeatherIcon = (IsDayTime) => 
  timeImg.src = IsDayTime ? '../src/day.svg' : '../src/night.svg'

const insertContentIntoTag = ({ tag, propertyName }, content) => 
  tag[propertyName] = content

const displayWeatherInfo = (timeIcon, WeatherText, temperatureInCelsius) => {
  insertContentIntoTag(timeIconInfo, timeIcon)
  insertContentIntoTag(weatherTextInfo, WeatherText)
  insertContentIntoTag(temperatureInfo, temperatureInCelsius)
}

const handleWeatherData = async Key => {
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = 
    await getCityWeather(Key)
  const temperatureInCelsius = Temperature.Metric.Value
  const timeIcon = createIconHTML(WeatherIcon)
  
  displayCityCard()
  displayWeatherIcon(IsDayTime)
  displayWeatherInfo(timeIcon, WeatherText, temperatureInCelsius)
}

const handleCityData = async inputValue => {
  const [cityData] = await getCityData(inputValue)
  Key = cityData.Key
  insertContentIntoTag(localizedNameInfo, cityData.LocalizedName)
}

const displayCityWeather = async event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  
  await handleCityData(inputValue)
  handleWeatherData(Key)
  event.target.reset()
}

cityForm.addEventListener('submit', displayCityWeather)