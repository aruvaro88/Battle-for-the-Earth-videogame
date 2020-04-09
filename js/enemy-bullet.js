class EnemyBullets {
    constructor(ctx, posX, posY, width, height, imgSrc) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.width = width
        this.height = height
        this.speed = 10
        this.onScreen = true
        this.image = new Image()
        this.image.src = imgSrc
        this.imageWidth = 2970
        this.imageHeight = 193
        this.image.frames = 6
        this.image.framesIndex = 0
    }
    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.imageWidth / this.image.frames),
            0,
            Math.floor(this.imageWidth / this.image.frames),
            this.imageHeight,
            this.posX,
            this.posY,
            this.width,
            this.height)
        this.move()
        this.animate(framesCounter)
    }
    move() {
        this.posX -= this.speed
    }
    animate(framesCounter) {
        if (framesCounter % 6 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex === this.image.frames) {
            this.image.framesIndex = 0
        }
    }
}