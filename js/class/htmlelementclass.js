import Button from './button'
import confirmModal from './ConfirmModal'
import alertModal from './alertmodal'

export default class HtmlElementClass {
 constructor() {
  this.body = document.querySelector('#app')
  // this.htmlTagComponents = htmlTagComponents || undefined
  this.confirmModal = confirmModal || undefined
  this.alertModal = alertModal || undefined

  this.backButton = undefined
  this.nextButton = undefined
  this.retestButton = undefined
  this.dashboardButton = undefined
 }

 _generateQuestionHeader() {
  return this._parserHtmlTag(this._questionHeaderTag())
 }

 _generateQuestionSelector() {
  return this._parserHtmlTag(this._questionSelector())
 }

 //  _generateQuestionSelector() {
 //   return this._parserHtmlTag(this._questionSelector())
 //  }

 _generateQuestionSelectorBottom() {
  return this._parserHtmlTag(this._questionSelectorBottom())
 }

 _generateQuestionBody() {
  return this._parserHtmlTag(this._questionBodyTag())
 }

 _generateResultBody() {
  return this._parserHtmlTag(this._displayResult())
 }

 _generateDisplayErrorHandle() {
  return this._parserHtmlTag(this._displayErrorHandle())
 }

 _generateTestPageButtonContainer() {
  const tag = this._buttonContainer()
  const htmltag = this._parserHtmlTag(tag)

  this.backButton = new Button({
   textButton: 'ย้อนกลับ',
   disable: false,
   body: htmltag.children[0],
   id: 'backButton',
  })

  // GEN FOREWARD BUTTON
  this.nextButton = new Button({
   textButton: 'ถัดไป',
   disable: false,
   body: htmltag.children[1],
   id: 'nextButton',
  })
  return htmltag
 }

 _generateResultSkillDisplay() {
  return this._parserHtmlTag(this._displayTestingSkills())
 }

 _generateDisplayReccommendCourse() {
  return this._parserHtmlTag(this._reccomendedCourseElement())
 }

 _generateNewSkillBadgeElement() {
  return this._parserHtmlTag(this._createNewEmptyskillBadge())
 }

 _generateExistedTestReminder() {
  return this._parserHtmlTag(this._remindExistingExamElement())
 }

 _generateResultPageButtonContainer() {
  const tag = this._buttonContainer()
  const htmltag = this._parserHtmlTag(tag)

  this.retestButton = new Button({
   textButton: 'เริ่มทำใหม่',
   disable: false,
   body: htmltag.children[0],
   id: 'retestButton',
  })

  this.retestButton.button.classList.remove('btn-primary')
  this.retestButton.button.classList.add('btn-outline-primary')

  // GEN FOREWARD BUTTON
  this.dashboardButton = new Button({
   textButton: 'กลับหน้าแรก',
   disable: false,
   body: htmltag.children[1],
   id: 'dashboardButton',
  })
  return htmltag
 }

 // Generate Question Body
 _parserHtmlTag(htmlTag) {
  const parser = new DOMParser()
  const parsedBody = parser.parseFromString(htmlTag, 'text/html')
  return parsedBody.body.firstChild
 }

 _appAppendChild(htmlNode) {
  return app.appendChild(htmlNode)
 }

 _questionHeaderTag() {
  return `<div class="bg-white rounded py-2">
  <div class="d-flex justify-content-around flex-column ">
      <div class="d-flex justify-content-between align-items-center flex-row px-3 ">
          <div class="d-flex flex-column p-1">
              <div class="">
                  <h5 class="text-dark font-weight-bold" id='testMainTextHeader'>Pre-Testing</h5>
                  <h6 id="testSecondTextHeader">แบบทดสอบก่อนเรียน</h6>
              </div>
          </div>

          <div class="d-flex flex-column p-1">
              <div>
                  <small class="text-secondary font-weight-light">เวลาที่เหลือ</small>
                  <h5 id="timer" class="text-primary font-weight-light"></h5>
              </div>
          </div>

          <div class="d-flex flex-column p-1">
              <div class="d-flex flex-column">
                  <small class="text-secondary font-weight-light">จำนวนข้อ</small>
                  <div id="timeCounterParent" class="d-flex flex-row p-0 align-items-center">
                      <h4 class="text-primary font-weight-light" id="counterNumber"></h4>
                      <h4 class="text-primary font-weight-light" id="totalQuestionNumber"></h4>
                  </div>
              </div>
          </div>
      </div>
      <div id="progressBar"></div>
  </div>
</div>
      `
 }

 _questionSelector() {
  return `
  <div id="contentBody" class="row m-0 flex-row-reverse justify-content-between mt-4">
    <div  class="d-flex flex-column my-3 col-lg-3 col-sm-12 p-0" >
        <div class="bg-white py-2 px-3 rounded" id="questionSelector">
            <div class='my-3 '>
                <h6 class='text-dark'>ตัวเลือกคำถาม</h6>
            </div>
        </div>
    </div>
    <div id='question' class="my-2 col-lg-8 col-sm-12 p-0 pr-2">
  </div>
  </div>
`
 }

 //  _reccomendedCourseElement() {
 //   return `<div>
 //   <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
 //     Button with data-target
 //   </button><div class="collapse" id="collapseExample">
 //   <div class="card card-body">
 //   <div>
 //   New course
 //   <button> Register </button>
 //   </div>
 // </div>
 // </div>
 //   </div>`
 //  }

 _questionSelectorBottom() {
  return `<div class="d-flex mt-2 align-items-center justify-content-center flex-row" >
    <div><i id="toggleIcon" data-toggle="collapse" href="#selectorCollapseRow" role="button" aria-expanded="false" aria-controls="multiCollapseExample1" style="font-size: 30px;" class="txt-primary "></i></div>
</div>`
 }

 _questionBodyTag() {
  return `
  <div id='question' class="my-2 col-lg-9 col-sm-12">
      </div>
      `
 }

 _changeEtestingLinkToDefault() {
  document.querySelector('#etestingLink').href = `../`
 }

 _displayResult() {
  return `<div class="row bg-white m-0 my-5 py-3 rounded text-center">
    <div class="col-6 d-flex pt-4 flex-column  ">
        <div class="bg-white m-auto">
        <i style="font-size: 4rem" class=" fas fa-medal text-primary"></i>
        </div>
        <div class="mt-4" style="min-height:100px;">
            <span>คะแนนที่ได้รับ</span>
            <p class="h5 mt-2 text-dark font-weight-bold" id="displayPoint"></p>
        </div>
    </div>
    <div class="col-6 d-flex pt-4 flex-column ">
        <div class="bg-white m-0">
        <i style="font-size: 4rem" class="mt-0 text-primary fas fa-hourglass-half"></i>
        </div>
        <div class="mt-4" style="min-height:100px;">
            <span>ระยะเวลาที่ใช้</span>
            <p id="timeSpending" class="h5 mt-2 text-dark font-weight-bold"></p>
        </div>
    </div> 
  </div>`
 }

 // Waiting to chagne the result
 _displayTestingSkills() {
  return `<div class="rounded bg-white mb-5 py-2 ">
    <div class="px-3 py-2 font-weight-light">สัดส่วนคะแนนแต่ละทักษะ</div>
    <div id="displaySkills" class="px-3 py-2 row m-0">
    </div>
  </div>`
 }

 _createNewEmptyskillBadge() {
  return `<div class="col-auto mb-2 mr-2 bg-light rounded">
  <small class="text-dark"></small>
  <p class=" font-weight-bold text-primary m-0"></p>
</div>
`
 }

 

 _reduceDemical(percentage) {
  return Math.round(percentage)
 }

 _buttonContainer() {
  return `<div id="buttonContainer" class="row m-0 mb-5 justify-content-between">
    <div class="col-5 p-0"></div>
    <div class="col-5 p-0"></div>
  </div>`
 }

 _questionSecondTextHeader(message) {
  return message.replace(/ /g, '') == `PRE-TEST`
   ? `แบบทดสอบก่อนเรียน`
   : `แบบทดสอบหลังเรียน`
 }

 _displayErrorHandle() {
  return `<div class="text-center">อุ๊ปส์.. ไม่พบข้อมูลในระบบ <button class="btn btn-primary">Refresh</button></div>`
 }
}
