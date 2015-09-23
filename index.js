var colors = require('chalk');

module.exports = function(req, res, finish) {
	var newEnd = res.end;
	req.requestTime = new Date;
	res.end = function() {
		res.responseTime = (new Date) - req.requestTime;
		res.end = newEnd;

		console.log(
			(
				req.method == 'GET' ? colors.green('GET ') :
				req.method == 'POST' ? colors.green.bgWhite('POST') :
				req.method == 'PUT' ? colors.green.bgWhite('PUT '):
				req.method == 'DELETE' ? colors.green.bgWhite('DELETE'):
				colors.green(req.method)
			) + ' ' +
			(
				res.statusCode >= 400 ? colors.red(res.statusCode) :
				colors.grey(res.statusCode)
			) + ' ' +
			req.url + ' ' +
			colors.grey(res.responseTime + 'ms')
		);

		res.end.apply(res, arguments);
	};
	finish();
};
