import DashboardElementClass from '../../js/class/dashboardelement'
import Apiservice from '../../js/class/services'
import List from 'list.js'
import history from '../../history.json'
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper'

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay])

export default class runDashboardPage extends DashboardElementClass {
 constructor() {
  super()
  this.userData = history
  this.userSelectedSkills = undefined
  this.userTableList = undefined
  this.SwiperContainer = undefined
  this.tableUserHistory = undefined

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
  this._setupHistoryTable()
  this._setUserHistoryTable()
  this._setupSelectedSkillsSection()
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
  this._executeSwiperContainer()
 }

 _setUserHistoryTable() {
  const option = {
   valueNames: this.dataHistoryValue,
   item: this._userHistoryRow(),
   pagination: true,
   page: 3,
  }

  const values = this.userData.history
  this.tableUserHistory = new List('dataTable', option, values)
  this._setTableEventListener()
 }

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

 _executeSwiperContainer() {
  this.SwiperContainer = new Swiper('.swiper-container', {
   slidesPerView: 3,
   spaceBetween: 15,
   autoplay: {
    delay: 3500,
    disableOnInteraction: true,
   },
   loop: true,
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
   },
   breakpoints: {
    // when window width is >= 320px
    320: {
     slidesPerView: 2,
     spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
     slidesPerView: 2,
     spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
     slidesPerView: 2,
     spaceBetween: 20,
    },
    768: {
     slidesPerView: 3,
     spaceBetween: 20,
    },
   },
  })
 }

 _appendHistoryKeyToDataHistoryValue() {
  if (this.userData !== undefined) {
   for (const key in this.userData.history[0]) {
    this.dataHistoryValue.push(key)
   }
  }
 }

 _appendSelectedSkillItems(selectedSkillsParent) {
  for (let i = 0; i < this.userData.items.length; i++) {
   const skillcard = new this.Skillcard({
    relatedskill: this.userData.items[i].skills,
    titlename: this.userData.items[i].testname,
    term: `${this.userData.items[i].choicenumber} ข้อ ${
     this.userData.items[i].time == null
      ? '/ ไม่กำหนดเวลา'
      : this.userData.items[i].time
    }`,
    parents: selectedSkillsParent,
   })
   this._setupEventSelectedSkillButton(skillcard.button)
  }
 }

 _setupEventSelectedSkillButton(button) {
  return button.addEventListener('click', (e) => {
   e.preventDefault()

   const a = new this.confirmModal({})
   a.trueButton.addEventListener('click', (e) => {
    window.location.href = './testing'
   })
  })
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

 _requestToUserHistory() {
  return true
 }

 _throwNewError() {
  throw 'ss'
 }
}
