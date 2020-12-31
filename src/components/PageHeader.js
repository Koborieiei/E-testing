import DomController, * as DomcontrollerFunction from '../utils/Domcontroller'

export default class PageHeader extends DomController {
 constructor({ textheader, secondarytext, img }) {
  super()
  this.textheader = textheader || undefined
  this.secondarytext = secondarytext || undefined
  this.img = img || undefined

  this._render()
 }

 _render() {
  this._appendToBody(this._getPageHeaderElementNode())
 }

 _getPageHeaderElementNode() {
  return DomcontrollerFunction.parserHtmlTag(this.pageHeaderElement())
 }

 pageHeaderElement() {
  return `<div class="p-5 bg-primary">
       <h2 class="text-white m-0">${this.textheader}</h2>
       <small class="text-light">${this.secondarytext}</small>
    </div>`
 }
}
