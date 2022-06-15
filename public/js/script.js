const body = document.body
const game_area = document.createElement("div")
const start_div = document.createElement("div")
const score_div = document.createElement("div")
const gameover_div = document.createElement("div")
const road = document.createElement("div")
const high_score = document.createElement("div")
let player = {x: 40, y: 80}
const player_car_speed = 50
const lane_speed = 4
const opp_car_position = [40, 190, 340]
let item = opp_car_position[Math.floor(Math.random() * opp_car_position.length)]
const car_body = document.getElementsByClassName("car")
let score = 0
let highScore = localStorage.getItem("highscore") ?  localStorage.getItem("highscore") : 0


function toInt(value) {
    return `${parseInt(value)}`
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

high_score.innerHTML = `Highscore = ${highScore}`
high_score.style.position = "absolute"
high_score.style.left = "5%"
high_score.style.top = "15%"
high_score.style.width = "20%"
high_score.style.color = "white"
high_score.style.textAlign = "center"
high_score.style.fontSize = "30px"
high_score.style.zIndex = "2"
high_score.style.backgroundColor = "#808000"
high_score.style.boxShadow = "5px 5px 5px #777"

body.appendChild(high_score)


start_div.innerHTML = "<p>Click To Start</p>"
start_div.style.position = "absolute"
start_div.style.left = "35%"
start_div.style.top = "50%"
start_div.style.width = "30%"
start_div.style.color = "white"
start_div.style.textAlign = "center"
start_div.style.fontSize = "30px"
start_div.style.zIndex = "2"
start_div.style.cursor = "pointer"
start_div.style.backgroundColor = "#808000"
start_div.style.boxShadow = "5px 5px 5px #777"

body.appendChild(start_div)


gameover_div.style.position = "absolute"
gameover_div.style.left = "35%"
gameover_div.style.display = "none"
gameover_div.style.top = "50%"
gameover_div.style.width = "30%"
gameover_div.style.color = "white"
gameover_div.style.textAlign = "center"
gameover_div.style.fontSize = "30px"
gameover_div.style.cursor = "pointer"
gameover_div.style.zIndex = "2"
gameover_div.style.backgroundColor = "#808000"
gameover_div.style.boxShadow = "5px 5px 5px #777"

body.appendChild(gameover_div)

body.style.height = "100vh"
body.style.background = "url(\"/image/background.png\") no-repeat"
body.style.backgroundSize = "cover"


game_area.style.width = "30%"
game_area.style.height = "100%"
game_area.style.margin = "auto"
game_area.style.backgroundColor = "#47484C"
game_area.style.borderLeft = "8px dashed white"
game_area.style.borderRight = "8px dashed white"
// game_area.style.position = "relative"
game_area.style.overflow = "hidden"
body.appendChild(game_area)

score_div.style.position = "absolute"
score_div.style.left = "45%"
score_div.style.top = "5%"
score_div.style.color = "Green"
score_div.style.zIndex = "2"
score_div.style.fontSize = "30px"

game_area.appendChild(score_div)

road.style.position = "relative"
road.style.display = "none"
road.style.height = "100%"
game_area.appendChild(road)


function roadLine(position) {

    for (let i = 0; i < 5; i++) {
        const stripes = document.createElement("div")
        stripes.y = i * 160
        stripes.className = "white_lanes"
        stripes.style.height = "100px"
        stripes.style.position = "absolute"
        stripes.style.left = `${position}px`
        stripes.style.top = `${stripes.y}px`
        stripes.style.width = "8px"
        stripes.style.backgroundColor = "white"
        road.appendChild(stripes)
    }
}


document.addEventListener("keypress", keyPress)

function reload() {
    reload = location.reload()
}

start_div.addEventListener("click", start)
gameover_div.addEventListener("click", reload, false)


function moveLanes() {
    let white_lanes = document.querySelectorAll(".white_lanes")

    white_lanes.forEach((lane) => {


        if (lane.y >= 650) {
            lane.y -= 650
        }

        lane.y += lane_speed
        lane.style.top = `${lane.y}px`
    })

}


function checkCollision(player_car, opp_car) {
    let player_car_Rect = player_car.getBoundingClientRect()
    let opp_car_Rect = opp_car.getBoundingClientRect()

    return !((player_car_Rect.top > opp_car_Rect.bottom) || (player_car_Rect.left > opp_car_Rect.right) || player_car_Rect.right < opp_car_Rect.left)
}


function move_opp_car(player_car) {
    let opp_car = document.querySelectorAll(".opp_car")

    opp_car.forEach((car) => {

        if (checkCollision(player_car, car)) {
            gameOver()
        }

        if (car.y >= 650) {
            car.y -= 650
            car.style.left = `${opp_car_position[Math.floor(Math.random() * opp_car_position.length)]}px`
            score++
        }

        car.y += lane_speed
        car.style.top = `${car.y}px`
    })

}

function gameplay() {

    if (player.start) {
        moveLanes()
        move_opp_car(car_body[0])

        window.requestAnimationFrame(gameplay)

        score_div.innerHTML = `Score : ${score}`

    }

}

function car() {
    let car = document.createElement("div")
    car.className = "car"
    car.style.width = "80px"
    car.style.height = "70px"
    car.style.position = "absolute"
    car.style.left = `${player.x}px`
    car.style.bottom = `${player.y}px`
    car.style.background = "url(\"/image/car.png\") no-repeat"
    car.style.backgroundSize = "100% 100%"
    road.appendChild(car)
}


function gameOver() {
    player.start = false
    gameover_div.innerHTML = `<p>Game Over <br> Score : ${score} <br> Click to Play Again</p>`
    gameover_div.style.display = "block"

    if(score > highScore){
        highScore = score
        localStorage.setItem("highscore",score.toString())
    }

}


function start() {
    player.start = true
    road.style.display = "block"
    start_div.style.display = "none"
    gameover_div.style.display = "none"

    window.requestAnimationFrame(gameplay)


    roadLine(148)
    roadLine(296)

    car()

    for (let i = 0; i < 2; i++) {
        const oppcar = document.createElement("div")
        oppcar.y = ((i + 1) * 350) * -1
        console.log(oppcar.y)
        oppcar.className = "opp_car"
        oppcar.style.width = "80px"
        oppcar.style.height = "70px"
        oppcar.style.left = `${opp_car_position[Math.floor(Math.random() * opp_car_position.length)]}px`
        oppcar.style.position = "absolute"
        oppcar.style.top = `${oppcar.y}px`
        oppcar.style.background = "url(\"/image/oppcar.png\") no-repeat"
        oppcar.style.backgroundSize = "100% 100%"
        road.appendChild(oppcar)
    }
}

function keyPress(e) {
    e.preventDefault()

    if (e.key === "a") {
        let temp = Number(toInt(car_body[0].style.left))

        if (temp === 40) {
        } else {
            let move = setInterval(() => {
                car_body[0].style.left = `${Number(toInt(car_body[0].style.left)) - player_car_speed}px`

                if ((temp - 150) === Number(toInt(car_body[0].style.left))) {
                    clearInterval(move)
                }

            }, 1000 / 60)
        }
    }

    if (e.key === "d") {
        let temp = Number(toInt(car_body[0].style.left))

        if (temp === 340) {
        } else {
            let move = setInterval(() => {
                car_body[0].style.left = `${Number(toInt(car_body[0].style.left)) + player_car_speed}px`

                if ((temp + 150) === Number(toInt(car_body[0].style.left))) {
                    clearInterval(move)
                }

            }, 1000 / 60)
        }
    }
}