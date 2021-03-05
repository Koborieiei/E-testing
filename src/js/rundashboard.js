import Apiservice from '../../utils/services'
import SectionContainer from '../components/SectionContainer'
import NotFoundExamSection from '../components/NotFoundExamSection'
import PageHeader from '../components/PageHeader'
// import { _displayEmptySkillAlert } from '../../utils/DomController'

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

   this._setupPageHeader()
   if (this.userSelectedSkills.status != 500) {
    this.setupSectionContainer()
   } else {
    this.setupErrorHandleSection()
   }
  } catch (error) {
   console.log(error)
  }
 }

 async _storeUserSelectedSkills() {
  try {
   this.userSelectedSkills = await this.apiService._reqToGetUserSelectedSkills()
   //    this.aaa = await apiService._reqToGetUserSelectedSkills()
  } catch (error) {
   console.log(error)
  }
 }

 setupSectionContainer() {
  try {
   const userData = this.userSelectedSkills
   console.log(this.userSelectedSkills)
   new SectionContainer(userData)
  } catch (error) {
   //    _displayEmptySkillAlert()
  }
 }

 setupErrorHandleSection() {
  console.log(new NotFoundExamSection())
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
