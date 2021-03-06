var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu','states/GameMenu.js');
    game.load.script('game', 'states/Game.js');
    game.load.script('gameover','states/GameOver.js');
    game.load.script('GameOptions', 'states/GameOptions.js');
    game.load.script('About', 'states/About.js');
  },

  loadBgm: function () {
    // thanks Kevin Macleod at http://incompetech.com/
    game.load.audio('dangerous', 'assets/bgm/menu.mp3');
    game.load.audio('run', 'assets/bgm/run.mp3');
    game.load.audio('crash', 'assets/bgm/car-crash.mp3');


  },
  
  loadImages: function () {
    game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    game.load.image('options-bg', 'assets/images/options-bg.jpg');
    game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
    game.load.image('road-bg', 'assets/images/new-bg.png');
    game.load.image('mycar', 'assets/images/mycar.png');
    game.load.spritesheet('buttons', 'assets/images/buttonsprite.png',119,35);
    game.load.image('enemy', 'assets/images/enemycar.png');
    game.load.image('fueltank', 'assets/images/fueltank.png');
    game.load.spritesheet('enemycarsprite', 'assets/images/oponent-cars.png', 64,124,4);
  },


  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion'],
        urls: ['assets/style/theminion.css']
      }
    }
  },

  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    //this.logo       = game.make.sprite(game.world.centerX, 120, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: '#ED372A'});
    utils.centerGameObjects([this.status]);

  },

  preload: function () {
    game.add.sprite(0, 0, 'splashbg');
    //game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();

  },

  addGameStates: function () {

    game.state.add("GameMenu",GameMenu);
    game.state.add("Game",Game);
    game.state.add("GameOver",GameOver); 
    game.state.add("GameOptions",GameOptions); 
    game.state.add("About",About); 
  },

  addGameMusic: function () {
    music = game.add.audio('dangerous');
    music.loop = true;
    music.play();
  },

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();

    setTimeout(function () {
      game.state.start("GameMenu");
    }, 1000);
  }
};
