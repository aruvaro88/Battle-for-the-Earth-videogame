class Background {
    constructor(ctx, bgW, bgH) {
        this.ctx = ctx
        this.width = bgW
        this.height = bgH
        this.image = new Image()
        this.layer = []
        this.posX = 0
        this.posY = 0
        this.speed = 0.5
        this.generateLayers()
    }
    draw() {
        this.layer.forEach(elm => {
            elm.draw()
        })
    }
    generateLayers() {
        this.layer.push(new Layer(this.ctx, this.width, this.height, .5, "img/Parallax-bg-mountain/sky.png"))
        this.layer.push(new Layer(this.ctx, this.width, this.height, .8, "img/Parallax-bg-mountain/clouds_1.png"))
        this.layer.push(new Layer(this.ctx, this.width, this.height, 1.1, "img/Parallax-bg-mountain/clouds_2.png"))
        this.layer.push(new Layer(this.ctx, this.width, this.height, 2, "img/Parallax-bg-mountain/rocks_1.png"))
        this.layer.push(new Layer(this.ctx, this.width, this.height, 2.3, "img/Parallax-bg-mountain/rocks_2.png"))
        this.layer.push(new Layer(this.ctx, this.width, this.height, 1.7, "img/Parallax-bg-mountain/clouds_4.png"))
        this.layer.push(new Layer(this.ctx, this.width, this.height, 1.4, "img/Parallax-bg-mountain/clouds_3.png"))

    }
}