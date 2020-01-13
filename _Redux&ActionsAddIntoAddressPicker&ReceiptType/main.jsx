import React, {Component} from 'react'
import AddressPicker from './components/AddressPicker.jsx'
import ReceiptType from './components/ReceiptType.jsx'
import Button from '@material/react-button'
import {Cell, Grid, Row} from '@material/react-layout-grid'
import { connect } from 'react-redux'

class App extends Component {
  checkIsReceiptTypeReady = () => {
    let result = false
    if (this.props.receipt.receiptType == 2) {
      result = true
    } else if (this.props.receipt.receiptType == 3 && this.props.receipt.taxId != "") {
      result = true
    }
    return result
  }

  checkIsAddressReady = () => {
    const { city, district, postalCode, address } = this.props.fullAddress
    if (city != "" && district != "" && postalCode != "" && address != "") {
      return true
    }
    return false
  }

  isReady = () => {
    return this.checkIsReceiptTypeReady() && this.checkIsAddressReady()
  }

  render = () => {
    console.log("App Render")
    return (
      <form>
        <Grid>
          <Row>
            <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
            <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
              <ReceiptType />
              <br />
            </Cell>
            <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
          </Row>
          <Row>
            <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
            <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
              <AddressPicker/>
              <br />
            </Cell>
            <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
          </Row>
          <Row>
            <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
            <Cell desktopColumns={6} phoneColumns={4} tabletColumns={6}>
              <Button type="submit" outlined disabled={!this.isReady()}>
                Submit
              </Button>
            </Cell>
            <Cell desktopColumns={3} phoneColumns={0} tabletColumns={1}></Cell>
          </Row>
        </Grid>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, null)(App)
