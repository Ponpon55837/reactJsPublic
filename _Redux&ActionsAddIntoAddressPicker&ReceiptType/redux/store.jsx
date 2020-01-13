import { createStore } from "redux";
import reducer from './reducers/index.jsx'

export default createStore(reducer, {
  receipt: {
    receiptType: 2,
    taxId: "",
    receiptOptions: ["byMail"]
  },
  fullAddress: {
    city: "新竹市",
    district: "",
    postalCode: "",
    address: ""
  }
})
