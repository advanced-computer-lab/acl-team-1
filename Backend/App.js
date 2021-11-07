// External variables
const express = require("express");
const mongoose = require('mongoose');
const MongoURI = 'mongodb+srv://alaa:1234@cluster0.6ulyk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// App variables
const app = express();
const port = process.env.PORT || "8000";
const Users = require('./Models/User');
const Admins = require('./Models/Admin');
const Flights = require('./Models/Flight')

// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));

app.get("/Home", (req, res) => {
  res.status(200).send("You have everything installed !");
});

// Mohammad Ehab - 43-11068

//Requirement ID: 3
app.get("/addAdmin", async (req, res) => {

  const admin = new Admins({
    AdminId: 1234,
    FirstName: "Ad",
    LastName: "Min",
    PhoneNumber: "+20 01000000000",
    Email: "admin@gmail.com",
    AdminPrivileges: true
  })

  await admin.save().then(console.log("Admin Inserted."));
});

//Requirement ID: 4
app.post('/addFlight/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {
    const record = new Flights({
      FlightNumber: req.body.flightNumber,
      DepartureTime: req.body.departureTime,
      ArrivalTime: req.body.arrivalTime,
      DepartureDate: req.body.departureDate,
      ArrivalDate: req.body.arrivalDate,
      EconomySeats: req.body.economySeats,
      BusinessClassSeats: req.body.businessClassSeats,
      Airport: req.body.airport
    })
    await record.save().then(console.log("Flight Inserted."));
  }
})

//Requirement ID: 5
app.get('/viewFlightByFlightNumber/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {
    let search = await Flights.find({ FlightNumber: req.params.flightNumber })
    if (search == null) console.log('Flight not found!');
    res.send(search);
  }
});

app.get('/viewFlightByDepartureTime/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {
    let search = await Flights.find({ DepartureTime: req.params.departureTime })
    if (search == null) console.log('Flight not found!');
    res.send(search);
  }
});

app.get('/viewFlightByArrivalTime/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {
    let search = await Flights.find({ ArrivalTime: req.params.arrivalTime })
    if (search == null) console.log('Flight not found!');
    res.send(search);
  }
});

app.get('/viewFlightByDepartureDate/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {
    let search = await Flights.find({ DepartureDate: req.params.departureDate })
    if (search == null) console.log('Flight not found!');
    res.send(search);
  }
});

app.get('/viewFlightByArrivalDate/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {
    let search = await Flights.find({ ArrivalDate: req.params.arrivalDate })
    if (search == null) console.log('Flight not found!');
    res.send(search);
  }
});

app.get('/viewFlightByAirport/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {
    let search = await Flights.find({ Airport: req.params.airport })
    if (search == null) console.log('Flight not found!');
    res.send(search);
  }
});

//////////////////////////////////////////////////////////////////////////////////

// Maged Wael - 43-14104

//Requirement ID: 6
//code

//Requirement ID: 7
//code

//Requirement ID: 8
//code
//Maged add this pop up box to your deletion code to confirm that the admin wants to delete
//Add it according to what ur function does and how you want to name it, add the dialog box part

/*private void deleteFlight(obj, e)
{
	DialogResult dialog = MessageBox.Show("Are you sure you want to delete this flight and all its details?", "Exit", MessageBoxButtons.YesNo); 
	if(dialog == DialogResult.Yes)
	{
		//delete the flight;
	}
	else if (dialog == DialogResult.No)
	{
		e.Cancel = true;
	*/

//////////////////////////////////////////////////////////////////////////////////

// Malik Sohile - 43-12688

//Requirement ID: 9
//code
/*private void deleteFlight(obj, e)
{
	DialogResult dialog = MessageBox.Show("Are you sure you want to delete this flight and all its details?", "Exit", MessageBoxButtons.YesNo); 
	if(dialog == DialogResult.Yes)
	{
		//delete the flight;
	}
	else if (dialog == DialogResult.No)
	{
		e.Cancel = true;
	*/	

//Requirement ID: 10
//code

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
