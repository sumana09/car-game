var Game = function(game) {};

Game.prototype = {

// Preload 
  preload: function () {

    // Initialisation of variables

    this.optionCount = 1;
    this.speed = 10;
    this.background;
    this.leftKey;
    this.rightKey;
    this.spaceKey;
    this.upKey; 
    this.enemycarposX = [];
    this.enemycarposY = []; 
    this.enemycarposYIni = [];
    this.value = 2;
    this.velocityCounter = 2;
    this.fueltank,
    this.speedText,
    this.enemycarVelocity = [];
    this.oponentcar;
    this.xvalueIndex = game.rnd.integerInRange(0, 2);
    this.increaseVelocity = 430;
    //this.currentspeed = 420
    this.currentspeed = [];

    //this.game.paused = true;
  },

  // Menu options 
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


// Create function
  create: function () { 

    //  Register the keys.
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

     //  Stop the following keys from propagating up to the browser
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);

    // Road Background
    this.background = game.add.tileSprite(0,0,546,game.world.height,'road-bg');

    // My Car 
    this.mycar = game.add.tileSprite(236,game.world.height-150,62,124, 'mycar');

    // Add physics to my car
    game.physics.enable(this.mycar,Phaser.Physics.ARCADE);

    // Set custom size for my car
    this.mycar.body.setSize(50, 110, 0, 0);

    // Add oponent cars to the group enemycar
    this.enemycar = game.add.group();
    this.enemycar.enableBody = true; 

    // Add physics to enemycar group
    this.enemycar.PhysicsBodyType = Phaser.Physics.ARCADE; 
  
    // create oponent cars
    this.createEnemyCars();

    
    // Set random speed for oponent cars
    this.enemycarVelocity.push(500,530,400,600);

    //this.currentspeed.push(600,530,550);

    // score
    this.scoreText = game.add.text(440, 12, 'score: 0', {font: 'bold TheMinion', fontSize: '18px', fill: '#fff' }); 
    this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
  },



  // Game Loop
  update : function(){ 

        // Default velocity of my car set to 0
        this.mycar.body.velocity.x = 0;

        // The initial speed of background movement
        this.background.tilePosition.y+=this.speed; 

        // Action for left key press -- move my car to left
        if(this.leftKey.isDown){   
            if(this.mycar.body.x >149){ 
               this.mycar.body.velocity.x = -400;  
            }
        }

        // Action for right key press -- move my car to right
        if(this.rightKey.isDown){ 
            if(this.mycar.body.x < game.world.width-215){
               //this.mycar.body.velocity.x = -50;  
               this.mycar.body.velocity.x = 400; 
               //this.mycar.body.x += 100;

               game.add.tween(this.mycar).to({x:100}, 500, Phaser.linear);
               
               //game.add.tween(this.mycar.body).to({x:313}, 150, Phaser.linear, true);
            }
        }

        // Check speed increase limit
        if(this.speed<20){

            // Speed up condition based on score
            if(score == this.value*5){  
              this.speed = this.speed+2;
              this.value+=2;

              this.speedText = game.add.text(game.world.centerX, 50, 'Speed Up', {font: 'bold TheMinion', fontSize: '26px', fill: '#E93B15' });
              this.speedText.anchor.setTo(0.5);
              this.speedText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
              this.game.time.events.add(Phaser.Timer.SECOND * 1, this.removeText, this);
            }
        }

        // Pause game on Space key down
        if(this.spaceKey.isDown){  
             game.paused = true; 
             this.buttonPlay = game.add.button(game.world.centerX,100,"buttons", this.clickMe, this,70,0);
             this.buttonPlay.anchor.set(0.5,0.5); 
        }

        if(score == this.velocityCounter*5){  

            //this.increaseVelocity = this.currentspeed + 60;

            for(i=0; i<3 ; i++){
              this.enemycarVelocity[i]+=20;
              //console.log(this.enemycarVelocity[i]);
            }

            //this.currentspeed+=70;
            // this.oponentcar.body.velocity.y = this.currentspeed;
            this.velocityCounter+=2;
            //console.log(this.currentspeed);
        } 

       

        // Check collission between my car and oponent car groups and call function - onCollission.
        game.physics.arcade.collide(this.mycar, this.enemycar, this.onCollission); 

        // Check overlap between oponent cars and call function selfCollission
        game.physics.arcade.collide(this.enemycar, this.enemycar, this.selfCollission, null, this); 


  },




  // Function for start button while game is in pause state
  clickMe:function(){
   // console.log('clicked'); 
    game.paused = false; 
    this.buttonPlay.visible = false;
  },

  // Creation of oponent car groups
  createEnemyCars:function(){

    // Oponent cars initial position x and y
    this.enemycarposX.push(236, 156, 316, 236, 156); 
    this.enemycarposY.push(game.world.height-200, 5); 

    //this.enemycarposY.push(100, 500); 

    // Loop for creating each oponent car
    for (var x=0; x < 2; x++)
    {
        // Get initial value of x position of oponent car
        var xvalue = this.enemycarposX[x+1]

        // Get initial value of y position of oponent car
        var yvalue = this.enemycarposY[x];

            // Add spritesheet enemycarsprite
            this.oponentcar = game.add.sprite(xvalue, yvalue, 'enemycarsprite');

            // Add spritesheet to the oponent group
            this.enemycar.add(this.oponentcar);

            // Get random value of sprite frame bewteen 0 to 3
            this.frame = game.rnd.integerInRange(0, 3);

            // set the sprite frame for the sprite group
            this.oponentcar.frame = this.frame;

            // Set the size of the oponent car 
            this.oponentcar.body.setSize(55, 110, 0, 0);

            // Restrict the game world bound
            this.oponentcar.checkWorldBounds = true;

            // Creat new oponent car while another is out of game world
            this.oponentcar.events.onOutOfBounds.add(this.alienOut,this); 

            // initial velocity of the oponent cars
            this.oponentcar.body.velocity.y = 400; 
    }


  },

  // Add oponent cars to the top 
  alienOut : function(oCar){ 
    
    //console.log('again');
    xvalue = this.enemycarposX[this.xvalueIndex]; 

    //console.log(this.xvalueIndex);

    oCar.reset(xvalue, -124);
    //console.log(yvalue);
    
    this.currentspeed = this.enemycarVelocity[Math.floor(Math.random() * 3)];
    
    oCar.body.velocity.y = this.currentspeed;
    this.frame = game.rnd.integerInRange(0, 3);
    oCar.frame = this.frame; 
    
    // score count
    score += 1;
    this.scoreText.text = 'Score: ' + score;

    if(this.xvalueIndex <= 2){
      this.xvalueIndex+=1;
    }else{
      this.xvalueIndex-=2;
    }
    
  },

  selfCollission : function(carsNew){
     //console.log('overlap');  
  },

  // Remove Speed Up Text
  removeText:function(){
    this.speedText.destroy();
  },

  // Collission   
  onCollission:function(){

       // Stop the running music loop
       music.stop();

       // Add the car crash sound 
       music = game.add.audio('crash');
       music.loop = false;
       music.play();

       // Change the state to GameOver
      this.gameOver = function(){
        game.state.start("GameOver");
      }

      // Call the function gameOver after few seconds of the collission.
      game.time.events.add(Phaser.Timer.SECOND * 0.6, this.gameOver, this);
  }

};