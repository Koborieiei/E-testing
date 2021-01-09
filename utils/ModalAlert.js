import AlertModal from './AlertModal'
export const showModalSuccess = () => {
 new AlertModal({
  alertMsg: 'Sucessful',
  type: 'success',
 })
}

export const throwNewErrorModal = () => {
 new AlertModal({
  alertMsg: 'เกิดข้อผิดพลาด',
  type: 'error',
 })
}
