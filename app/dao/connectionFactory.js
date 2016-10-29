var mysql = require('mysql');

var connectMYSQL = function (){
	if(!process.env.NODE_ENV){
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'Eeasdmp01',
			database : 'backoffice'
		});
	} else if(process.env.NODE_ENV === 'test'){
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'Eeasdmp01',
			database : 'backoffice_test'
		});
	}
}		

//Wrapper Connection
module.exports = function(){
	return connectMYSQL;
}