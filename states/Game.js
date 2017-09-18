var Game = function(game) {};

Game.prototype = {

  preload: function () {
    this.optionCount = 1;
    this.speed = 10;
    this.background;

    //  Left, right and space key for controls
    this.leftKey;
    this.rightKey;
    this.spaceKey;
    this.upKey;
    //this.game.paused = true;
    this.enemycarposX = [];
    this.enemycarposY = []; 
    this.enemycarposYIni = [];
    this.value = 2;
    this.fueltank,
    this.speedText
  },

  addMenuOption: function(text, callback) { 
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
},

 

  create: function () { 
    //this.stage.disableVisibilityChange = false;
    //var bg = game.add.sprite(0, 0, 'road-bg');

    /*this.addMenuOption('Next ->', function (e) {
      this.game.state.start("GameOver");
    });*/

    

    //  Register the keys.
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

     //  Stop the following keys from propagating up to the browser
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);

        // Road Background
    this.background = game.add.tileSprite(0,0,546,935,'road-bg');

    //this.buttonPlay = game.add.button(game.world.centerX,100,"buttons", this.clickMe, this,70,0);
    //this.buttonPlay.anchor.set(0.5,0.5);

    // My Car 
    this.mycar = game.add.tileSprite(240,400,71,141, 'mycar');
    game.physics.enable(this.mycar,Phaser.Physics.ARCADE);
    this.mycar.body.setSize(56, 130, 0, 0);

    // oponent cars
    this.enemycar = game.add.group();
    this.enemycar.enableBody = true; 
    this.enemycar.PhysicsBodyType = Phaser.Physics.ARCADE; 

    // create oponent cars
    this.createEnemyCars();

    // score
    this.scoreText = game.add.text(442, 12, 'score: 0', {font: 'bold TheMinion', fontSize: '18px', fill: '#fff' }); 
    //this.fuelText = game.add.text(442, 40, 'Fuel:' + fuel, {font: 'bold TheMinion', fontSize: '18px', fill: '#fff' }); 
    //game.time.events.add(Phaser.Timer.SECOND * 3, this.createEnemyCars, this);

    //this.createFuelCar();
    

  },

  clickMe:function(){
    console.log('clicked'); 
    game.paused = false; 
    this.buttonPlay.visible = false;
  },

  createEnemyCars:function(){

    this.enemycarposX.push(240, 130, 347);
    this.enemycarposYIni.push(-600, -800);
    this.enemycarposY.push(390, 5); 

    for (var x=0; x < 2; x++)
    {
        //this.score = 0;
        var xvalue = this.enemycarposX[x+1]
        var yvalue = this.enemycarposY[x];

            console.log(yvalue);
        
            this.alien = this.enemycar.create(xvalue, yvalue, 'enemy');

            //alien.name = 'enemy' + x.toString() + y.toString();
            this.alien.body.setSize(56, 130, 0, 0);
            this.alien.checkWorldBounds = true;
            this.alien.events.onOutOfBounds.add(this.alienOut,this);  
            this.alien.body.velocity.y = 400; 
    }
  },

  alienOut : function(alien){ 
    
    xvalue = this.enemycarposX[game.rnd.integerInRange(0, 2)]; 
    yvalue = this.enemycarposY[game.rnd.integerInRange(0, 2)];
    //console.log(yvalue);
    alien.reset(xvalue, -141);
    alien.body.velocity.y = 400; 
    //console.log(this.score);
    
    // score count
    score += 1;
    this.scoreText.text = 'Score: ' + score;
    //this.fuelText.text = 'Fuel: ' + fuel;
  },

  update : function(){ 
        this.mycar.body.velocity.x = 0;

        this.background.tilePosition.y+=this.speed; 

        if(this.leftKey.isDown){   
            if(this.mycar.body.x > 120){ 
               this.mycar.body.velocity.x = -700;  
            }
        }

        if(this.rightKey.isDown){ 
            if(this.mycar.body.x < game.world.width-190){
              this.mycar.body.velocity.x = 700;
            }
        }

        if(this.speed<20){

            if(score == this.value*5){  
              this.speed = this.speed+2;
              this.value+=2;
              console.log(this.value);
              console.log(this.speed);

              this.speedText = game.add.text(game.world.centerX, 30, 'Speed Up', {font: 'bold TheMinion', fontSize: '24px', fill: '#fff' });
              this.speedText.anchor.setTo(0.5);
              this.game.time.events.add(Phaser.Timer.SECOND * 1, this.removeText, this);


              console.log('speed up');
              this.alien.body.velocity.y = 415; 
              fuel-=10;
            }
        }

        
        if(this.spaceKey.isDown){  
             
             //this.buttonPlay = game.add.button(game.world.centerX,100,"buttons", this.clickMe, this,70,0);
             //this.buttonPlay.anchor.set(0.5,0.5);
             if(game.paused){
              // Unpause the game
                game.paused = false 
             }else{
                game.paused = true; 
             }
        }

        game.physics.arcade.collide(this.mycar, this.enemycar, this.onCollission); 
        //game.physics.arcade.collide(this.fueltank, this.enemycar, this.selfCollission); 

        //game.physics.arcade.collide(this.mycar, this.fueltank, this.getFuel);
  },

  removeText:function(){
    this.speedText.destroy();
  },


  onCollission:function(){
       music.stop();
       music = game.add.audio('crash');
       music.loop = false;
       music.play();
       //game.time.events.add(Phaser.Timer.SECOND * 1, this.gameOver, this);
       

       //game.state.start("GameOver");

        this.gameOver = function(){
          game.state.start("GameOver");
        }

        game.time.events.add(Phaser.Timer.SECOND * 0.6, this.gameOver, this);


        //this.gameOver();
       
  }

    

   
};