import DomController, * as DomcontrollerFunction from '../../utils/DomController'

export default class NotFoundExamSection extends DomController {
 constructor(userdata) {
  super()

  //   this.userdata = userdata || undefined
  this.SectionContainerElement = DomcontrollerFunction.parserHtmlTag(
   DomcontrollerFunction.getEmptySkillAlertSection()
  )

  this._render()
 }

 _render() {
  this._appendToBody(this.SectionContainerElement)
  //   this.SectionContainerElement.appendChild(this.setupContinueTestSection())
  //   this.SectionContainerElement.appendChild(this.setupSelectedSkillSection())
  //   this.SectionContainerElement.appendChild(this.setupDataTableSection())
 }
}
