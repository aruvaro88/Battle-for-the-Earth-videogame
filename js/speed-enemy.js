class SpeedEnemy {
    constructor(ctx, imgSrc) {
        this.ctx = ctx
        this.width = 128
        this.height = 82
        this.posX = game.canvasSize.width
        this.posY = Math.floor(Math.random() * (game.canvasSize.height - this.height))
        this.image = new Image()
        this.image.src = imgSrc
        this.onScreen = true
        this.armor = 2
        this.speed = 6
        this.direction = 1
        this.enemyBullet = []
    }
    draw(bulletCounter) {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.move()
        this.enemyBullet.forEach(elm => elm.draw())
        if (bulletCounter % 100 === 0) {
            this.shoot()
        }
        this.clearBullets()
    }
    move() {
        if (this.posY <= 0 || this.posY >= game.canvasSize.height - this.height) {
            this.changeDirection()
        }
        this.posX -= this.speed
        this.posY -= this.speed * this.direction
    }
    shoot() {
        this.enemyBullet.push(new EnemyBullets(this.ctx, this.posX - this.width, this.posY, "img/enemy-bullet.png"))
    }
    clearBullets() {
        this.enemyBullet = this.enemyBullet.filter(elm => elm.posX + elm.width > 0)
    }
    changeDirection() {
        this.direction *= -1
    }
}