class Forecast {
  constructor() {
    this.key = "1vcIkNtJoOoTZAKWV2ermluAU9XG86Md";
    this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
    this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
  }

  // call async functions
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weatherDetails = await this.getWeather(cityDetails.Key);

    return { cityDetails, weatherDetails };
  }

  // getWeather function
  async getWeather(cityKey) {
    const query = `${cityKey}?apikey=${this.key}`;

    const response = await fetch(this.weatherURI + query);

    if (response.status !== 200) {
      throw new Error("Could not fetch the data...");
    }

    const data = await response.json();

    return data[0];
  }

  // getCity function
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;

    const response = await fetch(this.cityURI + query);

    if (response.status !== 200) {
      throw new Error("Could not fetch the data...");
    }

    const data = await response.json();

    return data[0];
  }
}
