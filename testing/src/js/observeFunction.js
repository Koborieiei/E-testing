export const _bindCounterNumber = (htmlElement) => {
 const observerOptions = {
  childList: true,
  attributes: true,
  subtree: true,
 }
 this._callOutCounterObserver().observe(htmlElement, observerOptions)
}

//  mutation function
export const _callOutCounterObserver = () => {
 const totalAvailableQuestion = this._getTotalQuestionNumber()
 return new MutationObserver(() => {
  this.testingProgressBar._updateProgressBarPerTime()

  //  logic change text to success use is all answer equal number of total question
  if (this._getRealTimeNumberOfAnswer() == totalAvailableQuestion) {
   this._changeSuccessText()
  }
 })
}
