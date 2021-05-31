import ConfirmModal from '../../utils/ConfirmModal'

export default class SkillCard {
 constructor({
  relatedSkill,
  titleName,
  term,
  img,
  id,
  parents,
  testingType,
  isdone,
 }) {
  this.relatedSkill = relatedSkill || undefined
  this.titleName = titleName || undefined
  this.term = term || undefined
  this.img = img || undefined
  this.id = id || null
  this.testingType = testingType || undefined
  this.parents = parents || null
  this.isdone = isdone
  this.mainContainer = undefined
  this.reccomendSkillParent = undefined
  this.imageContainer = undefined
  this.skillTitleContainer = undefined
  this.buttonContainer = undefined
  this.button = undefined

  this.skillIdContainers = {
   service: testingType,
   skill_id: [],
  }

  this._create()
  this._generateRecommendBadge()
  this._apppendChild()
 }

 _create() {
  const htmlTag = `<div class=" col-6 col-lg-4 col-xs-6 col-sm-6 col-md-4 my-2 d-flex flex-column rounded">
  <div class="card">
  </div>
</div>
`
  this.mainContainer = this._parserHtmlTag(htmlTag)

  // const opacityBackground =
  const cardbody = document.createElement('div')
  cardbody.classList.add('bg-white', 'rounded', 'card__container')
  cardbody.style.setProperty('min-height', '300px')
  const opacityBackground = this.isdone == 1 ? '30%' : '100%'

  if (this.isdone == 1) {
   const cardLabel = this._parserHtmlTag(
    `<div class="cardLabel" data-labelmsg="ทดสอบครบแล้ว"></div>`
   )
   this.mainContainer.querySelector('.card').appendChild(cardLabel)
  } else {
  }

  this.imageContainer = document.createElement('div')
  this.imageContainer.classList.add('rounded-top', 'text-center')
  this.imageContainer.style.setProperty('background', 'url(' + this.img + ')')
  this.imageContainer.style.setProperty('background-size', 'cover')
  this.imageContainer.style.setProperty('background-position', 'center')
  this.imageContainer.style.setProperty('width', '100%')
  this.imageContainer.style.setProperty('height', '150px')
  this.imageContainer.style.setProperty('opacity', opacityBackground)

  //   this.imageContainer.innerHTML = `<svg width="100" height="100" viewBox="0 0 90 90" fill="none"
  //     xmlns="http://www.w3.org/2000/svg">
  //     <circle cx="45" cy="45" r="45" fill="#F8F9FC" />
  //     <rect x="24.1072" y="38.8066" width="24.4991" height="23.5192"
  //         fill="#D1D3E2" />
  //     <path d="M47.1364 24.1072L64.5342 54.2411H29.7386L47.1364 24.1072Z"
  //         fill="#D1D3E2" />
  // </svg>`

  this.skillTitleContainer = document.createElement('div')
  this.skillTitleContainer.style.setProperty('opacity', opacityBackground)

  this.skillTitleContainer.classList.add('pt-3', 'mb-0', 'pl-3', 'bg-white')
  this.skillTitleContainer.style.setProperty('min-height', '100px')

  const descriptionHeader = document.createElement('dt')
  descriptionHeader.innerText = this.titleName
  descriptionHeader.classList.add('text-dark')

  const descriptionTerm = document.createElement('dd')
  descriptionTerm.classList.add('font-weight-light', 'text-secondary')
  descriptionTerm.innerText = this.term

  // this.reccomendSkillParent = document.createElement('div')
  // this.reccomendSkillParent.classList.add(
  //  'my-3',
  //  'd-flex',
  //  'flex-row',
  //  'flex-wrap',
  //  'pl-3'
  // )
  // this.reccomendSkillParent.style.setProperty('min-height', '30px')
  this.skillTitleContainer.appendChild(descriptionHeader)
  this.skillTitleContainer.appendChild(descriptionTerm)

  const buttonContainer = document.createElement('div')
  // buttonContainer.style.setProperty('opacity', opacityBackground)

  buttonContainer.classList.add('py-1', 'pl-3', 'my-2')

  this.button = document.createElement('button')
  this.button.classList.add('btn', 'btn-primary')
  this.button.textContent = 'ทดสอบเลย'
  this.button.addEventListener('click', (e) => {
   this._alertTestingTermConfirmModal()
  })

  this.button.disabled = this.isdone == 1 ? true : false
  buttonContainer.appendChild(this.button)
  cardbody.appendChild(this.imageContainer)
  cardbody.appendChild(this.skillTitleContainer)
  cardbody.appendChild(buttonContainer)
  this.mainContainer.querySelector('.card').appendChild(cardbody)
 }

 _generateRecommendBadge() {
  let newskills = []

  this._ArrayOfRelatedSkill().map((skill) => {
   this.skillIdContainers.skill_id.push(parseInt(skill.skillid))
   newskills.push({ skillid: skill.skillid, skillname: skill.skillname })
  })

  this.button.dataset.skillsets = `${encodeURIComponent(
   JSON.stringify(newskills)
  )}`
 }

 _alertTestingTermConfirmModal() {
  const confirmModal = new ConfirmModal({
   headerText: 'ยืนยัน',
   ModalContent: `การทดสอบมีเงื่อนไขตามที่อธิบายไว้ดังนี้ 
   
   1. การทดสอบมีระยะเวลาจำกัด (โปรดตรวจสอบก่อนเริ่ม)
   2. ขณะเวลาการทดสอบห้ามเปิดเครื่องมืออเล็กทรอนิกส์อื่นๆ 
   3. หากระบบมีปัญหาให้ติดมีที่เบอร์ 02-697-6451 
   `,
  })

  // console.log(decodeURIComponent(this.button.dataset.skillsets))

  confirmModal.trueButton.addEventListener('click', () => {
   this._TestingTermConfirmModalAction()
  })
 }

 _TestingTermConfirmModalAction() {
  const encodeSkillSetParameter = encodeURIComponent(
   JSON.stringify(this.skillIdContainers)
  )
  localStorage.setItem('skillsets', this.button.dataset.skillsets)
  window.location.href = `./testing/?${encodeSkillSetParameter}`
 }

 _ArrayOfRelatedSkill() {
  if (Array.isArray(this.relatedSkill) === true) {
   return this.relatedSkill
  } else {
   return new Array(this.relatedSkill)
  }
 }

 _apppendChild() {
  this.parents.appendChild(this.mainContainer)
 }

 _parserHtmlTag(htmlTag) {
  const parser = new DOMParser()
  const parsedBody = parser.parseFromString(htmlTag, 'text/html')
  return parsedBody.body.firstChild
 }
}
