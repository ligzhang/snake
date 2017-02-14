var e = function (ele) {
    return document.querySelector(ele)
}


var row = 30
var col = 20
//数组
var canvasarray = []
var x = 2
var y = 0

var time = 200
//取到 div
var maindiv =  e('.maindiv')
//贪吃蛇背景
var canvasbg = function (row,col) {
    //行宽
    for(let i = 0; i < row;i++) {
        var rowdiv = document.createElement('div')
        rowdiv.style.fontSize = '0px'
        var rowarray = []
        for (let j = 0; j <col;j++) {
            var coldiv = document.createElement('div')
            coldiv.className = 'col'
            rowdiv.appendChild(coldiv)
            rowarray.push(coldiv)
        }
        maindiv.appendChild(rowdiv)
        canvasarray.push(rowarray)
  }
  maindiv.style.width = col *20 +col * 2 + 'px'
  maindiv.style.margin = 'auto'
}

var delaytime = null
var changedirection = true

//键盘添加事件
document.onkeydown = function (event) {
    if(!changedirection) {
        return
    }
    event = event || window.event
    // console.log(event.keyCode)
    if(direction == 'right' && event.keyCode == 37) {
        console.log('***')
        return
    }
    if(direction == 'left' && event.keyCode == 39) {
        return
    }
    if(direction == 'up' && event.keyCode == 40) {
        return
    }
    if(direction == 'down' && event.keyCode == 38) {
        console.log('+++')
        return
    }
    switch(event.keyCode) {
      case 37 :
      direction = 'left'
      break;
      case 38 :
      direction = 'up'
      break;
      case 39 :
      direction = 'right'
      break;
      case 40 :
      direction = 'down'
      console.log('down')
      break;
      default:

    }
    changedirection = false
    delaytime = setTimeout(function () {
      changedirection = true},time)

}

var score = 0
//获取得分的div
var scorediv = e('.score')
var maxscorediv = e('.maxscore')
//蛇身数组
var snakebody = []
//默认方向
var direction = 'down'


var snake = function () {
    for (var i = 0; i < 3; i++) {
        canvasarray[0][i].className = 'col activesnake'
        snakebody.push(canvasarray[0][i])
      }
      console.log(snakebody)
}

var random = function (max) {
    return parseInt(Math.random()*max)
}

var createEgg = function () {
    eggx = random(col)
    // console.log('eggx:',eggx)
    eggy = random(row)
    // console.log('eggy:',eggy)
    if(canvasarray[eggy][eggx].classList.contains('activesnake')){

      createEgg()
    } else {
      canvasarray[eggy][eggx].classList.add('egg')
    }

}




var snakeMove = function () {
    var snakeTimer = setInterval(function () {
        switch(direction) {
          case 'right' :
              console.log('x',x)
          x++
          break;
          case 'left' :
          x--
              console.log('x1',x)
          break;
          case 'up' :
          y--
              console.log('y',y)
          break;
          case 'down' :
          y++
              console.log('y1',y)
          break;
          default:
        }
        var b = e('.mdiv')


        //判断游戏结束
        if(y < 0 || y >= row || x < 0 || x >= col){
          //alert('game over!')
            b.style.display = 'block'
            window.clearInterval(snakeTimer)
            return
          }
          for(var i = 0;i < snakebody.length; i++) {
            if(snakebody[i] == canvasarray[y][x]){
              // alert('game over!')
              console.log('hahaha')
              b.style.display = 'block'
              window.clearInterval(snakeTimer)
              return
            }
          }

        //吃蛋
        if(eggx == x&&eggy == y){
          canvasarray[eggy][eggx].classList.remove('egg')
          canvasarray[eggy][eggx].classList.add('activesnake')
          snakebody.push(canvasarray[eggy][eggx])
          score++
          scorediv.innerHTML = '得分：' + score
          var maxscore = localStorage.getItem('maxscore')||0
          if(maxscore < score) {
              maxscorediv.innerHTML = '最高纪录 ：' + score
              localStorage.setItem('maxscore',score)
          } else {
              maxscorediv.innerHTML = '最高纪录：' + maxscore
          }
          createEgg()
        } else {
          snakebody[0].className = 'col'
          snakebody.shift()
          canvasarray[y][x].className = 'col activesnake'
          snakebody.push(canvasarray[y][x])
          console.log(canvasarray[y][x])
        }

    },time)
}

var button = e('.again')
button.addEventListener('click',function(){
    window.location.reload()
})

var __main = function () {
    //画背景图
    canvasbg(row,col)
    //画蛇身
    snake()
    //蛇的移动
    snakeMove()
    //画蛋
    createEgg()

}

__main()
