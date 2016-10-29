module.exports = function(app){
	app.get('/', function(req, res, next){

		var connection = app.dao.connectionFactory();
		var bookDao = new app.dao.BooksDAO(connection);

		bookDao.findAll(function(err, results){
			if(err){
				return next(err);
			}
			res.format({
				html : function(){
					res.render('home/index', {livros : results});
				},
				json : function(){
					res.json(results);
				}
			});
		});

		connection.end();
	});
}