class PowerUp {
    constructor(ctx, imgSrc) {
        this.ctx = ctx
        this.posX = game.canvasSize.width
        this.posY = Math.floor(Math.random() * Math.floor(game.canvasSize.height))
        this.width = 70
        this.height = 70
        this.speed = 3
        this.direction = 1
        this.onScreen = true
        this.image = new Image()
        this.image.src = imgSrc
    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.move()
    }
    move() {
        if (this.posY <= 0 || this.posY >= game.canvasSize.height - this.height) {
            this.changeDirection()
        }
        this.posX -= this.speed
        this.posY -= this.speed * this.direction
    }
    changeDirection() {
        this.direction *= -1
    }
}