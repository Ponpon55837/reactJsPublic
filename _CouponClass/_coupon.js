// 輸入資料
let inputProductPrices = [20, 30, 40, 50]

// 邊界條件
let inputCoupon = {
  amountShouldMoreOrEquelThan : 100 ,
  productCountShouldMoreOrEquelThan : 4 ,
  discount : 50
}

// 將輸入資料進行加總
let sumTotalPrices = sumInputProductsPrices => {
  let amountPrices = 0
  sumInputProductsPrices.forEach (sumInputProductsPrices => {
    amountPrices = amountPrices + sumInputProductsPrices
  })
  return amountPrices
}

// 計算是否能夠使用優惠券
let isCouponAvailable = (catchCoupon, catchProductPrices) => {
  let productsAmount = sumTotalPrices(catchProductPrices)
  if(productsAmount < catchCoupon.amountShouldMoreOrEquelThan){
    return [false, `Amount Should More Or Equel Than ${catchCoupon.amountShouldMoreOrEquelThan}`
    ]
  }
  if(catchProductPrices.length < catchCoupon.productCountShouldMoreOrEquelThan){
    return [
      false,
      `Product Count Should More Or Equel Than ${catchCoupon.productCountShouldMoreOrEquelThan}`
    ]
  }
  return [true]
}

// 如果message != null "success!!"將會被覆蓋掉 , = null則會顯示 success!!
let printFinalResultMessage = ([result, message = "success!!"]) => {
  if(result){
    console.log(message)
  }else{
    console.log(message)
  }
}

// 將isCouponAvailable執行完的結果丟到printFinalResultMessage中進行判斷
printFinalResultMessage(isCouponAvailable(inputCoupon , inputProductPrices))

// let [result, message = "success!!"] = isCouponAvailable(inputCoupon , inputProductPrices)
