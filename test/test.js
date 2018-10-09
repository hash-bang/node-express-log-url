var expect = require('chai').expect;
var log = require('..');

describe('Simple tests', function() {

	it('should log basic messages', ()=> {
		log.log({method: 'GET', code: 200, path: '/', responseTime: 10});
		log.log({method: 'POST', code: 400, path: '/some/post', responseTime: 20, info: 'Lack of widgets', username: 'joerandom'});
	});

	it('should show variable time colors', ()=> {
		log.log({method: 'GET', code: 200, path: '/timing/none'});
		log.log({method: 'GET', code: 200, path: '/timing/short', responseTime: 50});
		log.log({method: 'GET', code: 200, path: '/timing/warn', responseTime: 3000});
		log.log({method: 'GET', code: 200, path: '/timing/danger', responseTime: 6000});
	});

});
