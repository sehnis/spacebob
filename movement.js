window.onload = function() {
	play_game();
}
/*
function cutscene() {
	var canvas = document.getElementById("gamewindow");
	var ctx = canvas.getContext("2d");
	var cut_time = 0;
	var col_x = 1200;
	var track_y = 125;
	var goodship = new Image();
	goodship.src="img/goodship.png";
	var bob = new Image();
	bob.src="img/jump.png";
	var letterbox = new Image();
	letterbox.src="img/letterbox.png";

	function run_cutscene() {
		requestAnimationFrame(run_cutscene);
	}

	requestAnimationFrame(run_cutscene);

}
*/

function play_game() {
	// GET CANVAS
	var canvas = document.getElementById("gamewindow");
	var ctx = canvas.getContext("2d");
	ctx.font = "15px Arial";
	// AUDIO
	var audio = new Audio('audio/fullAudio.mp3');
	audio.play();
	var failAudio = new Audio('audio/epicFail.mp3');
	var failPlayed = false;	
	// SPRITE VARIABLES
	var col_x = 150;
	var track_y = 125;
	var arrow_box_x = 130;
	var arrow_box_y = 500;
	var track = 1;
	var tick_count = 0;
	var tick_mod = 10;	
	var steps = 0;
	var arrow = 0;
	var arrow_type = "none";
	var press_down = false;
	var lives = 3;
	var button_pressed = false;
	var moved_this_turn = false;
	var range_good = false;
	// CREATE SPRITE
	var sprite = new Image();
	sprite.src="img/jump.png";
	sprite.onload=function() {
		ctx.drawImage(bars,0,100);
		ctx.drawImage(goodship, col_x, track_y);
		ctx.drawImage(none_arrow,arrow_box_x,arrow_box_y);
	}
	// SETUP IMAGES
	var up_arrow = new Image();
	up_arrow.src="img/upw.png";
	var squid = new Image();
	squid.src="img/squid.png";
	var down_arrow = new Image();
	down_arrow.src="img/downw.png";
	var none_arrow = new Image();
	none_arrow.src="img/nonew.png";
	var bars = new Image();
	bars.src="img/blank.png";
	var badship = new Image();
	badship.src="img/tinybad.png";
	var goodship = new Image();
	goodship.src="img/goodship.png";
	var beatmarker = new Image();
	beatmarker.src="img/beatmarker.png";
	var stars = new Image();
	stars.src="img/stars.png";
	var beatspecial = new Image();
	beatspecial.src="img/beatspecial.png";
	var heart_empty = new Image();
	heart_empty.src="img/heartred_empty.png";
	var heart_full = new Image();
	heart_full.src="img/heartred_full.png";
	var game_overlay = new Image();
	game_overlay.src="img/game_overlay.png";
	// MOVE SPRITE DEPENDING ON ARROW
	function move_sprite() {
		if(arrow_type == "up") { // UP
			if(track > 0) {
				track -= 1;
				track_y -= 50;
				ctx.drawImage(up_arrow,arrow_box_x,arrow_box_y);
			}
		}
		if(arrow_type == "down") { // DOWN
			if(track < 7) {
				track += 1;
				track_y += 50;
				ctx.drawImage(down_arrow,arrow_box_x,arrow_box_y);	
			}
		}
		// RESET DRAWN OBJECTS
		//canvas.width = canvas.width;
		document.getElementById("track_h").innerHTML = "Incremented steps: " + steps;
		//ctx.drawImage(none_arrow,550,500);
		arrow_type = "none"
	}

	function dynamic_arrow() {
		ctx.drawImage(none_arrow,arrow_box_x,arrow_box_y);
		
	}
	// UPDATE PRESS AND ARROW TYPE
	function handle_key(arrow) {

		range_good = if_in_range();
		current_range = tick_count % tick_mod;

		if(press_down) {
			return;
		}

		if(arrow == 38) { // UP
			if(track != 0 && range_good) {
				button_pressed = true;
				arrow_type = "up";
				//ctx.drawImage(up_arrow,arrow_box_x,arrow_box_y);
				press_down = true;
			}
		} 

		if(arrow == 40) { // DOWN
			if(track < 7 && range_good) {
				button_pressed = true;
				arrow_type = "down";
				//ctx.drawImage(down_arrow,arrow_box_x,arrow_box_y);
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

	var bpm_interval = 285;
	var hit_factor = 15;
	var hit_window = bpm_interval / hit_factor;
	var right_edge = 1200;

	var squid_x1 = randomIntFromInterval(1200,3000);
	var squid_x2 = randomIntFromInterval(1200,3000);
	var squid_x3 = randomIntFromInterval(1200,3000);
	var squid_x4 = randomIntFromInterval(1200,3000);
	var squid_x5 = randomIntFromInterval(1200,3000);
	var squid_x6 = randomIntFromInterval(1200,3000);
	var squid_x7 = randomIntFromInterval(1200,3000);
	var squid_x8 = randomIntFromInterval(1200,3000);
	var squid_y1 = 75;
	var squid_y2 = 125;
	var squid_y3 = 175;
	var squid_y4 = 225;
	var squid_y5 = 275;
	var squid_y6 = 325;
	var squid_y7 = 375;
	var squid_y8 = 425;
	var goodx = col_x;
	var goody = track_y;
	var indy_y = arrow_box_y;
	var indy_x1 = 1200;
	var indy_x2 = 1450;
	var indy_x3 = 1700;
	var indy_x4 = 1950;
	var indy_x5 = 2200;
	var indy_x6 = 2450;
	var starx1 = 0;
	var starx2 = 1200;
	var heart_one = heart_full;
	var heart_two = heart_full;
	var heart_three = heart_full;
	var heart_height = 8;
	var okay_range = 5;

	var object_speed = 14;
	var loop_counts = 0;
	var variant_range = 60;

	var hit = false;
	var track0_hit = false;
	var track1_hit = false;
	var track2_hit = false;
	var track3_hit = false;
	var track4_hit = false;
	var track5_hit = false;
	var track6_hit = false;
	var track7_hit = false;

	var track0_scored = false;
	var track1_scored = false;
	var track2_scored = false;
	var track3_scored = false;
	var track4_scored = false;
	var track5_scored = false;
	var track6_scored = false;
	var track7_scored = false;

	function randomIntFromInterval(min,max)
	{
		return Math.floor(Math.random()*(max-min)+min)
	}

	function run_movement() {
		// RESET CANVAS
		ctx.clearRect(0, 0, canvas.width, canvas.height);	
		// SKY + BARS
		ctx.drawImage(stars,starx1,0);
		ctx.drawImage(stars,starx2,0);
		if(starx1 < -right_edge) {
			starx1 = right_edge;
		} else {
			starx1 -= 4;
		}if(starx2 < -right_edge) {
			starx2 = right_edge;
		} else {
			starx2 -= 4;
		}
		ctx.drawImage(bars,0,100);
		//SQUIDS
		ctx.drawImage(badship, squid_x1, squid_y1);
		ctx.drawImage(badship, squid_x2, squid_y2);
		ctx.drawImage(badship, squid_x3, squid_y3);
		ctx.drawImage(badship, squid_x4, squid_y4);
		ctx.drawImage(badship, squid_x5, squid_y5);
		ctx.drawImage(badship, squid_x6, squid_y6);
		ctx.drawImage(badship, squid_x7, squid_y7);
		ctx.drawImage(badship, squid_x8, squid_y8);

		if(squid_x1 < -300) {
			squid_x1 = randomIntFromInterval(1200,2000);
			track0_hit = false;
			track0_scored = false;
		} else {
			squid_x1 -= object_speed;
		}if(squid_x2 < -300) {
			squid_x2 = randomIntFromInterval(1200,2000);
			track1_hit = false;
			track1_scored = false;
		} else {
			squid_x2 -= object_speed;
		}if(squid_x3 < -300) {
			squid_x3 = randomIntFromInterval(1200,2000);
			track2_hit = false;
			track2_scored = false;
		} else {
			squid_x3 -= object_speed;
		}if(squid_x4 < -300) {
			squid_x4 = randomIntFromInterval(1200,2000);
			track3_hit = false;
			track3_scored = false;
		} else {
			squid_x4 -= object_speed;
		}if(squid_x5 < -300) {
			squid_x5 = randomIntFromInterval(1200,2000);
			track4_hit = false;
			track4_scored = false;
		} else {
			squid_x5 -= object_speed;
		}if(squid_x6 < -300) {
			squid_x6 = randomIntFromInterval(1200,2000);
			track5_hit = false;
			track5_scored = false;
		} else {
			squid_x6 -= object_speed;
		}if(squid_x7 < -300) {
			squid_x7 = randomIntFromInterval(1200,2000);
			track6_hit = false;
			track6_scored = false;
		} else {
			squid_x7 -= object_speed;
		}if(squid_x8 < -300) {
			squid_x8 = randomIntFromInterval(1200,2000);
			track7_hit = false;
			track7_scored = false;
		} else {
			squid_x8 -= object_speed;
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
		ctx.drawImage(beatspecial, indy_x6, indy_y);
		if(indy_x1 < -300) {
			indy_x1 = right_edge;
		} else {
			indy_x1 -= object_speed;
		}if(indy_x2 < -300) {
			indy_x2 = right_edge;
		} else {
			indy_x2 -= object_speed;
		}if(indy_x3 < -300) {
			indy_x3 = right_edge;
		} else {
			indy_x3 -= object_speed;
		}if(indy_x4 < -300) {
			indy_x4 = right_edge;
		} else {
			indy_x4 -= object_speed;
		}if(indy_x5 < -300) {
			indy_x5 = right_edge;
		} else {
			indy_x5 -= object_speed;
		}if(indy_x6 < -300) {
			indy_x6 = right_edge;
		} else {
			indy_x6 -= object_speed;
		}
		// SCORE
		detect_hit();
		drawScore();
		drawLives();
		drawHearts();
		hit = false;


		steps += 1;
		//document.getElementById("track_h2").innerHTML = "rAF steps: " + steps;
		okay_range = 1;

		if (if_in_range()) {
			ctx.drawImage(squid, 900, track_y);
			loop_counts += 1;
			if (button_pressed && !moved_this_turn) {
				moved_this_turn = true;
				move_sprite();
			}
		}


		moved_this_turn = false;


		if (lives == 0) {
			game_over();
			lives = 0;
			audio.pause();
			if (!failPlayed) {
				failAudio.play();
			}
			failPlayed = true;
		}

		requestAnimationFrame(run_movement);

	}

	var score = 0;
	function drawScore() {
		ctx.font = "20px Arial";
		ctx.fillStyle = "white";
    	ctx.fillText("Score: "+score, 8, 20);
	}

	function drawLives() {
		ctx.font = "20px Arial";
		ctx.fillStyle = "white";
    	ctx.fillText("Lives: ", 975, 25);
	}
	function detect_hit() {
		if (squid_x1 < (col_x + 44)) {
			if (squid_y1 == track_y && !track0_hit) {
				hit = true;
				track0_hit = true;
			} else if (!game_is_over && !track0_scored) {
				score += 1;
				track0_scored = true;
				track0_hit = true;
			}
		} else if (squid_x2 < (col_x + 44)) {
			if (squid_y2 == track_y && !track1_hit) {
				hit = true;
				track1_hit = true;
			} else if (!game_is_over && !track1_scored) {
				score += 1;
				track1_scored = true;
				track1_hit = true;
			}
		} else if (squid_x3 < (col_x + 44)) {
			if (squid_y3 == track_y && !track2_hit) {
				hit = true;
				track2_hit = true;
			} else if (!game_is_over && !track2_scored) {
				score += 1;
				track2_scored = true;
				track2_hit = true;
			}
		} else if (squid_x4 < (col_x + 44)) {
			if (squid_y4 == track_y && !track3_hit) {
				hit = true;
				track3_hit = true;
			} else if (!game_is_over && !track3_scored) {
				score += 1;
				track3_scored = true;
				track3_hit = true;
			}
		} else if (squid_x5 < (col_x + 44)) {
			if (squid_y5 == track_y && !track4_hit) {
				hit = true;
				track4_hit = true;
			} else if (!game_is_over && !track4_scored) {
				score += 1;
				track4_scored = true;
				track4_hit = true;
			}
		} else if (squid_x6 < (col_x + 44)) {
			if (squid_y6 == track_y && !track5_hit) {
				hit = true;
				track5_hit = true;
			} else if (!game_is_over && !track5_scored) {
				score += 1;
				track5_scored = true;
				track5_hit = true;
			}
		} else if (squid_x7 < (col_x + 44)) {
			if (squid_y7 == track_y && !track6_hit) {
				hit = true;
				track6_hit = true;
			} else if (!game_is_over && !track6_scored) {
				score += 1;
				track6_scored = true;
				track6_hit = true;
			}
		} else if (squid_x8 < (col_x + 44)) {
			if (squid_y8 == track_y && !track7_hit) {
				hit = true;
				track7_hit = true;
			} else if (!game_is_over && !track7_scored) {
				score += 1;
				track7_scored = true;
				track7_hit = true;
			}
		}

		if(hit) {
			if (lives < 1) {
				return;
			}
			lives -= 1;
			hit = false;
		}	
	}

	function if_in_range() {
		if(Math.abs(indy_x1 - col_x) < variant_range) {
			return true;
		} else if(Math.abs(indy_x2 - col_x) < variant_range) {
			return true;
		} else if(Math.abs(indy_x3 - col_x) < variant_range) {
			return true;
		} else if(Math.abs(indy_x4 - col_x) < variant_range) {
			return true;
		} else if(Math.abs(indy_x5 - col_x) < variant_range) {
			return true;
		} else if(Math.abs(indy_x6 - col_x) < variant_range) {
			return true;
		}
	}

	function drawHearts() {
		if (lives == 2) {
			heart_one = heart_empty;
		} else if (lives == 1) {
			heart_two = heart_empty;
		} else if (lives == 0) {
			heart_three = heart_empty;
		}
		ctx.drawImage(heart_one, 1050, heart_height);
		ctx.drawImage(heart_two, 1100, heart_height);
		ctx.drawImage(heart_three, 1150, heart_height);


	}


	var game_is_over = false;
	function game_over() {
		ctx.font = "40px Arial";
		ctx.fillStyle = "white";
		ctx.drawImage(game_overlay, 0, 0);
    	game_is_over = true;
	}

	if (lives == 0) {
		game
	}

	// PLAYS THE GAME
	//setInterval(hit_or_miss, current_range);
	//setInterval(move_sprite, bpm_interval);
	requestAnimationFrame(run_movement);

}
