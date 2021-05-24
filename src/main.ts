/* WEBPACK LOADER */
declare var require: any;
var styles = require('./css/app.css');


function setup() {
	gameLoop();
}

function gameLoop() {
	// requestAnimationFrame(gameLoop);
  console.log("Hello, world!");
}

window.onload = () => {
	setup();
}