import Apiservice from '../../../js/class/services'
import TestingItem, * as QuestionController from '../../../js/class/Testingitem'
import progressBar from '../../../js/class/progressbar.class'
import Questionselector, * as QuestionselectorController from './class/questionselector'
import HtmlElementClass from '../../../js/class/htmlelementclass'
import Timer from '../../../js/class/Timer'

export default class runTestingPageClass extends HtmlElementClass {
 constructor() {
  super()
  // this.test = Apirequest || null
  this.availableQuestion = undefined

  this.answerObject =
   {
    service: 'submitresult',
    recentquestion: null,
    timeleft: null,
    testingid: null,
    items: [],
   } || undefined

  this.userTimeleftLogUpdate = {
   service: 'updatetime',
   timeleft: null,
   testingid: null,
  }

  this.questionDuration = { items: 0 }

  // timeleft only send time
  // Testingid
  // Service updatetime, updateresult

  this.sendLogUpdateInterval = undefined
  this.totalQuestionNumber = undefined
  this.counterNumber = undefined
  this.timerText = undefined
  this.timeLeft = undefined

  this.countTotalExistedAnswer = 0

  this.currentProgressBarValue = undefined
  this.progressBarValuePerTime = undefined
  this.testingProgressBar = undefined
  this.testName = undefined

  this._runTestingPage()
 }

 _runTestingPage() {
  this._addWindowBeforeUnloadEvent()
  this._storeAvailableQuestion()
  this._setupTotalQuestionNumber()
  this._setAnswerObjectSkillId()
  this._setExistedItemToAnswerObject()
  this._setUpTestingId()

  this.availableQuestion
   .then((data) => {
    if (data.status === 500) {
     throw data
    }

    this._setPageHeader()
    this._setupProgressBar()
    this._setTimeCountdown()
    this._setPageQuestionSelector()
    this._setPageBody()
    this._validateDataResult(data)
   })
   .then(() => {
    this._setPageButtonContainer()
   })
   .catch((err) => {
    if (err == 'Noquestion') {
     //  this._displayNoQuestionError(err)
    } else {
     console.log(err)
     this.body.innerHTML = `<div class="text-center mt-5"> <h3>ขออภัย... </h4>
      Code: ${err.status}
      msg: ${err.message}</div>
      <div> ขณะนี้ระบบเกิดข้อผิดพลาด กรุณารอสักครู่ หรือ ทำการติดต่อเจ้าหน้าที่ </div>`
    }
   })
  //  Wait to build function
 }

 _validateDataResult(data) {
  if (data.results.length == 0) {
   throw 'Noquestion'
  }
 }

 _setPageHeader() {
  // console.log(this.answerObject.testingid)
  const questionHeaderNode = this._generateQuestionHeader()
  const testNameSplitedString = this.testName.split('con')[0].toUpperCase()
  this.counterNumber = questionHeaderNode.querySelector('h4#counterNumber')
  this.totalQuestion = questionHeaderNode.querySelector(
   'h4#totalQuestionNumber'
  )

  questionHeaderNode.querySelector(
   '#testMainTextHeader'
  ).textContent = `${testNameSplitedString}`
  questionHeaderNode.querySelector(
   '#testSecondTextHeader'
  ).textContent = this._questionSecondTextHeader(testNameSplitedString)

  // console.log(this._getTestingRequestData())
  this.timerText = questionHeaderNode.querySelector('h5#timer')

  this._setCounterNumber()
  this._setTotalQuestionNumber()
  this._bindCounterNumber()
  this._appAppendChild(questionHeaderNode)
 }

 _setTimeCountdown() {
  this.availableQuestion.then((data) => {
   this.timeLeft = new Timer({
    duration: data.testinginfo.timeleft,
   })

   // this.timeLeft.duration =
   this._setTimeCountdownText()

   if (this.timeLeft.duration != undefined) {
    this._startTimer(this.timerText)
   }
  })
 }

 _setTimeCountdownText() {
  this.timerText.textContent =
   this.timeLeft.duration != undefined
    ? `${this.timeLeft._getHourIncludeZero()}:${this.timeLeft._getMinutesIncludeZero()}:${this.timeLeft._getSecondIncludeZero()}`
    : `ไม่จำกัดเวลา`

  // console.log(this.timeLeft.duration)
  // this.timerText.textContent = `${this.timeLeft._getHourIncludeZero()}:${this.timeLeft._getMinutesIncludeZero()}:${this.timeLeft._getSecondIncludeZero()}`
 }

 _setCounterNumber() {
  this.counterNumber.textContent = `${this._getNumberOfExistedAnswered()}`
 }

 _setTotalQuestionNumber() {
  this.totalQuestion.textContent = `/${this._getTotalQuestionNumber()}`
 }

 _setPageQuestionSelector() {
  const QuestionSelectorNode = this._generateQuestionSelector()

  this._createQuestionSelector()

  this._appAppendChild(QuestionSelectorNode)
 }

 _createQuestionSelector() {
  this.availableQuestion.then((data) => {
   this.Questionselector = new Questionselector({
    questions: data,
    parent: document.querySelector('#questionSelector'),
   })
  })
 }

 _displayNoQuestionError() {
  this.body.innerHTML = `<div class="text-center mt-5"> <h2>อุ๊ปส์.. ไม่พบข้อสอบในระบบ</h2></div>`
 }

 _setPageBody() {
  // const questionBodyNode = this._generateQuestionBody()
  this._createQuestion()
  // return this._appAppendChild(questionBodyNode)
 }

 _setPageButtonContainer() {
  const buttonPageContainerNode = this._generateTestPageButtonContainer()

  this._setNextButtonFunction()
  this._setBackButtonFunction()
  return this._appAppendChild(buttonPageContainerNode)
 }

 _createQuestion() {
  let recentquestion
  this.availableQuestion.then((data) => {
   recentquestion = parseInt(data.testinginfo.recentquestion)

   data.results.map((individualQuestion) => {
    // console.log(individualQuestion.answeredid)
    new TestingItem({
     directionText: individualQuestion.question,
     itemChoices: individualQuestion.answers,
     questionNumber: individualQuestion.index,
     body: document.querySelector('#question'),
     answered: this.answerObject,
     answeredId: individualQuestion.answeredid,
     correctAnswer: individualQuestion.correct_answerid,
     questionId: individualQuestion.question_id,
     category: individualQuestion.category,
    })
   })
   this.Questionselector._activeInitiateQuestion(recentquestion)
  })
 }

 _setNextButtonFunction() {
  this.nextButton.button.addEventListener('click', () => {
   this._finishTheTest()
   this._switchSuccessTextBack()
   this._turnToNextQuestion()
  })
 }

 _finishTheTest() {
  if (this._isTestProved()) {
   this._showTestConfirmModal()
  }
 }

 _switchSuccessTextBack() {
  const besideQuestion = this._getBesideQuestion()

  if (
   besideQuestion !== null &&
   this._isThisLastQuestion(besideQuestion) &&
   this._isTestProved()
  ) {
   this._changeSuccessText()
  }
 }

 _showTestConfirmModal() {
  const confirmModal = new this.confirmModal({
   headerText: 'ยืนยัน',
   ModalContent: 'คุณต้องการส่งคำตอบทั้งหมด',
  })

  confirmModal.trueButton.addEventListener('click', (e) => {
   this._IsRequestSuccess()
   confirmModal._destroy()
  })
 }

 _setBackButtonFunction() {
  this._setUpDisableButton()
  this._setUpNextButton()
  this.backButton.button.addEventListener('click', () => {
   this._validateFirstQuestion()
   this._validateLastQuesiton()
   this._returnToPreviousQuestion()
  })
 }

 _isTestProved() {
  const numberOfTotalQuestion = this._getTotalQuestionNumber()
  const numberOfAnswer = this._getRealTimeNumberOfAnswer()

  // console.log(numberOfAnswer, numberOfTotalQuestion)
  if (numberOfTotalQuestion == numberOfAnswer) {
   return true
  }
 }

 _isThisLastQuestion(question) {
  const thisQuestionIndex = question.dataset.index
  const numberOfTotalQuestion = this._getTotalQuestionNumber()
  if (thisQuestionIndex == numberOfTotalQuestion) {
   return true
  }
 }

 _turnToNextQuestion() {
  const thisQuestion = this._getThisQuestion()
  const besideQuestion = this._getBesideQuestion()
  if (besideQuestion) {
   this._switchDisableButton()
   this._hindQuestion(thisQuestion)
   this.Questionselector._showQuestion(besideQuestion)
   QuestionselectorController._turnNextQuestionSelectorOn()
  }
 }

 _returnToPreviousQuestion() {
  const thisQuestion = this._getThisQuestion()
  const beforeThisQuestion = this._getBeforeThisQuestion()

  this._hindQuestion(thisQuestion)
  this.Questionselector._showQuestion(beforeThisQuestion)

  QuestionselectorController._turnPreviousQuestionSelectorOn()
 }

 _hindQuestion(thisQuestion) {
  // BIND THIS QUESTION
  thisQuestion.classList.remove('active')
  thisQuestion.classList.add('none')
 }

 _showQuestion(besideQuestion) {
  // SHOW NEXT QUESTION
  besideQuestion.classList.add('active')
  besideQuestion.classList.remove('none')
  // this._assignQuestionStartedTime()
 }

 _validateFirstQuestion() {
  if (this._isBeforeThisQuestionFirstIndex()) {
   this.backButton.button.disabled = true
  }
 }

 _setUpDisableButton() {
  if (this._isThisQuestionFirstIndex()) {
   this.backButton.button.disabled = true
  }
 }

 _setUpNextButton() {
  const totalAvailableQuestion = this._getTotalQuestionNumber()
  if (this._getRealTimeNumberOfAnswer() == totalAvailableQuestion) {
   this._changeSuccessText()
  }
 }
 //  call when setup
 _isThisQuestionFirstIndex() {
  const thisQuestion = this._getThisQuestion().dataset.index
  return Number(thisQuestion) === 1
 }

 _isBeforeThisQuestionFirstIndex() {
  const beforeThisQuestionIndex = this._getBeforeThisQuestion().dataset.index
  return Number(beforeThisQuestionIndex) === 1
 }

 _validateLastQuesiton() {
  const beforeThisQuestionIndex = this._getBeforeThisQuestion().dataset.index
  const numberOfTotalQuestion = this._getTotalQuestionNumber()
  if (beforeThisQuestionIndex != numberOfTotalQuestion) {
   this._reverseTextToNormal()
  }
 }

 _bindCounterNumber() {
  const counterNumberNode = this.counterNumber
  const observerOptions = {
   childList: true,
   attributes: true,
   subtree: true,
  }
  this._callOutCounterObserver().observe(counterNumberNode, observerOptions)
 }

 _callOutCounterObserver() {
  const totalAvailableQuestion = this._getTotalQuestionNumber()
  return new MutationObserver(() => {
   this.testingProgressBar._updateProgressBarPerTime()

   if (this._getRealTimeNumberOfAnswer() == totalAvailableQuestion) {
    this._changeSuccessText()
   }
  })
 }

 _startTimer(display) {
  this.countDownInterval = setInterval(() => {
   display.textContent = `${this.timeLeft._getHourIncludeZero()}:${this.timeLeft._getMinutesIncludeZero()}:${this.timeLeft._getSecondIncludeZero()}`
   //  localStorage.setItem('timeleft', this.timeLeft.duration)
   this._updateUserCountDownTime(this.timeLeft._getSecondIncludeZero())

   this.timeLeft._reducingTimeLeft()
   this._isTimeUp()
  }, 1000)
 }

 _isTimeUp() {
  if (this.timeLeft.duration < 0) {
   this._alertTimeOutModal()
   clearInterval(this.sendLogUpdateInterval)
   clearInterval(this.countDownInterval)
  }
 }

 _updateUserCountDownTime(seconds) {
  if (seconds < 1) {
   this._setAnswerObjectCountDownTime()
   this._updateUserLog()
  }
 }

 _IsRequestSuccess() {
  new Apiservice()
   ._reqToSendTotalResult(this.answerObject)
   .then((resp) => {
    this._redirectToResultPage(resp)
    // console.log(resp)
    this._validateSuccessRequest(resp)
   })
   .catch((err) => {
    console.log(err)
    this._thorwNewErrorModal()
   })
 }

 _redirectToResultPage(data) {
  this._removeBeforeUnLoadEventListener()
  localStorage.setItem(
   'progressbarvalue',
   this.testingProgressBar.currentValueOfProgressBar
  )

  const jsonEncodeToUri = encodeURIComponent(JSON.stringify(data))
  setTimeout(() => {
   window.location.assign(`../showresult?${jsonEncodeToUri}`)
  }, 1000)
 }

 _confirmBeforeUnload(e) {
  var dialogText = 'Dialog text here'
  e.returnValue = dialogText
  return dialogText
 }

 _removeBeforeUnLoadEventListener() {
  window.removeEventListener('beforeunload', this._confirmBeforeUnload)
 }

 _addWindowBeforeUnloadEvent() {
  window.addEventListener('beforeunload', this._confirmBeforeUnload)
 }

 _updateUserLog() {
  this.userTimeleftLogUpdate.timeleft = this._getTimeLeft()
  // console.log(this._getTimeLeft())

  new Apiservice()
   ._reqToUpdateUserTime(this.userTimeleftLogUpdate)
   .then((resp) => {
    return resp.json()
   })

  // console.log('Request Updatetime', this.userTimeleftLogUpdate)
 }

 _storeAvailableQuestion() {
  const testingRequestData = this._getTestingRequestData()
  this.availableQuestion = new Apiservice()._getQuestionObjects(
   testingRequestData
  )
 }

 _setAnswerObjectSkillId() {
  this.availableQuestion.then((testingObject) => {
   this._getTestingRequestData().skill_id.map((skillid) => {
    this.answerObject.items.push({
     category: skillid,
     answers: [],
     totalquestion: this._getEachSkillsNumberOfTotalQuestion(
      testingObject,
      skillid
     ),
    })
   })
  })

  console.log(this.answerObject)
 }

 _getEachSkillsNumberOfTotalQuestion(testingobject, skillid) {
  return testingobject.results.filter((item) => item.category == skillid).length
 }

 _getTestingRequestData() {
  const queryString = window.location.search.split('?')[1]
  const testingRequestData = JSON.parse(decodeURIComponent(queryString))
  console.log(testingRequestData)
  return testingRequestData
 }

 _setUpTestingId() {
  this.availableQuestion.then((data) => {
   this.answerObject.testingid = parseInt(data.testinginfo.id)
   this.answerObject.recentquestion = parseInt(data.testinginfo.recentquestion)
   this.userTimeleftLogUpdate.testingid = parseInt(data.testinginfo.id)
   this.testName = data.testinginfo.type
  })
 }

 _setExistedItemToAnswerObject() {
  this.availableQuestion.then((data) => {
   data.results.map((question) => {
    this._pushExistAnswerToAnswerObject(question)
   })
  })
  // console.log(this.answerObject)
 }

 _pushExistAnswerToAnswerObject(question) {
  if (question.answeredid != null) {
   this.countTotalExistedAnswer++

   this.answerObject.items[
    this._getIndexOfAnswerCategory(question)
   ].answers.push({
    choiceid: parseInt(question.answeredid),
    questionid: parseInt(question.question_id),
    correct_answerid: question.correct_answerid,
    questionindex: parseInt(question.index),
   })
  }
 }

 _getIndexOfAnswerCategory(question) {
  const numberOfIndex = this.answerObject.items.findIndex(
   (answer) => answer.category == parseInt(question.category)
  )
  return numberOfIndex
 }

 _setupTotalQuestionNumber() {
  this.availableQuestion.then((data) => {
   this.totalQuestionNumber = data.results.length
   localStorage.setItem('totalquestionnumber', this.totalQuestionNumber)
   //  this.answerObject.totalquestion = this.totalQuestionNumber
  })
 }

 _setupProgressBar() {
  this.testingProgressBar = new progressBar({
   progressbarparent: '#progressBar',
   actualValue: this._getNumberOfExistedAnswered(),
   maximumValue: this.totalQuestionNumber,
  })
  // this.currentProgressBarValue =
  //  this._getNumberOfExistedAnswered() / this.totalQuestionNumber
 }

 //  _updateProgressBarPerTime() {
 //   this.testingProgressBar.animate(
 //    Number(this.currentProgressBarValue.toFixed(10))
 //   )

 //   this.currentProgressBarValue += this.progressBarValuePerTime
 //  }

 _alertTimeOutModal() {
  const timeOutTime = new this.confirmModal({
   trueButtonText: 'ส่งคำตอบ',
   headerText: 'การแจ้งเตือน',
   ModalContent: 'หมดเวลาการทดสอบแล้ว',
   backdrop: true,
  })
  timeOutTime.falseButton.remove()
  timeOutTime.body.classList = `grey lighten-4 modal-body rounded p-2 m-3 text-center`
  // const testest = this._parserHtmlTag(
  //  `<i style="font-size: 5rem;" class="h1 fas fa-exclamation-circle text-warning"></i>`
  // )

  // timeOutTime.body.childNodes[0].classList.add('h4', 'text-dark', 'mt-2')
  // timeOutTime.body.insertBefore(testest, timeOutTime.body.childNodes[0])

  timeOutTime.trueButton.parentNode.classList.add('m-auto')
  timeOutTime.trueButton.addEventListener('click', () => {
   this._IsRequestSuccess()
  })
 }

 _getNumberOfExistedAnswered() {
  return this.countTotalExistedAnswer
 }

 _getRealTimeNumberOfAnswer() {
  return this.counterNumber.textContent
 }

 _getTotalQuestionNumber() {
  return this.totalQuestionNumber
 }

 _getBesideChuck() {
  const besideRecentChuck = this._getThisChuck().nextSibling
  return besideRecentChuck
 }

 _getThisChuck() {
  const thisChuck = this._getThisQuestion().parentElement
  return thisChuck
 }

 _getThisQuestionCategory() {
  const thisQuestion = this._getThisQuestion()
  return Number(thisQuestion.dataset.category)
 }

 _getBeforeThisQuestion() {
  const beforeThisQuestion = this._getThisQuestion().previousSibling
  return beforeThisQuestion
 }

 _getBesideQuestion() {
  const recentQuestion = this._getThisQuestion().nextSibling
  return recentQuestion
 }

 _getThisQuestionIndex() {
  const thisQuestion = this._getThisQuestion()
  return thisQuestion.dataset.index
 }

 _getThisQuestion() {
  const thisQuestion = document.querySelector('div.active')
  return thisQuestion
 }

 _setAnswerObjectCountDownTime() {
  this.answerObject.timeleft = parseInt(this._getTimeLeft())
 }

 _switchDisableButton() {
  this.backButton.button.disabled = false
 }

 _getTimeLeft() {
  return parseInt(this.timeLeft.duration)
 }

 _changeSuccessText() {
  // console.log(this.nextButton.button)
  this.nextButton.button.textContent = 'จบการทดสอบ'
 }

 _reverseTextToNormal() {
  this.nextButton.button.textContent = 'ถัดไป'
 }

 _thorwNewErrorModal() {
  new this.alertModal({
   alertMsg: 'เกิดข้อผิดพลาด',
   type: 'error',
  })
 }

 _showModalSuccess() {
  new this.alertModal({
   alertMsg: 'Sucessful',
   type: 'success',
  })
 }
 _validateSuccessRequest(response) {
  if (response.status == 500 || !response) {
   throw 'Something went wrong'
  }
  console.log('Successful')
  this._showModalSuccess()
 }
}
