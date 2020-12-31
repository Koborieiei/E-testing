import ShowProgressBar from '../../../js/class/progressbar.class'
import Timer from '../../../js/class/Timer'
import HtmlElementClass from '../../../js/class/htmlelementclass'

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
   //    this._changeEtestingLinkToDefault()
   this._storeTestingResult()
   this._setPageHeader()
   this._setupProgressbar()

   this.progressBar._setInitiatedProgressBarValue()

   this._setPageBody()
   this._setPageDisplaySkills()

   this._setPageButtonContainer()

   console.log(this)
  } catch (error) {
   console.log(error)
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
   actualValue: this._getTestingTotalAnswered(),
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
  const timeLeftDuration = new Timer({
   duration: this._getTimeLeft(),
  })

  timeLeftDuration._getMinutesIncludeZero()
  this._getTimerElement().textContent = `${timeLeftDuration._getTimeStringWithOutThai()}`
 }

 _setTotalAnswerText() {
  this._getTotalAnswerElement().textContent = `${this._getTestingTotalAnswered()}/${this._getTotalOfQuestionNumber()}`
 }

 _setPageBody() {
  const newTimer = new Timer({
   duration: this._getTimeConsuming(),
  })

  const resultPageBody = this._generateResultBody()
  resultPageBody.querySelector(
   '#timeSpending'
  ).textContent = `${newTimer._getOnlyMinuteAndSecondString()}`

  resultPageBody.querySelector('#displayPoint').textContent =
   `${this._getTestingPoint()} คะแนน` || 'ไม่พบคะแนน'

  return this._appAppendChild(resultPageBody)
 }

 _getTimeLeft() {
  console.log(this.testingResult.result.timeleft)
  return this.testingResult.result.timeleft
 }

 _setPageDisplaySkills() {
  const displayTestSkillsNode = this._generateResultSkillDisplay()
  const skillBadgeParent = displayTestSkillsNode.querySelector('#displaySkills')

  this._setSkillBadgeParents(skillBadgeParent)
  return this._appAppendChild(displayTestSkillsNode)
 }

 _setSkillBadgeParents(skillbadgeparent) {
  const testingSkillSet = this._getTestingSkill()
  const localStorageSkillSets = this._getSkillSetsByLocalStorage()

  for (const key in testingSkillSet) {
   if (testingSkillSet[key] != undefined) {
    const skillName = localStorageSkillSets[key].skillname
    const skillPercent = testingSkillSet[key].percent.toFixed(0)
    skillbadgeparent.appendChild(
     this._generateNewSkillBadge(skillName, skillPercent)
    )
   }
  }
 }

 _generateNewSkillBadge(skillName, skillPercent) {
  const skillBadge = this._generateNewSkillBadgeElement()
  skillBadge.children[0].textContent = `${skillName}`
  skillBadge.children[1].textContent = `${skillPercent} %`
  return skillBadge
 }

 _getSkillSetsByLocalStorage() {
  const skillSets = JSON.parse(
   decodeURIComponent(localStorage.getItem('skillsets'))
  )
  return skillSets
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
  console.log(JSON.parse(decodeURIComponent(queryString)))
 }

 _setupRetestButton() {
  this.retestButton.button.addEventListener('click', (e) => {
   e.preventDefault()
   const retestingConfirm = new this.confirmModal({
    headerText: 'ยืนยัน',
    ModalContent: 'คุณต้องการทดสอบใหม่อีกครั้ง',
   })
   retestingConfirm.trueButton.addEventListener('click', () => {
    history.go(-1)
   })
  })
 }

 _setRedirectToDashboardButton() {
  this.dashboardButton.button.addEventListener('click', () => {
   const returnToDashboardConfirm = new this.confirmModal({
    headerText: 'ยืนยัน',
    ModalContent: 'คุณต้องการกลับไปหน้าแรกของ E-Testing',
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

 _getTestingTotalAnswered() {
  return this.testingResult.result.total
 }

 _getTimeConsuming() {
  return this.testingResult.result.timeused
 }

 _getTestingSkill() {
  return this.testingResult.skill
 }

 _throwNewError() {
  throw 'ss'
 }
 _clearAllLocalStorage() {
  localStorage.clear()
 }
}
