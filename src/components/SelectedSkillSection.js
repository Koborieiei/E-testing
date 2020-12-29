import DomController, * as DomControlFunction from '../utils/Domcontroller'
import SkillCard from './Skillcard.js'
import Timer from '../../js/class/Timer'

export default class SelectedSkillSection extends DomController {
 constructor({ selectedSkillsData }) {
  super()
  this.selectedSkillsData = selectedSkillsData || undefined
  this.NUMBER_OF_LOADED_ITEM = 2
  this.MAX_ITEM_OF_SKILLCARD = 3
  this.isSkillCardOverMaxItem = false

  this.selectedSkillSectionDiv = DomControlFunction.parserHtmlTag(
   SelectedSkillSectionDiv()
  )

  this.selectedSkillParentDiv = this.selectedSkillSectionDiv.querySelector(
   '#selectedSkillsParent'
  )

  this._createSelectedSkillSection()
 }

 _createSelectedSkillSection() {
  try {
   this.selectedSkillSectionDiv.appendChild(this.selectedSkillParentDiv)
   this.generateSelectedSkillCardParent()
   this.generateButtonElement()
   this._appendToBody(this.getSelectedSkillSectionElement())
  } catch (error) {
   console.log(error)
  }
 }

 generateButtonElement() {
  if (this.isSkillCardOverMaxItem) {
   const LoadMoreButtonElement = DomControlFunction.parserHtmlTag(
    LoadMoreButtonElementDiv()
   )
   this.selectedSkillSectionDiv.appendChild(LoadMoreButtonElement)
   this._setupLoadMoreButton()
  }
 }

 generateSelectedSkillCardParent() {
  const selectedSkillData = this.selectedSkillsData

  selectedSkillData.map((item, index) => {
   this._generateSkillCard(item)
   this._isThisSkillCardShouldBeHind(index)
  })
 }

 _generateSkillCard(item) {
  this.SkillCardComponent = new SkillCard({
   relatedSkill: item.skills,
   titleName: item.testname,
   term: generateSkillCardTerm(item.choicenumber, item.time),
   parents: this.selectedSkillParentDiv,
   img: item.img,
   testingType: item.testingtype,
  })
 }

 _isThisSkillCardShouldBeHind(index) {
  if (index > this.MAX_ITEM_OF_SKILLCARD - 1) {
   this.isSkillCardOverMaxItem = true
   this.SkillCardComponent.mainContainer.classList.add('hiddenStyle')
  }
 }

 _setupLoadMoreButton() {
  this.loadMoreButton = this.selectedSkillSectionDiv.querySelector('#loadmore')
  this.loadMoreButton.addEventListener(
   'click',
   (e) => {
    this._toggledMoreSkillCard()
    this._removeLoadMoreButton()
   },
   false
  )
 }

 _toggledMoreSkillCard() {
  Array.from(document.querySelectorAll('.hiddenStyle')).map((item, index) => {
   if (index < this.NUMBER_OF_LOADED_ITEM) {
    item.classList.remove('hiddenStyle')
   }
  })
 }

 _removeLoadMoreButton() {
  if (document.querySelectorAll('.hiddenStyle').length === 0) {
   this.loadMoreButton.style.display = 'none'
  }
 }

 generateErrorHandle() {
  const EmptySkillAlertElementDiv = EmptySkillAlertElementDiv()
 }

 getSelectedSkillSectionElement() {
  return this.selectedSkillSectionDiv
 }
}

const generateSkillCardTerm = (choicenumber, duration) => {
 const durationInString = new Timer({
  duration: duration,
 })._timeToStringWithThai()

 return `${choicenumber} ข้อ / ${durationInString}`
}

const SelectedSkillSectionDiv = () => {
 return `<section class="my-5 d-flex flex-column justify-content-center">
    <h5 class="text-dark">ทักษะที่เลือกไว้</h5>
    <div id="selectedSkillsParent" class="row m-0"></div>
</section>`
}

const LoadMoreButtonElementDiv = () => {
 return `<div class="m-auto">
 <button class="mt-4 btn loadMoreButton" id="loadmore">
  แสดงเพิ่มเติม
 </button>
</div>`
}

const EmptySkillAlertElementDiv = () => {
 return `<div class="m-auto row pt-4">
 <div class="col-md-12 d-flex flex-row text-left">
    <div class="error-image>
    <img></img>
    </div>
    <div class="error-template">
   <h2>ขออภัย..</h2>
   <h3>ขณะนี้ไม่พบทักษะที่คุณเลือก</h3>
   <div class="error-details">กรุณาเลือกทักษะก่อนเริ่มทำแบบทดสอบ</div>
   <div class="mt-3 error-actions">
        <a href="../profile" class="btn btn-primary btn-sm">
        <span class="glyphicon glyphicon-home"></span>เลือกทักษะ
        </a>
   </div>
  </div>
 </div>
</div>`
}
