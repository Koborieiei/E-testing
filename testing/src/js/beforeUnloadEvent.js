export const _confirmBeforeUnload = (e) => {
 var dialogText = 'Dialog text here'
 e.returnValue = dialogText
 return dialogText
}

// before unload handle
export const _removeBeforeUnLoadEventListener = () => {
 window.removeEventListener('beforeunload', _confirmBeforeUnload)
}

// before unload handle
export const _addWindowBeforeUnloadEvent = () => {
 window.addEventListener('beforeunload', _confirmBeforeUnload)
}
