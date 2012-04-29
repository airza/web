  Crafty.c('Player', {
    __move: { left:false, right:false, up:false, down:false },
    __can: { climb:false },
    _speed: 3, 

    Player: function(speed) {
      if(speed) this._speed = speed;
      var move = this.__move;
      var can = this.__can;
      
      this.requires("Collision, Gravity, WiredHitBox")
      
      this.bind('EnterFrame', function() { 
        if(move.right) this.x += this._speed;
        else if(move.left) this.x -= this._speed;
        else if(move.up) this.y -= this._speed;
        else if(move.down) this.y += this._speed;
        
      }).bind('KeyDown', function(e) {
        move.right = move.left = move.down = move.up = false;
        
        if(e.keyCode === Crafty.keys.D) {
          
          move.right = true;
        }
        if(e.keyCode === Crafty.keys.A) {
          move.left = true;
        }
        if(e.keyCode === Crafty.keys.W) {
          if(can.climb) {
            move.up = true;
          }
        }
        if(e.keyCode === Crafty.keys.S) {
          if(can.climb) {
            move.down = true;
          }
        }
        
      }).bind('KeyUp', function(e) { 
        can.climb = false;        
        
        if(e.keyCode === Crafty.keys.D) {
          move.right = false;
        }
        if(e.keyCode === Crafty.keys.A) {
          move.left = false;
        }
        if(e.keyCode === Crafty.keys.W) {
          move.up = false;
        }
        if(e.keyCode === Crafty.keys.S) {
          move.down = false; 
        }
        
      })
      .onHit("ladder", function () {
        
        can.climb = true;
        
      }).onHit("floor", function () {
        
        this.y -= this._speed; 
        
        can.climb = false;
        
      })
      .collision()
      .gravity('solid');
      
      return this;
    }
    
  });
    
    
  
  
  function generateWorld() {
    
    var init = function() {
      
      background();
      floor();
      ladders();
      
    }
    
    var background = function() {
      Crafty.background("#c0c0c0");
    }
    
    var floor = function() {
      for (var i = 0; i < 25; i++) {
        Crafty.e("2D,DOM,Color,solid")
          .attr({ x: i * 48, y: 400, z:2 })
          .color("red");
      }
    }
    
    
    
    var ladders = function() {
      Crafty.e("2D,DOM,Color,solid,Collision,ladder,WiredHitBox")
        .attr({w:50,h:150,x:240,y:270})
        .collision(new Crafty.polygon([[0,-148],[0,148],[148,148],[148,-148]]))
        .color("blue");
    }
          
    init();
  }
  
?