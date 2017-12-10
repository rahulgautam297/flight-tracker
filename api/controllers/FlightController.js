/**
 * FlightController
 *
 * @description :: Server-side logic for managing Flights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const request = require('request');
const cheerio = require('cheerio');
module.exports = {
  
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  // put_flight_data: function (req, res) {
  //   let flightData = [];
  //   for (i in Flight.flights) {
  //     request(`https://flightaware.com/live/flight/${Flight.flights[i]}`, (function (i) {
  //     return function (err, response, body) {
  //       if (err) { return sails.log.error(err); }
  //       const $ = cheerio.load(body);
  //       let currentFlightData = $('script').get()[51].children[0].data;
  //       currentFlightData = JSON.parse(currentFlightData.substring(25, currentFlightData.length-1));  // to Parse as JSON.
  //       currentFlightData = currentFlightData.flights[Object.keys(currentFlightData.flights)[0]].activityLog.flights["0"]; // The key changes for every flight
  //       sails.log.error(currentFlightData);
  //       // flightData.push({
  //       //   flight_name:Flight.flights[i],
  //       //   departure_cords: currentFlightData.origin.coord[1] + ',' + currentFlightData.origin.coord[0],
  //       //   departure_location: currentFlightData.origin.friendlyLocation,
  //       //   departure_takeoff_time_scheduled: currentFlightData.takeoffTimes.scheduled,
  //       //   arrival_cords: currentFlightData.destination.coord[1] + ',' + currentFlightData.origin.coord[0],
  //       //   arrival_location: currentFlightData.destination.friendlyLocation,
  //       //   arrival_takeoff_time_scheduled: currentFlightData.landingTimes.scheduled,
  //       //   aircraft_info: currentFlightData.aircraftTypeFriendly,
  //       //  })
  //     }})(i));
  //     // Flight.create({
  //     //   flight_name:Flight.flights[i],
  //     //   departure_cords: currentFlightData.origin.coord[1] + ',' + currentFlightData.origin.coord[0],
  //     //   departure_location: currentFlightData.origin.friendlyLocation,
  //     //   departure_takeoff_time_scheduled: currentFlightData.takeoffTimes.scheduled,
  //     //   arrival_cords: currentFlightData.destination.coord[1] + ',' + currentFlightData.origin.coord[0],
  //     //   arrival_location: currentFlightData.destination.friendlyLocation,
  //     //   arrival_takeoff_time_scheduled: currentFlightData.landingTimes.scheduled,
  //     //   aircraft_info: currentFlightData.aircraftTypeFriendly,

  //     // }).exec(function (error, flight){
  //     //   if (error) { return res.serverError(error); }
  //     //   return res.send('Done!');
  //     // });
  //       // $('script').map((i, el) => {
  //       //   if (i === 5) sails.log.info(_eval(el.children[0].data)); //DANGEROUS!
  //       //  });
  //       // const value = $('#flightPageTourStep1 > .flightPageSummaryAirports > .flightPageSummaryOrigin > .flightPageSummaryCity').eq(0).text();
  //       // // sails.log.error($('#flightPageTourStep1 > .flightPageSummaryAirports > .flightPageSummaryDestination > .flightPageSummaryCity > .destinationCity').eq(0).text());
  //   }
  // },

  put_flight_data: function (req, res) {
    let flightData = [];
    async.each(Flight.flights, function (flight, callback) {
      request(`https://flightaware.com/live/flight/${flight}`, function (err, response, body) {
        if (err) { return sails.log.error(err); }
        const $ = cheerio.load(body);
        let currentFlightData = $('script').get()[51].children[0].data;
        currentFlightData = JSON.parse(currentFlightData.substring(25, currentFlightData.length-1));  // to Parse as JSON.
        currentFlightData = currentFlightData.flights[Object.keys(currentFlightData.flights)[0]].activityLog.flights["0"]; // The key changes for every flight
        sails.log.error(currentFlightData);
        flightData.push({
          flight_name:flight,
          departure_cords: currentFlightData.origin.coord[1] + ',' + currentFlightData.origin.coord[0],
          departure_location: currentFlightData.origin.friendlyLocation,
          departure_takeoff_time_scheduled: currentFlightData.takeoffTimes.scheduled,
          arrival_cords: currentFlightData.destination.coord[1] + ',' + currentFlightData.origin.coord[0],
          arrival_location: currentFlightData.destination.friendlyLocation,
          arrival_takeoff_time_scheduled: currentFlightData.landingTimes.scheduled,
          aircraft_info: currentFlightData.aircraftTypeFriendly,
         })
         callback(null);
      });
    }, function () {
      async.each(flightData, function (flight, callback) {
        Flight.create(flight).exec(function (error, flight){
          if (error) { return res.serverError(error); }
        });
        callback(null);
      }, function () {
        res.send('done!');
      });
    });
  },

  get_flight_data: (req,res) => {
    Flight.findOne({flight_name: req.query.name}).exec(function (err, flight) {
      if (err) return res.serverError(err);
      if (!flight) return res.notFound('Could not find details of this flight, sorry.');
      delete flight.id;
      delete flight.createdAt;
      delete flight.updatedAt;
      return res.send(flight);
    });
  }
};