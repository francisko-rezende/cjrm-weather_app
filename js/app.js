const APIKey = ''

const getCityUrl = cityName => 
  `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getCityData = async cityName => {
  try {
    const cityUrl = getCityUrl(cityName)
    const response = await fetch(cityUrl)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados sobre a cidade')
    }

    const [cityData] = await response.json()
    return cityData
  } catch ({ name, message}) {
    alert(`${name}: ${message}`)
  }
}

const getCityWeather = async cityName => {
  try {
    const { Key } = await getCityData(cityName)
    const weatherUrl = 
      `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIKey}&language=pt-br `
    const response = await fetch(weatherUrl)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados sobre o tempo')
    }

    const weatherData = await response.json()
    return weatherData
  } catch ({ name, message }) {
    alert(`${name}: ${message}`)
  }
}