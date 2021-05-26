/* WEBPACK LOADER */
declare var require: any;
var styles = require('./css/app.css');

import Game from './engine/game';
import Scene from './engine/scene';
import Rectangle from './engine/subject/rect';
import { v2, size } from './engine/utils';
import Label from './engine/subject/label';
import Action from './engine/action/action';
import Sequence from './engine/action/sequence';

var game: Game;

function setup() {
	game = Game.getInstance();

	let screenSize = game.getCanvas();

	let scene = new Scene();

	let rectSize = size(100,100);
	let rect = new Rectangle(rectSize);
	rect.setPosition(v2(screenSize.width/2 - rectSize.width/2, screenSize.height/2 - rectSize.height/2));
	
	let jumpAction = Action.jumpBy(v2(0, -200), 2);
	let moveAction = Action.moveBy(v2(0, -200), 0.5);
	rect.addAction(new Sequence(jumpAction, moveAction));

	let hello = new Label("Hello World");
	hello.setPosition(rect.getPosition().plus(v2(-48, 200)));
	hello.setColor('red');
	
	scene.add(rect);
	scene.add(hello);

	game.runWithSence(scene);
}


window.onload = () => {
	setup();
}