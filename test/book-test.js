var express = require('../config/express')();
var request = require('supertest')(express);

describe('#BookController', function(){

	beforeEach(function(done){
		var conn = express.dao.connectionFactory();
		conn.query('delete from livros', function(ex, result){
			if(!ex) done();
		});
	});

	it('#Get all Books (json)', function(done){
		request.get('/produtos')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('#Create invalid book', function(done){
		request.post('/produtos')
			.send({titulo:'', descricao:'Livro Mocha'})
			.expect(400, done);
	})

	it('#Create valid book', function(done){
		request.post('/produtos')
			.send({titulo:'Mocha', descricao:'Livro Mocha', preco : 20.50})
			.expect(302, done);
	})
})