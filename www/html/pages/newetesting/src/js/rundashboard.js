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

   if (
    this.userSelectedSkills.status == 500 &&
    this.userSelectedSkills.message === 'no session! you have to login'
   ) {
    // window.location = '../../login'
    throw 'No Session'
   }

   if (
    this.userSelectedSkills.status != 500 &&
    this.userSelectedSkills.message !==
     'no skill! you have to select skill first'
   ) {
    this.setupSectionContainer()
   } else {
    this.setupErrorHandleSection()
   }
   //  console.log('test')
   //  this.setupSectionContainer()
  } catch (error) {
   console.log(error)
  }
 }

 async _storeUserSelectedSkills() {
  try {
   this.userSelectedSkills = await this.apiService._reqToGetUserSelectedSkills()
  } catch (error) {
   console.log(error)
  }
 }

 setupSectionContainer() {
  try {
   const userData = this.userSelectedSkills
   //    console.log(this.userSelectedSkills)
  //  console.log(userData)
   new SectionContainer(userData)
  } catch (error) {
   //    _displayEmptySkillAlert()
  }
 }

 setupErrorHandleSection() {
  new NotFoundExamSection()
 }

 _setupPageHeader() {
  new PageHeader({
   textheader: 'E-Testing',
   secondarytext: 'ทดสอบความเข้าใจที่มีต่อทักษะของเรา',
   url: this.userSelectedSkills.imgcover,
  })
 }
}
