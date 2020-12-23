
export default class ActionButton {
  constructor({ textButton, disable, body, id }) {
    this.textButton = textButton || 'button'
    this.disable = disable || false
    this.body = body || document.body
    this.id = id || 'Example'

    //
    this.button = undefined
    //
    this._createButton()
    this._appendParent()
  }

  _createButton() {
    this.button = document.createElement('button')
    this.button.classList.add('btn', 'btn-lg', 'btn-primary','btn-block','text-center')
    this.button.textContent = this.textButton
    this.button.disabled = this.disable
    this.button.id = this.id
  }
  _appendParent() {
    this.body.appendChild(this.button)
  }

  _previousQuestion() {
    const currentQuestion = document.querySelector('div.active')
    const previousQuestion = currentQuestion.previousSibling

    // CHECK FIRST TO DISABLE BUTTON
    if (previousQuestion.dataset.index == 1) {
      this.button.disabled = true
    }

    // REMOVE CURRENT CLASS ACTIVE
    currentQuestion.classList.remove('active')
    currentQuestion.classList.add('none')

    // SHOW PREVIOUS QUESTION
    previousQuestion.classList.add('active')
    previousQuestion.classList.remove('none')
  }

  // 
  _adjustButton(button) {
    // Call backbutton to store in variable
    const backButton = document.querySelector('#backButton')
    // Call change text whenever this function call
    _switchDisable(backButton)
    _changeSuccessText(button)
  }

  // CLEAR ANSWER FUNCTION
  _clearAnswer() {
    const allSelectedItem = Array.from(
      document.querySelectorAll('input:checked')
    )
    allSelectedItem.map((selectedItem) => {
      selectedItem.checked = false
    })
    const allLabel = Array.from(document.querySelectorAll('label'))
    allLabel.map((label) => {
      label.classList.remove('active')
    })
  }

  _clearAnsweredArr(answeredQuestion) {
    answeredQuestion.items.splice(0, _totalAnswer(answeredQuestion))
  }
}

// Use to switch disable of the button
export const _switchDisable = () => {
  const backButton = document.querySelector('#backButton')
  if (backButton.disabled === true) {
    backButton.disabled = false
  }

}

// This answer is receive from htmlelement
// It use to check number of answers
export const _proofAnswer = (totalAnswer) => {
    

  
  if (
    totalAnswer == 2
  ) {
    const confirmModal = new AgreementModal({
      headerText:"ยืนยัน", ModalContent:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." 
     })
     
     confirmModal.trueButton.addEventListener('click', ()=> {
       confirmModal._destroy()
           _alertAnswer()
     })

  } else {
    return false
  }
}

export const confirmModal = () => {
  
}
/*
Function redirect to end point
Function call api
Function error handling
Do we need try function to check then
*/
// Will need to change to success direction
export const _alertAnswer = () => {

  const data = new Apiservice().data

  data.then((resp) => {
    if(resp.status === 200) {

      new AlertModal({
        alertMsg:"Successful",
        type:"success"
      })

      setTimeout(() => {
        location.href = "www.google.com"
      }, 2000);
    }
  })
}



export const _changeSuccessText = () => {
  const nextButton = document.querySelector('#nextButton')
  if (questionAction._QuestionNumber() == 1) {
    return (nextButton.textContent = 'Finish')
  }
}

export const _changeText2 = (text) => {
  const nextButton = document.querySelector('#nextButton')

  return (nextButton.textContent = text)
}

