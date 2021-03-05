(()=>{"use strict";var t=[(t,e,i)=>{i.r(e);i(1),i(2);var n=i(3);window.addEventListener("DOMContentLoaded",(()=>{(0,n.init)()}))},,(t,e,i)=>{i.r(e)},(t,e,i)=>{i.r(e),i.d(e,{init:()=>s});var n=i(4);const s=()=>{new n.default}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>o});var n=i(5),s=i(6),r=i(12),a=i(25);class o{constructor(){this.userSelectedSkills=void 0,this.apiService=new n.default,this._render()}async _render(){try{await this._storeUserSelectedSkills(),this._setupPageHeader(),500!=this.userSelectedSkills.status?this.setupSectionContainer():this.setupErrorHandleSection()}catch(t){console.log(t)}}async _storeUserSelectedSkills(){try{this.userSelectedSkills=await this.apiService._reqToGetUserSelectedSkills()}catch(t){console.log(t)}}setupSectionContainer(){try{const t=this.userSelectedSkills;console.log(this.userSelectedSkills),new s.default(t)}catch(t){}}setupErrorHandleSection(){console.log(new r.default)}_setupPageHeader(){new a.default({textheader:"E-Testing",secondarytext:"ทดสอบความเข้าใจที่มีต่อทักษะของเรา"})}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>n});class n{constructor(){this.url=null}_getAllresult(){console.log(this.data)}async _requestTotest(t){return await fetch(url,{method:"POST",body:JSON.stringify({service:"testing",skill:null})})}async _reqToSendTotalResult(t){this._displayLoadingScreen();const e=this._appendObjectToFormData(t),i=await fetch("https://www.edbot.com/backbone/pages/newetesting/APIlocaltest/resulttest.php?",{method:"POST",body:e});if(!i.ok)throw"Something Went Wrong";this._unDisplayLoadingScreen();return i.json()}async _reqToGetUserSelectedSkills(){this._displayLoadingScreen();const t=await fetch("https://www.edbot.com/backbone/pages/newetesting/APIlocaltest/getObjectdata.php?",{method:"POST"});if(!t.ok)throw"Something Went Wrong";this._unDisplayLoadingScreen();const e=await t.json();return await e}async _reqToUpdateUserTime(t,e){const i=new FormData;i.append("service","updatetime"),i.append("timeleft",t),i.append("testingid",e);const n=await fetch("./ajax/logtesting.php",{method:"POST",body:i});if(!n.ok)throw"Something Went Wrong";return await n.json()}async _reqToUpdateUserLog(t){console.log(t);const e=this._appendObjectToFormData(t),i=await fetch("./ajax/logtesting.php",{method:"POST",body:e});return await i.json()}async _getQuestionObjects(t){this._displayLoadingScreen();const e=new FormData;e.append("service",t.service),e.append("skill_id",t.skill_id);const i=await fetch("https://www.edbot.com/backbone/pages/newetesting/APIlocaltest/testingObject.php?",{method:"POST",body:e});if(!i.ok)throw"Something Went Wrong";this._unDisplayLoadingScreen();return await i.json()}_appendObjectToFormData(t){const e=new FormData;return Object.entries(t).map((([t,i])=>{"service"==t?e.append(t,i):e.append(t,JSON.stringify(i))})),e}_displayLoadingScreen(){document.querySelector("#loading").classList.remove("none")}_unDisplayLoadingScreen(){document.querySelector("#loading").classList.add("none")}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>o});var n=i(7),s=i(8),r=i(12),a=i(13);class o extends n.default{constructor(t){super(),this.userdata=t||void 0,this.SectionContainerElement=n.parserHtmlTag(this.getSectionContainerElement()),this._render()}_render(){this._appendToBody(this.SectionContainerElement),this.SectionContainerElement.appendChild(this.setupContinueTestSection()),this.SectionContainerElement.appendChild(this.setupSelectedSkillSection()),this.SectionContainerElement.appendChild(this.setupDataTableSection())}setupSelectedSkillSection(){return new s.default({selectedSkillsData:this.userdata.items}).getSelectedSkillSectionElement()}setupContinueTestSection(){return new a.default(this.SectionContainerElement,{existedTestData:this.userdata.existedtest})._getContinueTestSectionElement()}setupDataTableSection(){return new r.default(this.SectionContainerElement,{historyData:this.userdata.history}).getDataTableSectionElement()}setupDataTableWithListJs(){this.dataTableSection._createSelectedSkillSection()}getSectionContainerNode(){return n.parserHtmlTag(this.SectionContainerElement)}getSectionContainerElement(){return'<div id="sectionContainer" class="container mt-5 px-2 col-lg-8 col-md-8 col-sm-12 col-xs-12">\n     </div>'}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>n,parserHtmlTag:()=>s,_skillHeaderSectionText:()=>r,getEmptySkillAlertSection:()=>a,appendToParent:()=>o});class n{constructor(){this.body=document.getElementById("app")}_appendToBody(t){this.body.appendChild(t)}_insertNodeBeforeElement(t,e){this.body.insertBefore(e,t)}}const s=t=>(new DOMParser).parseFromString(t,"text/html").body.firstChild,r=t=>`<h5 class="text-dark">${t}</h5>`,a=()=>'<div class="m-0 row mx-5 justify-content-center col-10">\n       <div class="col-md-6 text-left my-5">\n           <div class="error-template">\n               <h2>\n                   ขออภัย..</h2>\n               <h3>ดูเหมือนว่าไม่พบทักษะเพื่อทดสอบ</h3>\n               <div class="error-details">\n                   กรุณาเลือกทักษะที่สนใจก่อนเข้าทดสอบ\n               </div>\n               <div class="mt-3 error-actions">\n                   <a href="../profile" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>เลือกทักษะ</a>\n               </div>\n           </div>\n       </div>\n   </div>',o=(t,e)=>{t.appendChild(e)}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>a});var n=i(7),s=i(9),r=i(11);class a{constructor({selectedSkillsData:t}){this.selectedSkillsData=t||void 0,this.NUMBER_OF_LOADED_ITEM=2,this.MAX_ITEM_OF_SKILLCARD=3,this.isSkillCardOverMaxItem=!1,this.selectedSkillSectionDiv=n.parserHtmlTag(l()),this.selectedSkillParentDiv=this.selectedSkillSectionDiv.querySelector("#selectedSkillsParent"),this._createSelectedSkillSection()}_createSelectedSkillSection(){try{this._isSelectedSkillsDataEmpty(),this.generateSelectedSkillCardParent(),this.generateButtonElement()}catch(t){console.log(t),this._displayErrorElement()}}generateButtonElement(){if(this.isSkillCardOverMaxItem){const t=n.parserHtmlTag(d());console.log(),this.selectedSkillSectionDiv.appendChild(t),this._setupLoadMoreButton()}}generateSelectedSkillCardParent(){this.selectedSkillsData.map(((t,e)=>{this._generateSkillCard(t),this._isThisSkillCardShouldBeHind(e)}))}_generateSkillCard(t){this.SkillCardComponent=new s.default({relatedSkill:t.skills,titleName:t.testname,term:o(t.choicenumber,t.time),parents:this.selectedSkillParentDiv,img:t.img,testingType:t.testingtype})}_isThisSkillCardShouldBeHind(t){t>this.MAX_ITEM_OF_SKILLCARD-1&&(this.isSkillCardOverMaxItem=!0,this.SkillCardComponent.mainContainer.classList.add("hiddenStyle"))}_setupLoadMoreButton(){this.loadMoreButton=this.selectedSkillSectionDiv.querySelector("#loadmore"),this.loadMoreButton.addEventListener("click",(t=>{this._toggledMoreSkillCard(),this._removeLoadMoreButton()}),!1)}_toggledMoreSkillCard(){Array.from(document.querySelectorAll(".hiddenStyle")).map(((t,e)=>{e<this.NUMBER_OF_LOADED_ITEM&&t.classList.remove("hiddenStyle")}))}_removeLoadMoreButton(){0===document.querySelectorAll(".hiddenStyle").length&&(this.loadMoreButton.style.display="none")}_displayErrorElement(){this.selectedSkillParentDiv.appendChild(n.parserHtmlTag(h())),this._appendToBody(this.getSelectedSkillSectionElement())}generateErrorHandle(){const t=t()}getSelectedSkillSectionElement(){return this.selectedSkillSectionDiv}_isSelectedSkillsDataEmpty(){if(!this.selectedSkillsData)throw"Have no data"}}const o=(t,e)=>`${t} ข้อ / ${new r.default({duration:e}).getTimeToStringWithThai}`,l=()=>'\n <section class="my-5 d-flex flex-column justify-content-center">\n    <h5 class="text-dark">ทักษะที่เลือกไว้</h5>\n    <div id="selectedSkillsParent" class="row m-0"></div>\n</section>\n',d=()=>'<div class="m-auto">\n <button class="mt-4 btn loadMoreButton" id="loadmore">\n  แสดงเพิ่มเติม\n </button>\n</div>',h=()=>'<div class="col-12 m-auto row  pt-4">\n <div class="col-12 d-flex flex-row text-left">\n    <div class="col-5">\n    <div class="error-image" style="background: url(\'dist/src/img/undraw_empty_xct9.svg\'); background-size: cover;\n    background-position: center;">\n    </div>\n    </div>\n    \n    <div class="error-template col-7">\n   <h2 class="text-dark">ขออภัย..</h2>\n   <h3 class="text-dark error-details">ขณะนี้ไม่พบทักษะที่คุณเลือก</h3>\n   <div class="error-details">กรุณาเลือกทักษะก่อนเริ่มทำแบบทดสอบ</div>\n   <div class="mt-3 error-actions">\n        <a href="../profile" class="btn btn-primary btn-sm">\n        <span class="glyphicon glyphicon-home"></span>เลือกทักษะ\n        </a>\n   </div>\n  </div>\n </div>\n</div>'},(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});var n=i(10);class s{constructor({relatedSkill:t,titleName:e,term:i,img:n,id:s,parents:r,testingType:a}){this.relatedSkill=t||void 0,this.titleName=e||void 0,this.term=i||void 0,this.img=n||void 0,this.id=s||null,this.testingType=a||void 0,this.parents=r||null,this.mainContainer=void 0,this.reccomendSkillParent=void 0,this.imageContainer=void 0,this.skillTitleContainer=void 0,this.buttonContainer=void 0,this.button=void 0,this.skillIdContainers={service:a,skill_id:[]},this._create(),this._generateRecommendBadge(),this._apppendChild()}_create(){this.mainContainer=this._parserHtmlTag('<div class=" col-6 col-lg-4 col-xs-6 col-sm-6 col-md-4 my-2 d-flex flex-column rounded">\n</div>\n');const t=document.createElement("div");t.classList.add("bg-white","rounded"),t.style.setProperty("min-height","300px"),this.imageContainer=document.createElement("div"),this.imageContainer.classList.add("rounded-top","text-center"),this.imageContainer.style.setProperty("background","url("+this.img+")"),this.imageContainer.style.setProperty("background-size","cover"),this.imageContainer.style.setProperty("background-position","center"),this.imageContainer.style.setProperty("width","100%"),this.imageContainer.style.setProperty("height","150px"),this.skillTitleContainer=document.createElement("div"),this.skillTitleContainer.classList.add("pt-3","mb-0","pl-3","bg-white"),this.skillTitleContainer.style.setProperty("min-height","100px");const e=document.createElement("dt");e.innerText=this.titleName,e.classList.add("text-dark");const i=document.createElement("dd");i.classList.add("font-weight-light","text-secondary"),i.innerText=this.term,this.skillTitleContainer.appendChild(e),this.skillTitleContainer.appendChild(i);const n=document.createElement("div");n.classList.add("py-1","pl-3","my-2"),this.button=document.createElement("button"),this.button.classList.add("btn","btn-primary"),this.button.textContent="ทดสอบเลย",this.button.addEventListener("click",(t=>{this._alertTestingTermConfirmModal()})),n.appendChild(this.button),t.appendChild(this.imageContainer),t.appendChild(this.skillTitleContainer),t.appendChild(n),this.mainContainer.appendChild(t)}_generateRecommendBadge(){let t=[];this._ArrayOfRelatedSkill().map((e=>{this.skillIdContainers.skill_id.push(parseInt(e.skillid)),t.push({skillid:e.skillid,skillname:e.skillname})})),this.button.dataset.skillsets=""+encodeURIComponent(JSON.stringify(t))}_alertTestingTermConfirmModal(){new n.default({headerText:"ยืนยัน",ModalContent:"การทดสอบมีเงื่อนไขตามที่อธิบายไว้ดังนี้ \n   \n   1. การทดสอบมีระยะเวลาจำกัด (โปรดตรวจสอบก่อนเริ่ม)\n   2. ขณะเวลาการทดสอบห้ามเปิดเครื่องมืออเล็กทรอนิกส์อื่นๆ \n   3. หากระบบมีปัญหาให้ติดมีที่เบอร์ 02-697-6451 \n   "}).trueButton.addEventListener("click",(()=>{this._TestingTermConfirmModalAction()}))}_TestingTermConfirmModalAction(){const t=encodeURIComponent(JSON.stringify(this.skillIdContainers));localStorage.setItem("skillsets",this.button.dataset.skillsets),window.location.href="./testing/?"+t}_ArrayOfRelatedSkill(){return!0===Array.isArray(this.relatedSkill)?this.relatedSkill:new Array(this.relatedSkill)}_apppendChild(){this.parents.appendChild(this.mainContainer)}_parserHtmlTag(t){return(new DOMParser).parseFromString(t,"text/html").body.firstChild}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>n});class n{constructor({headerText:t,ModalContent:e,modalId:i,skillQueryString:n,backdrop:s}){this.headerText=t||"Agreement",this.trueButtonText="ตกลง",this.falseButtonText="ยกเลิก",this.modalContent=e||"เนื้อหา..",this.skillQueryString=n||void 0,this.modalId=i||"modalExample",this.static=1!=s||"static",this.modal=void 0,this.body=void 0,this.trueButton=void 0,this.falseButton=void 0,this.parent=document.body,this._createModal(),this._appendDialog(),this._show()}_createModal(){this.modal=document.createElement("div"),this.modal.setAttribute("id",this.modalId),this.modal.setAttribute("tabindex","-1"),this.modal.setAttribute("role","dialog"),this.modal.setAttribute("aria-hidden","true"),this.modal.setAttribute("aria-labelledby",this.modalId),this.modal.classList.add("modal","fade"),this.modal.dataset.backdrop=this.static;const t=document.createElement("div");t.classList.add("modal-dialog","modal-dialog-scrollable"),t.setAttribute("role","document"),this.modal.appendChild(t);const e=document.createElement("div");e.classList.add("modal-content","m-auto"),t.appendChild(e);const i=document.createElement("div"),n=document.createElement("h4");n.classList.add("modal-title"),n.id=this.headerText,n.textContent=this.headerText,i.appendChild(n),i.classList.add("modal-header"),e.appendChild(i),this.body=document.createElement("div"),this.body.classList.add("grey","lighten-4","modal-body","rounded","p-4","m-3");const s=document.createElement("p");s.classList.add("font-weight-light","text-dark"),s.innerText=this.modalContent,this.body.appendChild(s),e.appendChild(this.body);const r=document.createElement("div");r.classList.add("modal-footer","border-0"),this.falseButton=document.createElement("button"),this.falseButton.classList.add("btn","btn-outline-primary","btn-lg"),this.falseButton.type="button",this.falseButton.setAttribute("data-dismiss","modal"),this.falseButton.textContent=this.falseButtonText,this.falseButton.addEventListener("click",(()=>{this._destroy()})),r.appendChild(this.falseButton),this.trueButton=document.createElement("a"),this.trueButton.classList.add("btn","btn-primary","btn-lg","text-white"),this.trueButton.style.setProperty("cursor","pointer"),this.trueButton.textContent=this.trueButtonText,r.appendChild(this.trueButton),e.appendChild(r)}_appendDialog(){document.body.appendChild(this.modal),console.log(this.modal)}_destroy(){$("#"+this.modalId).modal("hide"),setTimeout((()=>{this.parent.removeChild(this.modal)}),200)}_show(){$("#"+this.modalId).modal("show")}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>n});class n{constructor({duration:t,display:e}){this.duration=parseInt(t)||void 0,this.display=e,this.durationInterval=void 0,this.durationTimeCounter=void 0}_adjustTimerDisplay(){this.display.textContent=""+this.getTimeToStringWithOutThai}_assignQuestionStartedTime(){this._clearInterval(this.durationInterval),this.durationTimer=0,localStorage.setItem("duration",this.durationTimer),this.durationInterval=setInterval((()=>{this.durationTimer++,localStorage.setItem("duration",this.durationTimer)}),1e3)}_clearInterval(){clearInterval(this.durationInterval)}_setTimeCountdownText(){this.display.textContent=this.getTimeToStringWithOutThai}_reducingTimeLeft(){return this.duration--}isTimeUp(){return this.duration<0}isDurationHasValue(){return void 0!==this.duration}get getTimeToStringWithOutThai(){return this.isDurationHasValue()?this.getTimeStringWithOutThai:"ไม่จำกัดเวลา"}get getTimeToStringWithThai(){return this.isDurationHasValue()?this.getOnlyMinuteAndSecondString:"ไม่จำกัดเวลา"}get getOnlyMinuteAndSecondString(){return this.duration>=3600?`${this.getHour} ชั่วโมง ${this.getMinutes} นาที ${this.getSecondIncludeZero} วินาที`:this.duration<60?this.getSecondIncludeZero+" วินาที":`${this.getMinutesIncludeZero} นาที ${this.getSecondIncludeZero} วินาที`}get getHourThaiString(){return this.getHour+" ชั่วโมง"}get getHourThaiString(){return this.getMinutes+" นาที"}get getSecondThaiString(){return this.getSecond+" วินาที"}get getSecond(){return null===this.duration?null:parseInt(this.duration%60,10)}get getMinutes(){return null===this.duration?null:parseInt(this.duration/60%60,10)}get getHour(){return null===this.duration?null:parseInt(this.duration/3600%24,10)}get getHourIncludeZero(){return this.getHour<10?"0"+this.getHour:this.getHour}get getMinutesIncludeZero(){return this.getMinutes<10?"0"+this.getMinutes:this.getMinutes}get getSecondIncludeZero(){return this.getSecond<10?"0"+this.getSecond:this.getSecond}get getTimeStringWithThai(){return`${this.getHour} ชั่วโมง ${this.getMinutes} นาที `}get getTimeStringWithOutThai(){return`${this.getHourIncludeZero}:${this.getMinutesIncludeZero}:${this.getSecondIncludeZero}`}get getTimeStringMinutes(){return this.getMinutes+" นาที"}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});var n=i(7);class s extends n.default{constructor(t){super(),this.SectionContainerElement=n.parserHtmlTag(n.getEmptySkillAlertSection()),this._render()}_render(){this._appendToBody(this.SectionContainerElement)}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>r});var n=i(7),s=i(14);class r{constructor(t,{existedTestData:e}){this.parent=t||void 0,this.continueTestComponent=void 0,this.existedTestData=e||void 0,this.continueTestingSection=n.parserHtmlTag(a()),this.createContinueTestSection()}createContinueTestSection(){this.parent.appendChild(this.continueTestingSection),this.generateSelectedSkillCardParent()}generateSelectedSkillCardParent(){this.existedTestData.map(((t,e)=>{this._generateContinueComponent(t)}))}_generateContinueComponent(t){this.continueTestComponent=new s.default({containerParent:this.continueTestingSection,duration:t.timeleft,testingHeader:t.testname,numberOfAnswer:Number(t.numberofanswers),numberOfQuestion:t.questionnumber,testingSkill:t.skills,testingType:t.testingtype})}_getContinueTestSectionElement(){return this.continueTestingSection}}const a=()=>`<section id='existingTest' class="mt-5">\n    <div class="headerWrapper mb-3">\n    ${n._skillHeaderSectionText("บททดสอบที่พักไว้ 🔥")}\n    </div>\n    </section>`},(t,e,i)=>{i.r(e),i.d(e,{default:()=>o});var n=i(7),s=i(11),r=i(10),a=i(15);const o=class{constructor({containerParent:t,duration:e,testingHeader:i,numberOfAnswer:s,numberOfQuestion:r,testingSkill:a,testingType:o}){this.duration=e||void 0,this.containerParent=t||void 0,this.numberOfAnswer=s||void 0,this.numberOfQuestion=r||void 0,this.testingHeader=i||void 0,this.testingSkill=a||void 0,this.existingTestCountDownInterval=void 0,this.skillIdContainers={service:o,skill_id:a.map((t=>t.skillid))},this.mainBody=n.parserHtmlTag(this._remindExistingTestElement()),this._initTestingHeader()}_initTestingHeader(){this._parentAppendChild(),this._setContinueTestTimer(),this._startTimer(),this._setUpProgressBar(),this._initToopTipFunction()}_setUpProgressBar(){this.progress=new a.default({progressbarparent:this._getProgressBar(),actualValue:this.numberOfAnswer,maximumValue:this.numberOfQuestion,options:{color:"#1CC88A",trailColor:"#D1D3E2",svgStyle:{width:"100%",height:"8px"}}}),this.progress._setInitiatedProgressBarValue()}_startTimer(){this.existingTestTimer.duration&&(this.existingTestCountDownInterval=setInterval((()=>{this.existingTestTimer._reducingTimeLeft(),this.existingTestTimer._adjustTimerDisplay(),this._isTestTimeOut()}),1e3))}_isTestTimeOut(){this.existingTestTimer.duration<1&&(this._showTimeOutAlert(),this._adjustButtonTextContent(),clearInterval(this.existingTestCountDownInterval))}_showTimeOutAlert(){const t=new r.default({ModalContent:"หมดเวลาการทดสอบแล้ว",headerText:"การแจ้งเตือน",backdrop:!1});t.falseButton.remove(),t.trueButton.href="./testing?"+this._generateSkillURI(),t.footer.classList.add("m-auto")}_initToopTipFunction(){$((function(){$('[data-toggle="tooltip"]').tooltip({template:'<div class="ml-1 tooltip" role="tooltip"><div class="arrow "></div><div class="tooltip-inner bg-white text-primary py-2 px-3 shadow-sm"></div></div>'})}))}_setContinueTestTimer(){this.existingTestTimer=new s.default({duration:this.duration,display:this._getTimerElement()}),this.existingTestTimer._setTimeCountdownText()}_parentAppendChild(){this.containerParent.appendChild(this.mainBody)}_adjustButtonTextContent(){this._getReDoExamActionButton().textContent="จบการทดสอบ"}_generateSkillTooltip(){return this.testingSkill.map((t=>t.skillname)).join("<br>")}_pustSkillIdIntoSkillIdContainers(t){this.skillIdContainers.skill_id.push(parseInt(t))}_generateSkillURI(){return encodeURIComponent(JSON.stringify(this.skillIdContainers))}_getTestingSkillLength(){return this.testingSkill.length}_getParentNode(){return this.parent}_getTimerElement(){return this.mainBody.querySelector("")}_getProgressBar(){return this.mainBody.querySelector("#progressBar")}_getReDoExamActionButton(){return this.mainBody.querySelector("#reDoExamActionButton")}_getTestingUrl(){return"./testing?"+this._generateSkillURI()}_getTimerElement(){return this.mainBody.querySelector("#timer")}_remindExistingTestElement(){const t=this._generateSkillTooltip(),e=this._getTestingSkillLength();return`<div data-skillur="${this._generateSkillURI()}" class="mt-3 bg-white rounded col-lg-12 col-md-12 col-sm-12 px-3 py-3">\n         <div class="d-flex flex-row justify-content-between align-items-center">\n             <div class="d-flex flex-column col-4 p-1">\n                 <div>\n                 <h5 class="text-dark font-weight-bold m-0">${this.testingHeader}</h5>\n  \n              <div class="my-1">\n                  <small id="testTooltip" class="text-secondary" data-toggle="tooltip" data-placement="right" data-html="true"  title="${t}">ทักษะที่ใข้ทดสอบ <div class="circle">${e}</div></small>\n              </div>\n  \n                     <div  id="progressBar">\n                     </div>\n\n                 </div>\n             </div>\n    \n             <div class="d-flex flex-column p-1">\n                 <div>\n                     <small class="text-secondary font-weight-light">เวลาที่เหลือ</small>\n                     <h6 id="timer" class="text-primary font-weight-bold">\n                         <bold></bold>\n                     </h6>\n                 </div>\n             </div>\n    \n             <div class="d-flex flex-column p-1">\n                 <div class="d-flex flex-column">\n                     <div id="timeCounterParent" class="d-flex flex-row p-0 align-items-center">\n                         <a id='reDoExamActionButton' href="${this._getTestingUrl()}" class="btn btn-sm btn-primary">ทดสอบ</a>\n                     </div>\n                 </div>\n             </div>\n         </div>\n    \n    \n     </div>`}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>r});var n=i(16),s=i.n(n);class r{constructor({progressbarparent:t,actualValue:e,maximumValue:i,options:n}){this.progressBar=void 0,this.progressBarParent=t||void 0,this.options=n||void 0,this.actualValue=e||void 0,this.valuePerUpdateTime=1/i,this.currentValueOfProgressBar=e/i,this._renderProgressBar()}_renderProgressBar(){this.progressBar=new(s().Line)(this.progressBarParent,this.options||{color:"#1CC88A",trailColor:"#D1D3E2",svgStyle:{width:"100%",height:"10px"}})}_getCurrentValueOfProgressBar(){return Number((this.actualValue/maximumValue).toFixed(10))}_setInitiatedProgressBarValue(){this.progressBar.animate(Number(this.currentValueOfProgressBar.toFixed(10)))}_updateProgressBarPerTime(){this.currentValueOfProgressBar+=this.valuePerUpdateTime,this.progressBar.animate(Number(this.currentValueOfProgressBar.toFixed(10))),localStorage.setItem("progressbarvalue",this.currentValueOfProgressBar)}}},,,,,,,,,,(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});var n=i(7);class s extends n.default{constructor({textheader:t,secondarytext:e,img:i}){super(),this.textheader=t||void 0,this.secondarytext=e||void 0,this.img=i||void 0,this._render()}_render(){this._appendToBody(this._getPageHeaderElementNode())}_getPageHeaderElementNode(){return n.parserHtmlTag(this.pageHeaderElement())}pageHeaderElement(){return`<div class="p-5 bg-primary">\n       <h2 class="text-white m-0">${this.textheader}</h2>\n       <small class="text-light">${this.secondarytext}</small>\n    </div>`}}}],e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={exports:{}};return t[n](s,s.exports,i),s.exports}i.m=t,i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t={0:0},e=[[0,1]],n=()=>{};function s(){for(var n,s=0;s<e.length;s++){for(var r=e[s],a=!0,o=1;o<r.length;o++){var l=r[o];0!==t[l]&&(a=!1)}a&&(e.splice(s--,1),n=i(i.s=r[0]))}return 0===e.length&&(i.x(),i.x=()=>{}),n}i.x=()=>{i.x=()=>{},a=a.slice();for(var t=0;t<a.length;t++)r(a[t]);return(n=s)()};var r=s=>{for(var r,a,[l,d,h,c]=s,u=0,m=[];u<l.length;u++)a=l[u],i.o(t,a)&&t[a]&&m.push(t[a][0]),t[a]=0;for(r in d)i.o(d,r)&&(i.m[r]=d[r]);for(h&&h(i),o(s);m.length;)m.shift()();return c&&e.push.apply(e,c),n()},a=self.webpackChunketesting=self.webpackChunketesting||[],o=a.push.bind(a);a.push=r})(),i.x()})();