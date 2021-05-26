/* WEBPACK LOADER */
declare var require: any;
var styles = require('./css/app.css');

import Game from './engine/game';
import MyScene from './engine/myscene';


function setup() {
	let scene = new MyScene()
	scene.setup();
	
	Game.getInstance().runWithSence(scene);
}


window.onload = () => {
	setup();
}