module.exports = function(app){
	app.get('/produtos', function(req, res, next){

		var connection = app.dao.connectionFactory();
		var bookDao = new app.dao.BooksDAO(connection);

		bookDao.findAll(function(err, results){
			if(err){
				return next(err);
			}
			res.format({
				html : function(){
					res.render('produtos/lista', {books : results});
				},
				json : function(){
					res.json(results);
				}
			});
		});

		connection.end();
	});

	app.get('/produtos/form', function(req, res){
		res.render('produtos/form', {
				err :{},
				produto: {}});
	});

	app.post('/produtos', function(req, res, next){

		var book = req.body;

		req.assert('titulo', 'Field Required').notEmpty();
		req.assert('preco', 'Float Required').isFloat();

		var err = req.validationErrors();
		if(err){
			res.format({
				html : function(){
					res.status(400).render('produtos/form', {
						err : err, 
						produto: book});
					},
				json : function(){
					res.status(400).json(err);
				}
			});
			return;
		}

		var connection = app.dao.connectionFactory();
		var bookDao = new app.dao.BooksDAO(connection);

		bookDao.save(book, function(err, results){
			if(err){
				return next(err);
			}
			res.redirect('/produtos');
		});

		connection.end();

	})
}