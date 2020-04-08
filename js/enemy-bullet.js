class EnemyBullets {
    constructor(ctx, posX, posY, imgSrc) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.width = 120
        this.height = 46
        this.speed = 20
        this.onScreen = true
        this.image = new Image()
        this.image.src = imgSrc
    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.move()
    }
    move() {
        this.posX -= this.speed
    }
}