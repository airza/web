
        Crafty.c('CustomControls', { 
            __move: {left: false, right: false, up: false, down: false}, 
            _speed: 3, 
            CustomControls: function(speed) { 
                if(speed) this._speed = speed; 
                var move = this.__move; 
                this.bind('EnterFrame', function() { 
                    //move the player in a direction depending on the booleans 
                    //only move the player in one direction at a time (up/down/left/right) 
                    if(move.right) this.x += this._speed; 
                    else if(move.left) this.x -= this._speed; 
                    else if(move.up) this.y -= this._speed; 
                    else if(move.down) this.y += this._speed; 
                }).bind('KeyDown', function(e) { 
                    //default movement booleans to false 
                    move.right = move.left = move.down = move.up = false; 
                    //if keys are down, set the direction 
                    if(e.keyCode === Crafty.keys.RIGHT_ARROW) move.right = true; 
                    if(e.keyCode === Crafty.keys.LEFT_ARROW) move.left = true; 
                    if(e.keyCode === Crafty.keys.UP_ARROW) move.up = true; 
                    if(e.keyCode === Crafty.keys.DOWN_ARROW) move.down = true; 
                    this.preventTypeaheadFind(e); 
                }).bind('KeyUp', function(e) { 
                    //if key is released, stop moving 
                    if(e.keyCode === Crafty.keys.RIGHT_ARROW) move.right = false; 
                    if(e.keyCode === Crafty.keys.LEFT_ARROW) move.left = false; 
                    if(e.keyCode === Crafty.keys.UP_ARROW) move.up = false; 
                    if(e.keyCode === Crafty.keys.DOWN_ARROW) move.down = false; 
                    this.preventTypeaheadFind(e); 
                });
                return this; 
            } 
        }); 