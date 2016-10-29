module.exports = function(app){
	app.get('/promocoes', function(req, res, next){
		var connection = app.dao.connectionFactory();
		var bookDao = new app.dao.BooksDAO(connection);

		bookDao.findAll(function(err, results){
			if(err) return next(err);
			res.format({
				html : function(){
					res.render('promocoes/form', {lista : results});
				},
				json : function(){
					res.json(results);
				}
			});
		});

		connection.end();
	});

	app.post('/promocoes', function(req, res, next){
		
		var connection = app.dao.connectionFactory();
		var bookDao = new app.dao.BooksDAO(connection);
		var bookId = req.body.livro.id;
		bookDao.findOne(bookId, function(err, results){
			if(err) {
				return next(err);
			}
			var book = results[0];
			console.log(results, book);
			app.get('io').emit('novaPromocao', { titulo : book.titulo});
			res.redirect('/promocoes');
		});

		connection.end();
		
	})
}