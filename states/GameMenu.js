var GameMenu = function() {};


GameMenu.prototype = {

  menuConfig: {
    startY: 260,
    startX: 30
  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Road Fighter", {
      font: 'bold 40pt TheMinion',
      fill: '#F23332',
      align: 'center'

    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  create: function () {

    if (music.name !== "dangerous" && this.playMusic) {
      music.stop();
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    }
    game.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'menu-bg');
    game.add.existing(this.titleText);

    this.addMenuOption('Start', function () { 
      game.state.start("Game");
      music.stop();
      music = game.add.audio('run');
      music.loop = true;
      music.play();

    });
    this.addMenuOption('Options', function () {
     //game.state.start("Options");
    });
    this.addMenuOption('About', function () {
      // game.state.start("About");
    });
  }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
