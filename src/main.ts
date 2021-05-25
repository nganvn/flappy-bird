/* WEBPACK LOADER */
declare var require: any;
var styles = require('./css/app.css');

import Game from './engine/game';
import Scene from './engine/scene';
import Rectangle from './engine/subject/rect';
import { v2, size } from './engine/ultis';
import Label from './engine/subject/label';

var game: Game;

function setup() {

	game = Game.getInstance();
	let screenSize = game.getCanvas();

	let scene = new Scene();

	let rectSize = size(100,100);
	let rect = new Rectangle(rectSize);
	rect.setPosition(v2(screenSize.width/2 - rectSize.width/2, screenSize.height/2 - rectSize.height/2));
	
	let hello = new Label("Hello World");
	hello.setPosition(rect.getPosition().plus(v2(-40, 200)));
	
	scene.add(rect);
	scene.add(hello);

	game.runWithSence(scene);
}


window.onload = () => {
	setup();
}