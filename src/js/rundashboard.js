// import DashboardElementClass from '../../js/class/dashboardelement'
import Apiservice from '../../utils/services'

// import SelectedSkillSection from '../components/SelectedSkillSection'
// import DataTableSection from '../components/DataTableSection'
// import ContinueTestSection from '../components/ContinueTestSection'
import SectionContainer from '../components/SectionContainer'
import PageHeader from '../components/PageHeader'

export default class runDashboardPage {
 constructor() {
  //   Execution
  this.userSelectedSkills = undefined
  this.apiService = new Apiservice()

  this._render()
 }

 async _render() {
  try {
   await this._storeUserSelectedSkills()
   //    const apiService = new Apiservice()
   //    this.userSelectedSkills = await apiService._reqToGetUserSelectedSkills()

   this._setupPageHeader()
   this.setupSectionContainer()
  } catch (error) {}
 }

 async _storeUserSelectedSkills() {
  try {
   this.userSelectedSkills = await this.apiService._reqToGetUserSelectedSkills()
   //    this.aaa = await apiService._reqToGetUserSelectedSkills()
   //    if (this.userSelectedSkills.status == 500) {
   //     throw ' Have no session'
   //    }
  } catch (error) {
   //    window.location = 'NEWedbot.com/backbone/pages/login/'
  }
 }

 setupSectionContainer() {
  try {
   const userData = this.userSelectedSkills
   console.log(this.userSelectedSkills)
   new SectionContainer(userData)
  } catch (error) {}
  //   const apiService = new Apiservice()
  //   this.userSelectedSkills = await apiService._reqToGetUserSelectedSkills()
 }

 //  async setupSelectedSkillsSection() {
 //   const userData = await this.userSelectedSkills

 //   new SelectedSkillSection({
 //    selectedSkillsData: userData.items,
 //   }).getSelectedSkillSectionElement()
 //  }

 //  async setupDataTableSection() {
 //   const userData = await this.userSelectedSkills

 //   new DataTableSection({
 //    historyData: userData.history,
 //   }).dataTableSectionElement()
 //  }

 //  async setupContinueTestSection() {
 //   const userData = await this.userSelectedSkills
 //   if (userData.existedtest.length !== 0) {
 //    new ContinueTestSection({
 //     existedTestData: userData.existedtest,
 //    })._getContinueTestSectionElement()
 //   }
 //  }

 _setupPageHeader() {
  new PageHeader({
   textheader: 'E-Testing',
   secondarytext: 'ทดสอบความเข้าใจที่มีต่อทักษะของเรา',
  })
 }
}
