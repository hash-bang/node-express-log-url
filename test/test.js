var expect = require('chai').expect;
var log = require('..');

describe('Simple tests', function() {

	it('should log basic messages', ()=> {
		log.log({method: 'GET', code: 200, path: '/', responseTime: 10});
		log.log({method: 'POST', code: 400, path: '/some/post', responseTime: 20, info: 'Lack of widgets'});
	});

});
