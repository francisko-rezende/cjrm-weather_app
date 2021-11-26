const cityForm = document.querySelector('[data-js="change-location"]')

cityForm.addEventListener('submit', async event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  const [{Key, LocalizedName}] = await getCityData(inputValue)
  const [{weatherText, Temperature}] = await getCityWeather(Key)

  console.log(weatherText, Temperature)
  event.target.reset()
})