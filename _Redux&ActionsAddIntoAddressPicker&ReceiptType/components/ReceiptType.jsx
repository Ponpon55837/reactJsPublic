import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeReceiptType, addTaxId, changeReceiptOptions } from '../redux/actions.jsx'
import Card, { CardPrimaryContent } from "@material/react-card"
import { Body2, Headline6 } from '@material/react-typography'
import Radio, { NativeRadioControl } from '@material/react-radio'
import Checkbox from '@material/react-checkbox'
import TextField, { HelperText, Input } from '@material/react-text-field'

class ReceiptType extends Component {

  componentDidMount = () => {
    document.getElementById("byMail").value = "byMail"
    document.getElementById("promptRegistered").value = "promptRegistered"
  }

  removeValueFromArray = (array, value) => {
    return array.filter((element) => {
      return element != value
    })
  }

  checkboxHandler = (e) => {
    const checkboxParent = e.target.closest('.mdc-checkbox')
    const newValue = e.target.value
    const name = checkboxParent.getAttribute("attributeName")
    const { receipt } = this.props

    let values = receipt[name]
    if (values.includes(newValue)) {
      values = this.removeValueFromArray(values, newValue)
    } else {
      values.push(newValue)
    }

    if (name == "receiptOptions" && !values.includes("byMail")) {
      values = []
    }

    this.props.changeReceiptOptions(values)
  }

  render = () => {
    console.log("ReceiptType Render")

    const { receipt } = this.props
    const { receiptType, taxId, receiptOptions } = receipt
    return (
      <div>
        <Card>
          <CardPrimaryContent>
            <div style={{ padding: "1rem" }}>
              <Headline6 tag="p">
                發票類型
              </Headline6>
              <Body2 tag="div">
                <div>
                  <Radio label='個人' key='personal'>
                    <NativeRadioControl
                      name='receiptType'
                      value='2'
                      id='personal'
                      onChange={this.props.changeReceiptType}
                      checked={receiptType == 2}
                    />
                  </Radio><br />
                  <Radio label='公司' key='company'>
                    <NativeRadioControl
                      value='3'
                      name='receiptType'
                      id='company'
                      onChange={this.props.changeReceiptType}
                      checked={receiptType == 3}
                    />
                  </Radio>
                  <TextField
                    style={{ "marginLeft": "1rem" }}
                    outlined
                    label='統一編號'
                  >
                    <Input
                      type="text"
                      name="taxId"
                      value={taxId}
                      onChange={this.props.addTaxId}
                    />
                </TextField>
                </div><br />
                <div>
                  <Headline6 tag="p">
                    郵寄選項
                  </Headline6>
                  <React.Fragment>
                    <Checkbox
                      name="receiptOptions[]"
                      attributeName="receiptOptions"
                      nativeControlId='byMail'
                      checked={receiptOptions.includes("byMail")}
                      onChange={this.checkboxHandler}
                    />
                    <label htmlFor='byMail'>實體寄送(+ $30)</label>
                  </React.Fragment><br />
                  <React.Fragment>
                    <Checkbox
                      name="receiptOptions[]"
                      attributeName="receiptOptions"
                      nativeControlId='promptRegistered'
                      checked={receiptOptions.includes("promptRegistered")}
                      disabled={!receiptOptions.includes("byMail")}
                      onChange={this.checkboxHandler}
                    />
                    <label htmlFor='promptRegistered'>限時掛號(再 + $30 = 60)</label>
                  </React.Fragment>
                </div>
              </Body2>
            </div>
          </CardPrimaryContent>
        </Card>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    receipt: state.receipt,
  }
}

export default connect(
  mapStateToProps,
  {
      changeReceiptType,
      addTaxId,
      changeReceiptOptions,
  }
)(ReceiptType);
