// External variables
const express = require("express");
const mongoose = require('mongoose');
const MongoURI = 'mongodb+srv://dbUser:dbPassword@milestone2.y9ftu.mongodb.net/Milestone2?retryWrites=true&w=majority';

// App variables  
const app = express();
const port = process.env.PORT || "8000";
const Users = require('./Models/User');
const Admins = require('./Models/Admin');
const Flights = require('./Models/Flight');
const Reservations = require('./Models/Reservation');
const Reservation = require("./Models/Reservation");


var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// const nodemailer = require('nodemailer')

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

app.get("/addFlight", async (req, res) => {

  const flight = new Flights({
    FlightNumber: 1234,
    Cabin: "Economy",
    DepartureTime: "11:30",
    ArrivalTime: "12:30",
    DepartureDate: "1/1",
    ArrivalDate: "2/1",
    EconomySeats: 2,
    BusinessClassSeats: 2,
    FirstClassSeats: 2,
    Airport: "LAX",
    Cost: 5,
    DepartureAirport: "EGYPT",
    ArrivalAirport: "usa"
  })

  await flight.save().then(console.log("Flight Inserted."));
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
app.get('/viewFlightByFlightNumber/:id/:flightNumber', async (req, res) => {
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

//Requirement ID: 17
app.get('/viewSummary', async (req, res) => {
  let searchDeparture = await Flights.find({ FlightNumber: req.params.departureFlightNumber });
  let searchReservationDeparture = await Reservations.find({ FlightNumber: req.params.departureFlightNumber });
  let searchArrival = await Flights.find({ FlightNumber: req.params.arrivalFlightNumber });
  let searchReservationArrival = await Flights.find({ FlightNumber: req.params.departureFlightNumber });
  if (searchDeparture == null || searchReservationDeparture) console.log('Flight not found!');
  else {
    res.write(searchDeparture);
    res.write("");
    res.write(searchReservationDeparture.Cabin, ", ", searchReservationDeparture.SeatNumber, ", ", searchReservationDeparture.FlightCost);
    res.end();
  }
  if (searchArrival == null || searchReservationArrival) console.log('Flight not found!');
  else {
    res.write(searchArrival);
    res.write("");
    res.write(searchReservationArrival.Cabin, ", ", searchReservationArrival.SeatNumber, ", ", searchReservationArrival.FlightCost);
    res.end();
  }
});

//Requirement ID: 20
app.put('/reserveSeatDeparture', async (req, res) => {
  var update;
  var update2;
  if (req.body.cabin.equals("Economy"))
    if (await Flights.find({ FlightNumber: req.body.flightNumber }).EconomySeats > 0) {
      update = await Flights.findOneAndUpdate({ FlightNumber: req.body.flightNumber }, { $inc: { EconomySeats: -1 } }, { new: true })
      update2 = await Reservations.findOneAndUpdate({ FlightNumber: req.body.flightNumber, PassportNumber: req.body.passportNumber }, { Cabin: "Economy", SeatNumber: update.EconomySeats }, { new: true })
    }
  if (req.body.cabin.equals("Business"))
    if (await Flights.find({ FlightNumber: req.body.flightNumber }).BusinessClassSeats > 0) {
      update = await Flights.findOneAndUpdate({ FlightNumber: req.body.flightNumber }, { $inc: { BusinessClassSeats: -1 } }, { new: true })
      update2 = await Reservations.findOneAndUpdate({ FlightNumber: req.body.flightNumber, PassportNumber: req.body.passportNumber }, { Cabin: "Business", SeatNumber: update.EconomySeats }, { new: true })
    }
  if (update.length == 0 || update2.length == 0) console.log('Update Failed!');
  else console.log("Updated reservation for flight :", update.FlightNumber);
})

//Requirement ID: 22
app.put('/reserveSeatArrival', async (req, res) => {
  var update;
  var update2;
  if (req.params.cabin.equals("Economy"))
    if (await Flights.find({ FlightNumber: req.params.flightNumber }).EconomySeats > 0) {
      update = await Flights.findOneAndUpdate({ FlightNumber: req.params.flightNumber }, { $inc: { EconomySeats: -1 } }, { new: true })
      update2 = await Reservations.findOneAndUpdate({ FlightNumber: req.params.flightNumber, PassportNumber: req.body.passportNumber }, { Cabin: "Economy", SeatNumber: update.EconomySeats }, { new: true })
    }
  if (req.params.cabin.equals("Business"))
    if (await Flights.find({ FlightNumber: req.params.flightNumber }).BusinessClassSeats > 0) {
      update = await Flights.findOneAndUpdate({ FlightNumber: req.params.flightNumber }, { $inc: { BusinessClassSeats: -1 } }, { new: true })
      update2 = await Reservations.findOneAndUpdate({ FlightNumber: req.params.flightNumber, PassportNumber: req.body.passportNumber }, { Cabin: "Business", SeatNumber: update.EconomySeats }, { new: true })
    }
  if (update.length == 0 || update2.length == 0) console.log('Update Failed!');
  else console.log("Updated reservation for flight :", update.FlightNumber);
})

//Requirement ID: 26
app.get('/viewReservedFlights', async (req, res) => {
  let search = await Reservations.find({ PassportNumber: req.params.passportNumber })
  if (search == null) console.log('Reservations not found!');
  res.send(search);
});

//Requirement ID: 27
app.delete('/deleteReservedFlight', async (req, res) => {
  Reservations.findOneAndRemove({ PassportNumber: req.params.passportNumber, FlightNumber: req.params.flightNumber }, function (err, docs) {
    if (err) console.log(err)
    else {
      console.log("Cancelled reservation : ", docs);
      // EXECUTE FRONT-END EMAIL FUNCTION
    }
  })
})

//Requirement ID: 29
app.put('/updateDetails', async (req, res) => {
  let update = await Users.findOneAndUpdate({ PassportNumber: req.params.passportNumber }, { FirstName: req.params.firstName, LastName: req.params.lastName, Age: req.params.age, HomeAddress: req.params.address, CountryCode: req.params.code, PhoneNumber: req.params.number, Email: req.params.email, PassportNumber: req.params.passportNumber }, { new: true })
  if (update.length == 0) console.log('Update Failed!');
  else console.log("Updated user :", update.firstName, " ", update.lastName)
})

//Requirement ID: 1, 1.1, 1.2, 1.3
var crypto = require('crypto');

app.get("/signUp", async (req, res, next) => {

  const user = new Users({
    FirstName: req.body.first,
    LastName: req.body.last,
    HomeAddress: req.body.home,
    CountryCode: req.body.country,
    PhoneNumber: req.body.phone,
    Email: req.body.email,
    PassportNumber: req.body.passport,
    Username: req.body.username,
    Password: req.body.password
  })

  var hash = crypto.createHash('md5').update(req.body.password).digest('hex');

  user.Password = hash;

  await user.save().then(console.log("User Inserted."));
});

//Requirement ID: 34
app.get('/viewFlightByDepartureDateAndCabin', async (req, res) => {
  let search = await Flights.find({ DepartureDate: req.body.date, Cabin: req.body.cabin })
  if (search == null) console.log('Flight not found!')
  else
    res.send(search);
});

//Requirement ID: 35, 47
app.get('/searchDepartureOrArrival', async (req, res) => {
  let search = await Flights.find({ FlightNumber: req.body.flightnum, DepartureTime: req.body.deptime, ArrivalTime: req.body.arrtime, TripDuration: req.body.duration })
  if (search == null) console.log('Flight not found!')
  else
    res.send(search);
});

//Requirement ID: 46
app.get('/viewFlightByArrivalDateAndCabin', async (req, res) => {
  let search = await Flights.find({ ArrivalDate: req.body.date, Cabin: req.body.cabin })
  if (search == null) console.log('Flight not found!')
  else
    res.send(search);
});

//////////////////////////////////////////////////////////////////////////////////

// Maged Wael - 43-14104

//Requirement ID: 6
app.get('/viewFlight/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {
    let schedule = Flights.get();
    res.send(schedule);
  }
});

//Requirement ID: 7
app.post('updateFlightByID/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {

    const y = req.body.flightID;
    const x = await Flights.findOneAndUpdate({ FlightNumber: y }, { FlightNumber: req.body.flightnumber }, { new: true });
    res.send(x);
  }
})

app.post('updateFlightByEconSeats/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {

    const y = req.body.flightID;
    const x = await Flights.findOneAndUpdate({ FlightNumber: y }, { EconomySeats: req.body.economySeats }, { new: true });
    res.send(x);
  }
})

app.post('updateFlightByBussSeats/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {

    const y = req.body.flightID;
    const x = await Flights.findOneAndUpdate({ FlightNumber: y }, { BusinessClassSeats: req.body.businessClassSeats }, { new: true });
    res.send(x);
  }
})

app.post('updateFlightByDeptTime/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {

    const y = req.body.flightID;
    const x = await Flights.findOneAndUpdate({ FlightNumber: y }, { DepartureTime: req.body.departureTime }, { new: true });
    res.send(x);
  }
})

app.post('updateFlightByArrivalTime/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {

    const y = req.body.flightID;
    const x = await Flights.findOneAndUpdate({ FlightNumber: y }, { ArrivalTime: req.body.arrivalTime }, { new: true });
    res.send(x);
  }
})

app.post('updateFlightByDeptDate/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {

    const y = req.body.flightID;
    const x = await Flights.findOneAndUpdate({ FlightNumber: y }, { DepartureDate: req.body.departureDate }, { new: true });
    res.send(x);
  }
})

app.post('updateFlightByArrivalDate/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {

    const y = req.body.flightID;
    const x = await Flights.findOneAndUpdate({ FlightNumber: y }, { ArrivalDate: req.body.arrivalDate }, { new: true });
    res.send(x);
  }
})

app.post('updateFlightByAirport/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {

    const y = req.body.flightID;
    const x = await Flights.findOneAndUpdate({ FlightNumber: y }, { Airport: req.body.airport }, { new: true });
    res.send(x);
  }
})

//Requirement ID: 8
app.post('deleteFlightByID/:id', async (req, res) => {
  let search = await Admins.find({ AdminId: req.params.id })
  if (search == null) console.log('This user is not an admin!')
  else {
    const y = req.body.flightID;

    // DialogResult dialog = MessageBox.Show("Are you sure you want to delete this flight and all its details?", "Exit", MessageBoxButtons.YesNo); 
    // if(dialog == DialogResult.Yes)
    // {
    //     //delete the flight;
    //     const x= await Flights.deleteOne({FightNumber: y});
    // }
    // else if (dialog == DialogResult.No)
    // {
    //       e.Cancel = true;}

    //res.send(x);
  }
})

//SPRINT 3

//Requirment ID: 2,2.1

app.get('/signin',async(req,res)=>{
    let x = await Users.find({Username:req.body.Username, Password: req.body.password})
   

    if(search==null){
      Console.log("username or password are invalid, try again.")
    }
    else{
      window.location.replace("http://localhost:8000/ChooseFlight")
    }
})

//Requirement ID: 30

app.post('/changePasswordByID/:id',async(req,res)=>{
  let search =await Users.find({PassportNumber: req.params.id})
  if(search== null){
    console.log("this user doesnt exist")
  }
  else{
    search.password== req.body.newPassword
  }

})

//Requiremnet ID: 32

app.post('/changeSeatInDeptFlight/:id',async(req,res)=>{
  let search = await Reservation.find({PassportNumber: req.params.id, FlightNumber: req.body.flightnumber})
  if(search==null){
    console.log("This reservation doesn't exist")
  }
  else{
    search.SeatNumber=req.body.newseatnumber
    console.log("seat has been changed")
  }

})

//Requirment ID: 37
app.get('/departureDepartureFlightDeatails/:id',async(req,res)=>{
    let search = await Flights.find({FlightNumber: req.params.id})
    if(search==null)
      console.log("error 404")
    else{
      res.send(search.FlightNumber,search.Cabin,search.DepartureTime,search.ArrivalTime,search.Duration,search.Baggage)
    }
})

//Requiremnet ID: 39
app.get('/departureSeatsConffirm/:cabin',async(req,res)=>{
  let search= await Flights.find({FlightNUmber:req.body.flightnumber, Cabin: req.params.cabin})
  if(serach==null){
    console.log("this flight is not found")
  }
  else if( search.full){
    console.log("this flight is full")
  }
  else{
    window.replace.location('/')
  }

})

//Requiremnet ID: 44

app.post('/changeSeatInArrivFlight/:id',async(req,res)=>{
  let search = await Reservation.find({PassportNumber: req.params.id, FlightNumber: req.body.flightnumber})
  if(search==null){
    console.log("This reservation doesn't exist")
  }
  else{
    search.SeatNumber=req.body.newseatnumber
    console.log("seat has been changed")
  }

})

//Requirment ID: 49
app.get('/departureArrivalFlightDeatails/:id',async(req,res)=>{
  let search = await Flights.find({FlightNumber: req.params.id})
  if(search==null)
    console.log("error 404")
  else{
    res.send(search.FlightNumber,"\n",search.Cabin,"\n",search.DepartureTime,"\n",search.ArrivalTime,"\n",search.Duration,"\n",search.Baggage)
  }
})
//Requirment ID: 51
///////////////////////////////// NOT DONE ////////////////
app.get('/returnSeatsConffirm/:cabin',async(req,res)=>{
  let search= await Flights.find({FlightNUmber:req.body.flightnumber, Cabin: req.params.cabin})
  if(serach==null){
    console.log("this flight is not found")
  }
  else if( search.full){
    console.log("this flight is full")
  }
  else{
      window.replace.location('/')
  }

})
//Requirment ID: 52
app.post('/changeSeatInArrivFlightByCabin/:id',async(req,res)=>{
  let search = await Reservation.find({PassportNumber: req.params.id, FlightNumber: req.body.flightnumber})
  if(search==null){
    console.log("This reservation doesn't exist")
  }
  else{
    let x= req.body.newCabin
    search.Cabin=x
    search.SeatNumber=req.body.newseatnumber
    console.log("seat & cabin have been changed")
  }

})
//Requirment ID: 42,54
app.get('/itinerary/:pid/:bid',async(req,res)=>{
  let search = await Reservation.find({PassportNumber: req.params.pid, BookingNumber: req.params.bid})
  let x= search.FlightNumber
  let search2 = await Flights.find({FlightNumber: x})
  if(search2==null){
    console.log("you have no flights planned")
  }
  else{
    res.send(search2.FlightNumber,"\n",search2.DepartureAirport,"\n",search2.ArrivalAirport,"\n", search2.DepartureDate,"\n", search2.AepartureTime,"\n", 
    search2.ArrivalTime,"\n", search2.Baggage,"\n", search2.Cabin, "\n", search.SeatNumber)
  }
})

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

//Requiremnt ID: 11
app.get('/searchEconomyFlights',async(req,res)=>{

  let flightx= await Flights.find({DepartureDate: req.body.DepartureDate, ArrivalDate: req.body.ArrivalDate, DepartureAirport: req.body.DepartureAirport, 
    ArrivalAirport: req.body.ArrivalAirport , Cabin: req.body.Cabin})
    if(!(flightx.equals(null))){
      if(flightx.EconomySeats>0){
        res.send(flightx)
      }
      else{
        res.send("no Seats on this flight")  
      }
    }
    else{
      res.send("no flgihts matching your inputs")
    }
  })
  /////
  
  app.get('/searchBusinessFlights',async(req,res)=>{
  
   let flightx= await Flights.find({DepartureDate: req.body.DepartureDate, ArrivalDate: req.body.ArrivalDate, DepartureAirport: req.body.DepartureAirport, 
     ArrivalAirport: req.body.ArrivalAirport , Cabin: req.body.Cabin})
     if(!(flightx.equals(null))){
       if(flightx.BusinessClassSeats>0){
         res.send(flightx)
       }
       else{
         res.send("no Seats on this flight")  
       }
     }
     else{
       res.send("no flgihts matching your inputs")
     }
   })
  /////
  
  app.get('/searchFirstFlights',async(req,res)=>{
  
  
   let flightx= await Flights.find({DepartureDate: req.body.DepartureDate, ArrivalDate: req.body.ArrivalDate, DepartureAirport: req.body.DepartureAirport, 
     ArrivalAirport: req.body.ArrivalAirport , Cabin: req.body.Cabin})
     if(!(flightx.equals(null))){
       if(flightx.FirstClassSeats>0){
         res.send(flightx)
       }
       else{
         res.send("no Seats on this flight")  
       }
     }
     else{
       res.send("no flgihts matching your inputs")
     }
   })
  //Requiremnt ID: 12,13
  app.get('/ChooseFlight',async(req,res)=>{
    let flightx= await Flights.find({FlightNumber: req.body.FlightNumber})
    
    if(flightx.equals(null)){
      res.send("invalid flight number")
      
    }
  
    else{
      res.send(flightx)
    }
  })
  /*
  //Requirment ID: 13
  app.get('/searchFlights/:FlightNumber',async(req,res)=>{
      let flightx = await Flights.find({FlightNumber:req.params.FlightNumber})
    if(flightx.equals(null)){
      res.send("the flight number is incorrect")
    }
    else{
      res.send(flightx)
    }
  })  */
  
  //Requirment ID: 14
  /* app.get('/searchReturnFlights',async(req,res)=>{
    let flightx= await Flights.find({DepartureDate: req.body.DepartureDate, ArrivalDate: req.body.ArrivalDate, DepartureAirport: req.body.DepartureAirport, 
      ArrivalAirport: req.body.ArrivalAirport , Cabin: req.body.Cabin})
      if(!(flightx.equals(null))){
        res.send(flightx)
      }
      else{
        res.send("no matching flights found")
      }
  
   })
  */
   ///////////
   app.get('/searchReturnEconomyFlights',async(req,res)=>{
  
    let flightx= await Flights.find({DepartureDate: req.body.DepartureDate, ArrivalDate: req.body.ArrivalDate, DepartureAirport: req.body.DepartureAirport, 
      ArrivalAirport: req.body.ArrivalAirport , Cabin: req.body.Cabin})
      if(!(flightx.equals(null))){
        if(flightx.EconomySeats>0){
          res.send(flightx)
        }
        else{
          res.send("no Seats on this flight")  
        }
      }
      else{
        res.send("no flgihts matching your inputs")
      }
    })
  
   app.get('/searchReturnBusinessFlights',async(req,res)=>{
  
    let flightx= await Flights.find({DepartureDate: req.body.DepartureDate, ArrivalDate: req.body.ArrivalDate, DepartureAirport: req.body.DepartureAirport, 
      ArrivalAirport: req.body.ArrivalAirport , Cabin: req.body.Cabin})
      if(!(flightx.equals(null))){
        if(flightx.BusinessClassSeats>0){
          res.send(flightx)
        }
        else{
          res.send("no Seats on this flight")  
        }
      }
      else{
        res.send("no flgihts matching your inputs")
      }
    })
    app.get('/searchReturnFirstFlights',async(req,res)=>{
  
      let flightx= await Flights.find({DepartureDate: req.body.DepartureDate, ArrivalDate: req.body.ArrivalDate, DepartureAirport: req.body.DepartureAirport, 
        ArrivalAirport: req.body.ArrivalAirport , Cabin: req.body.Cabin})
        if(!(flightx.equals(null))){
          if(flightx.FirstClassSeats>0){
            res.send(flightx)
          }
          else{
            res.send("no Seats on this flight")  
          }
        }
        else{
          res.send("no flgihts matching your inputs")
        }
      })
  
   //Requirment ID: 15,16
   app.get('/ChooseReturnFlight', async(req,res)=>{
     let flightx = await Flights.find({FlightNumber: req.body.FlightNumber})
     if (flightx.equals(null)){
       res.send("The Flight number is incorrect")
     }
     else{
       res.send(flightx)
     }
   })
  



//Requirement ID: 18


//Requirement ID: 19
app.get('/viewAvailableSeatsDepart', async (req, res) => {

  let departureFlight = await Flights.find({ FlightNumber: req.params.departureFlightNumber });

  if (req.params.cabin.equals("Economy")) {
    res.send(departureFlight.EconomySeats)
  }

  if (req.params.cabin.equals("Business")) {
    res.send(departureFlight.BusinessClassSeats)
  }


})

//Requirement ID: 21
app.get('/viewAvailableSeatsReturn', async (req, res) => {

  let returnFlight = await Flights.find({ FlightNumber: req.params.returnFlightNumber });

  if (req.params.cabin.equals("Economy")) {
    res.send(returnFlight.EconomySeats)
  }

  if (req.params.cabin.equals("Business")) {
    res.send(returnFlight.BusinessClassSeats)
  }


})

//Requirement ID: 24
app.get('/viewItinerary', async (req, res) => {
  let searchDeparture = await Flights.find({ FlightNumber: req.params.departureFlightNumber });
  let searchReservationDeparture = await Reservations.find({ FlightNumber: req.params.departureFlightNumber });
  let searchArrival = await Flights.find({ FlightNumber: req.params.arrivalFlightNumber });
  let searchReservationArrival = await Flights.find({ FlightNumber: req.params.departureFlightNumber });
  if (searchDeparture == null || searchReservationDeparture) console.log('Flight not found!');
  else {
    res.write(searchDeparture);
    res.write("");
    res.write(searchReservationDeparture.Cabin, ", ", searchReservationDeparture.SeatNumber, ", ", searchReservationDeparture.FlightCost, ",", searchReservationDeparture.departureTime, ",", searchReservationDeparture.arrivalTime, ",", searchReservationDeparture.departureDate, ",", searchReservationDeparture.ArrivalDate, ",".searchReservationDeparture.BookingNumber);
    res.end();
  }
  if (searchArrival == null || searchReservationArrival) console.log('Flight not found!');
  else {
    res.write(searchArrival);
    res.write("");
    res.write(searchReservationArrival.Cabin, ", ", searchReservationArrival.SeatNumber, ", ", searchReservationArrival.FlightCost, ",", searchReservationArrival.departureTime, ",".searchReservationArrival.arrivalTime, ",".searchReservationArrival.departureDate, ",", searchReservationArrival.arrivalDate, ",", searchReservationArrival.BookingNumber);
    res.end();
  }
});

//Requirement ID: 27.1

//Requirement ID: 28
app.post('/sendEmail', async (req,res) =>{
  let searchReservationDeparture = await Reservations.find({ FlightNumber: req.params.departureFlightNumber });
  let searchReservationArrival = await Flights.find({ FlightNumber: req.params.departureFlightNumber });
  var transporter = nodemailer.createTransport(
    {
    service: 'gmail',
    auth: {
    user: 'myemail@gmail.com',
    pass: 'password'
    }
    }
    );
  
    const mailOptions = {
      from: 'The Idea project',
      to: toAddress,
      subject: 'Your Reservation has been cancelled',
      text: "Amount Refunded" + searchReservationArrival.FlightCost + searchReservationDeparture.FlightCost
      };
transporter.sendMail(mailOptions, callback);

})


//Requirement ID: 29.1

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
