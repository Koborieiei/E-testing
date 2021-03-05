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

export const getEmptySkillAlertSection = () => {
 return `<div class="m-0 row mx-5 justify-content-center col-10">
       <div class="col-md-6 text-left my-5">
           <div class="error-template">
               <h2>
                   ขออภัย..</h2>
               <h3>ดูเหมือนว่าไม่พบทักษะเพื่อทดสอบ</h3>
               <div class="error-details">
                   กรุณาเลือกทักษะที่สนใจก่อนเข้าทดสอบ
               </div>
               <div class="mt-3 error-actions">
                   <a href="../profile" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>เลือกทักษะ</a>
               </div>
           </div>
       </div>
   </div>`
}

export const appendToParent = (parent, htmlelement) => {
 parent.appendChild(htmlelement)
}
