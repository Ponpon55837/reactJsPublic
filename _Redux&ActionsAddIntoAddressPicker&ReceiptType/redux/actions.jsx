import { CHANGE_RECIEPT_TYPE, ADD_TAX_ID, CHANGE_RECEIPT_OPTIONS, UPDATE_FULL_ADDRESS } from './actionTypes.jsx'

// from RecetiptType.jsx
export let changeReceiptType = (event) => {
  const {value} = event.target
  return {
    type: CHANGE_RECIEPT_TYPE,
    receiptType: value
  }
}

// from RecetiptType.jsx
export let addTaxId = (event) => {
  const {value} = event.target
  return {
    type: ADD_TAX_ID,
    taxId: value
  }
}

// from RecetiptType.jsx
export let changeReceiptOptions = (values) => {
  return {
    type: CHANGE_RECEIPT_OPTIONS,
    receiptOptions: values
  }
}

// from AddressPicker.jsx
export let updateFullAddress = (fullAddress) => {
  return {
    type: UPDATE_FULL_ADDRESS,
    fullAddress: fullAddress
  }
}
