var colors = require('chalk');

var padEnd = function(input, len, padder) {
	if (!padder) padder = ' ';
	if (input.length < len) {
		return padder.repeat(len - input.length);
	} else {
		return input;
	}
};

module.exports = function(req, res, finish) {
	var newEnd = res.end;
	req.requestTime = new Date;
	var indent = req.app.get('log.indent') || '';
	res.end = function() {
		res.responseTime = (new Date) - req.requestTime;
		res.end = newEnd;

		module.exports.log({
			indent: indent,
			method: req.method,
			code: res.statusCode,
			path: req.originalUrl,
			response: res.responseTime,
			info: res.errorBody ? res.errorBody.toString() : '',
		});

		res.end.apply(res, arguments);
	};
	finish();
};

module.exports.log = info => {
	console.log(
		(info.indent || '') +
		(
			info.method == 'GET' ? colors.green('GET  ') :
			info.method == 'POST' ? colors.blue.bold('POST ') :
			info.method == 'PUT' ? colors.blue.bold('PUT  '):
			info.method == 'DELETE' ? colors.blue.bold('DELETE'):
			info.method == 'PATCH' ? colors.blue.bold('PATCH') :
			colors.green(padEnd(info.method, 5))
		) + ' ' +
		(
			info.code >= 400 ? colors.red(info.code) :
			colors.grey(padEnd(info.code, 3))
		) + ' ' +
		(info.path ? info.path + ' ' : '') +
		(info.responseTime ? colors.grey(info.responseTime + 'ms') : '' ) +
		(info.info ? colors.grey(' (' + info.info + ')') : '')
	);
};

module.exports.socket = function() {
	var action;

	switch (this.event) {
		case 'connect':
		case 'disconnect':
		case 'disconnecting':
			action = colors.grey(this.event);
			break;
		default:
			action = this.event || 'UNKNOWN EVENT';
	}

	console.log(colors.green('SOCK '), action, colors.grey('(' + this.socket.id + ')'));
};
