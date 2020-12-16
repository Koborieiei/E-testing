import Apiservice from '../../../js/class/services'
import testingItem from '../../../js/class/Testingitem'
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

  // timeleft only send time
  // Testingid
  // Service updatetime, updateresult

  this.sendLogUpdateInterval = undefined
  this.totalQuestionNumber = undefined
  this.counterNumber = undefined
  this.timerText = undefined
  this.timeLeft = undefined
  this.media = window.matchMedia('(max-width: 500px)')

  this.countTotalExistedAnswer = 0

  this.currentProgressBarValue = undefined
  this.progressBarValuePerTime = undefined
  this.testingProgressBar = undefined

  this._runTestingPage()
 }

 _runTestingPage() {
  //  this._changeEtestingLinkToDefault()
  this._storeAvailableQuestion()
  this._setupTotalQuestionNumber()
  this._setAnswerObjectSkillId()
  this._setExistedItemToAnswerObject()
  this.availableQuestion
   .then((data) => {
    if (data.status === 500) {
     throw data
    }

    this._setUpTestingId()

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
     this.body.innerHTML = `<div class="text-center mt-5"> <h2>ขออภัยเกิดข้อผิดพลาด </h2>
      Code: ${err.status}
      msg: ${err.message}</div>`
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
  const questionHeaderNode = this._generateQuestionHeader()
  this.counterNumber = questionHeaderNode.querySelector('h4#counterNumber')
  this.totalQuestion = questionHeaderNode.querySelector(
   'h4#totalQuestionNumber'
  )

  this.timerText = questionHeaderNode.querySelector('h5#timer')

  this._setCounterNumber()
  this._setTotalQuestionNumber()
  this._bindCounterNumber()
  return this._appAppendChild(questionHeaderNode)
 }

 _setTimeCountdown() {
  this.availableQuestion.then((data) => {
   this.timeLeft =
    data.testinginfo.timeleft != undefined
     ? parseInt(data.testinginfo.timeleft)
     : data.testinginfo.timeleft
     
    //  this.timeleft = 10;

   // Waiting to split into chuck function
   let minutes = parseInt((this.timeLeft / 60) % 60, 10)
   let seconds = parseInt(this.timeLeft % 60, 10)
   let hour = parseInt((this.timeLeft / 3600) % 24, 10)

   hour = hour < 10 ? '0' + hour : hour
   minutes = minutes < 10 ? '0' + minutes : minutes
   seconds = seconds < 10 ? '0' + seconds : seconds

   this.timerText.textContent =
    this.timeLeft != undefined
     ? `${hour}:${minutes}:${seconds}`
     : `ไม่จำกัดเวลา`

   if (this.timeLeft != undefined) {
    this._startTimer(this.timerText)
   }
  })
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
   new Questionselector({
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
    new testingItem({
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
   this._activeQuestion(recentquestion)
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
  // const thisQuestion = this._getThisQuestion()
  // Change it when swap question is finished
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
   ModalContent: 'Would you like to submit the test ?',
  })

  confirmModal.trueButton.addEventListener('click', (e) => {
   this._IsRequestSuccess()
   confirmModal._destroy()
  })
 }

 _setBackButtonFunction() {
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
   this._showQuestion(besideQuestion)
   QuestionselectorController._turnNextQuestionSelectorOn()
  }
 }

 _returnToPreviousQuestion() {
  const thisQuestion = this._getThisQuestion()
  const beforeThisQuestion = this._getBeforeThisQuestion()

  this._hindQuestion(thisQuestion)
  this._showQuestion(beforeThisQuestion)
  QuestionselectorController._turnPreviousQuestionSelectorOn()
 }

 _activeQuestion(recentquestion) {
  const recentQuestion = document.querySelector(
   "[data-index='" + recentquestion + "']"
  )
  const recentQuestionParent = recentQuestion.parentElement
  recentQuestion.classList.remove('none')
  recentQuestion.classList.add('active')
  recentQuestionParent.classList.remove('none')
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
 }

 _validateFirstQuestion() {
  const beforeThisQuestion = this._getBeforeThisQuestion()

  if (beforeThisQuestion !== null) {
   this.backButton.button.disabled =
    beforeThisQuestion.dataset.index == 1 ? true : false
  }
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
  var hour, minutes, seconds, intervalId
  // this.timeLeft = 2

  // this._setUptimeCountDownUserLog()

  intervalId = setInterval(() => {
   minutes = parseInt((this.timeLeft / 60) % 60, 10)
   hour = parseInt((this.timeLeft / 3600) % 24, 10)
   seconds = parseInt(this.timeLeft % 60, 10)

   hour = hour < 10 ? '0' + hour : hour
   minutes = minutes < 10 ? '0' + minutes : minutes
   seconds = seconds < 10 ? '0' + seconds : seconds

   display.textContent = `${hour}:${minutes}:${seconds}`
   localStorage.setItem('timeleft', this.timeLeft)

   this._updateUserCountDownTime(seconds)

   if (--this.timeLeft < 0) {
    this._alertTimeOutModal()
    clearInterval(this.sendLogUpdateInterval)
    clearInterval(intervalId)
    // this._IsRequestSuccess()
   }
  }, 1000)
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
    this._validateSuccessRequest(resp)
   })
   .catch((err) => {
    console.log(err)
    this._thorwNewErrorModal()
   })
 }

 _redirectToResultPage(data) {
  localStorage.setItem(
   'progressbarvalue',
   this.testingProgressBar.currentValueOfProgressBar
  )
  const jsonEncodeToUri = encodeURIComponent(JSON.stringify(data))
  setTimeout(() => {
   window.location.href = '../showresult?' + jsonEncodeToUri
  }, 1000)
  // console.log(jsonEncodeToUri)
 }

 _updateUserLog() {
  this.userTimeleftLogUpdate.timeleft = this._getTimeLeft()

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
 }

 _getEachSkillsNumberOfTotalQuestion(testingobject, skillid) {
  return testingobject.results.filter((item) => item.category == skillid).length
 }

 _getTestingRequestData() {
  const queryString = window.location.search.split('?')[1]
  const testingRequestData = JSON.parse(decodeURIComponent(queryString))

  return testingRequestData
 }

 _setUpTestingId() {
  this.availableQuestion.then((data) => {
   this.answerObject.testingid = parseInt(data.testinginfo.id)
   this.answerObject.recentquestion = parseInt(data.testinginfo.recentquestion)
   this.userTimeleftLogUpdate.testingid = parseInt(data.testinginfo.id)
  })
 }

 _setupTotalQuestion() {
  // this.answerObject.totalquestion = this._getTotalQuestionNumber()
 }

 _setExistedItemToAnswerObject() {
  this.availableQuestion.then((data) => {
   data.results.map((question) => {
    this._pushExistAnswerToAnswerObject(question)
   })
  })
  console.log(this.answerObject)
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
   headerText: 'การแจ้งเตือน',
   ModalContent: 'โอ้ดูเหมือนว่า หมดเวลาการทดสอบแล้ว',
   backdrop: true,
  })
  timeOutTime.falseButton.remove()
  timeOutTime.body.classList = `grey lighten-4 modal-body rounded p-2 m-3 text-center`
  const testest = this._parserHtmlTag(
   `<i style="font-size: 5rem;" class="h1 fas fa-exclamation-circle text-warning"></i>`
  )

  timeOutTime.body.childNodes[0].classList.add('h4', 'text-dark', 'mt-2')
  timeOutTime.body.insertBefore(testest, timeOutTime.body.childNodes[0])

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
  return parseInt(this.timeLeft)
 }

 _changeSuccessText() {
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
