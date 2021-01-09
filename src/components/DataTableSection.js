import * as DomControlFunction from '../../utils/DomController'
import DataTable from './Datatable'

export default class DataTableSection {
 constructor(parent, { historyData }) {
  this.parent = parent || undefined
  this.historyData = historyData || undefined
  this.dataTableSectionDiv = DomControlFunction.parserHtmlTag(
   historySectionHtml()
  )
  this._createSelectedSkillSection()
 }

 _createSelectedSkillSection() {
  this.parent.appendChild(this.dataTableSectionDiv)
  new DataTable({
   htmlParent: this.dataTableSectionDiv,
   historyData: this.historyData,
  })
 }

 getDataTableSectionElement() {
  return this.dataTableSectionDiv
 }
}

const historySectionHtml = () => {
 return `
    <section id="dataTable" class="my-5">
            <h5 class="text-dark">ประวัติการทดสอบ</h5>
            <div class="d-flex flex-row my-3">
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
            <div class="list">
            </div>
            <div class="text-center mt-3 justify-content-center pagination">
            </div>
        </div>
    </section>`
}
