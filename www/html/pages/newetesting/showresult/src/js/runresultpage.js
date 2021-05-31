import ShowProgressBar from '../../../utils/ProgressBar'
import Timer from '../../../utils/Timer'
import HtmlElementClass from '../../../js/class/htmlelementclass'
import TestingPageHeader from '../../../testing/src/components/TestingPageHeader'

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
   //  this._setupProgressbar()

   this._setPageBody()
   this._setPageDisplaySkills()
   this._setPageButtonContainer()

   localStorage.clear()
  } catch (error) {
   console.log(error)
   this._appAppendChild(this._generateDisplayErrorHandle())
  }
 }

 _setPageHeader() {
  //  console.log(this._getTestingType);
  this.questionHeaderNode = new TestingPageHeader({
   testingInfo: {
    timeleft: this.testingResult.timeleft,
    type: this._getTestingType,
   },
   totalNumberOfAnswer: this._getTestingTotalAnswered(),
   totalNumberOfQuestion: this._getTotalOfQuestionNumber(),
  })
 }

 _setupProgressbar() {
  // console.log(this._getTotalOfQuestionNumber())
  this.progressBar = new ShowProgressBar({
   progressbarparent: '#progressBar',
   //    not sure whether may count total of question or answers??
   actualValue: this._getTestingTotalAnswered(),
   maximumValue: this._getTotalOfQuestionNumber(),
  })
  this.progressBar._setInitiatedProgressBarValue()
 }

 _setTimerText() {
  const timeLeftDuration = new Timer({
   duration: this._getTimeLeft(),
   display: this._getTimerElement(),
  })

  timeLeftDuration._adjustTimerDisplay()
 }

 _setTotalAnswerText() {
  this._getTotalAnswerElement().textContent = `${this._getTestingTotalAnswered()}/${this._getTotalOfQuestionNumber()}`
 }

 _setPageBody() {
  //   console.log(this.testingResult.totalquestion)

  const resultPageBody = this._generateResultBody()
  const timeConsuming = new Timer({
   duration: String(this._getTimeConsuming()),
   display: resultPageBody.querySelector('#timeSpending'),
  })
  timeConsuming._adjustTimerDisplay()

  resultPageBody.querySelector('#displayPoint').textContent =
   `${this._getTestingPoint()} คะแนน` || 'ไม่พบคะแนน'

  return this._appAppendChild(resultPageBody)
 }

 _setPageDisplaySkills() {
  const displayTestSkillsNode = this._generateResultSkillDisplay()
  const skillBadgeParent = displayTestSkillsNode.querySelector('#displaySkills')

  this._setSkillBadgeParents(skillBadgeParent)
  return this._appAppendChild(displayTestSkillsNode)
 }

 _setSkillBadgeParents(skillbadgeparent) {
  const testingSkillSet = this._getTestingSkill()
  // console.log(testingSkillSet)

  testingSkillSet.map((skill) =>
   skillbadgeparent.appendChild(
    this._generateNewSkillBadge(skill.skillname, skill.percent)
   )
  )
 }

 _generateNewSkillBadge(skillName, skillPercent) {
  const skillBadge = this._generateNewSkillBadgeElement()
  skillBadge.children[0].textContent = `${skillName}`
  skillBadge.children[1].textContent = `${skillPercent} %`
  return skillBadge
 }

 _setPageButtonContainer() {
  console.log(this.testingResult)

  const resultButtonContainer = this._generateResultPageButtonContainer()
  if (
   this.testingResult.timelimitleft <= 0 ||
   this._getTestingType.includes('PRE-TEST')
  ) {
   this.retestButton.disabled = true
  }

  //  this._setupRetestButton()
  //  this._setRedirectToDashboardButton()
  return this._appAppendChild(resultButtonContainer)
 }

 _storeTestingResult() {
  const queryString = window.location.search.split('?')[1]
  this.testingResult = JSON.parse(decodeURIComponent(queryString))
  // console.log(JSON.parse(decodeURIComponent(queryString)))
  // console.log(this.testingResult)
 }

 //  _setupRetestButton() {
 //   this.retestButton.button.addEventListener('click', (e) => {
 //    e.preventDefault()
 //    const retestingConfirm = new this.confirmModal({
 //     headerText: 'ยืนยัน',
 //     ModalContent: 'คุณต้องการทดสอบใหม่อีกครั้ง',
 //    })
 //    retestingConfirm.trueButton.addEventListener('click', () => {
 //     history.go(-1)
 //    })
 //   })
 //  }

 //  _setRedirectToDashboardButton() {
 //   this.dashboardButton.button.addEventListener('click', () => {
 //    const returnToDashboardConfirm = new this.confirmModal({
 //     headerText: 'ยืนยัน',
 //     ModalContent: 'คุณต้องการกลับไปหน้าแรกของ E-Testing',
 //    })
 //    returnToDashboardConfirm.trueButton.addEventListener('click', (e) => {
 //     //  Wait to send request to dash board
 //     window.location.href = '../'
 //    })
 //   })
 //  }

 _getTimerElement() {
  return this.questionHeaderNode.querySelector('#timer')
 }

 _getTotalAnswerElement() {
  return this.questionHeaderNode.querySelector('#counterNumber')
 }

 _getTestingPoint() {
  return this.testingResult.result.point
 }

 _getTotalOfQuestionNumber() {
  return this.testingResult.result.total
 }

 _getTestingTotalAnswered() {
  // console.log(this.testingResult.answernumber)
  return this.testingResult.answernumber
 }

 _getTimeConsuming() {
  return this.testingResult.result.timeused
 }

 _getTimeLeft() {
  return this.testingResult.result.timeleft
 }

 get _getTestingType() {
  return this.testingResult.typetext
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
