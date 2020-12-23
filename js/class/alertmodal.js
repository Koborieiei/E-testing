/**
 * Requirement
 * 1. Animiation CSS
 * 2. Bootstarp
 */

export default class AlertModal {
 constructor({ alertMsg, type }) {
  this.alertMsg = alertMsg || 'This is alert msg'
  this.type = type || undefined

  this.body = undefined

  this.parent = document.body

  this._create()
  this._appendDialog()
  this._destroy()
 }

 _create() {
  this.body = document.createElement('div')
  this.body.classList.add(
   'animate__animated',
   'animate__bounceInDown',
   'col-3',
   'border',
   'shadow',
   'bg-white',
   'p-3',
   'text-center',
   'm-auto'
  )
  this.body.style.setProperty('position', 'fixed')
  this.body.style.setProperty('top', '10%')
  this.body.style.setProperty('z-index', '1300')
  this.body.style.setProperty('left', '35%')

  const icon = document.createElement('i')
  icon.classList.add('px-1')
  icon.style.setProperty('vertical-align', 'middle')
  icon.style.setProperty('font-size', '1.5rem')
  // this.icon = document.createElement("span")

  switch (this.type) {
   case 'success':
    icon.classList.add('text-success', 'fas', 'fa-check-circle')
    break
   case 'error':
    icon.classList.add('text-danger', 'fas', 'fa-times-circle')
    break
   default:
    break
  }

  const contentBody = document.createElement('div')

  contentBody.classList.add('text-wrap')
  const content = document.createElement('span')
  content.classList.add('text-break')
  content.textContent = this.alertMsg

  contentBody.appendChild(content)
  this.body.appendChild(icon)
  this.body.appendChild(contentBody)
 }

 _appendDialog() {
  this.parent.appendChild(this.body)
 }

 _destroy() {
  setTimeout(() => {
   this.parent.removeChild(this.body)
   delete this
  }, 3000)
 }
}
