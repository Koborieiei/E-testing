(()=>{"use strict";var t=[(t,e,i)=>{i.r(e);i(1),i(2);var s=i(3);window.addEventListener("DOMContentLoaded",(()=>{(0,s.init)()}))},,(t,e,i)=>{i.r(e)},(t,e,i)=>{i.r(e),i.d(e,{init:()=>n});var s=i(4);const n=()=>{new s.default}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>c});var s=i(5),n=i(10),r=i(11),a=i(12),l=i.n(a),o=(i(32),i(9)),d=i(33);class c extends s.default{constructor(){super(),this.userSelectedSkills=void 0,this.skillUrl=void 0,this.SwiperContainer=void 0,this.tableUserHistory=void 0,this.numberOfLoadedItem=2,this.maxItemofSkillCard=3,this.loadMoreButton=void 0,this.dataHistoryValue=[],this._render()}_render(){try{this._storeUserSelectedSkills(),this._setupPageHeader(),this._setCountinueTestingElement(),this._setupSelectedSkillsSection(),this._setupHistoryTable(),this._setUserHistoryTable()}catch(t){console.log(t)}}_showEmptySkillAlert(){const t=document.querySelector("#selectedSkillsParent");t.parentNode.insertBefore(this._generateEmptySkillAlert(),t)}_setCountinueTestingElement(){const t=this._generateExistingTestSection();this._appAppendChild(t);new d.default({containerParent:t})}_setupHistoryTable(){const t=this._generateUserHistoryTable();return this._appendHistoryKeyToDataHistoryValue(),this._appAppendChild(t)}_setupPageHeader(){return this._appAppendChild(this._generatePageHeader())}_setupSelectedSkillsSection(){const t=this._generateUserSelectedSkills(),e=t.querySelector("#selectedSkillsParent");this._appendSelectedSkillItems(e),this._appAppendChild(t)}_toggledMoreSkillCard(){Array.from(document.querySelectorAll(".hiddenStyle")).map(((t,e)=>{e<this.numberOfLoadedItem&&t.classList.remove("hiddenStyle")}))}_removeLoadMoreButton(){0===document.querySelectorAll(".hiddenStyle").length&&(this.loadMoreButton.style.display="none")}_setUserHistoryTable(){this.userSelectedSkills.then((t=>{const e={valueNames:this.dataHistoryValue,item:this._userHistoryRow(),pagination:!0,page:3};t.history.map((t=>{const e=new r.default({duration:t.timeused})._getTimeStringWithThai();t.timeused=e}));const i=t.history;this.tableUserHistory=new(l())("dataTable",e,i),this._setTableEventListener()})).catch((t=>{}))}_setTableEventListener(){this.tableUserHistory.on("searchComplete",(()=>{0===this._countNumberOfTableList()&&this._displayNotFoundSearchResult()}))}_displayNotFoundSearchResult(){this._getTableElement().querySelector(".list").appendChild(this._generateNotFoundSearchResult())}_countNumberOfTableList(){return this._getTableElement().querySelector(".list").children.length}_appendHistoryKeyToDataHistoryValue(){this.userSelectedSkills.then((t=>{for(const e in t.history[0])this.dataHistoryValue.push(e)})).catch((t=>{console.log(t)}))}_detectErrorMassage(t){if("no skill! you have to select skill first"==t||!t)throw"test"}_appendSelectedSkillItems(t){this.userSelectedSkills.then((e=>{this._detectErrorMassage(e.message),e.items.map(((e,i)=>{const s=new r.default({duration:e.time}),n=new this.Skillcard({relatedskill:e.skills,titlename:e.testname,term:`${e.choicenumber} ข้อ ${null==e.time?"/ ไม่กำหนดเวลา":"/ "+s._getOnlyMinuteAndSecondString()}`,parents:t,img:e.img,testingType:e.testingtype});this._setupEventSelectedSkillButton(n.button),i>this.maxItemofSkillCard-1&&n.mainContainer.classList.add("hiddenStyle")})),this._appendLoadMoreButton(),this._setupLoadMoreButton()})).catch((t=>{console.log(t),this._showEmptySkillAlert()}))}_setupEventSelectedSkillButton(t){t.addEventListener("click",(t=>{new this.confirmModal({headerText:"ยืนยัน",ModalContent:"การทดสอบมีเงื่อนไขตามที่อธิบายไว้ดังนี้",skillQueryString:t.target.value}).trueButton.addEventListener("click",(()=>{localStorage.setItem("skillsets",t.target.dataset.skillsets),console.log(localStorage.getItem("skillsets")),window.location.href="./testing/?"+t.target.value}))}))}_askToDoTesting(){window.location.href="./testing?skill=null"}_setupLoadMoreButton(){this.loadMoreButton=document.querySelector("#loadmore"),this.loadMoreButton.addEventListener("click",(t=>{this._toggledMoreSkillCard(),this._removeLoadMoreButton()}),!1)}_appendLoadMoreButton(){document.querySelector("#selectedSkillsParent").parentNode.appendChild(this._generateLoadMoreButton())}_getTableElement(){return document.querySelector("#dataTable")}_storeUserSelectedSkills(){this.userSelectedSkills=(new n.default)._reqToGetUserSelectedSkills()}_showAlertErrorModal(t){new o.default({alertMsg:t,type:"error"})}_showAlertSuccessModal(t){new o.default({alertMsg:t,type:"success"})}_requestToUserHistory(){return!0}_throwNewError(){throw"ss"}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>a});i(6);var s=i(7),n=i(8),r=i(9);class a{constructor(){this.body=void 0,this.confirmModal=s.default||void 0,this.Skillcard=n.default||void 0,this.alertModal=r.default||void 0}_generateUserHistoryTable(){return this._parserHtmlTag(this._historySectionHtmlTag())}_generatePageHeader(){return this._parserHtmlTag(this._pageHeaderTag())}_generateUserHistoryRow(){return this._parserHtmlTag(this._userHistoryRow())}_generateUserSelectedSkills(){return this._parserHtmlTag(this._selectedSkillSection())}_generateUserSelectedSkillItems(){return this._parserHtmlTag(this._selectedSkillItems())}_generateNotFoundSearchResult(){return this._parserHtmlTag(this._notfoundSearchResult())}_generateEmptySkillAlert(){return this._parserHtmlTag(this._displayEmptySkillAlert())}_generateSkillBadge(t){return this._parserHtmlTag(this._recommendSkillBadgeTag()).textContent=t}_generateDescriptionHeader(){return this._parserHtmlTag(this._descriptionHeaderTag())}_generateExistingTesting(){return this._parserHtmlTag(this._existingTestingElement())}_generateLoadMoreButton(){return this._parserHtmlTag(this._LoadMoreButtonElement())}_generateDescriptionBody(){return this._parserHtmlTag(this._descriptionBodyTag())}_generateExistingTestSection(){return this._parserHtmlTag(this._continueTestSection())}_pageHeaderTag(){return'<div>\n    <h2 class="text-dark m-0">E-testing</h2>\n    <small class="text-muted">ทดสอบความเข้าใจที่มีต่อทักษะของเรา</small>\n    </div>\n    '}_continueTestSection(){return`<section id='existingTest' class="mt-5 ">\n     <div class="headerWrapper mb-3">\n     ${this._skillHeaderSectionText("บททดสอบที่พักไว้ 🔥")}\n     </div>\n \n     \n     </section>`}_historySectionHtmlTag(){return`<div>\n        <div id="dataTable" class="my-4">\n            ${this._skillHeaderSectionText("ประวัติการสอบ")}\n            <div class="d-flex flex-row my-1">\n            <input class="search mr-1 form-control col-4" placeholder="Search" />\n        <button class="btn mx-1 btn-outline-secondary sort" data-sort="timestamp">Sort by date</button>\n            </div>\n            <div>\n                <div class="mt-4 font-weight-light py-3 d-flex bg-secondary text-primary flex-row align-items-center rounded justify-content-around">\n                    <div class="col-3">จำนวนครั้ง</div>\n                    <div class="col-4">เวลา | ข้อ</div>\n                    <div class="col-3 text-left">วันที่สอบ</div>\n                </div>\n            </div>\n            <div  class="list">\n            </div>\n\n            <div class="text-center mt-3 justify-content-center  pagination">\n            </div>\n            \n        </div>\n    </div>`}_userHistoryRow(){return'<div class="mb-2 py-3 my-2 d-flex bg-white align-items-center flex-row justify-content-around rounded">\n    <div class="col-3 d-flex flex-column">\n        <div class="text-dark testname"></div>\n        <div class="type col-sm-5 col-xs-5 col-lg-5 col-md-5 font-weight-light badge-secondary badge"></div>\n    </div>\n    <div id="testingResult" class="text-dark col-4 "><span class="timeused"></span> | <span class="choicenumber"></span> ข้อ </div>\n    <div class="col-3 text-dark text-left timestamp"></div>\n</div>'}_recommendSkillBadgeTag(){return'<div class="m-1 badge-secondary badge font-weight-light"></div>'}_notfoundSearchResult(){return'<div class="row justify-content-center m-0 mt-4">\n  <h4 class="text-secondary font-weight-light">ไม่พบข้อมูล</h4>\n  </div>'}_selectedSkillSection(){return`<div class="my-5">\n    ${this._skillHeaderSectionText("ทักษะที่เลือกไว้")}\n    <div class="d-flex flex-column justify-content-center ">\n\n        <div id="selectedSkillsParent" class="row m-0">\n        </div>\n        \n       \n        \n    </div>\n  </div>`}_LoadMoreButtonElement(){return' <div class="m-auto">\n     <button class="mt-4 btn loadMoreButton" id="loadmore"> แสดงเพิ่มเติม </button>\n\n     </div>'}_displayEmptySkillAlert(){return'<div class="m-auto row pt-4">\n     <div class="col-md-12 text-left">\n         <div class="error-template">\n             <h2>\n                 ขออภัย..</h2>\n             <h3>ดูเหมือนว่าไม่พบทักษะเพื่อทดสอบ</h3>\n             <div class="error-details">\n                 กรุณาเลือกทักษะที่สนใจก่อนเข้าทดสอบ\n             </div>\n             <div class="mt-3 error-actions">\n                 <a href="../profile" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>เลือกทักษะ</a>\n             </div>\n         </div>\n     </div>\n </div>'}_existingTestingElement(){return'<div class="bg-white rounded py-2">\n     <div class="d-flex justify-content-around flex-column ">\n         <div class="d-flex justify-content-between align-items-center flex-row px-3 ">\n             <div class="d-flex flex-column p-1">\n                 <div class="">\n                     <h5 class="text-dark font-weight-bold m-0">Pre-Testing</h5>\n                     <small>ทักษะ 2</small>\n                 </div>\n             </div>\n\n             <div class="d-flex flex-column p-1">\n                 <div>\n                     <small class="text-secondary font-weight-light">เวลาที่เหลือ</small>\n                     <h5 id="timer" class="text-primary font-weight-light">33:33:33</h5>\n                 </div>\n             </div>\n\n             <div class="d-flex flex-column p-1">\n                 <div class="d-flex flex-column">\n                     <div id="timeCounterParent" class="d-flex flex-row p-0 align-items-center">\n                         <a href="" class="btn btn-primary btext-white ">test</a>\n                     </div>\n                 </div>\n             </div>\n         </div>\n         <div id="progressBar"></div>\n     </div>\n </div>'}_skillHeaderSectionText(t){return`<h5 class="text-dark">${t}</h5>`}_descriptionHeaderTag(){return"<dt></dt>"}_descriptionBodyTag(){return"<dd></dd>"}_parserHtmlTag(t){return(new DOMParser).parseFromString(t,"text/html").body.firstChild}_questionAppendChild(t){return document.querySelector("#question").appendChild(t)}_appAppendChild(t){return app.appendChild(t)}_appInnerHtmlReplace(t){app.innerHtml=t}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>s,_switchDisable:()=>n,_proofAnswer:()=>r,confirmModal:()=>a,_alertAnswer:()=>l,_changeSuccessText:()=>o,_changeText2:()=>d});class s{constructor({textButton:t,disable:e,body:i,id:s}){this.textButton=t||"button",this.disable=e||!1,this.body=i||document.body,this.id=s||"Example",this.button=void 0,this._createButton(),this._appendParent()}_createButton(){this.button=document.createElement("button"),this.button.classList.add("btn","btn-lg","btn-primary","btn-block","text-center"),this.button.textContent=this.textButton,this.button.disabled=this.disable,this.button.id=this.id}_appendParent(){this.body.appendChild(this.button)}_previousQuestion(){const t=document.querySelector("div.active"),e=t.previousSibling;1==e.dataset.index&&(this.button.disabled=!0),t.classList.remove("active"),t.classList.add("none"),e.classList.add("active"),e.classList.remove("none")}_adjustButton(t){const e=document.querySelector("#backButton");n(e),o(t)}_clearAnswer(){Array.from(document.querySelectorAll("input:checked")).map((t=>{t.checked=!1}));Array.from(document.querySelectorAll("label")).map((t=>{t.classList.remove("active")}))}_clearAnsweredArr(t){t.items.splice(0,_totalAnswer(t))}}const n=()=>{const t=document.querySelector("#backButton");!0===t.disabled&&(t.disabled=!1)},r=t=>{if(2!=t)return!1;{const t=new AgreementModal({headerText:"ยืนยัน",ModalContent:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."});t.trueButton.addEventListener("click",(()=>{t._destroy(),l()}))}},a=()=>{},l=()=>{(new Apiservice).data.then((t=>{200===t.status&&(new AlertModal({alertMsg:"Successful",type:"success"}),setTimeout((()=>{location.href="www.google.com"}),2e3))}))},o=()=>{const t=document.querySelector("#nextButton");if(1==questionAction._QuestionNumber())return t.textContent="Finish"},d=t=>document.querySelector("#nextButton").textContent=t},(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});class s{constructor({headerText:t,ModalContent:e,modalId:i,skillQueryString:s,backdrop:n}){this.headerText=t||"Agreement",this.trueButtonText="ตกลง",this.falseButtonText="ยกเลิก",this.modalContent=e||"เนื้อหา..",this.skillQueryString=s||void 0,this.modalId=i||"modalExample",this.static=1!=n||"static",this.modal=void 0,this.body=void 0,this.trueButton=void 0,this.falseButton=void 0,this.parent=document.body,this._createModal(),this._appendDialog(),this._show()}_createModal(){this.modal=document.createElement("div"),this.modal.setAttribute("id",this.modalId),this.modal.setAttribute("tabindex","-1"),this.modal.setAttribute("role","dialog"),this.modal.setAttribute("aria-hidden","true"),this.modal.setAttribute("aria-labelledby",this.modalId),this.modal.classList.add("modal","fade"),this.modal.dataset.backdrop=this.static;const t=document.createElement("div");t.classList.add("modal-dialog","modal-dialog-scrollable"),t.setAttribute("role","document"),this.modal.appendChild(t);const e=document.createElement("div");e.classList.add("modal-content","m-auto"),t.appendChild(e);const i=document.createElement("div"),s=document.createElement("h4");s.classList.add("modal-title"),s.id=this.headerText,s.textContent=this.headerText,i.appendChild(s),i.classList.add("modal-header"),e.appendChild(i),this.body=document.createElement("div"),this.body.classList.add("grey","lighten-4","modal-body","rounded","p-4","m-3");const n=document.createElement("p");n.classList.add("font-weight-light"),n.textContent=this.modalContent,this.body.appendChild(n),e.appendChild(this.body);const r=document.createElement("div");r.classList.add("modal-footer","border-0"),this.falseButton=document.createElement("button"),this.falseButton.classList.add("btn","btn-outline-primary","btn-lg"),this.falseButton.type="button",this.falseButton.setAttribute("data-dismiss","modal"),this.falseButton.textContent=this.falseButtonText,this.falseButton.addEventListener("click",(()=>{this._destroy()})),r.appendChild(this.falseButton),this.trueButton=document.createElement("button"),this.trueButton.classList.add("btn","btn-primary","btn-lg","text-white"),this.trueButton.textContent=this.trueButtonText,r.appendChild(this.trueButton),e.appendChild(r)}_appendDialog(){document.body.appendChild(this.modal),console.log(this.modal)}_destroy(){$("#"+this.modalId).modal("hide"),setTimeout((()=>{this.parent.removeChild(this.modal)}),200)}_show(){$("#"+this.modalId).modal("show")}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});class s{constructor({relatedskill:t,titlename:e,term:i,img:s,id:n,parents:r,testingType:a}){this.relatedskill=t||void 0,this.titlename=e||void 0,this.term=i||void 0,this.img=s||void 0,this.id=n||null,this.testingType=a||void 0,this.parents=r||null,this.mainContainer=void 0,this.reccomendSkillParent=void 0,this.imageContainer=void 0,this.skillTitleContainer=void 0,this.buttonContainer=void 0,this.button=void 0,this.skillIdContainers={service:a,skill_id:[]},this._create(),this._generateRecommendBadge(),this._apppendChild()}_create(){this.mainContainer=this._parserHtmlTag('<div class=" col-6 col-lg-4 col-xs-6 col-sm-6 col-md-4 my-2 d-flex flex-column rounded">\n</div>\n');const t=document.createElement("div");t.classList.add("bg-white","rounded"),t.style.setProperty("min-height","300px"),this.imageContainer=document.createElement("div"),this.imageContainer.classList.add("rounded-top","text-center"),this.imageContainer.style.setProperty("background","url("+this.img+")"),this.imageContainer.style.setProperty("background-size","cover"),this.imageContainer.style.setProperty("background-position","center"),this.imageContainer.style.setProperty("width","100%"),this.imageContainer.style.setProperty("height","150px"),this.skillTitleContainer=document.createElement("div"),this.skillTitleContainer.classList.add("pt-3","mb-0","pl-3","bg-white");const e=document.createElement("dt");e.innerText=this.titlename,e.classList.add("text-dark");const i=document.createElement("dd");i.classList.add("font-weight-light","text-secondary"),i.innerText=this.term,this.reccomendSkillParent=document.createElement("div"),this.reccomendSkillParent.classList.add("my-3","d-flex","flex-row","flex-wrap","pl-3"),this.reccomendSkillParent.style.setProperty("min-height","30px"),this.skillTitleContainer.appendChild(e),this.skillTitleContainer.appendChild(i);const s=document.createElement("div");s.classList.add("py-1","pl-3","my-2"),this.button=document.createElement("button"),this.button.classList.add("btn","btn-primary"),this.button.textContent="ทดสอบเลย",s.appendChild(this.button),t.appendChild(this.imageContainer),t.appendChild(this.skillTitleContainer),t.appendChild(this.reccomendSkillParent),t.appendChild(s),this.mainContainer.appendChild(t)}_generateRecommendBadge(){let t=[];this._isArrayOfRelatedSkill().map((e=>{const i=this._parserHtmlTag(`<div data-badgeid="${e.id}" class="my-1 mr-1 badge-secondary badge font-weight-light"></div>`);this.skillIdContainers.skill_id.push(parseInt(e.skillid)),t.push({skillid:e.skillid,skillname:e.skillname}),i.textContent=e.skillname,this.reccomendSkillParent.appendChild(i)})),this.button.dataset.skillsets=""+encodeURIComponent(JSON.stringify(t)),this.button.value=""+encodeURIComponent(JSON.stringify(this.skillIdContainers))}_isArrayOfRelatedSkill(){return!0===Array.isArray(this.relatedskill)?this.relatedskill:new Array(this.relatedskill)}_apppendChild(){this.parents.appendChild(this.mainContainer)}_parserHtmlTag(t){return(new DOMParser).parseFromString(t,"text/html").body.firstChild}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});class s{constructor({alertMsg:t,type:e}){this.alertMsg=t||"This is alert msg",this.type=e||void 0,this.body=void 0,this.parent=document.body,this._create(),this._appendDialog(),this._destroy()}_create(){this.body=document.createElement("div"),this.body.classList.add("animate__animated","animate__bounceInDown","col-3","border","shadow","bg-white","p-3","text-center","m-auto"),this.body.style.setProperty("position","fixed"),this.body.style.setProperty("top","10%"),this.body.style.setProperty("z-index","1300"),this.body.style.setProperty("left","35%");const t=document.createElement("i");switch(t.classList.add("px-1"),t.style.setProperty("vertical-align","middle"),t.style.setProperty("font-size","1.5rem"),this.type){case"success":t.classList.add("text-success","fas","fa-check-circle");break;case"error":t.classList.add("text-danger","fas","fa-times-circle")}const e=document.createElement("div");e.classList.add("text-wrap");const i=document.createElement("span");i.classList.add("text-break"),i.textContent=this.alertMsg,e.appendChild(i),this.body.appendChild(t),this.body.appendChild(e)}_appendDialog(){this.parent.appendChild(this.body)}_destroy(){setTimeout((()=>{this.parent.removeChild(this.body)}),3e3)}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});class s{constructor(){this.url=null}_getAllresult(){console.log(this.data)}async _requestTotest(t){return await fetch(url,{method:"POST",body:JSON.stringify({service:"testing",skill:null})})}async _reqToSendTotalResult(t){this._displayLoadingScreen();const e=this._appendObjectToFormData(t),i=await fetch("../ajax/result.php",{method:"POST",body:e});if(!i.ok)throw"Something Went Wrong";this._unDisplayLoadingScreen();return i.json()}async _reqToGetUserSelectedSkills(){const t=await fetch("./ajax/getObjectdata.php?",{method:"POST"});if(!t.ok)throw"Something Went Wrong";this._unDisplayLoadingScreen();return await t.json()}_reqToUpdateUserTime(t){const e=new FormData;return e.append("service",t.service),e.append("timeleft",t.timeleft),e.append("testingid",t.testingid),fetch("./ajax/logtesting.php",{method:"POST",body:e})}async _reqToUpdateUserLog(t){console.log(t);const e=this._appendObjectToFormData(t),i=await fetch("./ajax/logtesting.php",{method:"POST",body:e});return await i.json()}async _getQuestionObjects(t){this._displayLoadingScreen();const e=new FormData;e.append("service",t.service),e.append("skill_id",t.skill_id);const i=await fetch("../ajax/testingObject.php?",{method:"POST",body:e});if(!i.ok)throw"Something Went Wrong";this._unDisplayLoadingScreen();return await i.json()}_appendObjectToFormData(t){const e=new FormData;return Object.entries(t).map((([t,i])=>{"service"==t?e.append(t,i):e.append(t,JSON.stringify(i))})),e}_displayLoadingScreen(){document.querySelector("#loading").classList.remove("none")}_unDisplayLoadingScreen(){document.querySelector("#loading").classList.add("none")}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>s});class s{constructor({duration:t}){this.duration=t,this.hour=void 0,this.minutes=void 0,this.seconds=void 0,this.timer=void 0,this.string=void 0,this._timeToString()}_timeToString(){this.string=null===this.duration?"ไม่จำกัดเวลา":this._getTimeStringWithOutThai()}_getOnlyMinuteAndSecondString(){return this.duration>3600?`${this._getHour()} ชั่วโมง ${this._getMinutes()} นาที ${this._getSecondIncludeZero()} วินาที`:this.duration<60?this._getSecondIncludeZero()+" วินาที":`${this._getMinutesIncludeZero()} นาที ${this._getSecondIncludeZero()} วินาที`}_getHourThaiString(){return this._getHour()+" ชั่วโมง"}_getHourThaiString(){return this._getMinutes()+" นาที"}_getSecondThaiString(){return this._getSecond()+" วินาที"}_getSecond(){return null===this.duration?null:parseInt(this.duration%60,10)}_getMinutes(){return null===this.duration?null:parseInt(this.duration/60%60,10)}_getHour(){return null===this.duration?null:parseInt(this.duration/3600%24,10)}_getHourIncludeZero(){return this._getHour()<10?"0"+this._getHour():this._getHour()}_getMinutesIncludeZero(){return this._getMinutes()<10?"0"+this._getMinutes():this._getMinutes()}_getSecondIncludeZero(){return this._getSecond()<10?"0"+this._getSecond():this._getSecond()}_getTimeStringWithThai(){return`${this._getHour()} ชั่วโมง ${this._getMinutes()} นาที `}_getTimeStringWithOutThai(){return`${this._getHourIncludeZero()}:${this._getMinutesIncludeZero()}:${this._getSecondIncludeZero()}`}_getTimeStringMinutes(){return this._getMinutes()+" นาที"}_reducingTimeLeft(){return this.duration--}_adjustTimerDisplay(t){t.textContent=""+this._getTimeStringWithOutThai()}_timeStartToConsume(){}}},,,,,,,,,,,,,,,,,,,,,t=>{t.exports=JSON.parse('{"status":0,"iscontinue":false,"items":[{"testingtype":1,"skills":[],"testname":"Pre-test","choicenumber":30,"time":30,"img":"https://gonextpage.com/wp-content/uploads/2018/12/Practicing_the_art_of_leadership-Header.png"},{"testingtype":2,"skills":[{"skillid":9,"skillname":"Test9"}],"testname":"Post-test","choicenumber":13,"time":40,"img":"https://www.positivelendingsolutions.com.au/uploads/blogs/444/fit_1277x403_Tips-to-Improve-Your-Personal-and-Business-Financial-Management-----v1.png"},{"testingtype":2,"skills":[{"skillid":9,"skillname":"Test9"}],"testname":"Financial (Post-test)","choicenumber":60,"time":90,"img":"https://www.positivelendingsolutions.com.au/uploads/blogs/444/fit_1277x403_Tips-to-Improve-Your-Personal-and-Business-Financial-Management-----v1.png"},{"testingtype":2,"skills":[{"skillid":9,"skillname":"Test9"}],"testname":"Financial (Post-test)","choicenumber":60,"time":90,"img":"https://www.positivelendingsolutions.com.au/uploads/blogs/444/fit_1277x403_Tips-to-Improve-Your-Personal-and-Business-Financial-Management-----v1.png"},{"testingtype":2,"skills":[{"skillid":9,"skillname":"Test9"}],"testname":"Financial (Post-test)","choicenumber":60,"time":90,"img":"https://www.positivelendingsolutions.com.au/uploads/blogs/444/fit_1277x403_Tips-to-Improve-Your-Personal-and-Business-Financial-Management-----v1.png"},{"testingtype":2,"skills":[{"skillid":9,"skillname":"Test9"}],"testname":"Financial (Post-test)","choicenumber":60,"time":90,"img":"https://www.positivelendingsolutions.com.au/uploads/blogs/444/fit_1277x403_Tips-to-Improve-Your-Personal-and-Business-Financial-Management-----v1.png"},{"testingtype":2,"skills":[{"skillid":9,"skillname":"Test9"}],"testname":"Financial (Post-test)","choicenumber":60,"time":90,"img":"https://www.positivelendingsolutions.com.au/uploads/blogs/444/fit_1277x403_Tips-to-Improve-Your-Personal-and-Business-Financial-Management-----v1.png"},{"testingtype":2,"skills":[{"id":9,"skillname":"Test9"}],"testname":"Financial (Post-test)","choicenumber":60,"time":90,"img":"https://www.positivelendingsolutions.com.au/uploads/blogs/444/fit_1277x403_Tips-to-Improve-Your-Personal-and-Business-Financial-Management-----v1.png"},{"testingtype":2,"skills":[{"id":9,"skillname":"Test9"}],"testname":"Financial (Post-test)","choicenumber":60,"time":90,"img":"https://www.positivelendingsolutions.com.au/uploads/blogs/444/fit_1277x403_Tips-to-Improve-Your-Personal-and-Business-Financial-Management-----v1.png"}],"history":[{"testname":"ทดสอบครั้งที่ 1","id":1,"type":"pre-test","choicenumber":60,"timestamp":121212121,"timeused":"30:20"},{"testname":"ทดสอบครั้งที่ 2","id":2,"type":"pre-test","choicenumber":60,"timestamp":121212121,"timeused":"30:20"},{"testname":"ทดสอบครั้งที่ 3","id":2,"type":"pre-test","choicenumber":60,"timestamp":121212121,"timeused":"30:20"},{"testname":"ทดสอบครั้งที่ 4","id":2,"type":"pre-test","choicenumber":60,"timestamp":121212121,"timeused":"30:20"},{"testname":"ทดสอบครั้งที่ 5","id":2,"type":"pre-test","choicenumber":60,"timestamp":121212121,"timeused":"30:20"},{"testname":"ทดสอบครั้งที่ 6","id":2,"type":"pre-test","choicenumber":60,"timestamp":121212121,"timeused":"30:20"},{"testname":"ทดสอบครั้งที่ 7","id":2,"type":"pre-test","choicenumber":60,"timestamp":121212121,"timeused":"30:20"}]}')},(t,e,i)=>{i.r(e),i.d(e,{default:()=>o});var s=i(34),n=i(11),r=i(10),a=i(35);class l extends s.default{constructor({containerParent:t}){super(),this.containerParent=t||void 0,this.progressaBarValue=void 0,this.testingHeader="PRE-TESTING",this.testingSkill=void 0,this.existingTestTimer=new n.default({duration:5}),this.mainBody=this._parserHtmlTag(this._remindExistingExamElement()),this.existingTestCountDownInterval=void 0,this._parentAppendChild(),this._startTimer(),$((function(){$('[data-toggle="tooltip"]').tooltip({template:'<div class="ml-1 tooltip" role="tooltip"><div class="arrow "></div><div class="tooltip-inner bg-white text-primary py-2 px-3 shadow-sm"></div></div>'})})),this._setUpProgressBar()}_getParentNode(){return this.parent}_getTimerElement(){return this.mainBody.querySelector("")}_getProgressBar(){return this.mainBody.querySelector("#progressBar")}_setUpProgressBar(){this.progress=new a.default({progressbarparent:this._getProgressBar(),actualValue:10,maximumValue:20,options:{color:"#1CC88A",trailColor:"#D1D3E2",svgStyle:{width:"100%",height:"8px"}}}),this.progress._setInitiatedProgressBarValue()}_isRequestSuccess(){(new r.default).then((t=>{console.log(t)})).catch((t=>{console.log(t)}))}_parentAppendChild(){this.containerParent.appendChild(this.mainBody)}_getReDoExamActionButton(){return this.mainBody.querySelector("#reDoExamActionButton")}_getTimerElement(){return this.mainBody.querySelector("#timer")}_startTimer(){this.existingTestCountDownInterval=setInterval((()=>{this.existingTestTimer._reducingTimeLeft(),this.existingTestTimer._adjustTimerDisplay(this._getTimerElement()),0===this.existingTestTimer.duration&&(this._adjustButtonTextContent(),clearInterval(this.existingTestCountDownInterval))}),1e3)}_adjustButtonTextContent(){this._getReDoExamActionButton().textContent="จบการทดสอบ"}_remindExistingExamElement(){return`<div class=" bg-white rounded col-lg-12 col-md-6 col-sm-12 px-3 py-3">\n         <div class="d-flex flex-row justify-content-between align-items-center">\n             <div class="d-flex flex-column col-4 p-1">\n                 <div>\n                 <h5 class="text-dark font-weight-bold m-0">${this.testingHeader}</h5>\n  \n              <div class="my-1">\n                  <small id="testTooltip" class="text-secondary" data-toggle="tooltip" data-placement="right" data-html="true"  title="Black tea<br>Green tea">ทักษะที่ใข้ทดสอบ <div class="circle">2</div></small>\n              </div>\n  \n                     <div  id="progressBar">\n                     </div>\n\n                 </div>\n             </div>\n    \n             <div class="d-flex flex-column p-1">\n                 <div>\n                     <small class="text-secondary font-weight-light">เวลาที่เหลือ</small>\n                     <h6 id="timer" class="text-primary font-weight-bold">\n                         <bold>${this.existingTestTimer._getTimeStringWithOutThai()}</bold>\n                     </h6>\n                 </div>\n             </div>\n    \n             <div class="d-flex flex-column p-1">\n                 <div class="d-flex flex-column">\n                     <div id="timeCounterParent" class="d-flex flex-row p-0 align-items-center">\n                         <a id='reDoExamActionButton' href="" class="btn btn-sm btn-secondary">ทดสอบ</a>\n                     </div>\n                 </div>\n             </div>\n         </div>\n    \n    \n     </div>`}}const o=l},(t,e,i)=>{i.r(e),i.d(e,{default:()=>a});var s=i(6),n=i(7),r=i(9);class a{constructor(){this.body=document.querySelector("#app"),this.confirmModal=n.default||void 0,this.alertModal=r.default||void 0,this.backButton=void 0,this.nextButton=void 0,this.retestButton=void 0,this.dashboardButton=void 0}_generateQuestionHeader(){return this._parserHtmlTag(this._questionHeaderTag())}_generateQuestionSelector(){return this._parserHtmlTag(this._questionSelector())}_generateQuestionSelectorBottom(){return this._parserHtmlTag(this._questionSelectorBottom())}_generateQuestionBody(){return this._parserHtmlTag(this._questionBodyTag())}_generateResultBody(){return this._parserHtmlTag(this._displayResult())}_generateDisplayErrorHandle(){return this._parserHtmlTag(this._displayErrorHandle())}_generateTestPageButtonContainer(){const t=this._buttonContainer(),e=this._parserHtmlTag(t);return this.backButton=new s.default({textButton:"ย้อนกลับ",disable:!1,body:e.children[0],id:"backButton"}),this.nextButton=new s.default({textButton:"ถัดไป",disable:!1,body:e.children[1],id:"nextButton"}),e}_generateResultSkillDisplay(){return this._parserHtmlTag(this._displayTestingSkills())}_generateDisplayReccommendCourse(){return this._parserHtmlTag(this._reccomendedCourseElement())}_generateNewSkillBadgeElement(){return this._parserHtmlTag(this._createNewEmptyskillBadge())}_generateExistedTestReminder(){return this._parserHtmlTag(this._remindExistingExamElement())}_generateResultPageButtonContainer(){const t=this._buttonContainer(),e=this._parserHtmlTag(t);return this.retestButton=new s.default({textButton:"เริ่มทำใหม่",disable:!1,body:e.children[0],id:"retestButton"}),this.retestButton.button.classList.remove("btn-primary"),this.retestButton.button.classList.add("btn-outline-primary"),this.dashboardButton=new s.default({textButton:"กลับหน้าแรก",disable:!1,body:e.children[1],id:"dashboardButton"}),e}_parserHtmlTag(t){return(new DOMParser).parseFromString(t,"text/html").body.firstChild}_appAppendChild(t){return app.appendChild(t)}_questionHeaderTag(){return'<div class="bg-white rounded py-2">\n  <div class="d-flex justify-content-around flex-column ">\n      <div class="d-flex justify-content-between align-items-center flex-row px-3 ">\n          <div class="d-flex flex-column p-1">\n              <div class="">\n                  <h5 class="text-dark font-weight-bold" id=\'testMainTextHeader\'>Pre-Testing</h5>\n                  <h6 id="testSecondTextHeader">แบบทดสอบก่อนเรียน</h6>\n              </div>\n          </div>\n\n          <div class="d-flex flex-column p-1">\n              <div>\n                  <small class="text-secondary font-weight-light">เวลาที่เหลือ</small>\n                  <h5 id="timer" class="text-primary font-weight-light"></h5>\n              </div>\n          </div>\n\n          <div class="d-flex flex-column p-1">\n              <div class="d-flex flex-column">\n                  <small class="text-secondary font-weight-light">จำนวนข้อ</small>\n                  <div id="timeCounterParent" class="d-flex flex-row p-0 align-items-center">\n                      <h4 class="text-primary font-weight-light" id="counterNumber"></h4>\n                      <h4 class="text-primary font-weight-light" id="totalQuestionNumber"></h4>\n                  </div>\n              </div>\n          </div>\n      </div>\n      <div id="progressBar"></div>\n  </div>\n</div>\n      '}_questionSelector(){return'\n  <div id="contentBody" class="row m-0 flex-row-reverse justify-content-between mt-4">\n    <div  class="d-flex flex-column my-3 col-lg-3 col-sm-12 p-0" >\n        <div class="bg-white py-2 px-3 rounded" id="questionSelector">\n            <div class=\'my-3 \'>\n                <h6 class=\'text-dark\'>ตัวเลือกคำถาม</h6>\n            </div>\n        </div>\n    </div>\n    <div id=\'question\' class="my-2 col-lg-8 col-sm-12 p-0 pr-2">\n  </div>\n  </div>\n'}_questionSelectorBottom(){return'<div class="d-flex mt-2 align-items-center justify-content-center flex-row" >\n    <div><i id="toggleIcon" data-toggle="collapse" href="#selectorCollapseRow" role="button" aria-expanded="false" aria-controls="multiCollapseExample1" style="font-size: 30px;" class="txt-primary "></i></div>\n</div>'}_questionBodyTag(){return"\n  <div id='question' class=\"my-2 col-lg-9 col-sm-12\">\n      </div>\n      "}_changeEtestingLinkToDefault(){document.querySelector("#etestingLink").href="../"}_displayResult(){return'<div class="row bg-white m-0 my-5 py-3 rounded text-center">\n    <div class="col-6 d-flex pt-4 flex-column  ">\n        <div class="bg-white m-auto">\n        <i style="font-size: 4rem" class=" fas fa-medal text-primary"></i>\n        </div>\n        <div class="mt-4" style="min-height:100px;">\n            <span>คะแนนที่ได้รับ</span>\n            <p class="h5 mt-2 text-dark font-weight-bold" id="displayPoint"></p>\n        </div>\n    </div>\n    <div class="col-6 d-flex pt-4 flex-column ">\n        <div class="bg-white m-0">\n        <i style="font-size: 4rem" class="mt-0 text-primary fas fa-hourglass-half"></i>\n        </div>\n        <div class="mt-4" style="min-height:100px;">\n            <span>ระยะเวลาที่ใช้</span>\n            <p id="timeSpending" class="h5 mt-2 text-dark font-weight-bold"></p>\n        </div>\n    </div> \n  </div>'}_displayTestingSkills(){return'<div class="rounded bg-white mb-5 py-2 ">\n    <div class="px-3 py-2 font-weight-light">สัดส่วนคะแนนแต่ละทักษะ</div>\n    <div id="displaySkills" class="px-3 py-2 row m-0">\n    </div>\n  </div>'}_createNewEmptyskillBadge(){return'<div class="col-auto mb-2 mr-2 bg-light rounded">\n  <small class="text-dark"></small>\n  <p class=" font-weight-bold text-primary m-0"></p>\n</div>\n'}_reduceDemical(t){return Math.round(t)}_buttonContainer(){return'<div id="buttonContainer" class="row m-0 mb-5 justify-content-between">\n    <div class="col-5 p-0"></div>\n    <div class="col-5 p-0"></div>\n  </div>'}_questionSecondTextHeader(t){return"PRE-TEST"==t.replace(/ /g,"")?"แบบทดสอบก่อนเรียน":"แบบทดสอบหลังเรียน"}_displayErrorHandle(){return'<div class="text-center">อุ๊ปส์.. ไม่พบข้อมูลในระบบ <button class="btn btn-primary">Refresh</button></div>'}}},(t,e,i)=>{i.r(e),i.d(e,{default:()=>r});var s=i(36),n=i.n(s);class r{constructor({progressbarparent:t,actualValue:e,maximumValue:i,options:s}){this.progressBar=void 0,this.progressBarParent=t||void 0,this.options=s||void 0,this.actualValue=e||void 0,this.valuePerUpdateTime=1/i,this.currentValueOfProgressBar=e/i,console.log(s),this._renderProgressBar()}_renderProgressBar(){this.progressBar=new(n().Line)(this.progressBarParent,this.options||{color:"#1CC88A",trailColor:"#D1D3E2",svgStyle:{width:"100%",height:"10px"}})}_setInitiatedProgressBarValue(){this.progressBar.animate(Number(this.currentValueOfProgressBar.toFixed(10)))}_updateProgressBarPerTime(){this.progressBar.animate(Number(this.currentValueOfProgressBar.toFixed(10))),this.currentValueOfProgressBar+=this.valuePerUpdateTime}}}],e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={exports:{}};return t[s](n,n.exports,i),n.exports}i.m=t,i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t={0:0},e=[[0,2]],s=()=>{};function n(){for(var s,n=0;n<e.length;n++){for(var r=e[n],a=!0,l=1;l<r.length;l++){var o=r[l];0!==t[o]&&(a=!1)}a&&(e.splice(n--,1),s=i(i.s=r[0]))}return 0===e.length&&(i.x(),i.x=()=>{}),s}i.x=()=>{i.x=()=>{},a=a.slice();for(var t=0;t<a.length;t++)r(a[t]);return(s=n)()};var r=n=>{for(var r,a,[o,d,c,u]=n,h=0,m=[];h<o.length;h++)a=o[h],i.o(t,a)&&t[a]&&m.push(t[a][0]),t[a]=0;for(r in d)i.o(d,r)&&(i.m[r]=d[r]);for(c&&c(i),l(n);m.length;)m.shift()();return u&&e.push.apply(e,u),s()},a=self.webpackChunketesting=self.webpackChunketesting||[],l=a.push.bind(a);a.push=r})(),i.x()})();