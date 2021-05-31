export default class AgreementModal {
 constructor({
  headerText,
  ModalContent,
  modalId,
  skillQueryString,
  backdrop,
 }) {
  // Run these script when modal is created
  this.headerText = headerText || 'Agreement'
  this.trueButtonText = 'ตกลง'
  this.falseButtonText = 'ยกเลิก'
  this.modalContent = ModalContent || 'เนื้อหา..'
  this.skillQueryString = skillQueryString || undefined
  this.modalId = modalId || 'modalExample'
  this.static = backdrop == true ? 'static' : true

  this.modal = undefined
  this.body = undefined
  this.trueButton = undefined
  this.falseButton = undefined
  this.parent = document.body

  this._createModal()
  this._appendDialog()
  this._show()
  // this._autoRunModal()
 }

 // Function inside Class
 _createModal() {
  this.modal = document.createElement('div')

  this.modal.setAttribute('id', this.modalId)
  this.modal.setAttribute('tabindex', '-1')
  this.modal.setAttribute('role', 'dialog')
  this.modal.setAttribute('aria-hidden', 'true')
  this.modal.setAttribute('aria-labelledby', this.modalId)
  this.modal.classList.add('modal', 'fade')
  this.modal.dataset.backdrop = this.static

  const dialog = document.createElement('div')
  dialog.classList.add('modal-dialog', 'modal-dialog-scrollable')
  dialog.setAttribute('role', 'document')
  this.modal.appendChild(dialog)
  //
  const content = document.createElement('div')
  content.classList.add('modal-content', 'm-auto')
  dialog.appendChild(content)

  //
  const header = document.createElement('div')
  const a = document.createElement('h4')
  a.classList.add('modal-title')
  a.id = this.headerText
  a.textContent = this.headerText
  header.appendChild(a)
  header.classList.add('modal-header')
  content.appendChild(header)

  this.body = document.createElement('div')
  this.body.classList.add(
   'grey',
   'lighten-4',
   'modal-body',
   'rounded',
   'p-4',
   'm-3'
  )

  const p = document.createElement('p')
  p.classList.add('font-weight-light', 'text-dark')
  p.innerText = this.modalContent
  this.body.appendChild(p)

  content.appendChild(this.body)

  const footer = document.createElement('div')
  footer.classList.add('modal-footer', 'border-0')

  //
  this.falseButton = document.createElement('button')
  this.falseButton.classList.add('btn', 'btn-outline-primary', 'btn-lg')
  this.falseButton.type = 'button'
  this.falseButton.setAttribute('data-dismiss', 'modal')

  this.falseButton.textContent = this.falseButtonText

  this.falseButton.addEventListener('click', () => {
   this._destroy()
  })
  footer.appendChild(this.falseButton)

  this.trueButton = document.createElement('a')

  this.trueButton.classList.add('btn', 'btn-primary', 'btn-lg', 'text-white')
  this.trueButton.style.setProperty('cursor', 'pointer')
  this.trueButton.textContent = this.trueButtonText

  footer.appendChild(this.trueButton)
  content.appendChild(footer)
 }

 //
 _appendDialog() {
  document.body.appendChild(this.modal)
 }

 //
 _destroy() {
  $('#' + this.modalId).modal('hide')
  setTimeout(() => {
   this.parent.removeChild(this.modal)
   delete this
  }, 200)
 }

 _show() {
  $('#' + this.modalId).modal('show')
  // this.modal.classList.add('show')
 }
}
