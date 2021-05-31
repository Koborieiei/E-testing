import DomController, * as DomControllerFunction from '../../../utils/DomController'
import Timer from '../../../utils/Timer'
import progressBar from '../../../utils/ProgressBar'
// import { returnToPreviousQuestion } from './domService'

export default class TestingPageHeader extends DomController {
 constructor({ testingInfo, totalNumberOfAnswer, totalNumberOfQuestion }) {
  super()
  this.testingInfo = testingInfo || undefined
  this.parent = parent || undefined
  this.totalNumberOfAnswer = totalNumberOfAnswer
  this.totalNumberOfQuestion = totalNumberOfQuestion || undefined

  this.questionHeaderHtmlElement = DomControllerFunction.parserHtmlTag(
   this._questionHeaderHtmlElementTag()
  )

  this._createTestingPageHeader()
 }

 _createTestingPageHeader() {
  this._appendToBody(this.questionHeaderHtmlElement)
  this.setupTestingTimeleft()
  this._setupProgressBar()
 }

 _setupProgressBar() {
  this.testingProgressBar = new progressBar({
   progressbarparent:
    this.questionHeaderHtmlElement.querySelector('#progressBar'),
   actualValue: this.totalNumberOfAnswer,
   maximumValue: this.totalNumberOfQuestion,
  })

  this.testingProgressBar._setInitiatedProgressBarValue()
 }

 setupTestingTimeleft() {
//   console.log(this.testingInfo.timeleft);
  this.testingTimeleft = new Timer({
   duration: this.testingInfo.timeleft,
   display: this.questionHeaderHtmlElement.querySelector('#timer'),
  })
  this.testingTimeleft._setTimeCountdownText()
 }

 _setTimeCountdown() {
  if (this.testingTimeleft.duration != undefined) {
   this._startTimer(this.timerText)
  }
 }

 _questionSecondTextHeader(message) {
    return message.replace(/ /g, '') == `PRE-TEST`
     ? `แบบทดสอบก่อนเรียน`
     : `แบบทดสอบหลังเรียน`
   }
  
 get getTotalAnswerHtmlElement() {
  return this.questionHeaderHtmlElement.querySelector('#counterNumber')
 }

 get getTotalQuestionNumberHtmlElement() {
  return this.questionHeaderHtmlElement.querySelector('#totalQuestionNumber')
 }

 _updateProgressBar() {
  this.testingProgressBar._updateProgressBarPerTime()
 }

 get getTotalNumberOfAnswer() {
  return this.totalNumberOfAnswer
 }

 get getTotalNumberOfQuestion() {
  return this.totalNumberOfQuestion
 }

 get getTestingPageHeaderElement() {
  return this.questionHeaderHtmlElement
 }

 get getTestingName() {
  return this.testingInfo.type.split('con')[0].toUpperCase()
 }

 _questionHeaderHtmlElementTag() {
  return `<div class="bg-white rounded py-2">
    <div class="d-flex justify-content-around flex-column ">
        <div class="d-flex justify-content-between align-items-center flex-row px-3 ">
            <div class="d-flex flex-column p-1">
                <div class="">
                    <h5 class="text-dark font-weight-bold" id='testMainTextHeader'>${
                     this.getTestingName
                    }</h5>
                    <h6 id="testSecondTextHeader">${DomControllerFunction._questionSecondTextHeader(
                     this.testingInfo.type
                    )}</h6>
                </div>
            </div>
  
            <div class="d-flex flex-column p-1">
                <div>
                    <small class="text-secondary font-weight-light">เวลาที่เหลือ</small>
                    <h5 id="timer" class="text-primary font-weight-light"></h5>
                </div>
            </div>
  
            <div class="d-flex flex-column p-1">
                <div class="d-flex flex-column">
                    <small class="text-secondary font-weight-light">จำนวนข้อ</small>
                    <div id="timeCounterParent" class="d-flex flex-row p-0 align-items-center">
                        <h4 class="text-primary font-weight-light" id="counterNumber">${
                         this.getTotalNumberOfAnswer
                        } </h4>
                        <h4 class="text-primary font-weight-light" id="totalQuestionNumber">/${
                         this.getTotalNumberOfQuestion
                        }</h4>
                    </div>
                </div>
            </div>
        </div>
        <div id="progressBar"></div>
    </div>
  </div>
        `
 }
}
