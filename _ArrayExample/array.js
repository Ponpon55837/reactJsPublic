var divtable = document.getElementById('divtable')
var table = document.createElement('table')
//設立一個變數thead 呼叫 createThead這個函數來建立陣列
var thead = creatThead(["Number", "Name", "Score"])
var tbody = document.createElement('tbody')
table.append(thead)
table.append(tbody)
divtable.append(table)

function creatThead(col){
  var thead = document.createElement('thead')
  var tr = document.createElement('tr')
  thead.append(tr)

  console.log(col)
  console.log(col.length)
  
  for(var i = 0; i < col.length;i++){
    var name = col[i]
    var th = document.createElement('th')
    th.innerHTML = name
    tr.append(th)
  }
  return thead
}

function addArray(number, name, score){
  var tr = document.createElement('tr')

  var tdNumber = document.createElement('td')
  tdNumber.innerHTML = number
  var tdName = document.createElement('td')
  tdName.innerHTML = name
  var tdScore = document.createElement('td')
  tdScore.innerHTML = score

  tr.append(tdNumber)
  tr.append(tdName)
  tr.append(tdScore)

  tbody.append(tr)
}

var students = [
  [1, "min", 90],
  [2, "mtn", 80],
  [3, "men", 70],
  [4, "man", 60]
]

for(i=0;i < students.length;i++){
  var student = students[i]
  addArray( student[0], student[1], student[2])
}
