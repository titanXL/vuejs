import Vue from 'vue'
import { seedData } from './seed'

export const store = {
  state: {
    seedData
  },
  getActiveDay() {
    return this.state.seedData.find(day => day.active)
  },
  setActiveDay(dayId) {
    this.state.seedData.map(day => {
      day.id === dayId ? day.active = true : day.active = false
    })
  },
  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay()
    activeDay.events.push({details: eventDetails, edit: false})
  },
  editEvent(dayId, eventDetails) {
    this.resetEditOfAllEvents()
    const eventObj = this.getEvent(dayId, eventDetails)
    eventObj.edit = true
  },
  resetEditOfAllEvents() {
    this.state.seedData.map(dayObj => {
      dayObj.events.map(event => event.edit = false)
    })
  },
  updateEvent(dayId, originalEventDetails, newEventDetails) {
    const eventObj = this.getEvent(dayId, originalEventDetails)
    eventObj.details = newEventDetails
    eventObj.edit = false
  },
  getEvent(dayId, eventDetails) {
    const dayObj = this.state.seedData.find(day => day.id === dayId)
    return dayObj.events.find(event => event.details === eventDetails)
  },
  deleteEvent(dayId, eventDetails) {
    let dayObj = this.state.seedData.find(day => day.id === dayId)
    let eventIndex = dayObj.events.indexOf(event => event.details === eventDetails)
    dayObj.events.splice(eventIndex, 1)
  }
}
