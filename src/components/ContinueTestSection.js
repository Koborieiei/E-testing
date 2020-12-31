import DomController, * as DomControllerFunction from '../utils/Domcontroller'
import ContinueTest from './Continuetest'

export default class ContinueTestSection {
 constructor(parent, { existedTestData }) {
  this.parent = parent || undefined
  this.continueTestComponent = undefined
  this.existedTestData = existedTestData || undefined

  this.continueTestingSection = DomControllerFunction.parserHtmlTag(
   continueTestingSectionElement()
  )

  this.createContinueTestSection()
 }

 createContinueTestSection() {
  this.parent.appendChild(this.continueTestingSection)
  this.generateSelectedSkillCardParent()
 }

 generateSelectedSkillCardParent() {
  this.existedTestData.map((item, index) => {
   this._generateContinueComponent(item)
  })
 }
 _generateContinueComponent(item) {
  this.continueTestComponent = new ContinueTest({
   containerParent: this.continueTestingSection,
   duration: item.timeleft,
   testingHeader: item.testname,
   numberOfAnswer: Number(item.numberofanswers),
   numberOfQuestion: item.questionnumber,
   testingSkill: item.skills,
   testingType: item.testingtype,
  })
 }

 _getContinueTestSectionElement() {
  return this.continueTestingSection
 }
}

const continueTestingSectionElement = () => {
 return `<section id='existingTest' class="mt-5">
    <div class="headerWrapper mb-3">
    ${DomControllerFunction._skillHeaderSectionText('บททดสอบที่พักไว้ 🔥')}
    </div>
    </section>`
}
