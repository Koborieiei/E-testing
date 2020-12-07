import DashboardElementClass from '../../js/class/dashboardelement'
import Apiservice from '../../js/class/services'
import List from 'list.js'
import history from '../../history.json'
// import Swiper, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper'
import AlertModal from '../../js/class/alertmodal'

// configure Swiper to use modules
// Swiper.use([Navigation, Pagination, Autoplay])

export default class runDashboardPage extends DashboardElementClass {
 constructor() {
  super()
  this.userData = history
  this.userSelectedSkills = undefined
  this.skillUrl = undefined
  this.SwiperContainer = undefined
  this.tableUserHistory = undefined

  this.numberOfLoadedItem = 2
  this.maxItemofSkillCard = 3
  this.loadMoreButton = undefined
  this.dataHistoryValue = []

  if (this._render() === false) {
   // Create function here
   console.log('true')
   const newele = document.createElement('div')
   newele.textContent = 'dddd'
   this._appAppendChild(newele)
  }
 }

 _render() {
  // return false
  if (!this._requestToUserHistory()) {
   return false
  }

  this._setupPageHeader()
  this._setupSelectedSkillsSection()
  this._setupHistoryTable()
  this._setUserHistoryTable()
 }

 _setupHistoryTable() {
  const historyTableSection = this._generateUserHistoryTable()
  this._appendHistoryKeyToDataHistoryValue()
  return this._appAppendChild(historyTableSection)
 }

 _setupPageHeader() {
  return this._appAppendChild(this._generatePageHeader())
 }

 _setupSelectedSkillsSection() {
  const selectedSkillsSection = this._generateUserSelectedSkills()
  const selectedSkillsParent = selectedSkillsSection.querySelector(
   '#selectedSkillsParent'
  )

  this._appendSelectedSkillItems(selectedSkillsParent)
  this._appAppendChild(selectedSkillsSection)
  // this._executeSwiperContainer()
  this._setupLoadMoreButton()
 }

 _toggledMoreSkillCard() {
  Array.from(document.querySelectorAll('.hiddenStyle')).map((item, index) => {
   if (index < this.numberOfLoadedItem) {
    item.classList.remove('hiddenStyle')
   }
  })
 }

 _removeLoadMoreButton() {
  if (document.querySelectorAll('.hiddenStyle').length === 0) {
   this.loadMoreButton.style.display = 'none'
  }
 }
 _setUserHistoryTable() {
  var showpage = 1
  document.querySelector('#nextTable').addEventListener('click', (e) => {
   let isLast =
    this.tableUserHistory.i >
    this.tableUserHistory.matchingItems.length - this.tableUserHistory.page
   if (!isLast) {
    showpage = showpage + 1
    this.tableUserHistory.show(showpage, 3)
   }
  })

  const option = {
   valueNames: this.dataHistoryValue,
   item: this._userHistoryRow(),
   pagination: true,
   page: 3,
  }

  const values = this.userData.history
  this.tableUserHistory = new List('dataTable', option, values)
  // this.tableUserHistory.show(2,4)

  this._setTableEventListener()
 }

 _setUpSkillLoadMore() {}

 _setTableEventListener() {
  this.tableUserHistory.on('searchComplete', () => {
   if (this._countNumberOfTableList() === 0) {
    this._displayNotFoundSearchResult()
   }
  })
 }

 _displayNotFoundSearchResult() {
  const table = this._getTableElement()
  table.querySelector('.list').appendChild(this._generateNotFoundSearchResult())
 }

 _countNumberOfTableList() {
  const table = this._getTableElement()
  const numberOflist = table.querySelector('.list').children
  return numberOflist.length
 }

 //  _executeSwiperContainer() {
 //   this.SwiperContainer = new Swiper('.swiper-container', {
 //    slidesPerView: 3,
 //    spaceBetween: 15,
 //    autoplay: {
 //     delay: 3500,
 //     disableOnInteraction: true,
 //    },
 //    loop: false,
 //    navigation: {
 //     nextEl: '.swiper-button-next',
 //     prevEl: '.swiper-button-prev',
 //    },
 //    breakpoints: {
 //     // when window width is >= 320px
 //     320: {
 //      slidesPerView: 2,
 //      spaceBetween: 20,
 //     },
 //     // when window width is >= 480px
 //     480: {
 //      slidesPerView: 2,
 //      spaceBetween: 20,
 //     },
 //     // when window width is >= 640px
 //     640: {
 //      slidesPerView: 2,
 //      spaceBetween: 20,
 //     },
 //     768: {
 //      slidesPerView: 3,
 //      spaceBetween: 20,
 //     },
 //    },
 //   })
 //  }

 _appendHistoryKeyToDataHistoryValue() {
  if (this.userData !== undefined) {
   for (const key in this.userData.history[0]) {
    this.dataHistoryValue.push(key)
   }
  }
 }

 _appendSelectedSkillItems(selectedSkillsParent) {


  this.userData.items.map((item, index) => {
   const skillcard = new this.Skillcard({
    relatedskill: item.skills,
    titlename: item.testname,
    term: `${item.choicenumber} ข้อ ${
     item.time == null ? '/ ไม่กำหนดเวลา' : '/ ' + item.time + 'นาที'
    }`,
    parents: selectedSkillsParent,
    img: item.img,
    testingType: item.testingtype,
   })

   //  skillcard.mainContainer.classList.add('hiddenStyle')
   this._setupEventSelectedSkillButton(skillcard.button)
   if (index > this.maxItemofSkillCard - 1) {
    skillcard.mainContainer.classList.add('hiddenStyle')
   }
  })
 }

 _setupEventSelectedSkillButton(button) {
  button.addEventListener('click', (e) => {
   console.log(e.target.value)
   const confirmModal = new this.confirmModal({
    headerText: 'ยืนยัน',
    ModalContent: `การทดสอบมีเงื่อนไขตามที่อธิบายไว้ดังนี้ \n 1. ผู้ใช้ไม่สามารถทดสอบพร้อมกันได้มากกว่า 1 ทักษะ`,
    skillQueryString: e.target.value,
   })
   confirmModal.trueButton.addEventListener('click', () => {
    //this need to send the may endpoint
    //     Need to change the this function to be called out side this file
    window.location.href = `./testing/?${e.target.value}`
   })
  })
 }

 _askToDoTesting() {
  //  If send this to ask to test if find id record just resp as a result then just redirect to result page
  window.location.href = `./testing?skill=null`
 }

 _setupLoadMoreButton() {
  this.loadMoreButton = document.querySelector('#loadmore')
  this.loadMoreButton.addEventListener(
   'click',
   (e) => {
    this._toggledMoreSkillCard()
    this._removeLoadMoreButton()
   },
   false
  )
 }

 _getTableElement() {
  return document.querySelector('#dataTable')
 }

 _storeUserSelectedSkills() {
  this.userSelectedSkills = new Apiservice()
   ._getQuestionObjects()
   .then((resp) => {
    return resp.json()
   })
 }

 _showAlertErrorModal(err) {
  new AlertModal({
   alertMsg: err,
   type: 'error',
  })
 }

 _showAlertSuccessModal(text) {
  new AlertModal({
   alertMsg: text,
   type: 'success',
  })
 }

 _requestToUserHistory() {
  return true
 }

 _throwNewError() {
  throw 'ss'
 }
}
