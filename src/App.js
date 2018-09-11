import React, { Component } from "react";
import Search from "./Components/Search";
import CurrentWeather from "./Components/CurrentWeather";
import SevenHour from "./Components/SevenHour";
import TenDay from "./Components/TenDay";
import data from "./mockAPI.js";
import apiConfig from "./apiKey";
import "./App.css";

const apiKey = apiConfig.weatherUndergroundApiKey;

class App extends Component {
  constructor() {
    super();

    this.state = {
      location: "",
      currentObservation: data.current_observation,
      hourlyForecast: data.hourly_forecast,
      dailyForecast: data.forecast,
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }
  componentDidMount() {
    if (!this.retrieveLastLocation()) {
    } else {
      let location = this.retrieveLastLocation();
      this.fetchData(`${location[1]}/${location[0]}`);
    }
  }

  fetchData(location) {
    fetch(
      `http://api.wunderground.com/api/${apiKey}/geolookup/conditions/hourly/forecast10day/q/${location}.json`
    )
      .then(response => response.json())
      .then(response => {
        let cityCall = response;
        this.setState({
          currentObservation: cityCall.current_observation,
          hourlyForecast: cityCall.hourly_forecast,
          dailyForecast: cityCall.forecast
        })
      })
    .catch(err => {
      throw new Error(err);
    });
  }

  updateLocation(location) {
    location = location.split(",")
                       .map(loc => loc.trim());
    this.setState({
      location: `${location[0]}, ${location[1]}`
    });
    this.fetchData(`${location[1]}/${location[0]}`);
    this.storeLastLocation(location);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  retrieveLastLocation() {
    return JSON.parse(localStorage.getItem("location"));
  }

  storeLastLocation = location => {
    let stringified = JSON.stringify(location);
    localStorage.setItem("location", stringified);
  };

  render() {
    if (this.state.isToggleOn) {
      return (
        <div>
          <Search updateLocation={this.updateLocation} />
          <CurrentWeather currentObservation={this.state.currentObservation} />
          <button className="toggle-button" onClick={this.handleClick}>
            {this.state.isToggleOn ? "HOURLY" : "DAILY"}
          </button>
          <SevenHour hourlyForecast={this.state.hourlyForecast} />
        </div>
      );
    } else {
      return (
        <div>
          <Search updateLocation={this.updateLocation} />
          <CurrentWeather currentObservation={this.state.currentObservation} />
          <button className="toggle-button" onClick={this.handleClick}>
            {this.state.isToggleOn ? "HOURLY" : "DAILY"}
          </button>
          <TenDay dailyForecast={this.state.dailyForecast} />
        </div>
      );
    }
  }
}

export default App;