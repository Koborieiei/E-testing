// import AlertModal from '../../../js/class/alertmodal'
import ShowProgressBar from '../../../js/class/progressbar.class'
import HtmlElementClass from '../../../js/class/htmlelementclass'
// import Apiservice from '../../../js/class/services'

export default class runResultPage extends HtmlElementClass {
 constructor() {
  super()
  this.testingResult = undefined
  this.timeConsuming = undefined
  this.testingPoint = undefined
  this.testedSkills = undefined
  this.questionHeaderNode = undefined

  this._render()
 }

 // numberofanswer with total questions

 _render() {
  try {
   //  this._sendResultRequest()
   //    console.log('test')

   this._storeTestingResult()

   //  this.testingResult
   console.log(
    localStorage.getItem('progressbarvalue'),
    localStorage.getItem('totalquestionnumber')
   )
   // .then(() => {
   this._setPageHeader()
   this._setupProgressbar()

   this.progressBar._setInitiatedProgressBarValue()
   //    console.log(document.querySelector('#progressBar'))

   this._setPageBody()
   this._setPageDisplaySkills()
   // })
   // .then(() => {
   this._setPageButtonContainer()
   //    this._clearAllLocalStorage()
   // })
  } catch (error) {
   this._appAppendChild(this._generateDisplayErrorHandle())
  }
 }

 _setPageHeader() {
  this.questionHeaderNode = this._generateQuestionHeader()
  this._setTimerText()
  this._setTotalAnswerText()

  return this._appAppendChild(this.questionHeaderNode)
 }

 _setupProgressbar() {
  this.progressBar = new ShowProgressBar({
   progressbarparent: '#progressBar',
   //    not sure whether may count total of question or answers??
   actualValue: this._getTestingTotalQuestion(),
   maximumValue: this._getTotalOfQuestionNumber(),
  })
  this.progressBar.currentValueOfProgressBar = this._getCurrentProgressbar()
 }

 _getCurrentProgressbar() {
  return parseInt(localStorage.getItem('progressbarvalue'))
 }

 _getTotalOfQuestionNumber() {
  return parseInt(localStorage.getItem('totalquestionnumber'))
 }

 _getTimerElement() {
  return this.questionHeaderNode.querySelector('#timer')
 }

 _getTotalAnswerElement() {
  return this.questionHeaderNode.querySelector('#counterNumber')
 }
 _setTimerText() {
  var minutes = parseInt((this._getTimeLeft() / 60) % 60, 10),
   hour = parseInt((this._getTimeLeft() / 3600) % 24, 10),
   seconds = parseInt(this._getTimeLeft() % 60, 10)
  hour = hour < 10 ? '0' + hour : hour
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  this._getTimerElement().textContent = `${hour}:${minutes}:${seconds}`
 }

 _setTotalAnswerText() {
  //   Waiting to change
  this._getTotalAnswerElement().textContent = `${this._getTestingTotalQuestion()}/${this._getTotalOfQuestionNumber()}`
 }

 _setPageBody() {
  var minutes = parseInt((this._getTimeConsuming() / 60) % 60, 10),
   hour = parseInt((this._getTimeConsuming() / 3600) % 24, 10)
  const resultPageBody = this._generateResultBody()
  resultPageBody.querySelector(
   '#timeSpending'
  ).textContent = `${hour} ชั่วโมง ${minutes} นาที`

  resultPageBody.querySelector('#displayPoint').textContent =
   `${this._getTestingPoint()} คะแนน` || 'ไม่พบคะแนน'

  return this._appAppendChild(resultPageBody)
 }

 _getTimeLeft() {
  console.log(localStorage.getItem('timeleft'))
  return localStorage.getItem('timeleft')
 }

 _setPageDisplaySkills() {
  const displayTestSkillsNode = this._generateResultSkillDisplay()
  const skillBadgeParent = displayTestSkillsNode.querySelector('#displaySkills')

  this._setSkillBadgeParents(skillBadgeParent)
  return this._appAppendChild(displayTestSkillsNode)
 }

 _setSkillBadgeParents(skillbadgeparent) {
  //   this.testedSkills.map((skill) => {
  //    const skillBadge = this._generateNewSkillBadge()
  //    skillBadge.textContent = skill.skillname
  //    skillbadgeparent.appendChild(skillBadge)
  //   })
 }

 _setPageButtonContainer() {
  const resultButtonContainer = this._generateResultPageButtonContainer()
  this._setupRetestButton()
  this._setRedirectToDashboardButton()
  return this._appAppendChild(resultButtonContainer)
 }

 _storeTestingResult() {
  const queryString = window.location.search.split('?')[1]
  this.testingResult = JSON.parse(decodeURIComponent(queryString))
  console.log(this.testingResult)
 }

 _setupRetestButton() {
  this.retestButton.button.addEventListener('click', (e) => {
   e.preventDefault()
   const retestingConfirm = new this.confirmModal({
    headerText: 'ยืนยัน',
    ModalContent: 'Would u like to retest again ?',
   })
   retestingConfirm.trueButton.addEventListener('click', (e) => {
    window.location.href = '../'
   })
  })
 }

 _setRedirectToDashboardButton() {
  this.dashboardButton.button.addEventListener('click', () => {
   const returnToDashboardConfirm = new this.confirmModal({
    headerText: 'ยืนยัน',
    ModalContent: 'Would u like to back to dashboard ?',
   })
   returnToDashboardConfirm.trueButton.addEventListener('click', (e) => {
    //  Wait to send request to dash board
    window.location.href = '../'
   })
  })
 }

 _getTestingPoint() {
  return this.testingResult.result.point
 }

 _getTestingTotalQuestion() {
  return this.testingResult.result.total
 }

 _getTimeConsuming() {
  return this.testingResult.result.timeused
 }

 _throwNewError() {
  throw 'ss'
 }
 _clearAllLocalStorage() {
  localStorage.clear()
 }
}
