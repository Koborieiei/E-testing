export default class Questionselector {
 constructor({ questions, parent, durationInterval }) {
  this.questions = questions
  this.parent = parent
  this.durationInterval = durationInterval || undefined
  this.testingRecentQuestion = parseInt(questions.testinginfo.recentquestion)

  this.statusClassLists = [
   'non-selected-question',
   'marked-question',
   'selected-question',
   'now-question',
  ]

  //   this.initiatedClass = 'question-selector non-selected-question'
  this.mainBody = undefined
  this.toggleDownParent = undefined
  this.button = undefined
  this.toggleIcon = undefined
  this.selector = undefined
  this.countNumberOfChilds = 0
  this.selectorParent = undefined
  this.assignQuestionTime = undefined

  this._generateSelector()
 }

 _generateSelector() {
  this.selectorParent = document.createElement('div')
  const firstParent = document.createElement('div')
  firstParent.classList.add('row', 'm-0')

  this.selectorParent.classList.add(
   'row',
   'collapse',
   'multi-collapse',
   'bg-white',
   'm-0',
   'show'
  )
  this.selectorParent.id = 'multiCollapseExample1'

  this.toggleDownParent = new DOMParser().parseFromString(
   '<div class="d-flex mt-2 align-items-center justify-content-center flex-row"></div>',
   'text/html'
  ).body.firstChild

  this._appendAtagToToggleDownParent()
  this._appendIconToATag()

  this.questions.results.map((question) => {
   //    console.log(question)

   this.countNumberOfChilds++

   this.selector = document.createElement('div')
   this._setupComponentsAttribute(question)
   firstParent.appendChild(this.selector)
   this._appendSelectorToParent()
   this.selector.addEventListener('click', (e) => {
    this._setSelectorEvent(e.target)
   })
  })
  this.parent.appendChild(firstParent)
  this.parent.appendChild(this.selectorParent)
  this._appendArrowParentToMainBody()
  this._setArrowEvent()
 }

 _setupComponentsAttribute(question) {
  this._isQuestionHasAnswered(question)
  this._applyRecentQuestionSelector(question)
  this.selector.textContent = question.index
  this.selector.dataset.selectorindex = question.index
 }

 _isQuestionHasAnswered(question) {
  if (question.answeredid == null) {
   this.selector.classList.add('question-selector', 'non-selected-question')
   this.selector.dataset.status = 'non-selected-question'
  } else {
   this.selector.classList = `question-selector selected-question`
   this.selector.dataset.status = 'selected-question'
  }
 }

 _applyRecentQuestionSelector(question) {
  if (question.index == this.testingRecentQuestion) {
   this.selector.classList = `question-selector now-question`
   this.selector.dataset.status = 'selected-question'
  }
 }

 _appendSelectorToParent() {
  //   console.log(this.countNumberOfChilds)
  this.selectorParent.appendChild(this.selector)
 }

 _appendIconToATag() {
  const arrowIcon = new DOMParser().parseFromString(
   '<i style="font-size: 30px;" class="text-primary fas fa-caret-down"></i>',
   'text/html'
  ).body.firstChild
  return this.toggleIcon.appendChild(arrowIcon)
 }

 _appendAtagToToggleDownParent() {
  this.toggleIcon = new DOMParser().parseFromString(
   '<a data-toggle="collapse" class="arrow-down-animated" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1" class="text-primary"></a>',
   'text/html'
  ).body.firstChild
  return this.toggleDownParent.appendChild(this.toggleIcon)
 }

 _appendArrowParentToMainBody() {
  this.parent.appendChild(this.toggleDownParent)
 }

 _setSelectorEvent(target) {
  this._removeActiveClass()
  target.classList.remove(...this.statusClassLists)
  target.classList.add('now-question')
  this._activeQuestionDiv(target.textContent)
  this._switchDisableBackButton()
 }

 _switchDisableBackButton() {
  if (_getActiveQuestionSelector().textContent == 1) {
   document.querySelector('#backButton').disabled = true
  } else {
   document.querySelector('#backButton').disabled = false
  }
 }

 _activeQuestionDiv(target) {
  const targetDiv = document.querySelector('div[data-index="' + target + '"]')
  this._hindQuestion()
  this._showQuestion(targetDiv)
 }

 _removeActiveClass() {
  const activeSelector = _getActiveQuestionSelector()
  activeSelector.classList.remove(...this.statusClassLists)
  activeSelector.className = `question-selector ${activeSelector.dataset.status}`
 }

 _setArrowEvent() {
  this.toggleIcon.addEventListener('click', (e) => {
   this.toggleIcon.classList.toggle('arrow-up-animated')
  })
 }

 _arrowToggleDown() {
  this.toggleIcon.classList.toggle('arrow-up-animated')
 }

 _showQuestion(targetdiv) {
  targetdiv.classList.add('active')
  //   this._assignQuestionStartedTime()
  this._getDurationInterval()
 }

 _hindQuestion() {
  const recentQuestion = document.querySelector('div.active')
  recentQuestion.classList.remove('active')
  recentQuestion.classList.add('none')
 }

 _getDurationInterval() {
  console.log(this.durationInterval)
 }

 //  _assignQuestionStartedTime() {
 //   clearInterval(this.assignQuestionTime)
 //   let DurationTimer = 0
 //   localStorage.setItem('duration', DurationTimer)
 //   this.assignQuestionTime = setInterval(() => {
 //    DurationTimer++
 //    localStorage.setItem('duration', DurationTimer)
 //    console.log(localStorage.getItem('duration'))
 //   }, 1000)
 //  }

 _showQuestion(besideQuestion) {
  // SHOW NEXT QUESTION
  besideQuestion.classList.add('active')
  besideQuestion.classList.remove('none')
  this._assignQuestionStartedTime()
 }

 //  Need to be refactored

 _clearInterval(interval) {
  clearInterval(interval)
 }

 _activeInitiateQuestion(recentquestion) {
  const recentQuestion = document.querySelector(
   "[data-index='" + recentquestion + "']"
  )
  const recentQuestionParent = recentQuestion.parentElement
  recentQuestion.classList.remove('none')
  recentQuestion.classList.add('active')
  recentQuestionParent.classList.remove('none')
  this._assignQuestionStartedTime()
 }
 _assignQuestionStartedTime() {
  //  console.log(assignQuestionTime)
  //  if (assignQuestionTime) {
  //   _clearInterval(assignQuestionTime)
  //  }
  this._clearInterval(this.assignQuestionTime)
  let DurationTimer = 0
  localStorage.setItem('duration', DurationTimer)
  this.assignQuestionTime = setInterval(() => {
   DurationTimer++
   localStorage.setItem('duration', DurationTimer)
   console.log(localStorage.getItem('duration'))
  }, 1000)
 }
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
