class MotherEnemy {
    constructor(ctx, imgSrc) {
        this.ctx = ctx
        this.width = 512
        this.height = 346
        this.posX = game.canvasSize.width
        this.posY = Math.floor(Math.random() * (game.canvasSize.height - this.height))
        this.image = new Image()
        this.image.src = imgSrc
        this.onScreen = true
        this.armor = 4
        this.speed = 5
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
        this.posX -= this.speed * this.direction
        if (this.posX == game.canvasSize.width / 2) {
            this.changeDirection()
        }
    }
    shoot() {
        this.enemyBullet.push(new EnemyBullets(this.ctx, this.posX, this.posY, "img/enemy-bullet.png"))
        this.enemyBullet.push(new EnemyBullets(this.ctx, this.posX, this.posY + this.height / 2, "img/enemy-bullet.png"))
        this.enemyBullet.push(new EnemyBullets(this.ctx, this.posX, this.posY + this.height, "img/enemy-bullet.png"))

    }
    clearBullets() {
        this.enemyBullet = this.enemyBullet.filter(elm => elm.posX + elm.width > 0)
    }
    changeDirection() {
        this.direction *= -1
    }
}