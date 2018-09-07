import React from "react";
import "./Card.css";

function Card(props) {
  const data = Object.keys(props);
  if (data.includes("FCTTIME")) {
    let hour = props.FCTTIME.hour;

    hour > 12 
      ? (hour = `${hour - 12} am`) 
      : (hour = `${hour} pm`);

    return (
        <div className="card">
          <h1>{hour}</h1>
          <img src={props.icon_url} />
          <h1>{props.temp.english}° F</h1>
        </div>
    );
  } else {
    let chanceOfRain = props.pop;

    chanceOfRain === 0
      ? (chanceOfRain = "")
      : (chanceOfRain = `Chance of Rain ${chanceOfRain} %`);

    return (
        <div className="card">
          <h1>{props.date.weekday.slice(0, 3)}</h1>
          <img src={props.icon_url} />
          <h3>HIGH OF {props.high.fahrenheit}° F</h3>
          <h3>LOW OF {props.low.fahrenheit}° F</h3>
          <p>Conditions: {props.conditions}</p>
        </div>
    );
  }
}

export default Card;
