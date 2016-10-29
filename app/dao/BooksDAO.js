function BooksDAO(connection){
	this._connection = connection;
}

BooksDAO.prototype.findAll = function(cb){
	this._connection.query('select * from livros', cb);
}

BooksDAO.prototype.findOne = function(id, cb){
	this._connection.query('select * from livros where id = ?',[id], cb);
}


BooksDAO.prototype.save = function(item, cb){
	this._connection.query('insert into livros set ?', item, cb);
}

module.exports = function(){
	return BooksDAO;
}

