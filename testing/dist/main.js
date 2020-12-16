(()=>{"use strict";var t=[(t,e,s)=>{s.r(e);s(1),s(2),s(3);var i=s(4);window.addEventListener("DOMContentLoaded",(()=>{(0,i.init)()}))},(t,e,s)=>{s.r(e)},(t,e,s)=>{s.r(e)},,(t,e,s)=>{s.r(e),s.d(e,{init:()=>n});var i=s(5);const n=()=>{new i.default}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>d});var i=s(6),n=s(7),o=s(14),r=s(24),a=s(25);s(29);class d extends a.default{constructor(){super(),this.availableQuestion=void 0,this.answerObject={service:"submitresult",recentquestion:null,timeleft:null,testingid:null,items:[]}||void 0,this.userTimeleftLogUpdate={service:"updatetime",timeleft:null,testingid:null},this.sendLogUpdateInterval=void 0,this.totalQuestionNumber=void 0,this.counterNumber=void 0,this.timerText=void 0,this.timeLeft=void 0,this.media=window.matchMedia("(max-width: 500px)"),this.countTotalExistedAnswer=0,this.currentProgressBarValue=void 0,this.progressBarValuePerTime=void 0,this.testingProgressBar=void 0,this._runTestingPage()}_runTestingPage(){this._storeAvailableQuestion(),this._setupTotalQuestionNumber(),this._setAnswerObjectSkillId(),this._setExistedItemToAnswerObject(),this.availableQuestion.then((t=>{if(500===t.status)throw t;this._setUpTestingId(),this._setPageHeader(),this._setupProgressBar(),this._setTimeCountdown(),this._setPageQuestionSelector(),this._setPageBody(),this._validateDataResult(t)})).then((()=>{this._setPageButtonContainer()})).catch((t=>{"Noquestion"==t||(console.log(t),this.body.innerHTML=`<div class="text-center mt-5"> <h2>ขออภัยเกิดข้อผิดพลาด </h2>\n      Code: ${t.status}\n      msg: ${t.message}</div>`)}))}_validateDataResult(t){if(0==t.results.length)throw"Noquestion"}_setPageHeader(){const t=this._generateQuestionHeader();return this.counterNumber=t.querySelector("h4#counterNumber"),this.totalQuestion=t.querySelector("h4#totalQuestionNumber"),this.timerText=t.querySelector("h5#timer"),this._setCounterNumber(),this._setTotalQuestionNumber(),this._bindCounterNumber(),this._appAppendChild(t)}_setTimeCountdown(){this.availableQuestion.then((t=>{this.timeLeft=null!=t.testinginfo.timeleft?parseInt(t.testinginfo.timeleft):t.testinginfo.timeleft;let e=parseInt(this.timeLeft/60%60,10),s=parseInt(this.timeLeft%60,10),i=parseInt(this.timeLeft/3600%24,10);i=i<10?"0"+i:i,e=e<10?"0"+e:e,s=s<10?"0"+s:s,this.timerText.textContent=null!=this.timeLeft?`${i}:${e}:${s}`:"ไม่จำกัดเวลา",null!=this.timeLeft&&this._startTimer(this.timerText)}))}_setCounterNumber(){this.counterNumber.textContent=""+this._getNumberOfExistedAnswered()}_setTotalQuestionNumber(){this.totalQuestion.textContent="/"+this._getTotalQuestionNumber()}_setPageQuestionSelector(){const t=this._generateQuestionSelector();this._createQuestionSelector(),this._appAppendChild(t)}_createQuestionSelector(){this.availableQuestion.then((t=>{new r.default({questions:t,parent:document.querySelector("#questionSelector")})}))}_displayNoQuestionError(){this.body.innerHTML='<div class="text-center mt-5"> <h2>อุ๊ปส์.. ไม่พบข้อสอบในระบบ</h2></div>'}_setPageBody(){this._createQuestion()}_setPageButtonContainer(){const t=this._generateTestPageButtonContainer();return this._setNextButtonFunction(),this._setBackButtonFunction(),this._appAppendChild(t)}_createQuestion(){let t;this.availableQuestion.then((e=>{t=parseInt(e.testinginfo.recentquestion),e.results.map((t=>{new n.default({directionText:t.question,itemChoices:t.answers,questionNumber:t.index,body:document.querySelector("#question"),answered:this.answerObject,answeredId:t.answeredid,correctAnswer:t.correct_answerid,questionId:t.question_id,category:t.category})})),this._activeQuestion(t)}))}_setNextButtonFunction(){this.nextButton.button.addEventListener("click",(()=>{this._finishTheTest(),this._switchSuccessTextBack(),this._turnToNextQuestion()}))}_finishTheTest(){this._isTestProved()&&this._showTestConfirmModal()}_switchSuccessTextBack(){const t=this._getBesideQuestion();null!==t&&this._isThisLastQuestion(t)&&this._isTestProved()&&this._changeSuccessText()}_showTestConfirmModal(){const t=new this.confirmModal({headerText:"ยืนยัน",ModalContent:"Would you like to submit the test ?"});t.trueButton.addEventListener("click",(e=>{this._IsRequestSuccess(),t._destroy()}))}_setBackButtonFunction(){this.backButton.button.addEventListener("click",(()=>{this._validateFirstQuestion(),this._validateLastQuesiton(),this._returnToPreviousQuestion()}))}_isTestProved(){if(this._getTotalQuestionNumber()==this._getRealTimeNumberOfAnswer())return!0}_isThisLastQuestion(t){if(t.dataset.index==this._getTotalQuestionNumber())return!0}_turnToNextQuestion(){const t=this._getThisQuestion(),e=this._getBesideQuestion();e&&(this._switchDisableButton(),this._hindQuestion(t),this._showQuestion(e),r._turnNextQuestionSelectorOn())}_returnToPreviousQuestion(){const t=this._getThisQuestion(),e=this._getBeforeThisQuestion();this._hindQuestion(t),this._showQuestion(e),r._turnPreviousQuestionSelectorOn()}_activeQuestion(t){const e=document.querySelector("[data-index='"+t+"']"),s=e.parentElement;e.classList.remove("none"),e.classList.add("active"),s.classList.remove("none")}_hindQuestion(t){t.classList.remove("active"),t.classList.add("none")}_showQuestion(t){t.classList.add("active"),t.classList.remove("none")}_validateFirstQuestion(){const t=this._getBeforeThisQuestion();null!==t&&(this.backButton.button.disabled=1==t.dataset.index)}_validateLastQuesiton(){this._getBeforeThisQuestion().dataset.index!=this._getTotalQuestionNumber()&&this._reverseTextToNormal()}_bindCounterNumber(){const t=this.counterNumber;this._callOutCounterObserver().observe(t,{childList:!0,attributes:!0,subtree:!0})}_callOutCounterObserver(){const t=this._getTotalQuestionNumber();return new MutationObserver((()=>{this.testingProgressBar._updateProgressBarPerTime(),this._getRealTimeNumberOfAnswer()==t&&this._changeSuccessText()}))}_startTimer(t){var e,s,i,n;n=setInterval((()=>{s=parseInt(this.timeLeft/60%60,10),e=parseInt(this.timeLeft/3600%24,10),i=parseInt(this.timeLeft%60,10),e=e<10?"0"+e:e,s=s<10?"0"+s:s,i=i<10?"0"+i:i,t.textContent=`${e}:${s}:${i}`,localStorage.setItem("timeleft",this.timeLeft),this._updateUserCountDownTime(i),--this.timeLeft<0&&(this._alertTimeOutModal(),clearInterval(this.sendLogUpdateInterval),clearInterval(n))}),1e3)}_updateUserCountDownTime(t){t<1&&(this._setAnswerObjectCountDownTime(),this._updateUserLog())}_IsRequestSuccess(){(new i.default)._reqToSendTotalResult(this.answerObject).then((t=>{this._redirectToResultPage(t),this._validateSuccessRequest(t)})).catch((t=>{console.log(t),this._thorwNewErrorModal()}))}_redirectToResultPage(t){localStorage.setItem("progressbarvalue",this.testingProgressBar.currentValueOfProgressBar);const e=encodeURIComponent(JSON.stringify(t));setTimeout((()=>{window.location.href="../showresult?"+e}),1e3)}_updateUserLog(){this.userTimeleftLogUpdate.timeleft=this._getTimeLeft(),(new i.default)._reqToUpdateUserTime(this.userTimeleftLogUpdate).then((t=>t.json()))}_storeAvailableQuestion(){const t=this._getTestingRequestData();this.availableQuestion=(new i.default)._getQuestionObjects(t)}_setAnswerObjectSkillId(){this.availableQuestion.then((t=>{this._getTestingRequestData().skill_id.map((e=>{this.answerObject.items.push({category:e,answers:[],totalquestion:this._getEachSkillsNumberOfTotalQuestion(t,e)})}))}))}_getEachSkillsNumberOfTotalQuestion(t,e){return t.results.filter((t=>t.category==e)).length}_getTestingRequestData(){const t=window.location.search.split("?")[1];return JSON.parse(decodeURIComponent(t))}_setUpTestingId(){this.availableQuestion.then((t=>{this.answerObject.testingid=parseInt(t.testinginfo.id),this.answerObject.recentquestion=parseInt(t.testinginfo.recentquestion),this.userTimeleftLogUpdate.testingid=parseInt(t.testinginfo.id)}))}_setupTotalQuestion(){}_setExistedItemToAnswerObject(){this.availableQuestion.then((t=>{t.results.map((t=>{this._pushExistAnswerToAnswerObject(t)}))})),console.log(this.answerObject)}_pushExistAnswerToAnswerObject(t){null!=t.answeredid&&(this.countTotalExistedAnswer++,this.answerObject.items[this._getIndexOfAnswerCategory(t)].answers.push({choiceid:parseInt(t.answeredid),questionid:parseInt(t.question_id),correct_answerid:t.correct_answerid,questionindex:parseInt(t.index)}))}_getIndexOfAnswerCategory(t){return this.answerObject.items.findIndex((e=>e.category==parseInt(t.category)))}_setupTotalQuestionNumber(){this.availableQuestion.then((t=>{this.totalQuestionNumber=t.results.length,localStorage.setItem("totalquestionnumber",this.totalQuestionNumber)}))}_setupProgressBar(){this.testingProgressBar=new o.default({progressbarparent:"#progressBar",actualValue:this._getNumberOfExistedAnswered(),maximumValue:this.totalQuestionNumber})}_alertTimeOutModal(){const t=new this.confirmModal({headerText:"การแจ้งเตือน",ModalContent:"โอ้ดูเหมือนว่า หมดเวลาการทดสอบแล้ว",backdrop:!0});t.falseButton.remove(),t.body.classList="grey lighten-4 modal-body rounded p-2 m-3 text-center";const e=this._parserHtmlTag('<i style="font-size: 5rem;" class="h1 fas fa-exclamation-circle text-warning"></i>');t.body.childNodes[0].classList.add("h4","text-dark","mt-2"),t.body.insertBefore(e,t.body.childNodes[0]),t.trueButton.parentNode.classList.add("m-auto"),t.trueButton.addEventListener("click",(()=>{this._IsRequestSuccess()}))}_getNumberOfExistedAnswered(){return this.countTotalExistedAnswer}_getRealTimeNumberOfAnswer(){return this.counterNumber.textContent}_getTotalQuestionNumber(){return this.totalQuestionNumber}_getBesideChuck(){return this._getThisChuck().nextSibling}_getThisChuck(){return this._getThisQuestion().parentElement}_getBeforeThisQuestion(){return this._getThisQuestion().previousSibling}_getBesideQuestion(){return this._getThisQuestion().nextSibling}_getThisQuestionIndex(){return this._getThisQuestion().dataset.index}_getThisQuestion(){return document.querySelector("div.active")}_setAnswerObjectCountDownTime(){this.answerObject.timeleft=parseInt(this._getTimeLeft())}_switchDisableButton(){this.backButton.button.disabled=!1}_getTimeLeft(){return parseInt(this.timeLeft)}_changeSuccessText(){this.nextButton.button.textContent="จบการทดสอบ"}_reverseTextToNormal(){this.nextButton.button.textContent="ถัดไป"}_thorwNewErrorModal(){new this.alertModal({alertMsg:"เกิดข้อผิดพลาด",type:"error"})}_showModalSuccess(){new this.alertModal({alertMsg:"Sucessful",type:"success"})}_validateSuccessRequest(t){if(500==t.status||!t)throw"Something went wrong";console.log("Successful"),this._showModalSuccess()}}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>i});class i{constructor(){this.url=null}_getAllresult(){console.log(this.data)}async _requestTotest(t){return await fetch(url,{method:"POST",body:JSON.stringify({service:"testing",skill:null})})}async _reqToSendTotalResult(t){console.log(t);const e=this._appendObjectToFormData(t);return(await fetch("../ajax/result.php",{method:"POST",body:e})).json()}async _reqToGetUserSelectedSkills(){return(await fetch("./ajax/getObjectdata.php?",{method:"POST"})).json()}_reqToUpdateUserTime(t){const e=new FormData;return e.append("service",t.service),e.append("timeleft",t.timeleft),e.append("testingid",t.testingid),fetch("./ajax/logtesting.php",{method:"POST",body:e})}async _reqToUpdateUserLog(t){console.log(t);const e=this._appendObjectToFormData(t),s=await fetch("./ajax/logtesting.php",{method:"POST",body:e});return await s.json()}async _getQuestionObjects(t){const e=new FormData;e.append("service",t.service),e.append("skill_id",t.skill_id);const s=await fetch("../ajax/testingObject.php?",{method:"POST",body:e});return await s.json()}_appendObjectToFormData(t){const e=new FormData;return Object.entries(t).map((([t,s])=>{"service"==t?e.append(t,s):e.append(t,JSON.stringify(s))})),e}}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>o});s(8);var i=s(6),n=s(13);class o{constructor({directionText:t,itemChoices:e,questionNumber:s,body:i,answered:n,correctAnswer:o,questionId:r,answeredId:a,category:d}){this.directionText=t||"lorem",this.itemChoices=e||null,this.questionNumber=s||null,this.body=i||void 0,this.totalAnswers=n||void 0,this.correctAnswer=o||void 0,this.answeredId=a||void 0,this.questionId=r||void 0,this.category=parseInt(d)||void 0,this.choiceid=null,this.mainContainer=void 0,this.mainBody=void 0,this.itemContainers=void 0,this.radioInput=void 0,this.radioLabel=void 0,this._createQuestion(),this._generateChoices(this.itemChoices),this._apppendChild()}_createQuestion(){this.mainContainer=document.createElement("div"),this.mainBody=document.createElement("div"),this.mainBody.classList.add("py-3","none"),this.mainBody.dataset.index=this.questionNumber,this.mainBody.dataset.id=this.questionId,this.mainContainer.appendChild(this.mainBody);const t=document.createElement("div");t.classList.add("d-flex","flex-row","text-dark");const e=(new DOMParser).parseFromString(this.directionText,"text/html").body.firstChild;e.classList.add("h2"),e.innerHTML=`${this.questionNumber}. ${e.innerHTML}`,t.appendChild(e),this.mainBody.appendChild(t)}_generateChoices(t){this.itemContainers=document.createElement("div"),this.itemContainers.classList.add("py-3","bg-light","d-flex","flex-column"),t.map((t=>{const e=new n.default({id:t.id,statement:t.statment,questionnumber:this.questionNumber,body:this.itemContainers,answeredId:this.answeredId});this._setupRadioLabelEventListener(e.radioLabel)})),this.mainBody.appendChild(this.itemContainers)}_setupRadioLabelEventListener(t){t.addEventListener("click",(()=>{this.choiceid=parseInt(t.dataset.choices),this._checkActiveLabel(),this._appendAnswerToJson(),t.classList.add("active"),this._updateUserLogToServer();document.querySelector("div.now-question").dataset.status="selected-question"}))}_pushDataToAnswerJson(){this._updateAnswerCounter(),this.totalAnswers.recentquestion=this.questionNumber,this._getAnswerCatagory().answers.push({choiceid:this.choiceid,questionid:parseInt(this.questionId),correct_answerid:this.correctAnswer}),console.log(this.totalAnswers)}_appendAnswerToJson(){this._updateTimeleft(),-1===this._getIndexOfAnswer()?(this._pushDataToAnswerJson(),console.log("Req total push answer",this.totalAnswers)):this._changeAnsweredQuestion()}_updateTimeleft(){this.totalAnswers.timeleft=this._getTimeRemaining()}_updateCurrentUserLog(){this.logs.recentquestion=this._getRecentQuestion(),this.logs.timeleft=this._getTimeRemaining(),this.logs.questionid=parseInt(this.questionId),this.logs.correct_answerid=this.correctAnswer,this.logs.choiceid=this.choiceid}_getRecentQuestion(){return this.totalAnswers.recentquestion<this.questionNumber?this.questionNumber:this.totalAnswers.recentquestion}async _updateUserLogToServer(){(new i.default)._reqToUpdateUserLog({service:"updateresult",recentquestion:this._getRecentQuestion(),timeleft:this._getTimeRemaining(),testingid:this.totalAnswers.testingid,questionid:parseInt(this.questionId),correct_answerid:this.correctAnswer,choiceid:this.choiceid})}_checkActiveLabel(){this.itemContainers.querySelector("label.active")&&this.itemContainers.querySelector("label.active").classList.remove("active")}_updateAnswerCounter(){const t=this._getCounterNumberElement();this._getTotalNumberOfQuestionElement().textContent;let e=parseInt(this._getCounterNumberElement().textContent);e++,t.textContent=""+e}_getTotalNumberOfQuestion(){return parseInt(this._getTotalNumberOfQuestionElement().textContent.split("/")[1])}_getTotalNumberOfQuestionElement(){return document.querySelector("#totalQuestionNumber")}_getAnswerCatagory(){return this.totalAnswers.items[this._checkIndexOfCategoryItem()]}_getIndexOfAnswer(){return this._getAnswerCatagory().answers.findIndex((t=>t.questionid==this.questionId))}_checkIndexOfCategoryItem(){return this.totalAnswers.items.findIndex((t=>t.category==this.category))}_changeAnsweredQuestion(){this._getAnswerCatagory().answers[this._getIndexOfAnswer()].choiceid=this.choiceid}_getTimeRemaining(){return parseInt(localStorage.getItem("timeleft"))}_getTotalNumberOfAnswer(){return this.totalAnswers.items.length}_getChoiceId(){}_setUpLogsRecentQuestion(){}_getCounterNumberElement(){return document.querySelector("#counterNumber")}_apppendChild(){this.body.appendChild(this.mainBody)}}},,,,,,(t,e,s)=>{s.r(e),s.d(e,{default:()=>i});class i{constructor({id:t,statement:e,questionnumber:s,prefix:i,body:n,answeredId:o}){this.id=t||void 0,this.statement=e||void 0,this.questionNumber=s||void 0,this.parentBody=n||void 0,this.answeredId=o||void 0,this.radioInput=void 0,this.radioLabel=void 0,this._createChoice(),this._appendToBody()}_createChoice(){this._createInput(),this._createInputLabel()}_createInput(){this.radioInput=document.createElement("input"),this.radioInput.type="radio",this.radioInput.id=this.id,this.radioInput.name="questionNumber"+this.questionNumber,this.radioInput.classList.add("choice","none")}_createInputLabel(){this.radioLabel=document.createElement("label"),this.radioLabel.setAttribute("for",this.id);const t=(new DOMParser).parseFromString(this.statement,"text/html").body.firstChild;t.classList.add("answer-selector"),t.textContent=""+t.textContent,this.radioLabel.appendChild(t),this.radioLabel.classList.add(...this._generateClassList(this.id)),this.radioLabel.dataset.choices=this.id}_generateClassList(){const t=["btn-lg","btn-white","p-3","rounded","text-dark"];return this.id==this.answeredId&&t.push("active"),t}_appendToBody(){this.parentBody.appendChild(this.radioInput),this.parentBody.appendChild(this.radioLabel)}}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>o});var i=s(15),n=s.n(i);class o{constructor({progressbarparent:t,actualValue:e,maximumValue:s}){this.progressBar=void 0,this.progressBarParent=t||void 0,this.actualValue=e||void 0,this.valuePerUpdateTime=1/s,this.currentValueOfProgressBar=e/s,this._renderProgressBar()}_renderProgressBar(){this.progressBar=new(n().Line)(""+this.progressBarParent,{color:"#1CC88A",trailColor:"#D1D3E2",svgStyle:{width:"100%",height:"10px"}})}_setInitiatedProgressBarValue(){this.progressBar.animate(Number(this.currentValueOfProgressBar.toFixed(10)))}_updateProgressBarPerTime(){this.progressBar.animate(Number(this.currentValueOfProgressBar.toFixed(10))),this.currentValueOfProgressBar+=this.valuePerUpdateTime}}},,,,,,,,,,(t,e,s)=>{s.r(e),s.d(e,{default:()=>i,_turnNextQuestionSelectorOn:()=>n,_getActiveSelectorStatus:()=>o,_addOldStatusToClassList:()=>r,_replaceActiveSelector:()=>a,_getActiveQuestionSelector:()=>d,_getBesideActiveQuestionSelector:()=>l,_getstatusOfActiveSelector:()=>u,_turnPreviousQuestionSelectorOn:()=>c,_getSelectorByIndex:()=>h});class i{constructor({questions:t,parent:e}){this.questions=t,this.parent=e,this.testingRecentQuestion=parseInt(t.testinginfo.recentquestion),this.statusClassLists=["non-selected-question","marked-question","selected-question","now-question"],this.mainBody=void 0,this.toggleDownParent=void 0,this.button=void 0,this.toggleIcon=void 0,this.selector=void 0,this.countNumberOfChilds=0,this.selectorParent=void 0,this._generateSelector()}_generateSelector(){this.selectorParent=document.createElement("div");const t=document.createElement("div");t.classList.add("row","m-0"),this.selectorParent.classList.add("row","collapse","multi-collapse","bg-white","m-0","show"),this.selectorParent.id="multiCollapseExample1",this.toggleDownParent=(new DOMParser).parseFromString('<div class="d-flex mt-2 align-items-center justify-content-center flex-row"></div>',"text/html").body.firstChild,this._appendAtagToToggleDownParent(),this._appendIconToATag(),this.questions.results.map((e=>{this.countNumberOfChilds++,this.selector=document.createElement("div"),this._setupComponentsAttribute(e),t.appendChild(this.selector),this._appendSelectorToParent(),this.selector.addEventListener("click",(t=>{this._setSelectorEvent(t.target)}))})),this.parent.appendChild(t),this.parent.appendChild(this.selectorParent),this._appendArrowParentToMainBody(),this._setArrowEvent()}_setupComponentsAttribute(t){this._isQuestionHasAnswered(t),this._applyRecentQuestionSelector(t),this.selector.textContent=t.index,this.selector.dataset.selectorindex=t.index}_isQuestionHasAnswered(t){null==t.answeredid?(this.selector.classList.add("question-selector","non-selected-question"),this.selector.dataset.status="non-selected-question"):(this.selector.classList="question-selector selected-question",this.selector.dataset.status="selected-question")}_applyRecentQuestionSelector(t){t.index==this.testingRecentQuestion&&(this.selector.classList="question-selector now-question",this.selector.dataset.status="selected-question")}_appendSelectorToParent(){this.selectorParent.appendChild(this.selector)}_appendIconToATag(){const t=(new DOMParser).parseFromString('<i style="font-size: 30px;" class="text-primary fas fa-caret-down"></i>',"text/html").body.firstChild;return this.toggleIcon.appendChild(t)}_appendAtagToToggleDownParent(){return this.toggleIcon=(new DOMParser).parseFromString('<a data-toggle="collapse" class="arrow-down-animated" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1" class="text-primary"></a>',"text/html").body.firstChild,this.toggleDownParent.appendChild(this.toggleIcon)}_appendArrowParentToMainBody(){this.parent.appendChild(this.toggleDownParent)}_setSelectorEvent(t){this._removeActiveClass(),t.classList.remove(...this.statusClassLists),t.classList.add("now-question"),this._activeQuestionDiv(t.textContent),this._switchDisableBackButton()}_switchDisableBackButton(){1==d().textContent?document.querySelector("#backButton").disabled=!0:document.querySelector("#backButton").disabled=!1}_checkIndexOfSelector(t){}_activeQuestionDiv(t){const e=document.querySelector('div[data-index="'+t+'"]');this._hindQuestion(),this._showQuestion(e)}_removeActiveClass(){const t=d();t.classList.remove(...this.statusClassLists),t.className="question-selector "+t.dataset.status}_setArrowEvent(){this.toggleIcon.addEventListener("click",(t=>{this.toggleIcon.classList.toggle("arrow-up-animated")}))}_arrowToggleDown(){this.toggleIcon.classList.toggle("arrow-up-animated")}_showQuestion(t){t.classList.add("active")}_hindQuestion(){const t=document.querySelector("div.active");t.classList.remove("active"),t.classList.add("none")}}const n=()=>{const t=document.querySelector("div.active");document.querySelector('div[data-selectorindex="'+t.dataset.index+'"]').className="question-selector now-question";const e=d();e.className="question-selector "+e.dataset.status},o=()=>d.dataset.status,r=()=>{d().classList.add(u())},a=()=>{const t=document.querySelector("div.now-question");t.classList.replace("now-question",t.dataset.status)},d=()=>document.querySelector("div.now-question"),l=()=>d().nextElementSibling,u=()=>d().dataset.status,c=()=>{a(),h()},h=()=>{const t=document.querySelector("div.active");document.querySelector('div[data-selectorindex="'+t.dataset.index+'"]').className="question-selector now-question"}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>r});var i=s(26),n=s(27),o=s(28);class r{constructor(){this.body=document.querySelector("#app"),this.confirmModal=n.default||void 0,this.alertModal=o.default||void 0,this.backButton=void 0,this.nextButton=void 0,this.retestButton=void 0,this.dashboardButton=void 0}_generateQuestionHeader(){return this._parserHtmlTag(this._questionHeaderTag())}_generateQuestionSelector(){return this._parserHtmlTag(this._questionSelector())}_generateQuestionSelectorBottom(){return this._parserHtmlTag(this._questionSelectorBottom())}_generateQuestionBody(){return this._parserHtmlTag(this._questionBodyTag())}_generateResultBody(){return this._parserHtmlTag(this._displayResult())}_generateDisplayErrorHandle(){return this._parserHtmlTag(this._displayErrorHandle())}_generateTestPageButtonContainer(){const t=this._buttonContainer(),e=this._parserHtmlTag(t);return this.backButton=new i.default({textButton:"ย้อนกลับ",disable:!1,body:e.children[0],id:"backButton"}),this.nextButton=new i.default({textButton:"ถัดไป",disable:!1,body:e.children[1],id:"nextButton"}),e}_generateResultSkillDisplay(){return this._parserHtmlTag(this._displayTestingSkills())}_generateDisplayReccommendCourse(){return this._parserHtmlTag(this._reccomendedCourseElement())}_generateNewSkillBadgeElement(){return this._parserHtmlTag(this._createNewEmptyskillBadge())}_generateResultPageButtonContainer(){const t=this._buttonContainer(),e=this._parserHtmlTag(t);return this.retestButton=new i.default({textButton:"เริ่มทำใหม่",disable:!1,body:e.children[0],id:"retestButton"}),this.retestButton.button.classList.remove("btn-primary"),this.retestButton.button.classList.add("btn-outline-primary"),this.dashboardButton=new i.default({textButton:"กลับหน้าแรก",disable:!1,body:e.children[1],id:"dashboardButton"}),e}_parserHtmlTag(t){return(new DOMParser).parseFromString(t,"text/html").body.firstChild}_appAppendChild(t){return app.appendChild(t)}_questionHeaderTag(){return'<div class="bg-white rounded py-2">\n  <div class="d-flex justify-content-around flex-column ">\n      <div class="d-flex justify-content-between align-items-center flex-row px-3 ">\n          <div class="d-flex flex-column p-1">\n              <div class="">\n                  <h5 class="text-dark font-weight-bold">Pre-Testing</h5>\n                  <h6>แบบทดสอบก่อนเรียน</h6>\n              </div>\n          </div>\n\n          <div class="d-flex flex-column p-1">\n              <div>\n                  <small class="text-secondary font-weight-light">เวลาที่เหลือ</small>\n                  <h5 id="timer" class="text-primary font-weight-light"></h5>\n              </div>\n          </div>\n\n          <div class="d-flex flex-column p-1">\n              <div class="d-flex flex-column">\n                  <small class="text-secondary font-weight-light">จำนวนข้อ</small>\n                  <div id="timeCounterParent" class="d-flex flex-row p-0 align-items-center">\n                      <h4 class="text-primary font-weight-light" id="counterNumber"></h4>\n                      <h4 class="text-primary font-weight-light" id="totalQuestionNumber"></h4>\n                  </div>\n              </div>\n          </div>\n      </div>\n      <div id="progressBar"></div>\n  </div>\n</div>\n      '}_questionSelector(){return'\n  <div id="contentBody" class="row m-0 flex-row-reverse justify-content-between mt-4">\n    <div  class="d-flex flex-column my-3 col-lg-3 col-sm-12 p-0" >\n        <div class="bg-white py-2 px-3 rounded" id="questionSelector">\n            <div class=\'my-3 \'>\n                <h6 class=\'text-dark\'>ตัวเลือกคำถาม</h6>\n            </div>\n        </div>\n    </div>\n    <div id=\'question\' class="my-2 col-lg-8 col-sm-12 p-0 pr-2">\n  </div>\n  </div>\n'}_questionSelectorBottom(){return'<div class="d-flex mt-2 align-items-center justify-content-center flex-row" >\n    <div><i id="toggleIcon" data-toggle="collapse" href="#selectorCollapseRow" role="button" aria-expanded="false" aria-controls="multiCollapseExample1" style="font-size: 30px;" class="txt-primary "></i></div>\n</div>'}_questionBodyTag(){return"\n  <div id='question' class=\"my-2 col-lg-9 col-sm-12\">\n      </div>\n      "}_changeEtestingLinkToDefault(){document.querySelector("#etestingLink").href="../"}_displayResult(){return'<div class="row bg-white m-0 my-5 py-3 rounded text-center">\n    <div class="col-6 d-flex pt-4 flex-column  ">\n        <div class="bg-white m-auto">\n        <i style="font-size: 4rem" class=" fas fa-medal text-primary"></i>\n        </div>\n        <div class="mt-4" style="min-height:100px;">\n            <span>คะแนนที่ได้รับ</span>\n            <p class="h5 mt-2 text-dark font-weight-bold" id="displayPoint"></p>\n        </div>\n    </div>\n    <div class="col-6 d-flex pt-4 flex-column ">\n        <div class="bg-white m-0">\n        <i style="font-size: 4rem" class="mt-0 text-primary fas fa-hourglass-half"></i>\n        </div>\n        <div class="mt-4" style="min-height:100px;">\n            <span>ระยะเวลาที่ใช้</span>\n            <p id="timeSpending" class="h5 mt-2 text-dark font-weight-bold"></p>\n        </div>\n    </div> \n  </div>'}_displayTestingSkills(){return'<div class="rounded bg-white mb-5 py-2 ">\n    <div class="px-3 py-2 font-weight-light">สัดส่วนคะแนนแต่ละทักษะ</div>\n    <div id="displaySkills" class="px-3 py-2 row m-0">\n    </div>\n  </div>'}_createNewEmptyskillBadge(){return'<div class="col-auto mb-2 mr-2 bg-light rounded">\n  <small class="text-dark"></small>\n  <p class=" font-weight-bold text-primary m-0"></p>\n</div>\n'}_reduceDemical(t){return Math.round(t)}_buttonContainer(){return'<div id="buttonContainer" class="row m-0 mb-5 justify-content-between">\n    <div class="col-5 p-0"></div>\n    <div class="col-5 p-0"></div>\n  </div>'}_displayOnlyHourMinuteSecond(t){return`${hour} ชั่วโมง ${minutes} นาที ${t} วินาที`}_displayOnlyMinuteSecond(t,e){return`${t} นาที ${e} วินาที`}_displayOnlySecond(t){return t+" วินาที"}_displayErrorHandle(){return'<div class="text-center">อุ๊ปส์.. ไม่พบข้อมูลในระบบ <button class="btn btn-primary">Refresh</button></div>'}}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>i,_switchDisable:()=>n,_proofAnswer:()=>o,confirmModal:()=>r,_alertAnswer:()=>a,_changeSuccessText:()=>d,_changeText2:()=>l});class i{constructor({textButton:t,disable:e,body:s,id:i}){this.textButton=t||"button",this.disable=e||!1,this.body=s||document.body,this.id=i||"Example",this.button=void 0,this._createButton(),this._appendParent()}_createButton(){this.button=document.createElement("button"),this.button.classList.add("btn","btn-lg","btn-primary","btn-block","text-center"),this.button.textContent=this.textButton,this.button.disabled=this.disable,this.button.id=this.id}_appendParent(){this.body.appendChild(this.button)}_previousQuestion(){const t=document.querySelector("div.active"),e=t.previousSibling;1==e.dataset.index&&(this.button.disabled=!0),t.classList.remove("active"),t.classList.add("none"),e.classList.add("active"),e.classList.remove("none")}_adjustButton(t){const e=document.querySelector("#backButton");n(e),d(t)}_clearAnswer(){Array.from(document.querySelectorAll("input:checked")).map((t=>{t.checked=!1}));Array.from(document.querySelectorAll("label")).map((t=>{t.classList.remove("active")}))}_clearAnsweredArr(t){t.items.splice(0,_totalAnswer(t))}}const n=()=>{const t=document.querySelector("#backButton");!0===t.disabled&&(t.disabled=!1)},o=t=>{if(2!=t)return!1;{const t=new AgreementModal({headerText:"ยืนยัน",ModalContent:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."});t.trueButton.addEventListener("click",(()=>{t._destroy(),a()}))}},r=()=>{},a=()=>{(new Apiservice).data.then((t=>{200===t.status&&(new AlertModal({alertMsg:"Successful",type:"success"}),setTimeout((()=>{location.href="www.google.com"}),2e3))}))},d=()=>{const t=document.querySelector("#nextButton");if(1==questionAction._QuestionNumber())return t.textContent="Finish"},l=t=>document.querySelector("#nextButton").textContent=t},(t,e,s)=>{s.r(e),s.d(e,{default:()=>i});class i{constructor({headerText:t,ModalContent:e,modalId:s,skillQueryString:i,backdrop:n}){this.headerText=t||"Agreement",this.trueButtonText="ตกลง",this.falseButtonText="ยกเลิก",this.modalContent=e||"เนื้อหา..",this.skillQueryString=i||void 0,this.modalId=s||"modalExample",this.static=1!=n||"static",this.modal=void 0,this.body=void 0,this.trueButton=void 0,this.falseButton=void 0,this.parent=document.body,this._createModal(),this._appendDialog(),this._show()}_createModal(){this.modal=document.createElement("div"),this.modal.setAttribute("id",this.modalId),this.modal.setAttribute("tabindex","-1"),this.modal.setAttribute("role","dialog"),this.modal.setAttribute("aria-hidden","true"),this.modal.setAttribute("aria-labelledby",this.modalId),this.modal.classList.add("modal","fade"),this.modal.dataset.backdrop=this.static;const t=document.createElement("div");t.classList.add("modal-dialog","modal-dialog-scrollable"),t.setAttribute("role","document"),this.modal.appendChild(t);const e=document.createElement("div");e.classList.add("modal-content","m-auto"),t.appendChild(e);const s=document.createElement("div"),i=document.createElement("h4");i.classList.add("modal-title"),i.id=this.headerText,i.textContent=this.headerText,s.appendChild(i),s.classList.add("modal-header"),e.appendChild(s),this.body=document.createElement("div"),this.body.classList.add("grey","lighten-4","modal-body","rounded","p-4","m-3");const n=document.createElement("p");n.classList.add("font-weight-light"),n.textContent=this.modalContent,this.body.appendChild(n),e.appendChild(this.body);const o=document.createElement("div");o.classList.add("modal-footer","border-0"),this.falseButton=document.createElement("button"),this.falseButton.classList.add("btn","btn-outline-primary","btn-lg"),this.falseButton.type="button",this.falseButton.setAttribute("data-dismiss","modal"),this.falseButton.textContent=this.falseButtonText,this.falseButton.addEventListener("click",(()=>{this._destroy()})),o.appendChild(this.falseButton),this.trueButton=document.createElement("button"),this.trueButton.classList.add("btn","btn-primary","btn-lg","text-white"),this.trueButton.textContent=this.trueButtonText,o.appendChild(this.trueButton),e.appendChild(o)}_appendDialog(){document.body.appendChild(this.modal),console.log(this.modal)}_destroy(){$("#"+this.modalId).modal("hide"),setTimeout((()=>{this.parent.removeChild(this.modal)}),200)}_show(){$("#"+this.modalId).modal("show")}}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>i});class i{constructor({alertMsg:t,type:e}){this.alertMsg=t||"This is alert msg",this.type=e||void 0,this.body=void 0,this.parent=document.body,this._create(),this._appendDialog(),this._destroy()}_create(){this.body=document.createElement("div"),this.body.classList.add("animate__animated","animate__bounceInDown","col-3","border","shadow","bg-white","p-3","text-center","m-auto"),this.body.style.setProperty("position","fixed"),this.body.style.setProperty("top","10%"),this.body.style.setProperty("z-index","1300"),this.body.style.setProperty("left","35%");const t=document.createElement("i");switch(t.classList.add("px-1"),t.style.setProperty("vertical-align","middle"),t.style.setProperty("font-size","1.5rem"),this.type){case"success":t.classList.add("text-success","fas","fa-check-circle");break;case"error":t.classList.add("text-danger","fas","fa-times-circle")}const e=document.createElement("div");e.classList.add("text-wrap");const s=document.createElement("span");s.classList.add("text-break"),s.textContent=this.alertMsg,e.appendChild(s),this.body.appendChild(t),this.body.appendChild(e)}_appendDialog(){this.parent.appendChild(this.body)}_destroy(){setTimeout((()=>{this.parent.removeChild(this.body)}),3e3)}}},(t,e,s)=>{s.r(e),s.d(e,{default:()=>i});class i{constructor({duration:t}){this.duration=t||void 0,this.hour=void 0,this.minutes=void 0,this.seconds=void 0,this.timer=void 0}_getOnlyMinuteAndSecondString(){return 0===this._getHour()?`${this._getMinutesIncludeZero()} นาที ${this._getSecondIncludeZero()} วินาที`:`${this._getHour()} ชั่วโมง ${this._getMinutesIncludeZero()} นาที ${this._getSecondIncludeZero()} วินาที`}_testest(){return"test"}_getSecond(){return null==this.duration?null:parseInt(this.duration%60,10)}_getMinutes(){return null==this.duration?null:parseInt(this.duration/60%60,10)}_getHour(){return null==this.duration?null:parseInt(this.duration/3600%24,10)}_getHourIncludeZero(){return this._getHour()<10?"0"+this._getHour():this._getHour()}_getMinutesIncludeZero(){return this._getMinutes()<10?"0"+this._getMinutes():this._getMinutes()}_getSecondIncludeZero(){return this._getSecond()<10?"0"+this._getSecond():this._getSecond()}_getTimeStringWithThai(){return`${this._getHour()} ชั่วโมง ${this._getMinutes()} นาที `}_getTimeStringWithOutThai(){return`${this._getHour()}:${this._getMinutes()}:${this._getMinutes()}`}_getTimeStringMinutes(){return this._getMinutes()+" นาที"}_timeStartToConsume(){}}}],e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={exports:{}};return t[i](n,n.exports,s),n.exports}s.m=t,s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t={0:0},e=[[0,1]],i=()=>{};function n(){for(var i,n=0;n<e.length;n++){for(var o=e[n],r=!0,a=1;a<o.length;a++){var d=o[a];0!==t[d]&&(r=!1)}r&&(e.splice(n--,1),i=s(s.s=o[0]))}return 0===e.length&&(s.x(),s.x=()=>{}),i}s.x=()=>{s.x=()=>{},r=r.slice();for(var t=0;t<r.length;t++)o(r[t]);return(i=n)()};var o=n=>{for(var o,r,[d,l,u,c]=n,h=0,m=[];h<d.length;h++)r=d[h],s.o(t,r)&&t[r]&&m.push(t[r][0]),t[r]=0;for(o in l)s.o(l,o)&&(s.m[o]=l[o]);for(u&&u(s),a(n);m.length;)m.shift()();return c&&e.push.apply(e,c),i()},r=self.webpackChunktesting=self.webpackChunktesting||[],a=r.push.bind(r);r.push=o})(),s.x()})();