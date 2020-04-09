class Player {
    constructor(ctx, posX, posY) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.width = 102
        this.height = 170
        this.image = new Image()
        this.image.src = "img/player.png"
        this.speed = 6
        this.bulletAmount = 1
        this.bulletImpact = 1
        this.bulletType = "normal"
        this.lives = 3
        this.bullet = []
        this.bulletWidth = 180
        this.bulletHeight = 70
        this.fx = new Audio('sounds/big-laser.wav')
        this.diffSrc = "img/player-bullet-animation.png"
        this.keyState = {
            keyLeft: false,
            keyRight: false,
            keyUp: false,
            keyDown: false
        }
    }
    draw(framesCounter) {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.bullet.forEach(elm => elm.draw(framesCounter))
        this.clearBullets()

    }
    move() {
        this.keyState.keyRight === true ? this.posX += this.speed : null
        this.keyState.keyLeft === true ? this.posX -= this.speed : null
        this.keyState.keyUp === true ? this.posY -= this.speed : null
        this.keyState.keyDown === true ? this.posY += this.speed : null
        // dir === 'right' ? this.posX += this.speed : null
        // dir === 'left' ? this.posX -= this.speed : null
        // dir === 'up' ? this.posY -= this.speed : null
        // dir === 'down' ? this.posY += this.speed : null
    }

    shoot() {
        this.fx.play()
        if (this.bulletType === "special") {
            this.bulletWidth = 250
            this.bulletHeight = 96
            this.diffSrc = "img/player-boost-bullet-animation.png"
            this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25 + this.height / 2, this.bulletWidth, this.bulletHeight, this.diffSrc))

        } else if (this.bulletType === "normal") {
            this.bulletWidth = 180
            this.bulletHeight = 70
            this.diffSrc = "img/player-bullet-animation.png"
            if (this.bulletAmount == 1) {
                this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25 + this.height / 2, this.bulletWidth, this.bulletHeight, this.diffSrc))
            }
            if (this.bulletAmount == 2) {
                this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25, this.bulletWidth, this.bulletHeight, this.diffSrc))
                this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25 + this.height, this.bulletWidth, this.bulletHeight, this.diffSrc))
            }
            if (this.bulletAmount == 3) {
                this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25, this.bulletWidth, this.bulletHeight, this.diffSrc))
                this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25 + this.height / 2, this.bulletWidth, this.bulletHeight, this.diffSrc))
                this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25 + this.height, this.bulletWidth, this.bulletHeight, this.diffSrc))
            }
        }
    }
    clearBullets() {
        this.bullet = this.bullet.filter(elm => elm.posX <= game.canvasSize.width)
    }
}