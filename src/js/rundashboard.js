import DashboardElementClass from '../../js/class/dashboardelement'
import Apiservice from '../../js/class/services'
import Timer from '../../js/class/Timer'
import List from 'list.js'
import history from '../../history.json'
// import Swiper, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper'
import AlertModal from '../../js/class/alertmodal'

// configure Swiper to use modules
// Swiper.use([Navigation, Pagination, Autoplay])

export default class runDashboardPage extends DashboardElementClass {
 constructor() {
  super()
  // this.userData = undefined
  this.userSelectedSkills = undefined
  this.skillUrl = undefined
  this.SwiperContainer = undefined
  this.tableUserHistory = undefined

  this.numberOfLoadedItem = 2
  this.maxItemofSkillCard = 3
  this.loadMoreButton = undefined
  this.dataHistoryValue = []

  this._render()
 }

 _render() {
  // return false
  try {
   this._storeUserSelectedSkills()
   //  console.log(result);
   this._setupPageHeader()
   this._setupSelectedSkillsSection()
   this._setupHistoryTable()
   this._setUserHistoryTable()
   //  new Apiservice._unDisplayLoadingScreen()
  } catch (error) {
   console.log(error)
   //  this._showEmptySkillAlert()
  }
 }

 _showEmptySkillAlert() {
  const selectedSkillsParent = document.querySelector('#selectedSkillsParent')
  // throw '33'
  selectedSkillsParent.parentNode.insertBefore(
   this._generateEmptySkillAlert(),
   selectedSkillsParent
  )
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
  this.userSelectedSkills
   .then((data) => {
    // var showpage = 1
    console.log(data)
    const option = {
     valueNames: this.dataHistoryValue,
     item: this._userHistoryRow(),
     pagination: true,
     page: 3,
    }

    data.history.map((history) => {
     const newTimeMinutes = new Timer({
      duration: history.timeused,
     })._getTimeStringWithThai()
     history.timeused = newTimeMinutes
    })

    const values = data.history
    this.tableUserHistory = new List('dataTable', option, values)
    // this.tableUserHistory.show(2,4)
    this._setTableEventListener()
   })
   .catch((err) => {})
  // document.querySelector('#nextTable').addEventListener('click', (e) => {
  //  let isLast =
  //   this.tableUserHistory.i >
  //   this.tableUserHistory.matchingItems.length - this.tableUserHistory.page
  //  if (!isLast) {
  //   showpage = showpage + 3
  //   this.tableUserHistory.show(showpage, 3)
  //   console.log(showpage)
  //  }
  //  if (showpage >= this.tableUserHistory.items.length) {
  //   showpage = 1
  //   console.log(showpage)
  //  }
  // })
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
  this.userSelectedSkills
   .then((data) => {
    for (const key in data.history[0]) {
     this.dataHistoryValue.push(key)
    }
   })
   .catch((err) => {})
 }

 _detectErrorMassage(msg) {
  if (msg == 'no skill! you have to select skill first' || !msg) {
   throw 'test'
  }
 }

 _appendSelectedSkillItems(selectedSkillsParent) {
  this.userSelectedSkills
   .then((result) => {
    this._detectErrorMassage(result.message)

    result.items.map((item, index) => {
     const timer = new Timer({
      duration: item.time,
     })

     const skillcard = new this.Skillcard({
      relatedskill: item.skills,
      titlename: item.testname,
      term: `${item.choicenumber} ข้อ ${
       item.time == null
        ? '/ ไม่กำหนดเวลา'
        : '/ ' + timer._getOnlyMinuteAndSecondString()
      }`,
      parents: selectedSkillsParent,
      img: item.img,
      testingType: item.testingtype,
     })

     this._setupEventSelectedSkillButton(skillcard.button)
     if (index > this.maxItemofSkillCard - 1) {
      skillcard.mainContainer.classList.add('hiddenStyle')
     }
    })
    this._appendLoadMoreButton()
    this._setupLoadMoreButton()
   })
   .catch((err) => {
    console.log(err)
    this._showEmptySkillAlert()
   })
 }

 _setupEventSelectedSkillButton(button) {
  button.addEventListener('click', (e) => {
   const confirmModal = new this.confirmModal({
    headerText: 'ยืนยัน',
    ModalContent: `การทดสอบมีเงื่อนไขตามที่อธิบายไว้ดังนี้`,
    skillQueryString: e.target.value,
   })
   confirmModal.trueButton.addEventListener('click', () => {
    localStorage.setItem('skillsets', e.target.dataset.skillsets)
    console.log(localStorage.getItem('skillsets'))
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

 _appendLoadMoreButton() {
  const selectedSkillsParent = document.querySelector('#selectedSkillsParent')
  selectedSkillsParent.parentNode.appendChild(this._generateLoadMoreButton())
 }

 _getTableElement() {
  return document.querySelector('#dataTable')
 }

 _storeUserSelectedSkills() {
  this.userSelectedSkills = new Apiservice()._reqToGetUserSelectedSkills()
  // this.userSelectedSkills = history.items
  // this.userSelectedSkills = false

  //  document.querySelector('#loading').classList.add('none')
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
