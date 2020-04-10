class Explosion {
    constructor(ctx, posX, posY, imgSrc) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.width = 125
        this.height = 125
        this.explosion = new Image()
        this.explosion.src = imgSrc
        this.explosionFx = new Audio('sounds/enemy-explosion.wav')
        this.explosionWidth = 1250
        this.explosionHeight = 125
        this.explosion.frames = 10
        this.explosion.framesIndex = 0
    }
    draw(framesCounter,oX,oY) {
        this.explosionFx.play()
        this.ctx.drawImage(
            this.explosion,
            this.explosion.framesIndex * Math.floor(this.explosionWidth / this.explosion.frames),
            0,
            Math.floor(this.explosionWidth / this.explosion.frames),
            this.explosionHeight,
            oX,
            oY,
            this.width,
            this.height)
        this.animate(framesCounter)
    }
    animate(framesCounter) {
        if (framesCounter % 8 == 0) {
            this.explosion.framesIndex++;
        }
        if (this.explosion.framesIndex === this.explosion.frames) {
            this.explosion.framesIndex = 0;

        }
    }
}