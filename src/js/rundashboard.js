import DashboardElementClass from '../../js/class/dashboardelement'
import Apiservice from '../../js/class/services'

import AlertModal from '../../js/class/alertmodal'
import ContinueTest from '../components/Continuetest'
import SelectedSkillSection from '../components/SelectedSkillSection'
import DataTableSection from '../components/DataTableSection'
import ContinueTestSection from '../components/ContinueTestSection'

export default class runDashboardPage extends DashboardElementClass {
 constructor() {
  super()
  this._render()
 }

 _render() {
  try {
   this._storeUserSelectedSkills()
   this._setupPageHeader()

   this.setupContinueTestSection()
   this.setupSelectedSkillsSection()
   this.setupDataTableSection()

   //  new Apiservice._unDisplayLoadingScreen()
  } catch (error) {
   this._showEmptySkillAlert()
  }
 }

 async setupSelectedSkillsSection() {
  const userData = await this.userSelectedSkills
  this._appAppendChild(
   new SelectedSkillSection({
    selectedSkillsData: userData.items,
   }).getSelectedSkillSectionElement()
  )
 }
 async setupDataTableSection() {
  const userData = await this.userSelectedSkills
  this._appAppendChild(
   new DataTableSection({
    historyData: userData.history,
   }).dataTableSectionElement()
  )
 }
 async setupContinueTestSection() {
  const userData = await this.userSelectedSkills
  if (userData.existedtest.length !== 0) {
   this._appAppendChild(
    new ContinueTestSection({
     existedTestData: userData.existedtest,
    })._getContinueTestSectionElement()
   )
  }
 }

 _showEmptySkillAlert() {
  const selectedSkillsParent = document.querySelector('#selectedSkillsParent')
  selectedSkillsParent.parentNode.insertBefore(
   this._generateEmptySkillAlert(),
   selectedSkillsParent
  )
 }

 _setCountinueTestingElement() {
  const parent = this._generateExistingTestSection()
  this._appAppendChild(parent)
  new ContinueTest({
   containerParent: parent,
   duration: this.timertest,
  })

  // testinghead.progress._setInitiatedProgressBarValue()
 }

 _setupPageHeader() {
  return this._appAppendChild(this._generatePageHeader())
 }

 async _storeUserSelectedSkills() {
  const apiService = new Apiservice()
  this.userSelectedSkills = apiService._reqToGetUserSelectedSkills()
  // console.log(this.userSelectedSkills)
 }

 _showAlertErrorModal(err) {
  new AlertModal({
   alertMsg: err,
   type: 'error',
  })
 }

 _showAlertSuccessModal(text) {
  new AlertModal({
   alertMsg: text,
   type: 'success',
  })
 }
}
