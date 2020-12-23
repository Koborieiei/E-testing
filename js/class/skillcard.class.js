export default class Skillcard {
 constructor({ relatedskill, titlename, term, img, id, parents, testingType }) {
  this.relatedskill = relatedskill || undefined
  this.titlename = titlename || undefined
  this.term = term || undefined
  this.img = img || undefined
  this.id = id || null
  this.testingType = testingType || undefined
  this.parents = parents || null

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
</div>
`
  this.mainContainer = this._parserHtmlTag(htmlTag)
  const cardbody = document.createElement('div')
  cardbody.classList.add('bg-white', 'rounded')
  cardbody.style.setProperty('min-height', '300px')

  this.imageContainer = document.createElement('div')
  this.imageContainer.classList.add('rounded-top', 'text-center')
  this.imageContainer.style.setProperty('background', 'url(' + this.img + ')')
  this.imageContainer.style.setProperty('background-size', 'cover')
  this.imageContainer.style.setProperty('background-position', 'center')
  this.imageContainer.style.setProperty('width', '100%')
  this.imageContainer.style.setProperty('height', '150px')
  //   this.imageContainer.innerHTML = `<svg width="100" height="100" viewBox="0 0 90 90" fill="none"
  //     xmlns="http://www.w3.org/2000/svg">
  //     <circle cx="45" cy="45" r="45" fill="#F8F9FC" />
  //     <rect x="24.1072" y="38.8066" width="24.4991" height="23.5192"
  //         fill="#D1D3E2" />
  //     <path d="M47.1364 24.1072L64.5342 54.2411H29.7386L47.1364 24.1072Z"
  //         fill="#D1D3E2" />
  // </svg>`

  this.skillTitleContainer = document.createElement('div')
  this.skillTitleContainer.classList.add('pt-3', 'mb-0', 'pl-3', 'bg-white')

  const descriptionHeader = document.createElement('dt')
  descriptionHeader.innerText = this.titlename
  descriptionHeader.classList.add('text-dark')

  const descriptionTerm = document.createElement('dd')
  descriptionTerm.classList.add('font-weight-light', 'text-secondary')
  descriptionTerm.innerText = this.term

  this.reccomendSkillParent = document.createElement('div')
  this.reccomendSkillParent.classList.add(
   'my-3',
   'd-flex',
   'flex-row',
   'flex-wrap',
   'pl-3'
  )
  this.reccomendSkillParent.style.setProperty('min-height', '30px')
  this.skillTitleContainer.appendChild(descriptionHeader)
  this.skillTitleContainer.appendChild(descriptionTerm)

  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('py-1', 'pl-3', 'my-2')

  this.button = document.createElement('button')
  this.button.classList.add('btn', 'btn-primary')
  this.button.textContent = 'ทดสอบเลย'

  buttonContainer.appendChild(this.button)

  // this.mainContainer.appendChild(this.imageContainer)
  cardbody.appendChild(this.imageContainer)
  cardbody.appendChild(this.skillTitleContainer)
  cardbody.appendChild(this.reccomendSkillParent)
  cardbody.appendChild(buttonContainer)
  this.mainContainer.appendChild(cardbody)
  // this.mainContainer.appendChild(this.reccomendSkillParent)
  // this.mainContainer.appendChild(buttonContainer)
 }

 _generateRecommendBadge() {
  let newskills = []

  this._isArrayOfRelatedSkill().map((skill) => {
   const badgeElement = this._parserHtmlTag(
    `<div data-badgeid="${skill.id}" class="my-1 mr-1 badge-secondary badge font-weight-light"></div>`
   )

   this.skillIdContainers.skill_id.push(parseInt(skill.skillid))
   newskills.push({ skillid: skill.skillid, skillname: skill.skillname })
   badgeElement.textContent = skill.skillname
   this.reccomendSkillParent.appendChild(badgeElement)
  })

  this.button.dataset.skillsets = `${encodeURIComponent(
   JSON.stringify(newskills)
  )}`

  this.button.value = `${encodeURIComponent(
   JSON.stringify(this.skillIdContainers)
  )}`
 }

 _isArrayOfRelatedSkill() {
  if (Array.isArray(this.relatedskill) === true) {
   return this.relatedskill
  } else {
   return new Array(this.relatedskill)
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
