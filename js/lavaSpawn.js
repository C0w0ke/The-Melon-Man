function createLava(y, speed, height) {
    const lava = {
        y: y,
        speed: speed,
        maxY: 0,
        update: null,
        isEnd: false,
        tiles: [{ tileColumn: 0, tileRow: 4 }],

        movingLava: function () {
            this.maxY = this.y - height
            this.update = setInterval( function () {
                
                this.y -= this.speed
                game.requestRedraw()

                // Kiểm tra va chạm với player
                if (this.y < game.player.y - this.speed * 2) {
                    if (!this.isEnd) {
                        this.stopLava()
                        this.isEnd = true
                        game.isOver = true
                    }
                }
            }, 1000)
        },

        stopLava: function () {
            const self = this
            setTimeout(function () {
                game.lava = null
                clearInterval(self.update)
                self.update = null
            }, 5000)
        }
    }

    return lava

}

let lavaSpawning = false

game.startSpawning = function () {
    setInterval(function () {
        let y = game.player.highestY
        if (y < -100 && !lavaSpawning) {
            game.lavaSpawn = createLava(0, 100, 1500)
            lavaSpawning = true;
            game.lavaSpawn.movingLava()
        }
    }, 1000)
}