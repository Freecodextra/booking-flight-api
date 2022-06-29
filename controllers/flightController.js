// ### All routes actions are contained here
const {flightBookings} = require('../models/Flight'); // import all data saved as bookings
const { v4: uuidv4 } = require('uuid');     // import uuid module for assigning id to flights

// homepage
exports.welcome = (req, res) => {
    res.send('Hey. Welcome to Zuri Airlines!');
}

// get all flights
exports.getBookings = (req, res) => {
    try {
        res.status(200).json({ success: true, data: "All bookings", bookings: flightBookings });
        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });        
    }
}


// add/book a flight
exports.bookFlight = async (req, res) => {
    try {
        let newFlight = await req.body;
        newFlight.id = uuidv4();
        newFlight.date = new Date().toLocaleDateString();
        newFlight.time = new Date().toLocaleTimeString();
        flightBookings.push(newFlight);
        res.status(201).json({ success: true, data: "Flight booked successfully!", newBooking: newFlight });        
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });        
    }
}


// get a single flight
exports.getFlight = async (req, res) => {
    try {
        let {id} = await req.params;
        let foundFlight = flightBookings.find(flight => flight.id === id);
        if(foundFlight){
            return res.status(200).json({ success: true, data: "Found flight", flight: foundFlight });        
        }
        res.status(404).json({ success: false, data: "Flight not found"})     
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });        
    }

}


// update/edit flight
exports.updateFlight = async (req, res) => {
    try {
        let flightToChange = await req.params;
        let changeDetails = await req.body;
        let foundFlight = flightBookings.find(flight => flight.id === flightToChange.id);
        if(foundFlight){
            let detailsKeys = Object.keys(changeDetails);
            detailsKeys.forEach(detail => {
                foundFlight[detail] = changeDetails[detail];
            })
            return res.status(201).json({ success: true, data: "Flight Details Changed", flight: foundFlight })
        }  
        res.status(404).json({ success: false, data: "Flight not found"})     
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });                
    }
}


// delete flight
exports.deleteFlight = async (req, res) => {
    try {
        let flightToDelete = await req.params;
        let foundFlight = flightBookings.find(flight => flight.id === flightToDelete.id);
        if (foundFlight) {
            flightBookings.splice(flightBookings.indexOf(foundFlight), 1);
            return res.status(200).json({ success: true, data: "Flight Deleted", flight: foundFlight })
        }
        res.status(404).json({ success: false, data: "Flight not found"}) 
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });                
    }    
}


