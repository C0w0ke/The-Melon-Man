function createLava(y, speed, height) {
    const lava = {
        y: y,
        speed: speed,
        update: null,
        isEnd: false,
        tiles: [{ tileColumn: 0, tileRow: 4 }],

        movingLava: function () {
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
            setTimeout(function () {
                game.lava = null
                clearInterval(this.update)
                this.update = null
            }, 5000)
        }
    }

    return lava

}

let lavaSpawning = false
game.startSpawning = function () {

    let y = game.player.highestY
    if (y < -100 && !lavaSpawning) {
        game.lavaSpawn = createLava(0, 100, 1500)
        lavaSpawning = true;
        game.lavaSpawn.movingLava()
    }

}