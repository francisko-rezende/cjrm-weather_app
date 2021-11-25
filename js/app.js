const APIKey = ''

const getCityUrl = cityName => 
  `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const fetchData = async url => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados.')
    }

    return response.json()
  } catch ({ name, message}) {
    alert(`${name}: ${message}`)
  }
}

const getCityData = cityName => fetchData(getCityUrl(cityName))

const getCityWeather = async cityName => {
  const [{ Key }] = await getCityData(cityName)
  const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${APIKey}&language=pt-br`
  return fetchData(weatherUrl)
}