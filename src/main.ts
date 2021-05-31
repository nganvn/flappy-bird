/* WEBPACK LOADER */
declare var require: any;
var styles = require('./css/app.css');

import Game from './engine/game';
import MyScene from './engine/myscene';
import ImageLoading from './engine/imageloading';
import { CONSTANT } from './engine/constant';


function setup(): void {
	// preloading image
	preloadingimage();

	let game = Game.getInstance();

	let scene = new MyScene()
	scene.initAwaitScreen();

	game.runWithSence(scene);
}

function preloadingimage() {
	let imageLoading = ImageLoading.getInstance();
	imageLoading.push(CONSTANT.BACKGROUND, './sprites/background-night.png');
	imageLoading.push(CONSTANT.GROUND, './sprites/base.png');
	imageLoading.push(CONSTANT.BLUEBIRD, './sprites/bluebird-midflap.png');
	imageLoading.push(CONSTANT.BLUEBIRDFRAME + '0', './sprites/bluebird-upflap.png');
	imageLoading.push(CONSTANT.BLUEBIRDFRAME + '1', './sprites/bluebird-midflap.png');
	imageLoading.push(CONSTANT.BLUEBIRDFRAME + '2', './sprites/bluebird-downflap.png');

	imageLoading.push(CONSTANT.GREENPIPEDOWN, './sprites/pipe-green-down.png');
	imageLoading.push(CONSTANT.GREENPIPEUP, './sprites/pipe-green-up.png');
	imageLoading.push(CONSTANT.CLOUD, './sprites/cloud.png');
}

window.onload = () => {
	setup();
}