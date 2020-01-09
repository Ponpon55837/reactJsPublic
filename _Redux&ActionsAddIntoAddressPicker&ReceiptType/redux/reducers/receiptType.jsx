import { CHANGE_RECIEPT_TYPE, ADD_TAX_ID, CHANGE_RECEIPT_OPTIONS } from '../actionTypes.jsx'

const initialState = {}

let reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_RECIEPT_TYPE: {
      return {
        ...state,
        receiptType: action.receiptType
      }
    }
    case ADD_TAX_ID: {
      return {
        ...state,
        taxId: action.taxId
      }
    }
    case CHANGE_RECEIPT_OPTIONS: {
      return {
        ...state,
        receiptOptions: action.receiptOptions
      }
    }
    default:
      return state;
  }
}

export default reducer
