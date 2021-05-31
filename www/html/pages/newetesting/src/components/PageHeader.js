import DomController, * as DomcontrollerFunction from '../../utils/DomController'

export default class PageHeader extends DomController {
 constructor({ textheader, secondarytext, url }) {
  super()
  this.textheader = textheader || undefined
  this.secondarytext = secondarytext || undefined
  this.url = url || undefined

  this._render()
 }

 _render() {
  this._appendToBody(this._getPageHeaderElementNode())
 }

 _getPageHeaderElementNode() {
  return DomcontrollerFunction.parserHtmlTag(this.pageHeaderElement())
 }

 pageHeaderElement() {
  return `<div class="p-5" style="background: url(../../image/upload/etesting_cover_default.jpg); background-repeat: no-repeat;
  background-size: cover;
  background-position: center;">
       <h2 class="text-white m-0">${this.textheader}</h2>
       <small class="text-light">${this.secondarytext}</small>
    </div>`
 }
}
