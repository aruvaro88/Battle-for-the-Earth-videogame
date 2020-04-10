class BasicEnemy {
    constructor(ctx, imgSrc) {
        this.ctx = ctx
        this.width = 128
        this.height = 78
        this.posX = game.canvasSize.width
        this.posY = Math.floor(Math.random() * (game.canvasSize.height - this.height))
        this.image = new Image()
        this.image.src = imgSrc
        this.onScreen = true
        this.speed = 6
        this.armor = 4
        this.enemyBullet = []
        this.bulletWidth = 180
        this.bulletHeight = 70
        this.fx = new Audio('sounds/enemy-shoot.wav')
        this.isExploding = false
        this.explosion = new Explosion(this.ctx, this.posX, this.posY, "img/explosion-animation.png")
    }
    draw(bulletCounter) {
        if (this.isExploding) {
            this.explosion.draw(bulletCounter,this.posX, this.posY)
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
        this.posX -= this.speed
    }
    shoot() {
        this.fx.play()
        this.enemyBullet.push(new EnemyBullets(this.ctx, this.posX - this.width, this.posY, this.bulletWidth, this.bulletHeight, "img/enemy-bullet-animation.png"))
    }
    clearBullets() {
        this.enemyBullet = this.enemyBullet.filter(elm => elm.posX + elm.width > 0)
    }
}