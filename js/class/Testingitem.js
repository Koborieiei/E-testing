import { v4 as uuidv4 } from 'uuid'
import Apiservice from '../class/services'
import Choice from '../class/choice.class'

export default class Testingitem {
 constructor({
  directionText,
  itemChoices,
  questionNumber,
  body,
  answered,
  correctAnswer,
  questionId,
  answeredId,
  category,
 }) {
  this.directionText = directionText || 'lorem'
  this.itemChoices = itemChoices || null
  this.questionNumber = questionNumber || null
  this.body = body || undefined
  this.totalAnswers = answered || undefined
  this.correctAnswer = correctAnswer || undefined
  this.answeredId = answeredId || undefined
  this.questionId = questionId || undefined
  this.category = parseInt(category) || undefined
  // this.prefixSetup = 'ENG'
  // this.logs = {
  //  service: 'updateresult',
  //  recentquestion: null,
  //  timeleft: null,
  //  testingid: this.totalAnswers.testingid,
  // }
  this.choiceid = null

  // SET MAIN ELEMENT
  this.mainContainer = undefined
  this.mainBody = undefined
  this.itemContainers = undefined
  this.radioInput = undefined
  this.radioLabel = undefined
  // this.lastQuestion = undefined

  this._createQuestion()
  this._generateChoices(this.itemChoices)
  this._apppendChild()
  // this._setUpLogsRecentQuestion()
 }

 //
 _createQuestion() {
  this.mainContainer = document.createElement('div')
  this.mainBody = document.createElement('div')
  this.mainBody.classList.add('py-3', 'none')
  //
  this.mainBody.dataset.index = this.questionNumber
  this.mainBody.dataset.id = this.questionId
  this.mainContainer.appendChild(this.mainBody)

  const headerContainer = document.createElement('div')
  headerContainer.classList.add('d-flex', 'flex-row', 'text-dark')

  const directionTextTag = new DOMParser().parseFromString(
   this.directionText,
   'text/html'
  ).body.firstChild
  directionTextTag.classList.add('h2')
  directionTextTag.innerHTML = `${this.questionNumber}. ${directionTextTag.innerHTML}`
  //   directionTextTag.textContent = `${this.questionNumber}. ${directionTextTag.textContent}`

  headerContainer.appendChild(directionTextTag)
  this.mainBody.appendChild(headerContainer)
 }

 //  _generateEngChoicePrefix(choicenumber) {
 //   switch (this.choiceCounter) {
 //    case 1:
 //     return `A`
 //    case 2:
 //     return `B`
 //    case 3:
 //     return `C`
 //    case 4:
 //     return `E`
 //     break
 //   }
 //  }

 //
 _generateChoices(itemChoices) {
  this.itemContainers = document.createElement('div')
  this.itemContainers.classList.add('py-3', 'bg-light', 'd-flex', 'flex-column')
  // this.choiceCounter = 0

  itemChoices.map((choice) => {
   //  this.choiceCounter++
   //  console.log(this.answeredId)
   const newChoice = new Choice({
    id: choice.id,
    statement: choice.statment,
    questionnumber: this.questionNumber,
    // prefix: this._checkPrefix(),
    body: this.itemContainers,
    answeredId: this.answeredId,
   })

   //  this._preventChoiceCounter()
   this._setupRadioLabelEventListener(newChoice.radioLabel)
  })

  //   recentQuestion.classList.add('active')
  this.mainBody.appendChild(this.itemContainers)
 }

 //  _generateThChoicePrefix(choicenumber) {
 //   switch (this.choiceCounter) {
 //    case 1:
 //     return `ก`
 //    case 2:
 //     return `ข`
 //    case 3:
 //     return `ค`
 //    case 4:
 //     return `ง`
 //     break

 //    default:
 //     return ''
 //     break
 //   }
 //  }

 //  _checkPrefix() {
 //   if (this.prefixSetup == 'ENG') {
 //    return this._generateEngChoicePrefix()
 //   }

 //   if (this.prefixSetup == 'TH') {
 //    return this._generateThChoicePrefix()
 //   }
 //  }

 //  _preventChoiceCounter() {
 //   if (this.choiceCounter == 4) {
 //    this.choiceCounter = 0
 //   }
 //  }

 _setupRadioLabelEventListener(radioLabel) {
  radioLabel.addEventListener('click', () => {
   this.choiceid = parseInt(radioLabel.dataset.choices)
   this._checkActiveLabel()
   this._appendAnswerToJson()

   radioLabel.classList.add('active')

   this._updateUserLogToServer()
   const activebutton = document.querySelector('div.now-question')
   activebutton.dataset.status = `selected-question`
  })
 }

 _pushDataToAnswerJson() {
  this._updateAnswerCounter()

  this.totalAnswers.recentquestion = this.questionNumber
  // console.log(this._getAnswerCatagory())
  this._getAnswerCatagory().answers.push({
   choiceid: this.choiceid,
   questionid: parseInt(this.questionId),
   correct_answerid: this.correctAnswer,
  })

  console.log(this.totalAnswers)
 }

 _appendAnswerToJson() {
  this._updateTimeleft()
  if (this._getIndexOfAnswer() === -1) {
   this._pushDataToAnswerJson()
   //  this._updateCurrentUserLog()
   console.log('Req total push answer', this.totalAnswers)
  } else {
   this._changeAnsweredQuestion()
   //  console.log('Req total update', this.totalAnswers)
  }
 }

 _updateTimeleft() {
  // this.logs.timeleft = this._getTimeRemaining()
  this.totalAnswers.timeleft = this._getTimeRemaining()
 }

 _updateCurrentUserLog() {
  this.logs.recentquestion = this._getRecentQuestion()
  this.logs.timeleft = this._getTimeRemaining()
  this.logs.questionid = parseInt(this.questionId)
  this.logs.correct_answerid = this.correctAnswer
  this.logs.choiceid = this.choiceid

  // console.log('Req total update answer', this.logs)
 }

 _getRecentQuestion() {
  const recentQuestion =
   this.totalAnswers.recentquestion < this.questionNumber
    ? this.questionNumber
    : this.totalAnswers.recentquestion
  return recentQuestion
 }
 async _updateUserLogToServer() {
  new Apiservice()._reqToUpdateUserLog({
   service: 'updateresult',
   recentquestion: this._getRecentQuestion(),
   timeleft: this._getTimeRemaining(),
   testingid: this.totalAnswers.testingid,
   questionid: parseInt(this.questionId),
   correct_answerid: this.correctAnswer,
   choiceid: this.choiceid,
  })
 }

 _checkActiveLabel() {
  if (this.itemContainers.querySelector('label.active')) {
   this.itemContainers.querySelector('label.active').classList.remove('active')
  }
 }

 _updateAnswerCounter() {
  const counterNumberElement = this._getCounterNumberElement()
  const totalQuestionNumber = this._getTotalNumberOfQuestionElement()
   .textContent
  let counterNumber = parseInt(this._getCounterNumberElement().textContent)

  // if (
  //  counterNumber < totalQuestionNumber ||
  //  counterNumber < this.questionNumber
  // ) {
  counterNumber++
  // }

  //   const counterNumber = parseInt(counterNumberElement.textContent) + 1

  //   if (counterNumber <= this._getTotalNumberOfQuestion()) {
  counterNumberElement.textContent = `${counterNumber}`
  //   }
 }

 _getTotalNumberOfQuestion() {
  return parseInt(
   this._getTotalNumberOfQuestionElement().textContent.split('/')[1]
  )
 }

 _getTotalNumberOfQuestionElement() {
  return document.querySelector('#totalQuestionNumber')
 }

 _getAnswerCatagory() {
  return this.totalAnswers.items[this._checkIndexOfCategoryItem()]
 }

 _getIndexOfAnswer() {
  const indexOfCategoryItem = this._getAnswerCatagory().answers.findIndex(
   (question) => question.questionid == this.questionId
  )
  return indexOfCategoryItem
 }

 _checkIndexOfCategoryItem() {
  const indexOfCategoryItem = this.totalAnswers.items.findIndex(
   (question) => question.category == this.category
  )

  return indexOfCategoryItem
 }

 _changeAnsweredQuestion() {
  const recentObjectOfAnswer = this._getAnswerCatagory().answers[
   this._getIndexOfAnswer()
  ]

  recentObjectOfAnswer.choiceid = this.choiceid
  // this.logs.choiceid = this.choiceid
 }

 _getTimeRemaining() {
  return parseInt(localStorage.getItem('timeleft'))
 }

 _getTotalNumberOfAnswer() {
  return this.totalAnswers.items.length
 }

 _getChoiceId() {
  //   console.log(this.radioInput)
  //   return parseInt(this.radioInput.dataset.choices)
 }

 _setUpLogsRecentQuestion() {
  // this.logs.recentquestion = this.totalAnswers.recentquestion
 }

 _getCounterNumberElement() {
  return document.querySelector('#counterNumber')
 }
 //
 _apppendChild() {
  this.body.appendChild(this.mainBody)
 }
}
