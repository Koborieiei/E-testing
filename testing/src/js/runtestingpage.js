import Apiservice from '../../../utils/services'
import * as DomService from './domService'
import QuestionSection from '../components/QuestionSection'
import TestingPageHeader from '../components/TestingPageHeader'
import AnswerObject from './AnswerObject'
import ConfirmModal from '../../../utils/ConfirmModal'

export default class runTestingPageClass {
 constructor() {
  this.submitResultObject = undefined
  this.testingId = undefined

  this._runTestingPage()
 }

 async _runTestingPage() {
  try {
   this.availableQuestion = await this._storeAvailableQuestion()
   this.testingId = this.availableQuestion.testinginfo.id
   this._setupAnswerObject()
   this._setupTestingPageHeader()
   this._setupQuestionSection()
   this._setTimeCountdown()

   this._bindCounterNumber()
  } catch (error) {
   this._displayErrorPage()
  }
 }

 //  mutation function
 _bindCounterNumber() {
  const counterNumberNode = this.testingPageHeader.getTotalAnswerHtmlElement
  const observerOptions = {
   childList: true,
   attributes: true,
   subtree: true,
  }
  this._callOutCounterObserver().observe(counterNumberNode, observerOptions)
 }

 //  mutation function
 _callOutCounterObserver() {
  const totalAvailableQuestion = this.submitResultObject.availableQuestion
   .length
  return new MutationObserver(() => {
   const totalNumberOfAnswer = this.submitResultObject.totalNumberOfAnswer
   this.testingPageHeader._updateProgressBar()

   if (
    DomService.isTestingFinished(totalAvailableQuestion, totalNumberOfAnswer)
   ) {
    DomService.changButtonSuccessText()
   }
  })
 }

 _setTimeCountdown() {
  if (this.testingPageHeader.testingTimeleft.isDurationHasValue()) {
   this.countDownInterval = setInterval(() => {
    this.testingPageHeader.testingTimeleft._adjustTimerDisplay()
    this._updateUserCountDownTime(
     this.testingPageHeader.testingTimeleft.getSecondIncludeZero
    )

    this.testingPageHeader.testingTimeleft._reducingTimeLeft()
    this._checkCountDownTime()
   }, 1000)
  }
 }

 // validate time up
 _checkCountDownTime() {
  if (this.testingPageHeader.testingTimeleft.isTimeUp()) {
   this._alertTimeOutModal()
   clearInterval(this.countDownInterval)
  }
 }

 _updateUserCountDownTime(seconds) {
  if (parseInt(seconds) < 1) {
   this._updateUserLog()
  }
 }

 async _updateUserLog() {
  try {
   const respUpdateUserTimeLeft = await new Apiservice()._reqToUpdateUserTime(
    this.testingPageHeader.testingTimeleft.duration,
    this.testingId
   )
   return respUpdateUserTimeLeft
  } catch (error) {
   console.log(error)
  }
 }

 //  Setter
 async _storeAvailableQuestion() {
  const testingRequestData = this._getTestingRequestData()
  return await new Apiservice()._getQuestionObjects(testingRequestData)
 }

 //  apiservice //  Getter
 _getTestingRequestData() {
  const queryString = window.location.search.split('?')[1]
  const testingRequestData = JSON.parse(decodeURIComponent(queryString))
  return testingRequestData
 }

 //  Functional
 _alertTimeOutModal() {
  const timeOutTime = new ConfirmModal({
   trueButtonText: 'ส่งคำตอบ',
   headerText: 'การแจ้งเตือน',
   ModalContent: 'หมดเวลาการทดสอบแล้ว',
   backdrop: true,
  })
  timeOutTime.falseButton.remove()
  timeOutTime.body.classList = `grey lighten-4 modal-body rounded mt-4 text-center`

  timeOutTime.trueButton.parentNode.classList.add('m-auto')
  timeOutTime.trueButton.addEventListener('click', () => {
   this.questionSection._submitTestingResult()
  })
 }

 _setupQuestionSection() {
  this.questionSection = new QuestionSection({
   submitResultObject: this.submitResultObject,
   recentQuestion: this.availableQuestion.testinginfo.recentquestion,
  })
 }

 _setupTestingPageHeader() {
  this.testingPageHeader = new TestingPageHeader({
   testingInfo: this.availableQuestion.testinginfo,
   totalNumberOfAnswer: this.submitResultObject.totalNumberOfAnswer,
   totalNumberOfQuestion: this.availableQuestion.results.length,
  })
 }

 _setupAnswerObject() {
  this.submitResultObject = new AnswerObject({
   availableQuestion: this.availableQuestion.results,
   recentquestion: this.availableQuestion.testinginfo.recentquestion,
   testingid: this.availableQuestion.testinginfo.id,
  })
 }

 _displayErrorPage(error) {
  document.getElementById(
   'app'
  ).innerHTML = `<div class="text-center mt-5"> <h3>ขออภัย... </h4>
         msg: ${error}
         <div> ขณะนี้ระบบเกิดข้อผิดพลาด กรุณารอสักครู่ หรือ ทำการติดต่อเจ้าหน้าที่ </div>
         </div>
         `
 }
}
