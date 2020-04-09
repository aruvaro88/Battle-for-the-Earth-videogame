const game = {
    name: "Battle for the Earth",
    author: "Alvaro Moral Arce",
    version: "1.0.0",
    description: "Matamarcianos de scroll lateral",
    license: undefined,
    canvasDom: undefined,
    ctx: undefined,
    fps: 60,
    framesCounter: 0,
    interval: undefined,
    background: undefined,
    player: undefined,
    enemy: [],
    powerUpBullet: [],
    powerUpImpact: [],
    powerUpLives: [],
    enemiesDestroyed: 0,
    music: new Audio('sounds/Arcade-Fantasy.mp3'),
    powerUpFx: new Audio('sounds/power-up.wav'),
    canvasSize: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    init() {
        this.canvasDom = document.getElementById("myCanvas")
        this.ctx = this.canvasDom.getContext("2d")
        this.setDimensions()
        this.start()
    },

    setDimensions() {
        this.canvasDom.width = this.canvasSize.width
        this.canvasDom.height = this.canvasSize.height
    },

    start() {
        this.music.loop = true
        this.music.play()
        this.reset()
        this.setEventListeners()
        this.interval = setInterval(() => {
            console.log(this.player.posX, this.player.posY, this.canvasSize.width, this.canvasSize.height)
            this.framesCounter++
            if (this.framesCounter > 5000) {
                this.framesCounter = 0;
            }
            this.clear()
            this.drawAll()
            this.generateEnemy()
            this.generatePowerUp()
            this.checkCollision()
            this.clearEnemyLeft()
            this.clearEnemyRight()
            this.player.move()
        }, 1000 / this.fps)
    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize.width, this.canvasSize.height)
        this.player = new Player(this.ctx, 30, this.canvasSize.height / 2)
        this.enemy = []
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    },

    drawAll() {
        this.background.draw()
        this.player.draw(this.framesCounter)
        this.enemy.forEach(elm => elm.draw(this.framesCounter))
        this.powerUpBullet.forEach(pow => pow.draw())
        this.powerUpImpact.forEach(pow => pow.draw())
        this.powerUpLives.forEach(pow => pow.draw())
        this.ctx.font = '30px serif'
        this.ctx.textBaseline = 'bottom'
        this.ctx.fillText(`Lives: ${this.player.lives}`, 10, game.canvasSize.height)
        this.ctx.fillText(`Enemies Destroyed: ${this.enemiesDestroyed}`, 200, game.canvasSize.height)
    },

    setEventListeners() {
        document.onkeydown = e => {
            switch (e.keyCode) {
                case 39:
                    if (this.player.posX + this.player.width < this.canvasSize.width) {
                        this.player.keyState.keyRight = true
                    } else {
                        this.player.keyState.keyRight = false
                    }
                    break;
                case 37:
                    if (this.player.posX >= 0) {
                        this.player.keyState.keyLeft = true
                    } else {
                        this.player.keyState.keyLeft = false
                    }
                    break;
                case 38:
                    if (this.player.posY > 0) {
                        this.player.keyState.keyUp = true
                    } else {
                        this.player.keyState.keyUp = false
                    }
                    break;
                case 40:
                    if (this.player.posY + this.player.height < this.canvasSize.height) {
                        this.player.keyState.keyDown = true
                    } else {
                        this.player.keyState.keyDown = false
                    }
                    break;
                case 32:
                    e.keyCode === 32 ? this.player.shoot() : null
                    break;
            }
            document.onkeyup = e => {
                switch (e.keyCode) {
                    case 39:
                        this.player.keyState.keyRight = false
                        break;
                    case 37:
                        this.player.keyState.keyLeft = false
                        break;
                    case 38:
                        this.player.keyState.keyUp = false
                        break;
                    case 40:
                        this.player.keyState.keyDown = false
                        break;
                    case 32:
                        e.keyCode === 32 ? this.player.shoot() : null
                        break;
                }
            }
        }






        // if (this.player.posX < this.canvasSize.width - this.player.width) {
        //     e.keyCode === 37 ? this.player.keyState.keyRight = true : null
        // }
        // if (this.player.posX > 0) {
        //     e.keyCode === 39 ? this.player.keyState.keyLeft = true : null
        // }
        // if (this.player.posY > 0) {
        //     e.keyCode === 38 ? this.player.keyState.keyUp = true : null
        // }
        // if (this.player.posY < this.canvasSize.height - this.player.height) {
        //     e.keyCode === 40 ? this.player.keyState.keyDown = true : null
        // }
        // e.keyCode === 32 ? this.player.shoot() : null

        // document.onkeyup = e => {
        //     if (this.player.posX < this.canvasSize.width - this.player.width) {
        //         e.keyCode === 37 ? this.player.keyState.keyRight = false : null
        //     }
        //     if (this.player.posX > 0) {
        //         e.keyCode === 39 ? this.player.keyState.keyLeft = false : null
        //     }
        //     if (this.player.posY > 0) {
        //         e.keyCode === 38 ? this.player.keyState.keyUp = false : null
        //     }
        //     if (this.player.posY < this.canvasSize.height - this.player.height) {
        //         e.keyCode === 40 ? this.player.keyState.keyDown = false : null
        //     }
        // }
    },
    generatePowerUp() {
        if (this.framesCounter % 1000 == 0) {
            let prob = Math.floor(Math.random() * (11 - 1) + 1)
            if (prob >= 1 && prob <= 6) {
                this.powerUpImpact.push(new PowerUp(this.ctx, "img/Damage_Bonus.png"))
            }
            if (prob >= 7 && prob <= 9) {
                this.powerUpBullet.push(new PowerUp(this.ctx, "img/Rockets_Bonus.png"))
            }
            if (prob == 10) {
                this.powerUpLives.push(new PowerUp(this.ctx, "img/HP_Bonus.png"))
            }
        }
    },
    generateEnemy() {
        //si aparece final boss detener la generacion de enemigos
        let prob = Math.floor(Math.random() * (21 - 1) + 1)
        if (this.framesCounter % 100 == 0) {
            //if generate enemies == true
            if (prob >= 1 && prob <= 8) {
                this.enemy.push(new BasicEnemy(this.ctx, "img/basic-enemy.png"))
            }
            if (prob >= 9 && prob <= 13) {
                this.enemy.push(new SpeedEnemy(this.ctx, "img/speed-enemy.png"))
            }
            if (prob >= 14 && prob <= 17) {
                this.enemy.push(new HeavyEnemy(this.ctx, "img/heavy-enemy.png"))
            }
            if (prob >= 18 && prob <= 19) {
                this.enemy.push(new MotherEnemy(this.ctx, "img/mother-enemy.png"))
            }
            if (prob == 20) {
                this.enemy.push(new FinalBoss(this.ctx, "img/final-boss.png"))
            }
        }
    },

    clearEnemyLeft() {
        this.enemy = this.enemy.filter(enm => enm.posX + enm.width > 0)
    },

    clearEnemyRight() {
        this.enemy = this.enemy.filter(enm => enm.posX <= this.canvasSize.width)
    },

    isOnScreen() {
        this.enemy = this.enemy.filter(enm => enm.onScreen === true)
        this.powerUpBullet = this.powerUpBullet.filter(pow => pow.onScreen === true)
        this.powerUpImpact = this.powerUpImpact.filter(pow => pow.onScreen === true)
        this.powerUpLives = this.powerUpLives.filter(pow => pow.onScreen === true)
        this.player.bullet = this.player.bullet.filter(bull => bull.onScreen === true)
        this.enemy.forEach((enm) => {
            enm.enemyBullet = enm.enemyBullet.filter(ebull => ebull.onScreen === true)
        })
    },

    isCollision(elm1, elm2) {
        return (elm1.posX < elm2.posX + elm2.width &&
            elm1.posX + elm1.width > elm2.posX &&
            elm1.posY < elm2.posY + elm2.height &&
            elm1.posY + elm1.height > elm2.posY)
    },

    checkCollision() {
        this.enemy.filter(enm => enm.isExploding == false).forEach((enm) => {
            this.isCollision(this.player, enm) ? (this.reduceLives(this.player), enm.onScreen = false) : null //check colisiones jugador-enemigo

            this.player.bullet.forEach((bull) => { //check colisiones de las balas del jugador
                if (this.isCollision(bull, enm)) { //bala del jugador vs enemigos
                    this.reduceArmor(enm)
                    bull.onScreen = false
                }
            })
            enm.enemyBullet.forEach((ebull) => { //check colisiones balas del enemigo vs jugador
                this.isCollision(ebull, this.player) ? (this.reduceLives(this.player), ebull.onScreen = false) : null
                this.player.bullet.forEach((bull) => {
                    if (this.isCollision(ebull, bull)) {
                        ebull.onScreen = false
                        bull.onScreen = false
                    }
                })
            })
        })
        this.powerUpImpact.forEach((pow) => {
            if (this.isCollision(pow, this.player)) {
                this.powerUpFx.play()
                this.player.bulletImpact === 2 ? this.player.bulletImpact = 2 : this.player.bulletImpact++
                this.player.bulletType = "special"
                pow.onScreen = false
            }
        })
        this.powerUpBullet.forEach((pow) => {
            if (this.isCollision(pow, this.player)) {
                this.powerUpFx.play()
                this.player.bulletAmount === 3 ? this.player.bulletAmount = 3 : this.player.bulletAmount++
                this.player.bulletType = "normal"
                pow.onScreen = false
            }
        })
        this.powerUpLives.forEach((pow) => {
            if (this.isCollision(pow, this.player)) {
                this.powerUpFx.play()
                this.player.lives++
                pow.onScreen = false
            }
        })
        this.isOnScreen()
    },

    reduceArmor(enemy) {
        enemy.armor -= this.player.bulletImpact
        if (enemy.armor <= 0) {
            enemy.isExploding = true
            setTimeout(() => {
                enemy.onScreen = false
            }, 1000)
            this.enemy.forEach(elm => elm.drawExplosion(this.framesCounter))
            this.enemiesDestroyed++
        }
    },

    reduceLives(player) {
        player.lives--
        player.posX = 30
        player.posY = this.canvasSize.height / 2
        if (player.lives == 0) {
            this.gameOver()
        }
    },

    gameOver() {
        alert("¡Han destruido tu nave! Fin del juego")
        document.location.reload()
        window.clearInterval(this.interval)
    }
}