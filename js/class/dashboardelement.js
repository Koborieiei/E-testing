import Button from './button'
import confirmModal from './ConfirmModal'
// import Skillcard from '../../src/components/Skillcard'
import alertModal from './alertmodal'
import Apiservice from './services'

export default class DashboardElementClass {
 constructor() {
  this.body = undefined
  this.confirmModal = confirmModal || undefined
//   this.Skillcard = Skillcard || undefined
  this.alertModal = alertModal || undefined
 }

 _generateUserHistoryTable() {
  return this._parserHtmlTag(this._historySectionHtmlTag())
 }
 _generatePageHeader() {
  return this._parserHtmlTag(this._pageHeaderTag())
 }

 _generateUserHistoryRow() {
  return this._parserHtmlTag(this._userHistoryRow())
 }

 _generateUserSelectedSkills() {
  return this._parserHtmlTag(this._selectedSkillSection())
 }

 _generateUserSelectedSkillItems() {
  return this._parserHtmlTag(this._selectedSkillItems())
 }

 _generateNotFoundSearchResult() {
  return this._parserHtmlTag(this._notfoundSearchResult())
 }

 _generateEmptySkillAlert() {
  return this._parserHtmlTag(this._displayEmptySkillAlert())
 }

 _generateSkillBadge(skillname) {
  return (this._parserHtmlTag(
   this._recommendSkillBadgeTag()
  ).textContent = skillname)
 }

 _generateDescriptionHeader() {
  return this._parserHtmlTag(this._descriptionHeaderTag())
 }

 _generateExistingTesting() {
  return this._parserHtmlTag(this._existingTestingElement())
 }

 _generateLoadMoreButton() {
  return this._parserHtmlTag(this._LoadMoreButtonElement())
 }

 _generateDescriptionBody() {
  return this._parserHtmlTag(this._descriptionBodyTag())
 }

 _generateExistingTestSection() {
  return this._parserHtmlTag(this._continueTestSection())
 }

 _pageHeaderTag() {
  return `<div>
    <h2 class="text-dark m-0">E-testing</h2>
    <small class="text-muted">ทดสอบความเข้าใจที่มีต่อทักษะของเรา</small>
    </div>
    `
 }

 _continueTestSection() {
  return `<section id='existingTest' class="mt-5 ">
     <div class="headerWrapper mb-3">
     ${this._skillHeaderSectionText('บททดสอบที่พักไว้ 🔥')}
     </div>
 
     
     </section>`
 }

 _historySectionHtmlTag() {
  return `<div>
        <div id="dataTable" class="my-4">
            ${this._skillHeaderSectionText('ประวัติการสอบ')}
            <div class="d-flex flex-row my-1">
            <input class="search mr-1 form-control col-4" placeholder="Search" />
        <button class="btn mx-1 btn-outline-secondary sort" data-sort="timestamp">Sort by date</button>
            </div>
            <div>
                <div class="mt-4 font-weight-light py-3 d-flex bg-secondary text-primary flex-row align-items-center rounded justify-content-around">
                    <div class="col-3">จำนวนครั้ง</div>
                    <div class="col-4">เวลา | ข้อ</div>
                    <div class="col-3 text-left">วันที่สอบ</div>
                </div>
            </div>
            <div  class="list">
            </div>

            <div class="text-center mt-3 justify-content-center  pagination">
            </div>
            
        </div>
    </div>`
 }

 _userHistoryRow() {
  return `<div class="mb-2 py-3 my-2 d-flex bg-white align-items-center flex-row justify-content-around rounded">
    <div class="col-3 d-flex flex-column">
        <div class="text-dark testname"></div>
        <div class="type col-sm-5 col-xs-5 col-lg-5 col-md-5 font-weight-light badge-secondary badge"></div>
    </div>
    <div id="testingResult" class="text-dark col-4 "><span class="timeused"></span> | <span class="choicenumber"></span> ข้อ </div>
    <div class="col-3 text-dark text-left timestamp"></div>
</div>`
 }

 _recommendSkillBadgeTag() {
  return `<div class="m-1 badge-secondary badge font-weight-light"></div>`
 }

 _notfoundSearchResult() {
  return `<div class="row justify-content-center m-0 mt-4">
  <h4 class="text-secondary font-weight-light">ไม่พบข้อมูล</h4>
  </div>`
 }

 // Waiting to change
 _selectedSkillSection() {
  //   return `<div class="my-5">
  //     ${this._skillHeaderSectionText('   ที่เลือกไว้')}
  //     <div class="swiper-container">

  //         <div id="selectedSkillsParent" class="">
  //         </div>

  //         <!-- Add Arrows -->
  //         <div class="swiper-button-next"></div>
  //         <div class="swiper-button-prev"></div>

  //     </div>
  //   </div>`
  return `<div class="my-5">
    ${this._skillHeaderSectionText('ทักษะที่เลือกไว้')}
    <div class="d-flex flex-column justify-content-center ">

        <div id="selectedSkillsParent" class="row m-0">
        </div>
        
       
        
    </div>
  </div>`
 }

 _LoadMoreButtonElement() {
  return ` <div class="m-auto">
     <button class="mt-4 btn loadMoreButton" id="loadmore"> แสดงเพิ่มเติม </button>

     </div>`
 }

 _displayEmptySkillAlert() {
  return `<div class="m-auto row pt-4">
     <div class="col-md-12 text-left">
         <div class="error-template">
             <h2>
                 ขออภัย..</h2>
             <h3>ดูเหมือนว่าไม่พบทักษะเพื่อทดสอบ</h3>
             <div class="error-details">
                 กรุณาเลือกทักษะที่สนใจก่อนเข้าทดสอบ
             </div>
             <div class="mt-3 error-actions">
                 <a href="../profile" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>เลือกทักษะ</a>
             </div>
         </div>
     </div>
 </div>`
 }

 _existingTestingElement() {
  return `<div class="bg-white rounded py-2">
     <div class="d-flex justify-content-around flex-column ">
         <div class="d-flex justify-content-between align-items-center flex-row px-3 ">
             <div class="d-flex flex-column p-1">
                 <div class="">
                     <h5 class="text-dark font-weight-bold m-0">Pre-Testing</h5>
                     <small>ทักษะ 2</small>
                 </div>
             </div>

             <div class="d-flex flex-column p-1">
                 <div>
                     <small class="text-secondary font-weight-light">เวลาที่เหลือ</small>
                     <h5 id="timer" class="text-primary font-weight-light">33:33:33</h5>
                 </div>
             </div>

             <div class="d-flex flex-column p-1">
                 <div class="d-flex flex-column">
                     <div id="timeCounterParent" class="d-flex flex-row p-0 align-items-center">
                         <a href="" class="btn btn-primary btext-white ">test</a>
                     </div>
                 </div>
             </div>
         </div>
         <div id="progressBar"></div>
     </div>
 </div>`
 }

 _skillHeaderSectionText(text) {
  return `<h5 class="text-dark">${text}</h5>`
 }

 _descriptionHeaderTag() {
  return `<dt></dt>`
 }

 _descriptionBodyTag() {
  return `<dd></dd>`
 }

 _parserHtmlTag(htmlTag) {
  const parser = new DOMParser()
  const parsedBody = parser.parseFromString(htmlTag, 'text/html')
  return parsedBody.body.firstChild
 }

 _questionAppendChild(newQuestionChuck) {
  const questionParent = document.querySelector('#question')
  return questionParent.appendChild(newQuestionChuck)
 }

 _appAppendChild(htmlNode) {
  return app.appendChild(htmlNode)
 }

 _appInnerHtmlReplace(htmlNode) {
  app.innerHtml = htmlNode
 }
}
