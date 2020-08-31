var Chalk = require('chalk');
var colors = Chalk;

var padEnd = function(input, len, padder) {
	if (!padder) padder = ' ';
	if (input.length < len) {
		return input + padder.repeat(len - input.length);
	} else {
		return input;
	}
};

module.exports = function(req, res, finish) {
	var newEnd = res.end;
	req.requestTime = new Date();
	var indent = req.app.get('log.indent') || '';
	var userFunc = req.app.get('log.username') || function(req) { return req.user ? `(@${req.user.username})` || `(${req.user.email})` : undefined };

	res.end = function() {
		res.end = newEnd;

		module.exports.log({
			indent: indent,
			method: req.method,
			code: res.statusCode,
			path: unescape(req.originalUrl),
			responseTime: Date.now() - req.requestTime.getTime(),
			info: res.errorBody ? res.errorBody.toString() : '',
			username: userFunc(req),
		});

		res.end.apply(res, arguments);
	};
	finish();
};

module.exports.colors = colors;

module.exports.logger = console.log;

module.exports.log = info => {
	module.exports.logger(
		(info.indent || '') +
		(
			info.method == 'GET' ? colors.green('GET  ') :
			info.method == 'POST' ? colors.blue.bold('POST ') :
			info.method == 'PUT' ? colors.blue.bold('PUT  '):
			info.method == 'DELETE' ? colors.blue.bold('DELETE'):
			info.method == 'PATCH' ? colors.blue.bold('PATCH') :
			colors.magenta(padEnd(info.method, 5))
		) + ' ' +
		(
			info.code >= 400 ? colors.red(info.code) :
			colors.grey(padEnd(info.code, 3))
		) + ' ' +
		(info.path ? info.path + ' ' : '') +
		(
			! info.responseTime ? ''
			: info.responseTime < 500 ? colors.grey(info.responseTime + 'ms')
			: info.responseTime < 5000 ? colors.yellow(info.responseTime + 'ms')
			: colors.red(info.responseTime + 'ms')
		) +
		(
			info.username ? ' ' + colors.grey(info.username)
			: ''
		) +
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
