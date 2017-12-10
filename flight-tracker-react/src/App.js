import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: {}, text: '', show: false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch(`/get_flight_data?name=${this.state.text}`)
    .then(response => response.json())
    .then(data => this.setState({ value: data, show: true }))
    .catch(error => this.setState({ error, show: false }));
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  info(flight) {
    if (this.state.show) {
      return (
        <div>
          <h1>Flight Name- {flight.flight_name}</h1>
          <h2>Origin- {flight.departure_location}</h2>
          <h2>Arrival - {flight.arrival_location}</h2>
          <h3>Takeoff Time - {flight.departure_takeoff_time_scheduled}</h3>
          <h3>Arrival Time - {flight.arrival_takeoff_time_scheduled}</h3>
          <h3>Aircraft - {flight.aircraft_info}</h3>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="App">
        <h2 className="App-intro">
          Available flights -  UK0726, UK0810 , UK0812', UK0879 , UK0856 
        </h2>
        <h3> Enter Flight </h3>
        <input type="text" name="flightName" value={this.state.text} onChange={this.handleChange} />
        <br />
        <input type="submit" value="Submit" onClick={ this.handleSubmit } />
        {this.info(this.state.value)}
      </div>
    );
  }
}

export default App;
