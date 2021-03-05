export default class Timer {
 constructor({ duration, display }) {
  this.duration = parseInt(duration) || undefined
  this.display = display
  this.durationInterval = undefined
  this.durationTimeCounter = undefined
 }

 _adjustTimerDisplay() {
  this.display.textContent = `${this.getTimeToStringWithOutThai}`
 }

 _assignQuestionStartedTime() {
  this._clearInterval(this.durationInterval)
  this.durationTimer = 0
  localStorage.setItem('duration', this.durationTimer)

  this.durationInterval = setInterval(() => {
   this.durationTimer++
   localStorage.setItem('duration', this.durationTimer)
   //  console.log(localStorage.getItem('duration'))
  }, 1000)
 }

 _clearInterval() {
  clearInterval(this.durationInterval)
 }

 _setTimeCountdownText() {
  this.display.textContent = this.getTimeToStringWithOutThai
 }

 _reducingTimeLeft() {
  return this.duration--
 }

 isTimeUp() {
  return this.duration < 0
 }

 isDurationHasValue() {
  return this.duration !== undefined
 }

 get getTimeToStringWithOutThai() {
  return this.isDurationHasValue()
   ? this.getTimeStringWithOutThai
   : 'ไม่จำกัดเวลา'
 }

 get getTimeToStringWithThai() {
  return this.isDurationHasValue()
   ? this.getOnlyMinuteAndSecondString
   : 'ไม่จำกัดเวลา'
 }

 get getOnlyMinuteAndSecondString() {
  if (this.duration >= 3600) {
   return `${this.getHour} ชั่วโมง ${this.getMinutes} นาที ${this.getSecondIncludeZero} วินาที`
  }

  if (this.duration < 60) {
   return `${this.getSecondIncludeZero} วินาที`
  }

  return `${this.getMinutesIncludeZero} นาที ${this.getSecondIncludeZero} วินาที`
 }

 get getHourThaiString() {
  return `${this.getHour} ชั่วโมง`
 }

 get getHourThaiString() {
  return `${this.getMinutes} นาที`
 }

 get getSecondThaiString() {
  return `${this.getSecond} วินาที`
 }

 get getSecond() {
  return this.duration === null ? null : parseInt(this.duration % 60, 10)
 }

 get getMinutes() {
  return this.duration === null ? null : parseInt((this.duration / 60) % 60, 10)
 }

 get getHour() {
  return this.duration === null
   ? null
   : parseInt((this.duration / 3600) % 24, 10)
  //   return `${this._getMinutesIncludeZero()} นาที ${this._getSecondIncludeZero()} วินาที`
 }
 get getHourIncludeZero() {
  return this.getHour < 10 ? `0${this.getHour}` : this.getHour
 }
 get getMinutesIncludeZero() {
  return this.getMinutes < 10 ? `0${this.getMinutes}` : this.getMinutes
 }
 get getSecondIncludeZero() {
  return this.getSecond < 10 ? `0${this.getSecond}` : this.getSecond
 }

 get getTimeStringWithThai() {
  return `${this.getHour} ชั่วโมง ${this.getMinutes} นาที `
 }
 get getTimeStringWithOutThai() {
  return `${this.getHourIncludeZero}:${this.getMinutesIncludeZero}:${this.getSecondIncludeZero}`
 }

 get getTimeStringMinutes() {
  return `${this.getMinutes} นาที`
 }
}
