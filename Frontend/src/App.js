import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";

import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";
import Table from "./Table";


const invertDirection = {
  asc: "desc",
  desc: "asc"
};

class App extends Component {
  state = {
    data: [
      {
        flightnumber: "EG1234",
        departuretime: "11:15",
        arrivaltime: "12:15",
        dates: "12/5/2002",
        economyseats: "50",
        businessseats: "5",
        airports: "Cairo"
      },
      {
        flightnumber: "FR5849",
        departuretime: "13:15",
        arrivaltime: "19:15",
        dates: "2/8/2005",
        economyseats: "60",
        businessseats: "10",
        airports: "Frankfurt"
      },
      {
        flightnumber: "QR12345",
        departuretime: "01:05",
        arrivaltime: "19:15",
        dates: "12/5/2021",
        economyseats: "90",
        businessseats: "20",
        airports: "Cairo"
      }
    ],
    editIdx: -1,
    columnToSort: "",
    sortDirection: "desc",
    query: "",
    columnToQuery: "flightnumber"
  };

  handleRemove = i => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i)
    }));
  };

  startEditing = i => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleSave = (i, x) => {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === i ? x : row))
    }));
    this.stopEditing();
  };

  handleSort = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection:
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : "asc"
    }));
  };

  render() {
    const lowerCaseQuery = this.state.query.toLowerCase();
    return (
      <MuiThemeProvider>
        <div className="App">
          <Form
            onSubmit={submission =>
              this.setState({
                data: [...this.state.data, submission]
              })
            }
          />
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", margin: "auto" }}>
              <TextField
                hintText="Query"
                floatingLabelText="Query"
                value={this.state.query}
                onChange={e => this.setState({ query: e.target.value })}
                floatingLabelFixed
              />
              <SelectField
                style={{ marginLeft: "1em" }}
                floatingLabelText="Select a column"
                value={this.state.columnToQuery}
                onChange={(event, index, value) =>
                  this.setState({ columnToQuery: value })
                }
              >
                <MenuItem value="flightnumber" primaryText="Flight Number" />
                <MenuItem value="departuretime" primaryText="Departure Time" />
                <MenuItem value="arrivaltime" primaryText="Arrival Time" />
                <MenuItem value="dates" primaryText="Date" />
                <MenuItem value="economyseats" primaryText="Economy Seats" />
                <MenuItem value="businessseats" primaryText="Business Seats" />
                <MenuItem value="airports" primaryText="Airport" />
              </SelectField>
            </div>
          </div>
          <Table
            handleSort={this.handleSort}
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleSave={this.handleSave}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            data={orderBy(
              this.state.query
                ? this.state.data.filter(x =>
                    x[this.state.columnToQuery]
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : this.state.data,
              this.state.columnToSort,
              this.state.sortDirection
            )}
            header={[
              {
                name: "Flight Number",
                prop: "flightnumber"
              },
              {
                name: "Departure Time",
                prop: "departuretime"
              },
              {
                name: "Arrival Time",
                prop: "arrivaltime"
              },
              {
                name: "date",
                prop: "dates"
              },
              {
                name: "Economy Seats",
                prop: "economyseats"
              },
              {
                name: "Business Seats",
                prop: "businessseats"
              },
              {
                name: "Airport",
                prop: "airports"
              }
              
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  } 
}

export default App;