import HtmlElementClass from './htmlelementclass'
import Timer from './Timer'
import ApiService from './services'
import ShowProgressBar from '../../js/class/progressbar.class'

class TestingHeader extends HtmlElementClass {
 constructor({ containerParent }) {
  super()
  //   this.testinginfo = testinginfo || undefined
  this.containerParent = containerParent || undefined
  this.progressaBarValue = undefined
  this.testingHeader = 'PRE-TESTING' || undefined
  this.testingSkill = undefined

  this.existingTestTimer = new Timer({
   duration: 5,
  })
  this.mainBody = this._parserHtmlTag(this._remindExistingExamElement())

  this.existingTestCountDownInterval = undefined

  this._parentAppendChild()
  this._startTimer()

  $(function () {
   $('[data-toggle="tooltip"]').tooltip({
    template: `<div class="ml-1 tooltip" role="tooltip"><div class="arrow "></div><div class="tooltip-inner bg-white text-primary py-2 px-3 shadow-sm"></div></div>`,
   })
  })

  this._setUpProgressBar()
 }

 _getParentNode() {
  return this.parent
 }

 _getTimerElement() {
  return this.mainBody.querySelector('')
 }

 _getProgressBar() {
  return this.mainBody.querySelector('#progressBar')
 }

 _setUpProgressBar() {
  //   const progress = #progressBar'
  this.progress = new ShowProgressBar({
   progressbarparent: this._getProgressBar(),
   actualValue: 10,
   maximumValue: 20,
  })
  this.progress._setInitiatedProgressBarValue()
 }

 _isRequestSuccess() {
  new ApiService()
   .then((result) => {
    console.log(result)
   })
   .catch((err) => {
    console.log(err)
   })
 }

 //  _createTestingHeader() {
 //   this.mainBody = this._generateExistedTestReminder()
 //   this.mainBody
 //  }

 _parentAppendChild() {
  //   this.mainBody = this._parserHtmlTag(this._remindExistingExamElement())
  this.containerParent.appendChild(this.mainBody)
 }

 _getReDoExamActionButton() {
  return this.mainBody.querySelector('#reDoExamActionButton')
 }

 _getTimerElement() {
  return this.mainBody.querySelector('#timer')
 }

 _startTimer() {
  this.existingTestCountDownInterval = setInterval(() => {
   this.existingTestTimer._reducingTimeLeft()
   this.existingTestTimer._adjustTimerDisplay(this._getTimerElement())

   if (this.existingTestTimer.duration === 0) {
    this._adjustButtonTextContent()
    clearInterval(this.existingTestCountDownInterval)
   }
  }, 1000)
 }

 _adjustButtonTextContent() {
  const button = this._getReDoExamActionButton()
  button.textContent = `จบการทดสอบ`
 }

 _remindExistingExamElement() {
  const skill = `Black tea<br>Green tea`
  return `<div class=" bg-white rounded col-lg-12 col-md-6 col-sm-12 px-3 py-3">
         <div class="d-flex flex-row justify-content-between align-items-center">
             <div class="d-flex flex-column col-4 p-1">
                 <div>
                 <h5 class="text-dark font-weight-bold m-0">${
                  this.testingHeader
                 }</h5>
  
              <div class="my-1">
                  <small id="testTooltip" class="text-secondary" data-toggle="tooltip" data-placement="right" data-html="true"  title="${skill}">ทักษะที่ใข้ทดสอบ <div class="circle">2</div></small>
              </div>
  
                     <div  id="progressBar">
                     </div>

                 </div>
             </div>
    
             <div class="d-flex flex-column p-1">
                 <div>
                     <small class="text-secondary font-weight-light">เวลาที่เหลือ</small>
                     <h6 id="timer" class="text-primary font-weight-bold">
                         <bold>${this.existingTestTimer._getTimeStringWithOutThai()}</bold>
                     </h6>
                 </div>
             </div>
    
             <div class="d-flex flex-column p-1">
                 <div class="d-flex flex-column">
                     <div id="timeCounterParent" class="d-flex flex-row p-0 align-items-center">
                         <a id='reDoExamActionButton' href="" class="btn btn-sm btn-secondary">ทดสอบ</a>
                     </div>
                 </div>
             </div>
         </div>
    
    
     </div>`
 }
}

export default TestingHeader
