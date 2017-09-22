var GameOver = function(game) {};

GameOver.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: '#F23332', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 360, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#BB3A31";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "#F23332";
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
    game.add.sprite(0, 0, 'menu-bg');
    var titleStyle = { font: 'bold 40pt TheMinion', fill: '#F23332', align: 'center'};
    //console.log(score);
    this.scoreText = game.add.text(game.world.centerX, 300, 'score:', {font: 'bold 60pt TheMinion', fontSize: '40px', fill: '#F23332' });
    this.scoreText.text = 'Score: ' + score;
    this.scoreText.anchor.setTo(0.5);

   

    if(score > highScore){
        highScore = score;
    }
    
    // Store
    localStorage.setItem("high", highScore);
    this.highscoreText = game.add.text(game.world.centerX, 370, 'High Score:', {font: 'bold 60pt TheMinion', fontSize: '40px', fill: '#F23332' });
    this.highscoreText.text = 'High Score: ' + localStorage.getItem("high");
    this.highscoreText.anchor.setTo(0.5);


    var text = game.add.text(game.world.centerX, 100, "Game Over", titleStyle);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    text.anchor.set(0.5);


    this.addMenuOption('Play Again', function (e) {
      this.game.state.start("Game");
      music = game.add.audio('run');
      music.loop = true;
      music.play();
      score = 0;
    });
    this.addMenuOption('Main Menu', function (e) {

      this.game.state.start("GameMenu");
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
      score = 0;
    
    }); 
  }
};