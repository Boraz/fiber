import store from './store'
import refresh from './refresh'
import _ from 'lodash'
import geolib from 'geolib'
import $ from 'jquery'
import { NEARBY_METERS } from './constants'

//
// Action functions
//

// Action to load fiber data asynchrnously
export function loadDataAsync(){

  $.ajax('/data/boulder.json').done(function(json) {
    store.geometries = json

    let fibers = {}

    store.fibers = _.map(json, (d) => {

      const center = geolib.getCenter(d.coordinates)

      return {
        geometry: d,
        center: center
      }
    })

    refresh()
  })
}

// Action to set a position selected by the user
export function setSelectedPosition(latlng) {
  store.selectedPosition = latlng

  _.forEach(store.fibers, forEachFiberSetIsSelected)

  _.forEach(store.fibers, forEachFiberSetCost)

  refresh()
}

//
// private helper function
//

// helper to set each fiber's 'isSelected' flag based on whether this fiber is
// nearby with respect to the position selected by the user
function forEachFiberSetIsSelected(fiber){

  if(geolib.getDistance(fiber.center, store.selectedPosition) <= NEARBY_METERS)
    fiber.isSelected = true
  else
    fiber.isSelected = false
}

// helper to set the cost of connecting this fiber to the selected position
function forEachFiberSetCost(fiber){

  var fiberPosition = {
    latitude: fiber.geometry.coordinates[0][1],
    longitude: fiber.geometry.coordinates[0][0]  
  }

  fiber.distance = geolib.getDistance(store.selectedPosition, fiberPosition)
  fiber.cost = 10 * fiber.distance
}