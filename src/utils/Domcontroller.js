export default class DomController {
 constructor() {
  this.body = document.getElementById('app')
 }

 _appendToBody(htmlNode) {
  this.body.appendChild(htmlNode)
 }

 _insertNodeBeforeElement(childNode, newHtmlNode) {
  this.body.insertBefore(newHtmlNode, childNode)
 }
}

export const parserHtmlTag = (htmlTag) => {
 const parser = new DOMParser()
 const parsedBody = parser.parseFromString(htmlTag, 'text/html')
 return parsedBody.body.firstChild
}

export const _skillHeaderSectionText = (text) => {
 return `<h5 class="text-dark">${text}</h5>`
}


export const appendToParent = (parent,htmlelement) => {
parent.appendChild(htmlelement)
}