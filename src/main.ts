/* WEBPACK LOADER */
declare var require: any;
var styles = require('./css/app.css');

import Game from './engine/game';
import MyScene from './engine/myscene';


function setup() {
	let scene = new MyScene()
	scene.initAwaitScreen();

	// ['./sprites/']
	
	Game.getInstance().runWithSence(scene);
}


function preloadimage(src: string) {
	let image = new Image()
	image.src = src;
}

window.onload = () => {
	setup();
}