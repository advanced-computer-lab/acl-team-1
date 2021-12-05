import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class Form extends React.Component {
  state = {
    flightnumber: "",
    flightnumberError: "",
    departuretime: "",
    departuretimeError: "",
    arrivaltime: "",
    arrivaltimeError: "",
    economyseats: "",
    economyseatsError: "",
    businessseats: "",
    businessseatsError: "",
    dates: "",
    datesError: "",
    airports: "",
    airportsError: ""
  };

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      flightnumberError: "",
      departuretimeError: "",
      arrivaltimeError: "",
      economyseatsError: "",
      businessseatsError: "",
      datesError: "",
      airportsError: "",

    };

    if (this.state.flightnumber.length < 5) {
      isError = true;
      errors.flightnumberError = "Flight Number needs to be atleast 5 characters long";
    }

    if (this.state.departuretime.indexOf(":") === -1) {
      isError = true;
      errors.departuretimeError = "Requires valid Departure Time";
    }
    if (this.state.arrivaltime.indexOf(":") === -1) {
      isError = true;
      errors.arrivaltimeError = "Requires valid Arrival Time";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        flightnumber: "",
        flightnumberError: "",
        departuretime: "",
        departuretimeError: "",
        arrivaltime: "",
        arrivaltimeError: "",
        economyseats: "",
        economyseatsError: "",
        businessseats: "",
        businessseatsError: "",
        dates: "",
        datesError: "",
        airports: "",
        airportsError: ""
      });
    }
  };

  render() {
    return (
      <form>
        <TextField
          name="flightnumber"
          hintText="Flight Number"
          floatingLabelText="Flight Number"
          value={this.state.flightnumber}
          onChange={e => this.change(e)}
          errorText={this.state.flightnumberError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="departuretime"
          hintText="Departure Time"
          floatingLabelText="Departure Time"
          value={this.state.departuretime}
          onChange={e => this.change(e)}
          errorText={this.state.departuretimeError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="arrivaltime"
          hintText="Arrival Time"
          floatingLabelText="Arrival Time"
          value={this.state.arrivaltime}
          onChange={e => this.change(e)}
          errorText={this.state.arrivaltimeError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="economyseats"
          hintText="Economy Seats"
          floatingLabelText="Economy Seats"
          value={this.state.economyseats}
          onChange={e => this.change(e)}
          errorText={this.state.economyseatsError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="businessseats"
          hintText="Business Seats"
          floatingLabelText="Business Seats"
          value={this.state.businessseats}
          onChange={e => this.change(e)}
          errorText={this.state.businessseatsError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="dates"
          hintText="Date"
          floatingLabelText="Date"
          value={this.state.dates}
          onChange={e => this.change(e)}
          errorText={this.state.datesError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="airports"
          hintText="Airport"
          floatingLabelText="Airport"
          value={this.state.airports}
          onChange={e => this.change(e)}
          errorText={this.state.airportsError}
          floatingLabelFixed
        />
        <br />
        <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary />
      </form>
    );
  }
}