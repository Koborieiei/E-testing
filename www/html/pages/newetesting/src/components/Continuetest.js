import * as DomControlFunction from '../../utils/DomController'
import Timer from '../../utils/Timer'
import ConfirmModal from '../../utils//ConfirmModal'
import ShowProgressBar from '../../utils/ProgressBar'

class ContinueTest {
 constructor({
  containerParent,
  duration,
  testingHeader,
  numberOfAnswer,
  numberOfQuestion,
  testingSkill,
  testingType,
 }) {
  this.duration = duration
  this.containerParent = containerParent || undefined
  this.numberOfAnswer = numberOfAnswer || undefined
  this.numberOfQuestion = numberOfQuestion || undefined
  this.testingHeader = testingHeader || undefined
  this.testingSkill = testingSkill || undefined

  this.existingTestCountDownInterval = undefined

  this.skillIdContainers = {
   service: testingType,
   skill_id: testingSkill.map((skill) => skill.skillid),
  }

  this.mainBody = DomControlFunction.parserHtmlTag(
   this._remindExistingTestElement()
  )
  this._initTestingHeader()

//   console.log(this.skillIdContainers)
 }

 _initTestingHeader() {
  this._parentAppendChild()
  this._setContinueTestTimer()
  this._startTimer()
  this._setUpProgressBar()
  this._initToopTipFunction()
 }

 _setUpProgressBar() {
  const progressBarOption = {
   color: '#1CC88A',
   trailColor: '#D1D3E2',
   svgStyle: {
    width: '100%',
    height: '8px',
   },
  }

  this.progress = new ShowProgressBar({
   progressbarparent: this._getProgressBar(),
   actualValue: this.numberOfAnswer,
   maximumValue: this.numberOfQuestion,
   options: progressBarOption,
  })

  this.progress._setInitiatedProgressBarValue()
 }

 _startTimer() {
//   console.log(this.existingTestTimer.duration)

  if (
   this.existingTestTimer.duration ||
   this.existingTestTimer.duration === 0
  ) {
   this.existingTestCountDownInterval = setInterval(() => {
    this.existingTestTimer._reducingTimeLeft()
    this.existingTestTimer._adjustTimerDisplay()
    this._isTestTimeOut()
   }, 1000)
  }
 }

 _isTestTimeOut() {
  if (this.existingTestTimer.duration < 1) {
   this._showTimeOutAlert()
   this._adjustButtonTextContent()
   clearInterval(this.existingTestCountDownInterval)
  }
 }

 _showTimeOutAlert() {
  const timeOutAlertModal = new ConfirmModal({
   ModalContent: 'หมดเวลาการทดสอบแล้ว',
   headerText: 'การแจ้งเตือน',
   backdrop: false,
  })
  timeOutAlertModal.falseButton.remove()
  timeOutAlertModal.trueButton.href = `./testing?${this._generateSkillURI()}`
  timeOutAlertModal.footer.classList.add('m-auto')
 }

 _initToopTipFunction() {
  $(function () {
   $('[data-toggle="tooltip"]').tooltip({
    template: `<div class="ml-1 tooltip" role="tooltip"><div class="arrow "></div><div class="tooltip-inner bg-white text-primary py-2 px-3 shadow-sm"></div></div>`,
   })
  })
 }

 _setContinueTestTimer() {
  this.existingTestTimer = new Timer({
   duration: this.duration,
   display: this._getTimerElement(),
  })
  this.existingTestTimer._setTimeCountdownText()
 }

 _parentAppendChild() {
  this.containerParent.appendChild(this.mainBody)
 }

 _adjustButtonTextContent() {
  const button = this._getReDoExamActionButton()
  button.textContent = `จบการทดสอบ`
 }

 _generateSkillTooltip() {
  return this.testingSkill.map((skill) => skill.skillname).join('<br>')
 }

 _pustSkillIdIntoSkillIdContainers(skillid) {
  this.skillIdContainers.skill_id.push(parseInt(skillid))
 }

 _generateSkillURI() {
  return encodeURIComponent(JSON.stringify(this.skillIdContainers))
 }

 _getTestingSkillLength() {
  return this.testingSkill.length
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

 _getReDoExamActionButton() {
  return this.mainBody.querySelector('#reDoExamActionButton')
 }

 _getTestingUrl() {
  return `./testing?${this._generateSkillURI()}`
 }

 _getTimerElement() {
  return this.mainBody.querySelector('#timer')
 }

 _remindExistingTestElement() {
  const skill = this._generateSkillTooltip()
  const testingSkillLength = this._getTestingSkillLength()

  return `<div data-skillur="${this._generateSkillURI()}" class="mt-3 bg-white rounded col-lg-12 col-md-12 col-sm-12 px-3 py-3">
         <div class="d-flex flex-row justify-content-between align-items-center">
             <div class="d-flex flex-column col-4 p-1">
                 <div>
                 <h5 class="text-dark font-weight-bold m-0">${
                  this.testingHeader
                 }</h5>
  
              <div class="my-1">
                  <small id="testTooltip" class="text-secondary" data-toggle="tooltip" data-placement="right" data-html="true"  title="${skill}">ทักษะที่ใข้ทดสอบ <div class="circle">${testingSkillLength}</div></small>
              </div>
  
                     <div  id="progressBar">
                     </div>

                 </div>
             </div>
    
             <div class="d-flex flex-column p-1">
                 <div>
                     <small class="text-secondary font-weight-light">เวลาที่เหลือ</small>
                     <h6 id="timer" class="text-primary font-weight-bold">
                         <bold></bold>
                     </h6>
                 </div>
             </div>
    
             <div class="d-flex flex-column p-1">
                 <div class="d-flex flex-column">
                     <div id="timeCounterParent" class="d-flex flex-row p-0 align-items-center">
                         <a id='reDoExamActionButton' href="${this._getTestingUrl()}" class="btn btn-sm btn-primary">ทดสอบ</a>
                     </div>
                 </div>
             </div>
         </div>
    
    
     </div>`
 }
}

export default ContinueTest
