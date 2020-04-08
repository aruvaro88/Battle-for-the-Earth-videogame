class Player {
    constructor(ctx, posX, posY) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.width = 102
        this.height = 170
        this.image = new Image()
        this.image.src = "img/player.png"
        this.speed = 25
        this.bulletAmount = 1
        this.bulletImpact = 1
        this.lives = 3
        this.bullet = []
    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.bullet.forEach(elm => elm.draw())
        this.clearBullets()
    }
    move(dir) {
        dir === 'right' ? this.posX += this.speed : null
        dir === 'left' ? this.posX -= this.speed : null
        dir === 'up' ? this.posY -= this.speed : null
        dir === 'down' ? this.posY += this.speed : null
    }

    shoot() {
        // if (this.bulletImpact >1) {
        //     this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25 + this.height / 2, "img/player-boost-bullet.png"))
        // }
        if (this.bulletAmount == 1) {
            this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25 + this.height / 2, "img/player-bullet.png"))
        }
        if (this.bulletAmount == 2) {
            this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25, "img/player-bullet.png"))
            this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25 + this.height, "img/player-bullet.png"))
        }
        if (this.bulletAmount == 3) {
            this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25, "img/player-bullet.png"))
            this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25 + this.height / 2, "img/player-bullet.png"))
            this.bullet.push(new Bullets(this.ctx, this.posX + this.width, this.posY - 25 + this.height, "img/player-bullet.png"))
        }
    }
    clearBullets() {
        this.bullet = this.bullet.filter(elm => elm.posX <= game.canvasSize.width)
    }

}