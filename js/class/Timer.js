export default class Timer {
 constructor({ duration }) {
  this.duration = duration
  this.hour = undefined
  this.minutes = undefined
  this.seconds = undefined
  this.timer = undefined
  this.string = undefined

  this._timeToString()
 }

 _timeToString() {
  this.string =
   this.duration === null ? 'ไม่จำกัดเวลา' : this._getTimeStringWithOutThai()
 }

 _getOnlyMinuteAndSecondString() {
  if (this.duration > 3600) {
   return `${this._getHour()} ชั่วโมง ${this._getMinutes()} นาที ${this._getSecondIncludeZero()} วินาที`
  }

  if (this.duration < 60) {
   return `${this._getSecondIncludeZero()} วินาที`
  }

  return `${this._getMinutesIncludeZero()} นาที ${this._getSecondIncludeZero()} วินาที`
 }

 _getHourThaiString() {
  return `${this._getHour()} ชั่วโมง`
 }

 _getHourThaiString() {
  return `${this._getMinutes()} นาที`
 }

 _getSecondThaiString() {
  return `${this._getSecond()} วินาที`
 }

 _getSecond() {
  return this.duration === null ? null : parseInt(this.duration % 60, 10)
 }

 _getMinutes() {
  return this.duration === null ? null : parseInt((this.duration / 60) % 60, 10)
 }

 _getHour() {
  return this.duration === null
   ? null
   : parseInt((this.duration / 3600) % 24, 10)
  //   return `${this._getMinutesIncludeZero()} นาที ${this._getSecondIncludeZero()} วินาที`
 }
 _getHourIncludeZero() {
  return this._getHour() < 10 ? `0${this._getHour()}` : this._getHour()
 }
 _getMinutesIncludeZero() {
  return this._getMinutes() < 10 ? `0${this._getMinutes()}` : this._getMinutes()
 }
 _getSecondIncludeZero() {
  return this._getSecond() < 10 ? `0${this._getSecond()}` : this._getSecond()
 }

 _getTimeStringWithThai() {
  return `${this._getHour()} ชั่วโมง ${this._getMinutes()} นาที `
 }
 _getTimeStringWithOutThai() {
  return `${this._getHourIncludeZero()}:${this._getMinutesIncludeZero()}:${this._getSecondIncludeZero()}`
 }

 _getTimeStringMinutes() {
  return `${this._getMinutes()} นาที`
 }

 _reducingTimeLeft() {
  return this.duration--
 }

 _adjustTimerDisplay(display) {
  display.textContent = `${this._getTimeStringWithOutThai()}`
 }
 _timeStartToConsume() {}
}
