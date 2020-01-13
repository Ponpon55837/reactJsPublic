var doSomething = (function(){
  var _result = 0
  function _addCount(){
    _result++
  }
  return function doPrivate(){
    _addCount()
    console.log(_result)
  }
})()//結尾這個括號可以讓程式直接執行
doSomething()
doSomething()

//========================

//原型鍊
function Person(first, last, age, gender, intertest){
  this.name = {
    first,
    last
  }
  this.age = age
  this.gender = gender
  this.intertest = intertest
}

//繼承Person原型鍊
function Teacher(first, last, age, gender, intertest, subject){
  // 把this用bind綁在Person上 直接使用this會變成window.XXXX
  // Person.bind(this)(this, first, last, age, gender, intertest)

  // 使用call來代替bind(this)
  Person.call(this, first, last, age, gender, intertest)
  this.subject = subject
}

function Student(first, last, age, gender, intertest){
  Person.call(this,first, last, age, gender, intertest)
}

//用prototype呼叫Person原型鍊 看妳想要function一開始做甚麼
Person.prototype.greeting = function() {
  alert('Hi! I\'m ' + this.name.first + '.' + 'I live in ' + this.name.last);
};

// Teacher繼承Person的prototype
Teacher.prototype = Object.create(Person.prototype)
Teacher.prototype.constructor = Teacher
//改寫Teacher的greeting 原先是繼承Person的greeting
Teacher.prototype.greeting = function() {
  var prefix;
  if(this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
    prefix = 'Mr.';
  } else if(this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
    prefix = 'Mrs.';
  } else {
    prefix = 'Mx.';
  }
  alert('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};

Student.proprototype = Object.create(Person.prototype)
Student.prototype.constructor = Student
//改寫Teacher的greeting 原先是繼承Person的greeting
Student.prototype.greeting = function() {
  alert('hey. I am evil ' + this.name.first + 'Come from the hell ' + this.name.last)
}


//將資料塞入Person原型鍊
var P = new Person("PB", "TW" , 18, "male", [])
//執行Person原型鍊的函式
P.greeting()

//將資料塞入Teacher繼承的Person原型鍊
var t = new Teacher("LK","JP",20,"male",[],"JS")
t.greeting()
console.log(t.age)
console.log(t)

var s = new Student("JK","water",44,"non-sex",[])
s.greeting()
console.log(s)

//========================

function Cart(prices){
  var _result = null
  this.prices = prices
  this.amount = function(){
    if(_result){
      return _result
    }
    for (var i = 0; i < prices.length; i++){
      _result += this.prices[i]
    }
    return _result
  }
  this.showAmount = function(){
    console.log(this.amount())
  }
}

var cart = new Cart([12,8,5])
cart.showAmount()

//========================
(function(){
  console.log("init")
})()



//========================

let evens = [2, 4, 6, 8]
let odds = evens.map(value => {return {even: value, odd: value + 1}});
// console.log(odds)

evens.printNumber = function(callback){
  for(let index = 0; index < this.length; index++){callback(this[index])}
}

evens.printNumber(addOne => {console.log(addOne + 1)})
evens.printNumber(addTwo => {console.log(addTwo + 2)})

//========================

//ES5
var arr1 = [1, 2, 3]
var arr2 = [5, 9, 7]
console.log(arr1.concat(arr2))
// [1, 2, 3, 5, 9, 7]

//ES6
let arr1 = [1, 2, 3]
let arr2 = [5, 9, 7]
console.log(...arr1,...arr2)
// [1, 2, 3, 5, 9, 7]

let array = "what"
console.log(...array)
// w h a t

//========================
// 字串串接
var customer = { name : "foo" }
var card = customer.name
var name = "apple"
var s1 = "s1: " + name
let s2 = `s2: ${customer.name} => ${name}`
console.log(s2)
// s2: foo => apple

//========================
//raw string access
function strings(str1, str2, str3){
  console.log(str1)
  console.log(str2)
  console.log(str3)
}

let arg1 = "apple"
let arg2 = "banana"

strings`i want an ${arg1} and a ${arg2}`
// (3) ["i want an ", " and a ", "", raw: Array(3)]
// apple
// banana

function strings(what,str1, str2, str3){
  console.log(what[0] +str1 + what[1] + str2 + what[2])
  console.log(str1)
  console.log(str2)
  console.log(str3)
}
let arg1 = "apple"
let arg2 = "banana"
strings`i want an ${arg1} and a ${arg2}`
// i want an apple and a banana
// apple
// banana
// undefined

//========================

function quux(strings, ...values){
  strings[0] === "foo\n"
  strings[1] === "bar"
  strings.raw[0] === "foo\\n"
  strings.raw[1] === "bar"
  values[0] === 42
}
quux`foo\n${42}bar`

//========================
// classes ES5的原型鍊 換成ES6 class寫法

// ES5
var Shape = function(id, x, y){
  this.id = id
  this.move(x, y)
}

Shape.prototype.move = function(x, y){
  this.x = x
  this.y = y
}

// ES6
class Shape {
  constructor(id, x, y){
    this.id = id
    this.move(x, y)
  }
  move(x, y){
    this.x = x
    this.y = y
  }
  // basic classes access
  toString(){
    return `Shape(${this.id})`
  }
  // static function
  static test(){
    return 1
  }
}

let shape = new Shape(1, 10, 20)
console.log(shape)
// Shape {id: 1, x: 10, y: 20}
// id: 1
// x: 10
// y: 20

// 繼承 , 用extends來繼承Shape
class Rectangle extends Shape{
  // 更改結構子
  constructor(id, x, y, width, height){
    // 用super就不用重覆寫id x y , super會去抓constructor的parent
    super(id, x, y)
    this.width = width
    this.height = height

    this._name = ""
  }
  // basic classes access
  toString(){
    return "Retangle > " + super.toString()
  }
  // static function
  static test(){
    return 3
  }
  // setter
  set name(name){
    this._name = name
  }
  // getter
  get name(){
    return this._name
  }
}

let rectangle = new Rectangle(1, 10, 20, 100, 120)
console.log(rectangle)
// Rectangle {id: 1, x: 10, y: 20, width: 100, height: 120}
// height: 120
// id: 1
// width: 100
// x: 10
// y: 20

// basic classes access
console.log(rectangle.toString())
// Retangle > Shape(1)

// static function
console.log(Shape.test())
// 1
console.log(Retangle.test())
// 3

// setter getter
rectangle.name = "ReCtAnGle"
console.log(rectangle)
// Rectangle {id: 1, x: 10, y: 20, width: 100, height: 120, …}
// height: 120
// id: 1
// width: 100
// x: 10
// y: 20
// _name: "ReCtAnGle"
// name: (...)

//========================
