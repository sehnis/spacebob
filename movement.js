window.onload = function() {
	// GET CANVAS
	var canvas = document.getElementById("gamewindow");
	var ctx = canvas.getContext("2d");
	ctx.font = "15px Arial";
	// SPRITE VARIABLES
	var col_x = 150;
	var track_y = 125;
	var arrow_box_x = 130;
	var arrow_box_y = 500;
	var track = 1;
	var arrow = 0;
	var arrow_type = "none"
	var press_down = false;
	// CREATE SPRITE
	var sprite = new Image();
	sprite.src="img/jump.png";
	sprite.onload=function() {
		ctx.drawImage(bars,0,100);
		ctx.drawImage(sprite, col_x, track_y);
		ctx.drawImage(none_arrow,arrow_box_x,arrow_box_y);
	}
	// SETUP IMAGES
	var up_arrow = new Image();
	up_arrow.src="img/upw.png";
	var down_arrow = new Image();
	down_arrow.src="img/downw.png";
	var none_arrow = new Image();
	none_arrow.src="img/nonew.png";
	var bars = new Image();
	bars.src="img/barstoo.png";
	var badship = new Image();
	badship.src="img/tinybad.png";
	var goodship = new Image();
	goodship.src="img/goodship.png";
	var beatmarker = new Image();
	beatmarker.src="img/beatmarker.png";
	// MOVE SPRITE DEPENDING ON ARROW
	function move_sprite() {
		if(arrow_type == "up") { // UP
			if(track > 0) {
				track -= 1;
				track_y -= 50;
			}
		}
		if(arrow_type == "down") { // DOWN
			if(track < 7) {
				track += 1;
				track_y += 50;
			}
		}
		// RESET DRAWN OBJECTS
		canvas.width = canvas.width;
		document.getElementById("track_h").innerHTML = track;
		ctx.drawImage(bars,0,100);
		ctx.drawImage(sprite,col_x,track_y);
		ctx.drawImage(none_arrow,550,500);
		arrow_type = "none"
	}
	function dynamic_arrow() {
		if(arrow_type == "up") {
			ctx.drawImage(up_arrow,arrow_box_x,arrow_box_y);
		}
		if(arrow_type == "down") {
			ctx.drawImage(down_arrow,arrow_box_x,arrow_box_y);
		}
		if(arrow_type == "none") {
			ctx.drawImage(none_arrow,arrow_box_x,arrow_box_y);
		}
	}
	// UPDATE PRESS AND ARROW TYPE
	function handle_key(arrow) {

		if(press_down) {
			return;
		}

		if(arrow == 38) { // UP
			if(track != 0) {
				arrow_type = "up";
				ctx.drawImage(up_arrow,arrow_box_x,arrow_box_y);
				press_down = true;
			}
		} 

		if(arrow == 40) { // DOWN
			if(track < 7) {
				arrow_type = "down";
				ctx.drawImage(down_arrow,arrow_box_x,arrow_box_y);
				press_down = true;
			}
		}
	}
	// HANDLE KEY PRESS
	document.onkeydown = function(e) {
		arrow = window.event ? e.keyCode : e.which;
		handle_key(arrow);
	}
	// RESET WHEN KEY IS RELEASED
	document.onkeyup = function(e) {
		press_down = false;
	}

	var bpm_interval = 600;
	var squid_x1 = 1200;
	var squid_x2 = 1800;
	var squid_x3 = 2400;
	var squid_x4 = 3000;
	var squid_y1 = 75;
	var squid_y2 = 125;
	var squid_y3 = 225;
	var squid_y4 = 275;
	var mtx1 = 1200;
	var mty = 400;
	var mtx2 = 1750;
	var mtx3 = 2300;
	var mtx4 = 2800;
	var clx1 = 1200;
	var clx2 = 2200;
	var cly = 125;
	var goodx = col_x;
	var goody = track_y;
	var indy_y = arrow_box_y;
	var indy_x1 = 1200;
	var indy_x2 = 1400;
	var indy_x3 = 1600;
	var indy_x4 = 1800;
	var indy_x5 = 2000;
	var indy_x6 = 2200;



	function run_movement() {
		// RESET CANVAS
			ctx.clearRect(0, 0, canvas.width, canvas.height);	
			// SKY + BARS
		ctx.drawImage(bars,0,100);
		//SQUIDS
		ctx.drawImage(badship, squid_x1, squid_y1);
		ctx.drawImage(badship, squid_x2, squid_y2);
		ctx.drawImage(badship, squid_x3, squid_y3);
		ctx.drawImage(badship, squid_x4, squid_y4);

		if(squid_x1 < -300) {
			squid_x1 = 1200;
		} else {
			squid_x1 -= 10;
		}if(squid_x2 < -300) {
			squid_x2 = 1200;
		} else {
			squid_x2 -= 10;
		}if(squid_x3 < -300) {
			squid_x3 = 1200;
		} else {
			squid_x3 -= 10;
		}if(squid_x4 < -300) {
			squid_x4 = 1200;
		} else {
			squid_x4 -= 10;
		}
		// ARROWS
		dynamic_arrow();
		// PLAYER
		ctx.drawImage(goodship, col_x, track_y);
		// BEAT INDICATOR
		ctx.drawImage(beatmarker, indy_x1, indy_y);
		ctx.drawImage(beatmarker, indy_x2, indy_y);
		ctx.drawImage(beatmarker, indy_x3, indy_y);
		ctx.drawImage(beatmarker, indy_x4, indy_y);
		ctx.drawImage(beatmarker, indy_x5, indy_y);
		ctx.drawImage(beatmarker, indy_x6, indy_y);
		if(indy_x1 < -300) {
			indy_x1 = 1200;
		} else {
			indy_x1 -= 10;
		}if(indy_x2 < -300) {
			indy_x2 = 1200;
		} else {
			indy_x2 -= 10;
		}if(indy_x3 < -300) {
			indy_x3 = 1200;
		} else {
			indy_x3 -= 10;
		}if(indy_x4 < -300) {
			indy_x4 = 1200;
		} else {
			indy_x4 -= 10;
		}if(indy_x5 < -300) {
			indy_x5 = 1200;
		} else {
			indy_x5 -= 10;
		}if(indy_x6 < -300) {
			indy_x6 = 1200;
		} else {
			indy_x6 -= 10;
		}


		requestAnimationFrame(run_movement);

	}



	// PLAYS THE GAME
	setInterval(move_sprite, bpm_interval);
	requestAnimationFrame(run_movement);

}
