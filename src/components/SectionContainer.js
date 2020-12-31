import DomController, * as DomcontrollerFunction from '../utils/Domcontroller'
import SelectedSkillSection from '../components/SelectedSkillSection'
import DataTableSection from '../components/DataTableSection'
import ContinueTestSection from '../components/ContinueTestSection'

export default class SectionContainer extends DomController {
 constructor(userdata) {
  super()

  this.userdata = userdata || undefined
  this.SectionContainerElement = DomcontrollerFunction.parserHtmlTag(
   this.getSectionContainerElement()
  )

  this._render()
 }

 _render() {
  this._appendToBody(this.SectionContainerElement)
  this.SectionContainerElement.appendChild(this.setupContinueTestSection())
  this.SectionContainerElement.appendChild(this.setupSelectedSkillSection())
  this.SectionContainerElement.appendChild(this.setupDataTableSection())
 }

 setupSelectedSkillSection() {
  return new SelectedSkillSection({
   selectedSkillsData: this.userdata.items,
  }).getSelectedSkillSectionElement()
 }

 setupContinueTestSection() {
  return new ContinueTestSection(this.SectionContainerElement, {
   existedTestData: this.userdata.existedtest,
  })._getContinueTestSectionElement()
 }

 setupDataTableSection() {
  return new DataTableSection(this.SectionContainerElement, {
   historyData: this.userdata.history,
  }).getDataTableSectionElement()
 }

 setupDataTableWithListJs() {
  this.dataTableSection._createSelectedSkillSection()
 }

 getSectionContainerNode() {
  return DomcontrollerFunction.parserHtmlTag(this.SectionContainerElement)
 }

 getSectionContainerElement() {
  return `<div id="sectionContainer" class="container mt-5 px-2 col-lg-8 col-md-8 col-sm-12 col-xs-12">
     </div>`
 }
}
