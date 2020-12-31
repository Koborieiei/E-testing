import DashboardElementClass from '../../js/class/dashboardelement'
import Apiservice from '../../js/class/services'

import SelectedSkillSection from '../components/SelectedSkillSection'
import DataTableSection from '../components/DataTableSection'
import ContinueTestSection from '../components/ContinueTestSection'
import SectionContainer from '../components/SectionContainer'
import PageHeader from '../components/PageHeader'

export default class runDashboardPage extends DashboardElementClass {
 constructor() {
  super()
  //   Execution
  this._render()
 }

 _render() {
  try {
   this._storeUserSelectedSkills()
   this._setupPageHeader()
   this.setupSectionContainer()
   //   this.setupContinueTestSection()
   //   this.setupSelectedSkillsSection()
   //   this.setupDataTableSection()
  } catch (error) {
   console.log(error)
  }
 }

 async setupSectionContainer() {
  const userData = await this.userSelectedSkills
  new SectionContainer(userData)
 }

 async setupSelectedSkillsSection() {
  const userData = await this.userSelectedSkills

  new SelectedSkillSection({
   selectedSkillsData: userData.items,
  }).getSelectedSkillSectionElement()
 }

 async setupDataTableSection() {
  const userData = await this.userSelectedSkills

  new DataTableSection({
   historyData: userData.history,
  }).dataTableSectionElement()
 }

 async setupContinueTestSection() {
  const userData = await this.userSelectedSkills
  if (userData.existedtest.length !== 0) {
   new ContinueTestSection({
    existedTestData: userData.existedtest,
   })._getContinueTestSectionElement()
  }
 }

 async _storeUserSelectedSkills() {
  const apiService = new Apiservice()
  this.userSelectedSkills = apiService._reqToGetUserSelectedSkills()
  // console.log(this.userSelectedSkills)
 }

 _setupPageHeader() {
  new PageHeader({
   textheader: 'E-Testing',
   secondarytext: 'ทดสอบความเข้าใจที่มีต่อทักษะของเรา',
  })
 }
}
