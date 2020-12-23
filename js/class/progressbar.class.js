import progressbar from 'progressbar.js'

export default class ShowProgressBar {
 constructor({ progressbarparent, actualValue, maximumValue, options }) {
  this.progressBar = undefined
  this.progressBarParent = progressbarparent || undefined
  this.options = options || undefined
  this.actualValue = actualValue || undefined
  this.valuePerUpdateTime = 1 / maximumValue
  this.currentValueOfProgressBar = actualValue / maximumValue
  console.log(options)

  this._renderProgressBar()
 }

 _renderProgressBar() {
  this.progressBar = new progressbar.Line(
   this.progressBarParent,
   this.options || {
    color: '#1CC88A',
    trailColor: '#D1D3E2',
    svgStyle: {
     width: '100%',
     height: '10px',
    },
   }
  )
 }

 _setInitiatedProgressBarValue() {
  this.progressBar.animate(Number(this.currentValueOfProgressBar.toFixed(10)))
  //   this.progressBar.animate(0.5)
 }

 _updateProgressBarPerTime() {
  this.progressBar.animate(Number(this.currentValueOfProgressBar.toFixed(10)))
  this.currentValueOfProgressBar += this.valuePerUpdateTime
 }
}
