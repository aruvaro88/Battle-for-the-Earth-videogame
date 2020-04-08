class Layer {
    constructor(ctx, bgW, bgH, speed, imgSrc) {
        this.ctx = ctx
        this.width = bgW
        this.height = bgH
        this.image = new Image()
        this.image.src = imgSrc
        this.posX = 0
        this.posY = 0
        this.speed = speed
    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height)
        this.move()
    }
    move() {
        if (this.posX <= -this.width) {
            this.posX = 0
        }
        this.posX -= this.speed
    }
}