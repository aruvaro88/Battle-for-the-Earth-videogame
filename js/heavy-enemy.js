class HeavyEnemy {
    constructor(ctx, imgSrc) {
        this.ctx = ctx
        this.width = 256
        this.height = 166
        this.posX = game.canvasSize.width
        this.posY = Math.floor(Math.random() * (game.canvasSize.height - this.height))
        this.image = new Image()
        this.image.src = imgSrc
        this.onScreen = true
        this.armor = 4
        this.speedX = 6
        this.speedY = 0
        this.direction = 1
        this.enemyBullet = []
        this.bulletWidth = 180
        this.bulletHeight = 70
        this.fx = new Audio('sounds/enemy-shoot.wav')
        this.explosion = new Image()
        this.explosion.src = "img/explosion-animation.png"
        this.explosionFx = new Audio('sounds/enemy-explosion.wav')
        this.isExploding = false
        this.explosionWidth = 1250
        this.explosionHeight = 125
        this.explosion.frames = 10
        this.explosion.framesIndex = 0
    }
    draw(bulletCounter) {
        if (this.isExploding) {
            this.drawExplosion(bulletCounter)
        } else {
            this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        }
        this.move()
        this.enemyBullet.forEach(elm => elm.draw(bulletCounter))
        if (bulletCounter % 100 === 0) {
            this.shoot()
        }
        this.clearBullets()
    }
    move() {
        if (this.posX == game.canvasSize.width / 2) {
            this.speedX = 0
            this.speedY = 10
            this.posY += this.speedY
        }
        if (this.posY >= game.canvasSize.height - this.height) {
            this.speedY = 0
            this.speedX = 10
        }
        this.posX -= this.speedX

    }
    shoot() {
        this.fx.play()
        this.enemyBullet.push(new EnemyBullets(this.ctx, this.posX - this.width, this.posY + this.height, this.bulletWidth, this.bulletHeight, "img/enemy-bullet-animation.png"))
        this.enemyBullet.push(new EnemyBullets(this.ctx, this.posX - this.width, this.posY, this.bulletWidth, this.bulletHeight, "img/enemy-bullet-animation.png"))
    }
    clearBullets() {
        this.enemyBullet = this.enemyBullet.filter(elm => elm.posX + elm.width > 0)
    }
    changeDirection() {
        this.direction *= -1
    }
    drawExplosion(framesCounter) {
        this.explosionFx.play()
        this.ctx.drawImage(
            this.explosion,
            this.explosion.framesIndex * Math.floor(this.explosionWidth / this.explosion.frames),
            0,
            Math.floor(this.explosionWidth / this.explosion.frames),
            this.explosionHeight,
            this.posX,
            this.posY,
            this.width,
            this.height)
        this.animateExplosion(framesCounter)
    }
    animateExplosion(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.explosion.framesIndex++;
        }
        if (this.explosion.framesIndex === this.explosion.frames) {
            this.explosion.framesIndex = 0;
        }
    }
}