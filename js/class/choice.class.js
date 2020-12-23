// import Testingitem from './Testingitem'

export default class Choice {
 constructor({ id, statement, questionnumber, prefix, body, answeredId }) {
  this.id = id || undefined
  this.statement = statement || undefined
  this.questionNumber = questionnumber || undefined
  //   this.prefix = prefix || undefined
  this.parentBody = body || undefined
  this.answeredId = answeredId || undefined

  this.radioInput = undefined
  this.radioLabel = undefined
  this._createChoice()
  this._appendToBody()
 }

 _createChoice() {
  this._createInput()
  this._createInputLabel()
 }

 _createInput() {
  this.radioInput = document.createElement('input')
  this.radioInput.type = 'radio'
  this.radioInput.id = this.id
  //   this.radioInput.value = this.statement

  this.radioInput.name = `questionNumber${this.questionNumber}`
  this.radioInput.classList.add('choice', 'none')
 }

 _createInputLabel() {
  this.radioLabel = document.createElement('label')
  this.radioLabel.setAttribute('for', this.id)

  const choiceStatementTextTag = new DOMParser().parseFromString(
   this.statement,
   'text/html'
  ).body.firstChild

  choiceStatementTextTag.classList.add('answer-selector')

  //   choiceStatementTextTag.textContent = `${this.prefix}. ${choiceStatementTextTag.textContent}`
  choiceStatementTextTag.textContent = `${choiceStatementTextTag.textContent}`
  this.radioLabel.appendChild(choiceStatementTextTag)
  this.radioLabel.classList.add(...this._generateClassList(this.id))
  this.radioLabel.dataset.choices = this.id
 }

 _generateClassList() {
  const classArray = ['btn-lg', 'btn-white', 'p-3', 'rounded', 'text-dark']
  if (this.id == this.answeredId) {
   classArray.push('active')
  } else {
   //    console.log('Didnt Matched')
  }

  return classArray
 }

 _appendToBody() {
  this.parentBody.appendChild(this.radioInput)
  this.parentBody.appendChild(this.radioLabel)
 }
}
