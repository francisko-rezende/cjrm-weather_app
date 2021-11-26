const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer =  document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const cityForm = document.querySelector('[data-js="change-location"]')
const timeIconConContainer = document.querySelector('[data-js="time-icon"]')
let timeImg = document.querySelector('[data-js="time"]')


const timeIconInfo = { tag: timeIconConContainer, propertyName: 'innerHTML' }
const localizedNameInfo = { tag: cityNameContainer, propertyName: 'textContent' }
const weatherTextInfo = { tag: cityWeatherContainer, propertyName: 'textContent' }
const temperatureInfo = { tag: cityTemperatureContainer, propertyName: 'textContent' }

const insertContentIntoTag = ({ tag, propertyName }, content) => 
  tag[propertyName] = content

const createIconHTML = WeatherIcon => 
  `<img src="../src/icons/${WeatherIcon}.svg" />`


const handleWeatherData = async Key => {
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] = 
    await getCityWeather(Key)
  const temperatureInCelsius = Temperature.Metric.Value
  const timeIcon = createIconHTML(WeatherIcon)
  
  hideCityCard()

  insertWeatherIcon(IsDayTime)
  
  insertContentIntoTag(timeIconInfo, timeIcon)
  insertContentIntoTag(weatherTextInfo, WeatherText)
  insertContentIntoTag(temperatureInfo, temperatureInCelsius)
}

const hideCityCard = () => {
  const isCityCardHidden = cityCard.classList.contains('d-none')
  const showCityCard = () => cityCard.classList.remove('d-none')

  if (isCityCardHidden) {
    showCityCard()
  }
}

const insertWeatherIcon = (IsDayTime) => 
  timeImg.src = IsDayTime ? '../src/day.svg' : '../src/night.svg'

cityForm.addEventListener('submit', async event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  insertContentIntoTag(localizedNameInfo, LocalizedName)
  handleWeatherData(Key)
  
  event.target.reset()
})