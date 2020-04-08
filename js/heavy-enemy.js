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
        this.armor = 3
        this.speedX = 6
        this.speedY = 0
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
        this.enemyBullet.push(new EnemyBullets(this.ctx, this.posX - this.width, this.posY, "img/enemy-bullet.png"))
        this.enemyBullet.push(new EnemyBullets(this.ctx, this.posX - this.width, this.posY + this.height / 2, "img/enemy-bullet.png"))
    }
    clearBullets() {
        this.enemyBullet = this.enemyBullet.filter(elm => elm.posX + elm.width > 0)
    }
    changeDirection() {
        this.direction *= -1
    }
}