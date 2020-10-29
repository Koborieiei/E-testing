import AlertModal from '../../../js/class/alertmodal'
import HtmlElementClass from '../../../js/class/htmlelementclass'
import Apiservice from '../../../js/class/services'

export default class runResultPage extends HtmlElementClass {
 constructor() {
  super()
  this.testingResult = undefined
  this.timeConsuming = undefined
  this.testingPoint = undefined
  this.testedSkills = undefined

  this._render()
 }

 _render() {
  try {
   this._sendResultRequest()
   this._storeTestingResult()
   this.testingResult

    .then(() => {
     this._setPageHeader()
     this._setPageBody()
     this._setPageDisplaySkills()
    })
    .then(() => {
     this._setPageButtonContainer()
    })
  } catch (error) {
   console.log(error)
  }
 }

 _setPageHeader() {
  const questionHeaderNode = this._generateQuestionHeader()
  this._setTimerText(questionHeaderNode.querySelector('#timer'))
  this._setTotalAnswerText(questionHeaderNode.querySelector('#counterNumber'))

  return this._appAppendChild(questionHeaderNode)
 }

 _setTimerText(timerNodeElement) {
  timerNodeElement.textContent = '--:--'
 }

 _setTotalAnswerText(totalanswernode) {
  //   Waiting to change
  totalanswernode.textContent = '100/100'
 }

 _setPageBody() {
  const resultPageBody = this._generateResultBody()
  resultPageBody.querySelector(
   '#timeSpending'
  ).textContent = this._getTimeConsuming()
  resultPageBody.querySelector('#displayPoint').textContent =
   this._getTestingPoint() || 'ไม่พบคะแนน'

  return this._appAppendChild(resultPageBody)
 }

 _setPageDisplaySkills() {
  const displayTestSkillsNode = this._generateResultSkillDisplay()
  const skillBadgeParent = displayTestSkillsNode.querySelector('#displaySkills')

  this._setSkillBadgeParents(skillBadgeParent)
  return this._appAppendChild(displayTestSkillsNode)
 }

 _setSkillBadgeParents(skillbadgeparent) {
  this.testedSkills.map((skill) => {
   const skillBadge = this._generateNewSkillBadge()
   skillBadge.textContent = skill.skillname
   skillbadgeparent.appendChild(skillBadge)
  })
 }

 _setPageButtonContainer() {
  const resultButtonContainer = this._generateResultPageButtonContainer()
  this._setupRetestButton()
  this._setRedirectToDashboardButton()
  return this._appAppendChild(resultButtonContainer)
 }

 _sendResultRequest() {
  this.testingResult = new Apiservice()._sendRequest().then((resp) => {
   if (resp.status !== 200) {
    new AlertModal({
     alertMsg: 'Cannot connect to server, please contact us',
     type: 'error',
    })
    this._throwNewError()
   }

   return resp.json()
  })
 }
 _storeTestingResult() {
  this.testingResult.then((data) => {
   this.testingPoint = data.result.point
   this.timeConsuming = `${data.result.hours} ชั่วโมง ${data.result.minutes} นาที`
   this.testedSkills = data.skills
  })
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
  return this.testingPoint
 }

 _getTimeConsuming() {
  return this.timeConsuming
 }

 _throwNewError() {
  throw 'ss'
 }

 //   _IsRequestSuccess() {
 //     return this._sendRequest()
 //       .then((resp) => {
 //         if (resp.status !== 200) {
 //           new AlertModal({
 //             alertMsg: 'test',
 //             type: 'error',
 //           })
 //           this._throwNewError()
 //         }
 //         return resp.json()
 //       })
 //       .catch((err) => {
 //         console.log(err)
 //       })
 //   }
}
