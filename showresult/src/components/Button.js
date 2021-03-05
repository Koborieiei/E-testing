const Button = (option) => {
 //  console.log('test')
 const { name, disabled } = option
 const disabledStatus = disabled === true ? 'disabled' : ''
 return `<button name="" class="btn btn-lg  btn-primary" ${disabledStatus}> ${name} </button>`
}

export default Button
