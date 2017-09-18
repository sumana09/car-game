var GameOptions = function(game){};

GameOptions.prototype = {


// initialise heading text
	init:function(){
		this.titleText = this.game.add.text(game.world.centerX, 200, 'Options', {color:'#fff'});
		this.titleText.anchor.setTo(0.5);

	},


	create : function(){

	}


}