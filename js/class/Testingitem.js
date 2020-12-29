import Apiservice from './services'
import Choice from './choice.class'

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
  this.mainBody.dataset.category = this.category
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
   const newChoice = new Choice({
    id: choice.id,
    statement: choice.statment,
    questionnumber: this.questionNumber,
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
   if (this._getAnswerCatagory()) {
    this.choiceid = parseInt(radioLabel.dataset.choices)
    this._checkActiveLabel()
    this._appendAnswerToJson()

    radioLabel.classList.add('active')

    this._updateUserLogToServer()
    const activebutton = document.querySelector('div.now-question')
    activebutton.dataset.status = `selected-question`
   }
  })
 }

 _getDuration() {
  return Number(localStorage.getItem('duration'))
 }

 _pushDataToAnswerJson() {
  this._updateAnswerCounter()

  // console.log(localStorage.getItem('duration'))

  this.totalAnswers.recentquestion = this.questionNumber

  this._getAnswerCatagory().answers.push({
   choiceid: this.choiceid,
   questionid: parseInt(this.questionId),
   correct_answerid: this.correctAnswer,
   duration: this._getDuration(),
  })

  console.log(this.totalAnswers)
 }

 _appendAnswerToJson() {
  if (this._getIndexOfAnswer() === -1) {
   this._pushDataToAnswerJson()
   console.log('Req total push answer', this.totalAnswers)
  } else {
   this._changeAnsweredQuestion()
  }
 }

 _updateTimeleft() {
  // this.logs.timeleft = this._getTimeRemaining()
  // this.totalAnswers.timeleft = this._getTimeRemaining()
 }

 _getCurrentUserLogJson() {
  return {
   service: 'updateresult',
   recentquestion: this._getRecentQuestion(),
   //  timeleft: this._getTimeRemaining(),
   testingid: this.totalAnswers.testingid,
   questionid: parseInt(this.questionId),
   correct_answerid: this.correctAnswer,
   choiceid: this.choiceid,
   duration: this._getDuration(),
  }

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
  new Apiservice()._reqToUpdateUserLog(this._getCurrentUserLogJson())
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

  counterNumber++

  counterNumberElement.textContent = `${counterNumber}`
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
  try {
   //  if (!this.totalAnswers.items[this._checkIndexOfCategoryItem()]) {
   //   throw 'Not found Category'
   //  }
   if (this._checkIndexOfCategoryItem() == -1) {
    throw `${this.category} Categoryid was not found, Please check category inside result object below ⬇️`
   }
   return this.totalAnswers.items[this._checkIndexOfCategoryItem()]
  } catch (error) {
   console.warn(error)
   console.log(this.totalAnswers)
  }
 }

 _getIndexOfAnswer() {
  try {
   if (this._getAnswerCatagory()) {
    const indexOfCategoryItem = this._getAnswerCatagory().answers.findIndex(
     (question) => question.questionid == this.questionId
    )
    return indexOfCategoryItem
   }
  } catch (error) {
   console.log(error)
  }
 }

 _checkIndexOfCategoryItem() {
  const indexOfCategoryItem = this.totalAnswers.items.findIndex(
   (question) => question.category == this.category
  )

  return indexOfCategoryItem
 }

 _changeAnsweredQuestion() {
  if (this._getAnswerCatagory()) {
   const recentObjectOfAnswer = this._getAnswerCatagory().answers[
    this._getIndexOfAnswer()
   ]

   recentObjectOfAnswer.choiceid = this.choiceid
   recentObjectOfAnswer.duration = this._getDuration()
  }
 }

 _getTotalNumberOfAnswer() {
  return this.totalAnswers.items.length
 }

 //  _getChoiceId() {
 //   console.log(this.radioInput)
 //   return parseInt(this.radioInput.dataset.choices)
 //  }

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

export const _getIndexOfAnswer = (totalAnswers, category) => {
 const indexOfCategoryItem = totalAnswers.items.findIndex(
  (question) => question.category == category
 )
 return indexOfCategoryItem
}
