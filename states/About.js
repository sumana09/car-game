var About = function(game){};

About.prototype = {



// Add Menu options
addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: '#F23332', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, 400, text, optionStyle);
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


// initialise heading text
	init:function(){
		

	},

	
	create : function(){
		game.add.sprite(0, 0, 'menu-bg');

		var titleStyle = { font: 'bold 40pt TheMinion', fill: '#F23332', align: 'center'};
		var intStyle = { font: '18pt TheMinion', fill: '#F23332', align: 'center'};

		var text = game.add.text(game.world.centerX, 100, "About", titleStyle);
	    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
	    text.anchor.set(0.5);

	    var intText = game.add.text(game.world.centerX, 200, "Developed By", intStyle);
	    var intText2 = game.add.text(game.world.centerX, 240, "Sumana Banerjee", intStyle);
		  var intText3 = game.add.text(game.world.centerX, 300, "Technology Used", intStyle);
      var intText4 = game.add.text(game.world.centerX, 340, "Phaser.JS", intStyle);
		intText.anchor.set(0.5);
		intText2.anchor.set(0.5);
		intText3.anchor.set(0.5);
    intText4.anchor.set(0.5);

		this.addMenuOption('Back To Main Menu', function (e) {
			game.state.start("GameMenu");
    	}); 

	},



	
}