(()=>{"use strict";var t=[(t,e,s)=>{s.r(e);s(1),s(2);var i=s(3);window.addEventListener("DOMContentLoaded",(()=>{(0,i.init)()}))},,(t,e,s)=>{s.r(e)},(t,e,s)=>{s.r(e),s.d(e,{init:()=>n});var i=s(4);const n=()=>{new i.default,console.log("Page start")}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>o});var i=s(5),n=s(15),r=s(16);class o extends r.default{constructor(){super(),this.testingResult=void 0,this.timeConsuming=void 0,this.testingPoint=void 0,this.testedSkills=void 0,this.questionHeaderNode=void 0,this._render()}_render(){try{this._storeTestingResult(),this._setPageHeader(),this._setupProgressbar(),this.progressBar._setInitiatedProgressBarValue(),this._setPageBody(),this._setPageDisplaySkills(),this._setPageButtonContainer()}catch(t){console.log(t),this._appAppendChild(this._generateDisplayErrorHandle())}}_setPageHeader(){return this.questionHeaderNode=this._generateQuestionHeader(),this._setTimerText(),this._setTotalAnswerText(),this._appAppendChild(this.questionHeaderNode)}_setupProgressbar(){this.progressBar=new i.default({progressbarparent:"#progressBar",actualValue:this._getTestingTotalAnswered(),maximumValue:this._getTotalOfQuestionNumber()}),this.progressBar.currentValueOfProgressBar=this._getCurrentProgressbar()}_getCurrentProgressbar(){return parseInt(localStorage.getItem("progressbarvalue"))}_getTotalOfQuestionNumber(){return parseInt(localStorage.getItem("totalquestionnumber"))}_getTimerElement(){return this.questionHeaderNode.querySelector("#timer")}_getTotalAnswerElement(){return this.questionHeaderNode.querySelector("#counterNumber")}_setTimerText(){const t=new n.default({duration:this._getTimeLeft()});t._getMinutesIncludeZero(),this._getTimerElement().textContent=""+t.string}_setTotalAnswerText(){this._getTotalAnswerElement().textContent=`${this._getTestingTotalAnswered()}/${this._getTotalOfQuestionNumber()}`}_setPageBody(){const t=new n.default({duration:this._getTimeConsuming()}),e=this._generateResultBody();return e.querySelector("#timeSpending").textContent=""+t._getOnlyMinuteAndSecondString(),e.querySelector("#displayPoint").textContent=this._getTestingPoint()+" คะแนน"||"ไม่พบคะแนน",this._appAppendChild(e)}_getTimeLeft(){return this.testingResult.result.timeleft}_setPageDisplaySkills(){const t=this._generateResultSkillDisplay(),e=t.querySelector("#displaySkills");return this._setSkillBadgeParents(e),this._appAppendChild(t)}_setSkillBadgeParents(t){const e=this._getTestingSkill(),s=this._getSkillSetsByLocalStorage();for(const i in e)if(null!=e[i]){const n=s[i].skillname,r=e[i].percent.toFixed(0);t.appendChild(this._generateNewSkillBadge(n,r))}}_generateNewSkillBadge(t,e){const s=this._generateNewSkillBadgeElement();return s.children[0].textContent=""+t,s.children[1].textContent=e+" %",s}_getSkillSetsByLocalStorage(){return JSON.parse(decodeURIComponent(localStorage.getItem("skillsets")))}_setPageButtonContainer(){const t=this._generateResultPageButtonContainer();return this._setupRetestButton(),this._setRedirectToDashboardButton(),this._appAppendChild(t)}_storeTestingResult(){const t=window.location.search.split("?")[1];this.testingResult=JSON.parse(decodeURIComponent(t)),console.log(JSON.parse(decodeURIComponent(t)))}_setupRetestButton(){this.retestButton.button.addEventListener("click",(t=>{t.preventDefault();new this.confirmModal({headerText:"ยืนยัน",ModalContent:"Would u like to retest again ?"}).trueButton.addEventListener("click",(t=>{window.location.href="../"}))}))}_setRedirectToDashboardButton(){this.dashboardButton.button.addEventListener("click",(()=>{new this.confirmModal({headerText:"ยืนยัน",ModalContent:"Would u like to back to dashboard ?"}).trueButton.addEventListener("click",(t=>{window.location.href="../"}))}))}_getTestingPoint(){return this.testingResult.result.point}_getTestingTotalAnswered(){return this.testingResult.result.total}_getTimeConsuming(){return this.testingResult.result.timeused}_getTestingSkill(){return this.testingResult.skill}_throwNewError(){throw"ss"}_clearAllLocalStorage(){localStorage.clear()}}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>r});var i=s(6),n=s.n(i);class r{constructor({progressbarparent:t,actualValue:e,maximumValue:s}){this.progressBar=void 0,this.progressBarParent=t||void 0,this.actualValue=e||void 0,this.valuePerUpdateTime=1/s,this.currentValueOfProgressBar=e/s,this._renderProgressBar()}_renderProgressBar(){this.progressBar=new(n().Line)(""+this.progressBarParent,{color:"#1CC88A",trailColor:"#D1D3E2",svgStyle:{width:"100%",height:"10px"}})}_setInitiatedProgressBarValue(){this.progressBar.animate(Number(this.currentValueOfProgressBar.toFixed(10)))}_updateProgressBarPerTime(){this.progressBar.animate(Number(this.currentValueOfProgressBar.toFixed(10))),this.currentValueOfProgressBar+=this.valuePerUpdateTime}}},,,,,,,,,,(t,e,s)=>{s.r(e),s.d(e,{default:()=>i});class i{constructor({duration:t}){this.duration=t,this.hour=void 0,this.minutes=void 0,this.seconds=void 0,this.timer=void 0,this.string=void 0,this._timeToString()}_timeToString(){this.string=null===this.duration?"ไม่จำกัดเวลา":this._getTimeStringWithOutThai()}_getOnlyMinuteAndSecondString(){return this.duration>3600?`${this._getHour()} ชั่วโมง ${this._getMinutes()} นาที ${this._getSecondIncludeZero()} วินาที`:this.duration<60?this._getSecondIncludeZero()+" วินาที":`${this._getMinutesIncludeZero()} นาที ${this._getSecondIncludeZero()} วินาที`}_getHourThaiString(){return this._getHour()+" ชั่วโมง"}_getHourThaiString(){return this._getMinutes()+" นาที"}_getSecondThaiString(){return this._getSecond()+" วินาที"}_getSecond(){return null===this.duration?null:parseInt(this.duration%60,10)}_getMinutes(){return null===this.duration?null:parseInt(this.duration/60%60,10)}_getHour(){return null===this.duration?null:parseInt(this.duration/3600%24,10)}_getHourIncludeZero(){return this._getHour()<10?"0"+this._getHour():this._getHour()}_getMinutesIncludeZero(){return this._getMinutes()<10?"0"+this._getMinutes():this._getMinutes()}_getSecondIncludeZero(){return this._getSecond()<10?"0"+this._getSecond():this._getSecond()}_getTimeStringWithThai(){return`${this._getHour()} ชั่วโมง ${this._getMinutes()} นาที `}_getTimeStringWithOutThai(){return`${this._getHourIncludeZero()}:${this._getMinutesIncludeZero()}:${this._getSecondIncludeZero()}`}_getTimeStringMinutes(){return this._getMinutes()+" นาที"}_reducingTimeLeft(){return this.duration--}_timeStartToConsume(){}}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>o});var i=s(17),n=s(18),r=s(19);class o{constructor(){this.body=document.querySelector("#app"),this.confirmModal=n.default||void 0,this.alertModal=r.default||void 0,this.backButton=void 0,this.nextButton=void 0,this.retestButton=void 0,this.dashboardButton=void 0}_generateQuestionHeader(){return this._parserHtmlTag(this._questionHeaderTag())}_generateQuestionSelector(){return this._parserHtmlTag(this._questionSelector())}_generateQuestionSelectorBottom(){return this._parserHtmlTag(this._questionSelectorBottom())}_generateQuestionBody(){return this._parserHtmlTag(this._questionBodyTag())}_generateResultBody(){return this._parserHtmlTag(this._displayResult())}_generateDisplayErrorHandle(){return this._parserHtmlTag(this._displayErrorHandle())}_generateTestPageButtonContainer(){const t=this._buttonContainer(),e=this._parserHtmlTag(t);return this.backButton=new i.default({textButton:"ย้อนกลับ",disable:!1,body:e.children[0],id:"backButton"}),this.nextButton=new i.default({textButton:"ถัดไป",disable:!1,body:e.children[1],id:"nextButton"}),e}_generateResultSkillDisplay(){return this._parserHtmlTag(this._displayTestingSkills())}_generateDisplayReccommendCourse(){return this._parserHtmlTag(this._reccomendedCourseElement())}_generateNewSkillBadgeElement(){return this._parserHtmlTag(this._createNewEmptyskillBadge())}_generateExistedTestReminder(){return this._parserHtmlTag(this._remindExistingExamElement())}_generateResultPageButtonContainer(){const t=this._buttonContainer(),e=this._parserHtmlTag(t);return this.retestButton=new i.default({textButton:"เริ่มทำใหม่",disable:!1,body:e.children[0],id:"retestButton"}),this.retestButton.button.classList.remove("btn-primary"),this.retestButton.button.classList.add("btn-outline-primary"),this.dashboardButton=new i.default({textButton:"กลับหน้าแรก",disable:!1,body:e.children[1],id:"dashboardButton"}),e}_parserHtmlTag(t){return(new DOMParser).parseFromString(t,"text/html").body.firstChild}_appAppendChild(t){return app.appendChild(t)}_questionHeaderTag(){return'<div class="bg-white rounded py-2">\n  <div class="d-flex justify-content-around flex-column ">\n      <div class="d-flex justify-content-between align-items-center flex-row px-3 ">\n          <div class="d-flex flex-column p-1">\n              <div class="">\n                  <h5 class="text-dark font-weight-bold" id=\'testMainTextHeader\'>Pre-Testing</h5>\n                  <h6 id="testSecondTextHeader">แบบทดสอบก่อนเรียน</h6>\n              </div>\n          </div>\n\n          <div class="d-flex flex-column p-1">\n              <div>\n                  <small class="text-secondary font-weight-light">เวลาที่เหลือ</small>\n                  <h5 id="timer" class="text-primary font-weight-light"></h5>\n              </div>\n          </div>\n\n          <div class="d-flex flex-column p-1">\n              <div class="d-flex flex-column">\n                  <small class="text-secondary font-weight-light">จำนวนข้อ</small>\n                  <div id="timeCounterParent" class="d-flex flex-row p-0 align-items-center">\n                      <h4 class="text-primary font-weight-light" id="counterNumber"></h4>\n                      <h4 class="text-primary font-weight-light" id="totalQuestionNumber"></h4>\n                  </div>\n              </div>\n          </div>\n      </div>\n      <div id="progressBar"></div>\n  </div>\n</div>\n      '}_questionSelector(){return'\n  <div id="contentBody" class="row m-0 flex-row-reverse justify-content-between mt-4">\n    <div  class="d-flex flex-column my-3 col-lg-3 col-sm-12 p-0" >\n        <div class="bg-white py-2 px-3 rounded" id="questionSelector">\n            <div class=\'my-3 \'>\n                <h6 class=\'text-dark\'>ตัวเลือกคำถาม</h6>\n            </div>\n        </div>\n    </div>\n    <div id=\'question\' class="my-2 col-lg-8 col-sm-12 p-0 pr-2">\n  </div>\n  </div>\n'}_questionSelectorBottom(){return'<div class="d-flex mt-2 align-items-center justify-content-center flex-row" >\n    <div><i id="toggleIcon" data-toggle="collapse" href="#selectorCollapseRow" role="button" aria-expanded="false" aria-controls="multiCollapseExample1" style="font-size: 30px;" class="txt-primary "></i></div>\n</div>'}_questionBodyTag(){return"\n  <div id='question' class=\"my-2 col-lg-9 col-sm-12\">\n      </div>\n      "}_changeEtestingLinkToDefault(){document.querySelector("#etestingLink").href="../"}_displayResult(){return'<div class="row bg-white m-0 my-5 py-3 rounded text-center">\n    <div class="col-6 d-flex pt-4 flex-column  ">\n        <div class="bg-white m-auto">\n        <i style="font-size: 4rem" class=" fas fa-medal text-primary"></i>\n        </div>\n        <div class="mt-4" style="min-height:100px;">\n            <span>คะแนนที่ได้รับ</span>\n            <p class="h5 mt-2 text-dark font-weight-bold" id="displayPoint"></p>\n        </div>\n    </div>\n    <div class="col-6 d-flex pt-4 flex-column ">\n        <div class="bg-white m-0">\n        <i style="font-size: 4rem" class="mt-0 text-primary fas fa-hourglass-half"></i>\n        </div>\n        <div class="mt-4" style="min-height:100px;">\n            <span>ระยะเวลาที่ใช้</span>\n            <p id="timeSpending" class="h5 mt-2 text-dark font-weight-bold"></p>\n        </div>\n    </div> \n  </div>'}_displayTestingSkills(){return'<div class="rounded bg-white mb-5 py-2 ">\n    <div class="px-3 py-2 font-weight-light">สัดส่วนคะแนนแต่ละทักษะ</div>\n    <div id="displaySkills" class="px-3 py-2 row m-0">\n    </div>\n  </div>'}_createNewEmptyskillBadge(){return'<div class="col-auto mb-2 mr-2 bg-light rounded">\n  <small class="text-dark"></small>\n  <p class=" font-weight-bold text-primary m-0"></p>\n</div>\n'}_reduceDemical(t){return Math.round(t)}_buttonContainer(){return'<div id="buttonContainer" class="row m-0 mb-5 justify-content-between">\n    <div class="col-5 p-0"></div>\n    <div class="col-5 p-0"></div>\n  </div>'}_questionSecondTextHeader(t){return"PRE-TEST"==t.replace(/ /g,"")?"แบบทดสอบก่อนเรียน":"แบบทดสอบหลังเรียน"}_displayErrorHandle(){return'<div class="text-center">อุ๊ปส์.. ไม่พบข้อมูลในระบบ <button class="btn btn-primary">Refresh</button></div>'}}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>i,_switchDisable:()=>n,_proofAnswer:()=>r,confirmModal:()=>o,_alertAnswer:()=>a,_changeSuccessText:()=>d,_changeText2:()=>l});class i{constructor({textButton:t,disable:e,body:s,id:i}){this.textButton=t||"button",this.disable=e||!1,this.body=s||document.body,this.id=i||"Example",this.button=void 0,this._createButton(),this._appendParent()}_createButton(){this.button=document.createElement("button"),this.button.classList.add("btn","btn-lg","btn-primary","btn-block","text-center"),this.button.textContent=this.textButton,this.button.disabled=this.disable,this.button.id=this.id}_appendParent(){this.body.appendChild(this.button)}_previousQuestion(){const t=document.querySelector("div.active"),e=t.previousSibling;1==e.dataset.index&&(this.button.disabled=!0),t.classList.remove("active"),t.classList.add("none"),e.classList.add("active"),e.classList.remove("none")}_adjustButton(t){const e=document.querySelector("#backButton");n(e),d(t)}_clearAnswer(){Array.from(document.querySelectorAll("input:checked")).map((t=>{t.checked=!1}));Array.from(document.querySelectorAll("label")).map((t=>{t.classList.remove("active")}))}_clearAnsweredArr(t){t.items.splice(0,_totalAnswer(t))}}const n=()=>{const t=document.querySelector("#backButton");!0===t.disabled&&(t.disabled=!1)},r=t=>{if(2!=t)return!1;{const t=new AgreementModal({headerText:"ยืนยัน",ModalContent:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."});t.trueButton.addEventListener("click",(()=>{t._destroy(),a()}))}},o=()=>{},a=()=>{(new Apiservice).data.then((t=>{200===t.status&&(new AlertModal({alertMsg:"Successful",type:"success"}),setTimeout((()=>{location.href="www.google.com"}),2e3))}))},d=()=>{const t=document.querySelector("#nextButton");if(1==questionAction._QuestionNumber())return t.textContent="Finish"},l=t=>document.querySelector("#nextButton").textContent=t},(t,e,s)=>{s.r(e),s.d(e,{default:()=>i});class i{constructor({headerText:t,ModalContent:e,modalId:s,skillQueryString:i,backdrop:n}){this.headerText=t||"Agreement",this.trueButtonText="ตกลง",this.falseButtonText="ยกเลิก",this.modalContent=e||"เนื้อหา..",this.skillQueryString=i||void 0,this.modalId=s||"modalExample",this.static=1!=n||"static",this.modal=void 0,this.body=void 0,this.trueButton=void 0,this.falseButton=void 0,this.parent=document.body,this._createModal(),this._appendDialog(),this._show()}_createModal(){this.modal=document.createElement("div"),this.modal.setAttribute("id",this.modalId),this.modal.setAttribute("tabindex","-1"),this.modal.setAttribute("role","dialog"),this.modal.setAttribute("aria-hidden","true"),this.modal.setAttribute("aria-labelledby",this.modalId),this.modal.classList.add("modal","fade"),this.modal.dataset.backdrop=this.static;const t=document.createElement("div");t.classList.add("modal-dialog","modal-dialog-scrollable"),t.setAttribute("role","document"),this.modal.appendChild(t);const e=document.createElement("div");e.classList.add("modal-content","m-auto"),t.appendChild(e);const s=document.createElement("div"),i=document.createElement("h4");i.classList.add("modal-title"),i.id=this.headerText,i.textContent=this.headerText,s.appendChild(i),s.classList.add("modal-header"),e.appendChild(s),this.body=document.createElement("div"),this.body.classList.add("grey","lighten-4","modal-body","rounded","p-4","m-3");const n=document.createElement("p");n.classList.add("font-weight-light"),n.textContent=this.modalContent,this.body.appendChild(n),e.appendChild(this.body);const r=document.createElement("div");r.classList.add("modal-footer","border-0"),this.falseButton=document.createElement("button"),this.falseButton.classList.add("btn","btn-outline-primary","btn-lg"),this.falseButton.type="button",this.falseButton.setAttribute("data-dismiss","modal"),this.falseButton.textContent=this.falseButtonText,this.falseButton.addEventListener("click",(()=>{this._destroy()})),r.appendChild(this.falseButton),this.trueButton=document.createElement("button"),this.trueButton.classList.add("btn","btn-primary","btn-lg","text-white"),this.trueButton.textContent=this.trueButtonText,r.appendChild(this.trueButton),e.appendChild(r)}_appendDialog(){document.body.appendChild(this.modal),console.log(this.modal)}_destroy(){$("#"+this.modalId).modal("hide"),setTimeout((()=>{this.parent.removeChild(this.modal)}),200)}_show(){$("#"+this.modalId).modal("show")}}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>i});class i{constructor({alertMsg:t,type:e}){this.alertMsg=t||"This is alert msg",this.type=e||void 0,this.body=void 0,this.parent=document.body,this._create(),this._appendDialog(),this._destroy()}_create(){this.body=document.createElement("div"),this.body.classList.add("animate__animated","animate__bounceInDown","col-3","border","shadow","bg-white","p-3","text-center","m-auto"),this.body.style.setProperty("position","fixed"),this.body.style.setProperty("top","10%"),this.body.style.setProperty("z-index","1300"),this.body.style.setProperty("left","35%");const t=document.createElement("i");switch(t.classList.add("px-1"),t.style.setProperty("vertical-align","middle"),t.style.setProperty("font-size","1.5rem"),this.type){case"success":t.classList.add("text-success","fas","fa-check-circle");break;case"error":t.classList.add("text-danger","fas","fa-times-circle")}const e=document.createElement("div");e.classList.add("text-wrap");const s=document.createElement("span");s.classList.add("text-break"),s.textContent=this.alertMsg,e.appendChild(s),this.body.appendChild(t),this.body.appendChild(e)}_appendDialog(){this.parent.appendChild(this.body)}_destroy(){setTimeout((()=>{this.parent.removeChild(this.body)}),3e3)}}}],e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={exports:{}};return t[i](n,n.exports,s),n.exports}s.m=t,s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t={0:0},e=[[0,1]],i=()=>{};function n(){for(var i,n=0;n<e.length;n++){for(var r=e[n],o=!0,a=1;a<r.length;a++){var d=r[a];0!==t[d]&&(o=!1)}o&&(e.splice(n--,1),i=s(s.s=r[0]))}return 0===e.length&&(s.x(),s.x=()=>{}),i}s.x=()=>{s.x=()=>{},o=o.slice();for(var t=0;t<o.length;t++)r(o[t]);return(i=n)()};var r=n=>{for(var r,o,[d,l,u,h]=n,c=0,g=[];c<d.length;c++)o=d[c],s.o(t,o)&&t[o]&&g.push(t[o][0]),t[o]=0;for(r in l)s.o(l,r)&&(s.m[r]=l[r]);for(u&&u(s),a(n);g.length;)g.shift()();return h&&e.push.apply(e,h),i()},o=self.webpackChunkshowresult=self.webpackChunkshowresult||[],a=o.push.bind(o);o.push=r})(),s.x()})();