const APIKey = ''
const baseUrl = 'http://dataservice.accuweather.com/'

const getCityUrl = cityName => 
  `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getWeatherUrl = Key => 
`${baseUrl}currentconditions/v1/${Key}?apikey=${APIKey}&language=pt-br`

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
  const [ getCityData ] = await getCityData(cityName)
  const weatherUrl = getWeatherUrl({ Key })
  return fetchData(weatherUrl)
}