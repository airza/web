var GRAVITY = .15;

Crafty.scene("main", function () {
	Crafty.background("url('BG.png')")
    controls = Crafty.c('CustomControls', {
        __move: {
            left: false,
            right: false,
            up: false
        },
        CustomControls: function () {
            this.bind("KeyDown", function (e) {
                if (e.keyCode === Crafty.keys.D) this.__move.right = true;
                if (e.keyCode === Crafty.keys.A) this.__move.left = true;
                if (e.keyCode === Crafty.keys.W) this.__move.up = true;
            }).bind('KeyUp', function (e) {
                //if key is released, stop moving 
                if (e.keyCode === Crafty.keys.D) this.__move.right = false;
                if (e.keyCode === Crafty.keys.A) this.__move.left = false;
                if (e.keyCode === Crafty.keys.W) this.__move.up = false;
            });
            return this;
        }
    })

    physics = Crafty.c("PlayerPhysics", {
        _falling: 1,
        _xspeed: 0,
        _xaccel: 0,
		_xmaxaccel:1,
        _xthrust: 0.1,
        _xmaxspeed: 10,

        _yspeed: 0,
        _yaccel: 0,
        _jumpthrust: -20,
        _ymaxspeed: 30,
        PlayerPhysics: function () {
            capAtMax = function (speed, max) {
                if (Math.abs(speed) > max) {
                    speed = ((speed < 0) ? -1 * max : max)
                    return speed
                } else {
                    return speed
                }
            };
            move = this.__move
            this.bind('EnterFrame', function () {
                if (move.right) {
                    this._xaccel += this._xthrust;
                }
                if (move.left) {
                    this._xaccel -= this._xthrust;
                }
                if ((move.right) === false && (move.left) === false) {
                    this._xaccel *= .9;
                    this._xspeed *= .9;
                }
				this._xaccel = capAtMax(this._xaccel,this._xmaxaccel)
                this._xspeed += this._xaccel;
                
                if (!(this._falling) && move.up == true) {
                    this._yspeed = this._jumpthrust
					this._yaccel = 0
                }
                if (this._falling) {
                    this._yaccel += GRAVITY
                }
                this._yspeed += this._yaccel
				this._xspeed = capAtMax(this._xspeed, this._xmaxspeed);
				this._yspeed = capAtMax(this._yspeed, this._ymaxspeed)
                this.y += this._yspeed;
                this.x += this._xspeed;
				Crafty.viewport.x = -1*(this.x - 400)
				Crafty.viewport.y = -1*(this.y - 400)
            }).onHit("Wall", function () {
				
                this.x -= this._xspeed
                this._xspeed *= -.9
                this._xaccel *= -.9
				this._falling = 0
				}, function() {
				this._falling = 1
            }).onHit("Platform", function () {
                this._falling = 0
                this.y = floor.y - this.h + 1
                this.color("#0000FF")
                this._yaccel = 0;
                this._yspeed = 0;
            }, function () {
                this._falling = true;
                this.color("#FF0000")
            })
            return this;
        }
    });

    /*
     * Create an entity with Crafty.e(..) that
     *  - can be drawn (2D) on a HTML canvas (Canvas)
     *  - has a background color (Color)
     *  - can be moved with WASD or arrow keys (Fourway)
     */
    floor = Crafty.e("2D,DOM,Color,Platform").attr({
        x: 0,
        y: 540,
        w: 800,
        h: 100
    }) // for Component 2D
    .color("#ae5abc"); // for Component Color
    player = Crafty.e("2D, DOM, Color,Collision,CustomControls,PlayerPhysics,").attr({
        x: Crafty.viewport.width / 2,
        y: Crafty.viewport.height*5 / 6,
        w: 30,
        h: 90
    }) // for Component 2D
    .color("#FF0000") // for Component Color
    .CustomControls().PlayerPhysics()

    Crafty.e("2D, DOM, Color, Wall").color("#FF0000") // for Component Color
    .attr({
        x: -99,
        y: 0,
        w: 100,
        h: 640
    }); // for Component 2D
    Crafty.e("2D, DOM, Color, Wall,").color("#FF0000") // for Component Color
    .attr({
        x: 799,
        y: 0,
        w: 100,
        h: 640
    }); // for Component 2D
	    Crafty.e("2D, DOM, Color, Wall,").color("#FF0000") // for Component Color
    .attr({
        x: 500,
        y: 0,
        w: 50,
        h: 400
    }); // for Component 2D
});
window.onload = (function () {
    var WIDTH = 800;
    var HEIGHT = 640;
    // Initialize Crafty
    Crafty.init(WIDTH, HEIGHT);

    Crafty.scene("main")
})