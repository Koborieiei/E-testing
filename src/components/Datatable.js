import List from 'list.js'
import Timer from '../../js/class/Timer'

export default class DataTableSection {
 constructor({ htmlParent, historyData }) {
  this.historyData = historyData || undefined
  this.tableUserHistory = undefined
  this.htmlParent = htmlParent
  this.mainDataTableElement = undefined
  this.dataHistoryKeyName = []

  this.option = {
   valueNames: this.dataHistoryKeyName,
   item: userHistoryRowTemplate(),
   pagination: true,
   page: 3,
  }

  this._render()
 }

 _convertSecondIntoString() {
  //   const timeConvertor = new Timer({ duration: history.timeused })
  this.historyData.map(
   (history) =>
    (history.timeused = new Timer({
     duration: history.timeused,
    })._timeToStringWithThai())
  )
 }

 _render() {
  this._convertSecondIntoString()
  this._appendHistoryKeyToDataHistoryKeyName()
  this.setUserHistoryTable()
 }

 _appendHistoryKeyToDataHistoryKeyName() {
  for (const key in this.historyData[0]) {
   this.dataHistoryKeyName.push(key)
  }
 }

 setUserHistoryTable() {
  this.tableUserHistory = new List(
   this.htmlParent,
   this.option,
   this.historyData
  )
 }

 _setTableEventListener() {
  this.tableUserHistory.on('searchComplete', () => {
   if (this._countNumberOfTableList() === 0) {
    this._displayNotFoundSearchResult()
   }
  })
 }
 _displayNotFoundSearchResult() {
  const table = _getTableElement()
  table.querySelector('.list').appendChild(notFoundSearchResult())
 }

 _countNumberOfTableList() {
  const table = this._getTableElement()
  const numberOflist = table.querySelector('.list').children
  return numberOflist.length
 }
}

const getTableElement = () => {
 return document.querySelector('#dataTable')
}

const detectErrorMassage = (msg) => {
 if (msg == 'no skill! you have to select skill first' || !msg) {
  throw 'test'
 }
}
const userHistoryRowTemplate = () => {
 return `<div class="mb-2 py-3 my-2 d-flex bg-white align-items-center flex-row justify-content-around rounded">
    <div class="col-3 d-flex flex-column">
        <div class="text-dark testname"></div>
        <div class="type col-sm-5 col-xs-5 col-lg-5 col-md-5 font-weight-light badge-secondary badge"></div>
    </div>
    <div id="testingResult" class="text-dark col-4 "><span class="timeused"></span>  <br/> <span class="choicenumber"></span> ข้อ </div>
    <div class="col-3 text-dark text-left timestamp"></div>
</div>`
}

const notFoundSearchResult = () => {
 return `<div class="row justify-content-center m-0 mt-4">
  <h4 class="text-secondary font-weight-light">ไม่พบข้อมูล</h4>
  </div>`
}
