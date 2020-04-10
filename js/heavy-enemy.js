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
        this.armor = 8
        this.speedX = 6
        this.speedY = 0
        this.direction = 1
        this.enemyBullet = []
        this.bulletWidth = 180
        this.bulletHeight = 70
        this.fx = new Audio('sounds/enemy-shoot.wav')
        this.isExploding = false
        this.explosion = new Explosion(this.ctx, this.posX, this.posY, "img/explosion-animation.png")
    }
    draw(bulletCounter) {
       if (this.isExploding) {
           this.explosion.draw(bulletCounter, this.posX, this.posY)
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
}