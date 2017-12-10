/**
 * Flight.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  flights : ['UK0726','UK0810','UK0812','UK0879','UK0856'],

  attributes: {

    flight_name: {
      type: 'string',
      unique: true,
      required: true,
    },
    departure_coords: {
      type: 'string',
    },
    departure_location: {
      type: 'string',
    },
    // departure_gate_time_scheduled: {
    //   type: 'string',
    // },
    // departure_gate_time_actual: {
    //   type: 'string',
    // },
    departure_takeoff_time_scheduled: {
      type: 'string',
    },
    // departure_takeoff_time_actual: {
    //   type: 'string',
    // },
    // departure_taxiing_time: {
    //   type: 'string',
    // },
    arrival_coords: {
      type: 'string',
    },
    // arrival_gate_time_scheduled: {
    //   type: 'string',
    // },
    // arrival_gate_time_actual: {
    //   type: 'string',
    // },
    // arrival_takeoff_time_scheduled: {
    //   type: 'string',
    // },
    arrival_takeoff_time_actual: {
      type: 'string',
    },
    // arrival_taxiing_time: {
    //   type: 'string',
    // },
    aircraft_info: {
      type: 'string',
    },
  }
};

