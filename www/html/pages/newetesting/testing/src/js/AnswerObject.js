export default class AnswerObject {
 constructor({ availableQuestion, recentquestion, testingid }) {
  this.availableQuestion = availableQuestion || undefined
  this.answerObject = {
   service: 'submitresult',
   recentquestion: parseInt(recentquestion),
   testingid: parseInt(testingid),
   items: [],
  }
  this.totalNumberOfAnswer = 0

  this.setAnswerObject(this.availableQuestion.length)
  this.setExistedItemToAnswerObject()
 }

 pushCategoryToAnswerObject(category) {
  this.answerObject.items.push({
   category: category,
   answers: [],
   totalquestion: this.getEachSkillsNumberOfTotalQuestion(category),
  })
 }

 //  Setter
 setExistedItemToAnswerObject() {
  this.availableQuestion.map((question) => {
   this._pushExistAnswerToAnswerObject(question)
  })
 }

 //  data object function
 _pushExistAnswerToAnswerObject(question) {
  if (question.answeredid != null) {
   this.totalNumberOfAnswer++

   this.answerObject.items[
    this._getIndexOfAnswerCategory(question)
   ].answers.push({
    choiceid: parseInt(question.answeredid),
    questionid: parseInt(question.question_id),
    correct_answerid: question.correct_answerid,
    questionindex: parseInt(question.index),
    duration: 0,
   })
  }
 }

 setAnswerObject(availablequestionlength) {
  if (availablequestionlength === 0) {
   return 0
  } else if (
   this.isAnswerObjectHasAvailableQuestionCategory(
    parseInt(this.availableQuestion[availablequestionlength - 1].category)
   ) === -1
  ) {
   this.pushCategoryToAnswerObject(
    parseInt(this.availableQuestion[availablequestionlength - 1].category)
   )
  }
  return this.setAnswerObject(availablequestionlength - 1)
 }

 isAnswerObjectHasAvailableQuestionCategory(category) {
  return this.answerObject.items.findIndex(
   (answer) => answer.category == category
  )
 }

 getEachSkillsNumberOfTotalQuestion(category) {
  return this.availableQuestion.filter((item) => item.category == category)
   .length
 }

 _getIndexOfAnswerCategory(question) {
  const numberOfIndex = this.answerObject.items.findIndex(
   (answer) => answer.category == parseInt(question.category)
  )
  return numberOfIndex
 }

 
}
