var ProgressBar = require('progress');

var bar;


function init(ticks) {
	bar = new ProgressBar('[:bar] :current out of :total: (percent) :eta s', 
		{
			total: ticks, 
			clear: true,
			complete: '*',
			incomplete: ' ',
			width: 50
		});
}



function tick() {
	if (bar) bar.tick();
}




exports.tick = tick;
exports.init = init;