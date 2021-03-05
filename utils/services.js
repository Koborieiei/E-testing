export default class Apiservice {
 constructor() {
  this.url = null
 }

 _getAllresult() {
  console.log(this.data)
 }

 async _requestTotest(data) {
  return await fetch(url, {
   method: 'POST',
   body: JSON.stringify({
    service: 'testing',
    skill: null,
   }),
  })
 }

 async _reqToSendTotalResult(data) {
  this._displayLoadingScreen()
  const formData = this._appendObjectToFormData(data)
  const resp = await fetch(
//    '../ajax/result.php',
      'https://www.edbot.com/backbone/pages/newetesting/APIlocaltest/resulttest.php?',

   {
    method: 'POST',
    body: formData,
   }
  )

  if (!resp.ok) {
   throw 'Something Went Wrong'
  }

  this._unDisplayLoadingScreen()
  const responseData = resp.json() //await resp.json()
  return responseData
 }

 async _reqToGetUserSelectedSkills() {
  this._displayLoadingScreen()
  const resp = await fetch(
   //    './ajax/getObjectdata.php?',
   //   './APIlocaltest/getObjectdata.php?',
   'https://www.edbot.com/backbone/pages/newetesting/APIlocaltest/getObjectdata.php?',

   {
    method: 'POST',
   }
  )

  if (!resp.ok) {
   throw 'Something Went Wrong'
  }

  this._unDisplayLoadingScreen()
  const responseData = await resp.json() //await resp.json()

  return await responseData
 }

 async _reqToUpdateUserTime(timeleft, testingid) {
  const formData = new FormData()
  formData.append('service', 'updatetime')
  formData.append('timeleft', timeleft)
  formData.append('testingid', testingid)

  const resp = await fetch('./ajax/logtesting.php', {
   method: 'POST',
   body: formData,
  })

  if (!resp.ok) {
   throw 'Something Went Wrong'
  }

  const responseData = await resp.json()
  return responseData
 }

 async _reqToUpdateUserLog(data) {
  console.log(data)
  const formData = this._appendObjectToFormData(data)
  const resp = await fetch('./ajax/logtesting.php', {
   method: 'POST',
   body: formData,
  })
  const responseData = await resp.json()
  return responseData
 }

 async _getQuestionObjects(data) {
  this._displayLoadingScreen()

  const formData = new FormData()
  formData.append('service', data.service)
  formData.append('skill_id', data.skill_id)

  const resp = await fetch(
   //Request service 1 = Pre-test 2 = Post-test
//    '../ajax/testingObject.php?',
      'https://www.edbot.com/backbone/pages/newetesting/APIlocaltest/testingObject.php?',
   {
    method: 'POST',
    body: formData,
   }
  )

  if (!resp.ok) {
   throw 'Something Went Wrong'
  }

  this._unDisplayLoadingScreen()
  const responseData = await resp.json() //await resp.json()
  return responseData
 }

 _appendObjectToFormData(data) {
  const formData = new FormData()
  Object.entries(data).map(([key, value]) => {
   if (key == 'service') {
    formData.append(key, value)
   } else {
    formData.append(key, JSON.stringify(value))
   }
  })

  return formData
 }

 _displayLoadingScreen() {
  document.querySelector('#loading').classList.remove('none')
 }

 _unDisplayLoadingScreen() {
  document.querySelector('#loading').classList.add('none')
 }
}

// export const _IsRequestSuccess = async (answerObject) => {
//  //   console.log(resp)
//  //   modalAlert.showModalSuccess()
//  return new Apiservice()._reqToSendTotalResult(answerObject)

//  //   modalAlert.throwNewErrorModal()
//  //   console.log(error)
// }
