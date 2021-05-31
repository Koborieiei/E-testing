import DomController, * as DomControllerFunction from '../../../utils/DomController'
import * as DomService from '../js/domService'
import * as modalAlert from '../../../utils/ModalAlert'
import * as beforeUnloadEvent from '../js/beforeUnloadEvent'
import Questionselector from './QuestionSelector'
import TestingItem from './Testingitem'
import ConfirmModal from '../../../utils/ConfirmModal'
import Apiservice from '../../../utils/services'

export default class QuestionSection extends DomController {
 constructor({ recentQuestion, submitResultObject }) {
  super()
  this.submitResultObject = submitResultObject
  this.recentQuestion = parseInt(recentQuestion) || undefined
  this.questionSectionElement = DomControllerFunction.parserHtmlTag(
   this.questionSectionHtmlElement()
  )
  this.createQuestionSection()
 }

 createQuestionSection() {
  if (this.isQuestionEmpty()) {
   throw new Error('Question has not found')
  }
  beforeUnloadEvent._addWindowBeforeUnloadEvent()
  this._appendToBody(this.questionSectionElement)
  this.generateQuestion()
  this.createQuestionSelector()
  this.setupButtonController()
 }
 isQuestionEmpty() {
  return this.submitResultObject.availableQuestion.length === 0
 }

 generateQuestion() {
  // console.log(this.submitResultObject.availableQuestion)

  this.submitResultObject.availableQuestion.map((individualQuestion, index) => {
   new TestingItem({
    directionText: individualQuestion.question,
    itemChoices: individualQuestion.answers,
    questionNumber: individualQuestion.index,
    body: this.questionSectionElement.querySelector('#question'),
    answered: this.submitResultObject,
    answeredId: individualQuestion.answeredid,
    correctAnswer: individualQuestion.correct_answerid,
    questionId: individualQuestion.question_id,
    category: individualQuestion.category,
   })
  })
  DomService.activeRecentQuestion(this.recentQuestion)
 }

 createQuestionSelector() {
  this.questionSelection = new Questionselector({
   questions: this.submitResultObject.availableQuestion,
   parent: this.questionSectionElement.querySelector('#questionSelector'),
   recentQuestion: this.recentQuestion,
  })
 }

 _setNextButtonFunction() {
  this.nextButtonElement.addEventListener('click', () => {
   if (
    DomService.isTestingFinished(
     this.submitResultObject.availableQuestion.length,
     this.submitResultObject.totalNumberOfAnswer
    )
   ) {
    this._showTestConfirmModal()
   }
   DomService.turnToNextQuestion()
  })
 }

 setupButtonController() {
  this._setNextButtonFunction()
  this._setBackButtonFunction()
 }

 _setBackButtonFunction() {
  this.backButtonElement.addEventListener('click', () => {
   DomService.returnToPreviousQuestion()
  })
 }

 //  action
 _showTestConfirmModal() {
  const confirmModal = new ConfirmModal({
   headerText: 'ยืนยัน',
   ModalContent: 'คุณต้องการส่งคำตอบทั้งหมด',
  })

  confirmModal.trueButton.addEventListener('click', (e) => {
   this._submitTestingResult()
   confirmModal._destroy()
  })
 }

 async _submitTestingResult() {
  try {
   const resp = await new Apiservice()._reqToSendTotalResult(
    this.submitResultObject.answerObject
   )
   modalAlert.showModalSuccess()
   this._redirectToResultPage(resp)
  } catch (error) {
   modalAlert.throwNewErrorModal()
  }
 }

 //  action result
 _redirectToResultPage(data) {
  //  unload event listener

  beforeUnloadEvent._removeBeforeUnLoadEventListener()
  // console.log(this.submitResultObject.availableQuestion)
  const transferObject = {
   result: data.result,
   skill: data.skill,
   testingid: parseInt(data.testingid),
   timeleft: localStorage.getItem('timeleft'),
   answernumber: Number(document.querySelector('#counterNumber').textContent),
   typetext: `${document.querySelector('#testMainTextHeader').textContent} con`,
   timelimitleft: data.timelimitleft,
  }
  // function uri encode
  const jsonEncodeToUri = encodeURIComponent(JSON.stringify(transferObject))
  setTimeout(() => {
   window.location.assign(`../showresult?${jsonEncodeToUri}`)
  }, 1000)

  // console.log(transferObject)
 }

 get backButtonElement() {
  return this.questionSectionElement.querySelector('#backButton')
 }
 get nextButtonElement() {
  return this.questionSectionElement.querySelector('#nextButton')
 }

 questionSectionHtmlElement() {
  return `
    <div id="contentBody" class="row m-0 flex-row-reverse justify-content-between mt-4">
      <div  class="d-flex flex-column my-3 col-lg-3 col-sm-12 p-0" >
          <div class="bg-white py-2 px-3 rounded" id="questionSelector">
              <div class='my-3 '>
                  <h6 class='text-dark'>ตัวเลือกคำถาม</h6>
              </div>
          </div>
      </div>
      <div id='question' class="my-2 col-lg-8 col-sm-12 p-0 pr-2"></div>
      <div id="buttonContainer" class="w-100 d-flex flex-row m-0 mb-5 mt-3 justify-content-between">
       <button id='backButton' class="col-5 btn btn-lg btn-primary text-center" type="button">ย้อนกลับ</button>
       <button id='nextButton' class="col-5 btn btn-lg btn-primary  text-center" type="button">ถัดไป</button>
    </div>
    </div>
    
  `
 }
}
