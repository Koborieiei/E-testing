import Timer from '../../../utils/Timer'
let durationTimer = new Timer({})

export const activeRecentQuestion = (questionindex) => {
 if (_isThisQuestionFirstIndex(questionindex)) {
  turnDisabledButtonOn()
 }
 const recentQuestion = document.querySelector(
  "[data-index='" + questionindex + "']"
 )
 _showQuestion(recentQuestion)
}

export const turnToNextQuestion = () => {
 const nextQuestionElement = nextQuestion()
 const thisQuestionElement = getThisQuestion()

 if (nextQuestionElement) {
  //  this._switchDisableButton()
  backButton().disabled = false
  _hindQuestion(thisQuestionElement)
  _showQuestion(nextQuestionElement)
  _turnNextQuestionSelectorOn()
 }
}

export const returnToPreviousQuestion = () => {
 const thisQuestionElement = getThisQuestion()
 const beforeThisQuestionElement = getBeforeThisQuestion()
 const beforeThisQuestionIndex = getQuestionIndex(beforeThisQuestionElement)

 if (_isThisQuestionFirstIndex(beforeThisQuestionIndex)) {
  turnDisabledButtonOn()
 }
 _hindQuestion(thisQuestionElement)
 _showQuestion(beforeThisQuestionElement)
 _turnPreviousQuestionSelectorOn()
}

export const getBeforeThisQuestion = () => {
 return getThisQuestion().previousSibling
}
export const _hindQuestion = () => {
 // BIND THIS QUESTION\
 const thisQuestion = getThisQuestion()
 thisQuestion.classList.remove('active')
 thisQuestion.classList.add('none')
}

export const _turnNextQuestionSelectorOn = () => {
 const activequestion = document.querySelector('div.active')

 document.querySelector(
  'div[data-selectorindex="' + activequestion.dataset.index + '"]'
 ).className = `question-selector now-question`

 const activeSelector = _getActiveQuestionSelector()
 activeSelector.className = `question-selector ${activeSelector.dataset.status}`
}

export const _getActiveSelectorStatus = () => {
 return _getActiveQuestionSelector.dataset.status
}

export const _addOldStatusToClassList = () => {
 _getActiveQuestionSelector().classList.add(_getstatusOfActiveSelector())
}

export const _replaceActiveSelector = () => {
 const activebutton = document.querySelector('div.now-question')
 activebutton.classList.replace('now-question', activebutton.dataset.status)
}

export const _getActiveQuestionSelector = () => {
 const activebutton = document.querySelector('div.now-question')
 return activebutton
}

export const _getBesideActiveQuestionSelector = () => {
 return _getActiveQuestionSelector().nextElementSibling
}

export const _getstatusOfActiveSelector = () => {
 return _getActiveQuestionSelector().dataset.status
}

export const _turnPreviousQuestionSelectorOn = () => {
 _replaceActiveSelector()
 _getSelectorByIndex()
}

export const _getSelectorByIndex = () => {
 const activeQuestion = document.querySelector('div.active')
 document.querySelector(
  'div[data-selectorindex="' + activeQuestion.dataset.index + '"]'
 ).className = 'question-selector now-question'
}

export const _showQuestion = (besideQuestion) => {
 //  const besideQuestion = getBesideQuestion()
 besideQuestion.classList.add('active')
 besideQuestion.classList.remove('none')
 durationTimer._assignQuestionStartedTime()
}

export const nextQuestion = () => {
 const thisQuestion = getThisQuestion()
 return thisQuestion.nextSibling
}

export const getThisQuestionIndex = () => {
 return getThisQuestion().dataset.index
}

export const getQuestionIndex = (question) => {
 return question.dataset.index
}

export const getThisQuestionCategory = () => {
 return Number(getThisQuestion().dataset.category)
}

export const getThisQuestion = () => {
 const thisQuestion = document.querySelector('div.active')
 return thisQuestion
}

export const backButton = () => {
 return document.querySelector('#backButton')
}

export const nextButton = () => {
 return document.querySelector('#nextButton')
}
export const turnDisabledButtonOn = () => {
 backButton().disabled = true
}

export const changButtonSuccessText = () => {
 nextButton().textContent = 'จบการทดสอบ'
}

export const totalNumberOfAnswer = () => {
 nextButton().textContent = 'จบการทดสอบ'
}

export const isTestingFinished = (
 numberOfTotalQuestion,
 numberOfTotalAnswer
) => {
 return numberOfTotalAnswer === numberOfTotalQuestion
}

export const _isThisQuestionFirstIndex = (questionIndex) => {
 return Number(questionIndex) === 1
}
