/* WEBPACK LOADER */
declare var require: any;
var styles = require('./css/app.css');

import ImageLoading from './Game1/ImageLoading';
import { CONSTANT } from './Game1/CONSTANT';
import GameController from './Engine1/GameController/GameController';
import GameplayScene from './Game1/Scenes/GameplayScene';


function setup(): void {
	let canvas = <HTMLCanvasElement>document.getElementById('canvas');
	canvas.width = 288;
	canvas.height = 512;

	let gameController = GameController.getInstance();
	let gamePlay = GameplayScene.create();
	gameController.runWithScene(gamePlay);
	gameController.start();

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

preloadingimage();
window.onload = () => {
	setup();
}