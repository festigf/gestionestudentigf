var express = require('express');
var mysql = require('mysql');
const util = require('util');
var sConnection={host: 'localhost',port: 3306, user: 'root',password: 'root',database: 'dbstudenti',multipleStatements: true};
var app = express();
app.use(express.static('.')); // Consente modalità "static"
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*'); //'http://localhost:8888');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});


//#region METODI GET	

		app.get("/listStudenti",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT Matricola, Nome, Cognome, Email, Comune_nascita, Telefono, Id_laurea, DATE_FORMAT(Data_nascita, '%d-%m-%Y') AS Data_nascita FROM studente;";	
					connection.query(sQuery,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/GetStudenti",function(req,res){
			var connection = mysql.createConnection(sConnection);
			connection.connect(function(err){
				if (!err){
					var sQuery="call dbstudenti.getDataStudenti(?,?, @nRows, @nPages); select @nRows as nRows, @nPages as nPages ";	
					var data=[];
					data.push(req.query.pageIndex);
					data.push(req.query.pageSize);
					
					
					connection.query(sQuery,data,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						//res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})
		

		app.get("/listDipartimenti",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT * FROM Dipartimento;";	
					connection.query(sQuery,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/listDocenti",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT * FROM docente;";	
					connection.query(sQuery,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/listDocentiParz",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT Id, concat(nome, ' ',cognome) as Nome FROM docente;";	
					connection.query(sQuery,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/listCorsiLaurea",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT * FROM corsolaurea;";	
					connection.query(sQuery,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/listCorsi",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT * from TuttiCorsi;";	
					connection.query(sQuery,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/listEsamiStudente",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT * from EsamiStudente WHERE Matricola = ?;";	
					var data=[];
					data.push(req.query.Matricola);
					connection.query(sQuery,data,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/listLingue",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT * FROM lingua WHERE nome LIKE ? AND Id NOT in (Select Id_lingua from conoscenzalingua Where Matricola_studente = ?);";	
					var data=[];
					data.push(req.query.Stringa);
					data.push(req.query.Matricola);
					connection.query(sQuery,data,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/listEsami",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT * FROM corso WHERE (titolo LIKE ? OR Sigla like ?) AND (Sigla NOT in (Select Sigla_corso from esame Where Matricola_studente = ?));";	
					var data=[];
					data.push(req.query.Stringa);
					data.push(req.query.Stringa);
					data.push(req.query.Matricola);
					connection.query(sQuery,data,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/listScuole",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT * FROM scuola;";	
					connection.query(sQuery,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/listTitoliStudio",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT titolostudio.*,nome,cognome FROM titolostudio,studente WHERE studente.matricola = titolostudio.Matricola_studente;";	
					connection.query(sQuery,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/listConoscenzaLingue",function(req,res){
			connection= mysql.createConnection(sConnection)	;
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT Nome,conoscenzalingua.* FROM conoscenzalingua,lingua WHERE lingua.Id = conoscenzalingua.Id_lingua AND Matricola_studente = ?;";	
					var data=[];
					data.push(req.query.Matricola);
					connection.query(sQuery,data,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		app.get("/MostraTuttoStudente",function(req,res){
			connection= mysql.createConnection(sConnection);
			connection.connect(function(err){
				if (!err){
					var sQuery="SELECT Matricola, studente.Nome, Cognome, Email, Comune_nascita, Telefono, DATE_FORMAT(Data_nascita, '%d-%m-%Y') AS Data_nascita, corsolaurea.Nome AS NomeCorsoLaurea, titolostudio.Voto As VotoScuolaSuperiore, scuola.Nome As NomeScuola, scuola.citta As CittaScuola, scuola.Titolo As Inidirizzo FROM corsolaurea, studente LEFT JOIN  titolostudio ON studente.Matricola = titolostudio.Matricola_studente left JOIN scuola ON scuola.Id = titolostudio.Id_scuola WHERE  corsolaurea.Id = studente.Id_laurea AND Matricola = ?;";
					var data=[];
					data.push(req.query.Matricola);	
					connection.query(sQuery,data,function(err,rows,fileds){
					if (err) 
						res.sendStatus(500); //Internal Server Error
						else
						res.setHeader('Access-Control-Allow-Origin','*');
						res.json(rows); //resituisce tutti i records in formato json
					})
				}
			})
		})

		

//#endregion
  
//#region METODI DELETE

		app.delete('/delStudente', function(req, res) {
			console.log("delStudente");
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){ // callback
			if(!err) {
			var sQuery="delete from studente where matricola=?;";
			var data=[];
			data.push(req.query.matricola);
			console.log(req.query.matricola);
			console.log(data[0]);
			connection.query(sQuery, data, function(err, rows, fields) {
						console.log("err");
						console.log(err);
						
				if (err) 
				res.sendStatus(500); //Internal Server Error
						else if (rows.affectedRows==0){
							console.log("affectedRows");

							res.sendStatus(401); //non ha trovato lo studente
						}
				else   {
							console.log("Cancellato");
							res.status(200).send({status: 200, Message: "Del OK" }); // Studente cancellato con successo!
						}
			}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});

		app.delete('/delDocente', function(req, res) {
			console.log("delDocente");
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){ // callback
			if(!err) {
			var sQuery="delete from docente where id=?;";
			var data=[];
			data.push(req.query.Id);
			console.log(req.query.Id);
			console.log(data[0]);
			connection.query(sQuery, data, function(err, rows, fields) {
						console.log("err");
						console.log(err);
						
				if (err) 
				res.sendStatus(500); //Internal Server Error
						else if (rows.affectedRows==0){
							console.log("affectedRows");

							res.sendStatus(401); //non ha trovato lo studente
						}
				else   {
							console.log("Cancellato");
							res.status(200).send({status: 200, Message: "Del OK" }); 
						}
			}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});

		app.delete('/delDipartimento', function(req, res) {
			console.log("delDipartimento");
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){ // callback
			if(!err) {
			var sQuery="delete from dipartimento where id=?;";
			var data=[];
			data.push(req.query.Id);
			console.log(req.query.Id);
			console.log(data[0]);
			connection.query(sQuery, data, function(err, rows, fields) {
						console.log("err");
						console.log(err);
						
				if (err) 
				res.sendStatus(500); //Internal Server Error
						else if (rows.affectedRows==0){
							console.log("affectedRows");

							res.sendStatus(401); //non ha trovato lo studente
						}
				else   {
							console.log("Cancellato");
							res.status(200).send({status: 200, Message: "Del OK" }); 
						}
			}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});

		app.delete('/delScuola', function(req, res) {
			console.log("delScuola");
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){ // callback
			if(!err) {
			var sQuery="delete from scuola where id=?;";
			var data=[];
			data.push(req.query.Id);
			console.log(req.query.Id);
			console.log(data[0]);
			connection.query(sQuery, data, function(err, rows, fields) {
						console.log("err");
						console.log(err);
						
				if (err) 
				res.sendStatus(500); //Internal Server Error
						else if (rows.affectedRows==0){
							console.log("affectedRows");

							res.sendStatus(401); //non ha trovato lo studente
						}
				else   {
							console.log("Cancellato");
							res.status(200).send({status: 200, Message: "Del OK" }); 
						}
			}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});

		app.delete('/delLingua', function(req, res) {
			console.log("delLingua");
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){ // callback
			if(!err) {
			var sQuery="delete from conoscenzalingua where Matricola_studente=? AND Id_lingua = ?;";
			var data=[];
			data.push(req.query.Matricola);
			data.push(req.query.Id_lingua);
			console.log(sQuery);
			console.log(data);
			connection.query(sQuery, data, function(err, rows, fields) {		
				if (err) 
				res.sendStatus(500); //Internal Server Error
						else if (rows.affectedRows==0){

							res.sendStatus(401); //non ha trovato lo studente
						}
				else   {
							console.log("Cancellato");
							res.status(200).send({status: 200, Message: "Del OK" }); 
						}
			}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});

		app.delete('/delEsame', function(req, res) {
			console.log("delEsame");
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){ // callback
			if(!err) {
			var sQuery="delete from esame where Matricola_studente= ? AND Sigla_corso = ?;";
			var data=[];
			data.push(req.query.Matricola);
			data.push(req.query.Sigla);
			console.log(sQuery);
			console.log(data);
			connection.query(sQuery, data, function(err, rows, fields) {		
				if (err) 
				res.sendStatus(500); //Internal Server Error
						else if (rows.affectedRows==0){

							res.sendStatus(401); //non ha trovato lo studente
						}
				else   {
							console.log("Cancellato");
							res.status(200).send({status: 200, Message: "Del OK" }); 
						}
			}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});

		app.delete('/delCorso', function(req, res) {
			console.log("delCorso");
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){ // callback
			if(!err) {
			var sQuery="delete from corso where Sigla=?;";
			var data=[];
			data.push(req.query.Sigla);
			console.log(sQuery);
			console.log(data);
			connection.query(sQuery, data, function(err, rows, fields) {		
				if (err) 
				res.sendStatus(500); //Internal Server Error
						else if (rows.affectedRows==0){

							res.sendStatus(401); //non ha trovato lo studente
						}
				else   {
							console.log("Cancellato");
							res.status(200).send({status: 200, Message: "Del OK" }); 
						}
			}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});


//#endregion

//#region  METODI PUT

		app.put('/ModStudente', function(req, res){
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){
			if(!err) {
				var sQuery="UPDATE studente SET Nome = ?, Cognome = ?, Email = ?, Data_nascita = ?, Comune_nascita = ?, Telefono = ?, Id_laurea = ? WHERE Matricola = ?;";
				var data = [];
				data.push(req.query.Nome);
				data.push(req.query.Cognome);
				data.push(req.query.Email);
				data.push(req.query.Data_nascita);
				data.push(req.query.Comune_nascita);
				data.push(req.query.Telefono);
				data.push(req.query.Id_laurea);
				data.push(req.query.Matricola);
				connection.query(sQuery, data, function(err, rows, fields) {
					if (err) 
					{	console.log(err);
						res.sendStatus(500); //Internal Server Error
					}
					else if (rows.affectedRows==0)
					{
						var sQuery2="INSERT INTO Studente(Nome, Cognome, Email, Data_nascita, Comune_nascita, Telefono, Id_laurea, Matricola) VALUES(?,?,?,?,?,?,?,?)";
						connection.query(sQuery2, data, function(err, rows, fields) {
							if (err) 
							{
								console.log(err);
								res.sendStatus(500); //Internal Server Error
							}						
							else   
							//res.status(200).send({ status:200, Message: "Ins OK" });
							res.status(200).send({ 
								status:  200, 
								Message: "Ins OK",
								data: 	 req.query  
							});
							//	res.sendStatus(200)
						});
					}
					else   
					{
						//res.sendStatus(200)
						res.status(200).send({ 
								status:  200, 
								Message: "Mod OK",
								data:    req.query   
							});
					}
				}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});

		app.put('/ModDipartimento', function(req, res){
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){
			if(!err) {
				var sQuery="UPDATE dipartimento SET Nome = ? WHERE Id = ?;";
				var data = [];
				data.push(req.query.Nome);
				data.push(req.query.Id);
				connection.query(sQuery, data, function(err, rows, fields) {
					if (err) 
					{	console.log(err);
						res.sendStatus(500); //Internal Server Error
					}
					else if (rows.affectedRows==0)
					{
						var sQuery2="INSERT INTO Dipartimento(Nome, Id) VALUES(?,?)";
						connection.query(sQuery2, data, function(err, rows, fields) {
							if (err) 
							{
								console.log(err);
								res.sendStatus(500); //Internal Server Error
							}						
							else   
							//res.status(200).send({ status:200, Message: "Ins OK" });
							res.status(200).send({ 
								status:  200, 
								Message: "Ins OK",
								data: 	 req.query  
							});
							//	res.sendStatus(200)
						});
					}
					else   
					{
						//res.sendStatus(200)
						res.status(200).send({ 
								status:  200, 
								Message: "Mod OK",
								data:    req.query   
							});
					}
				}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});

		app.put('/ModDocente', function(req, res){
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){
			if(!err) {
				var sQuery="UPDATE docente SET Nome = ?, Cognome = ?, Email = ? WHERE Id = ?;";
				var data = [];
				data.push(req.query.Nome);
				data.push(req.query.Cognome);
				data.push(req.query.Email);
				data.push(req.query.Id);
				connection.query(sQuery, data, function(err, rows, fields) {
					if (err) 
					{	console.log(err);
						res.sendStatus(500); //Internal Server Error
					}
					else if (rows.affectedRows==0)
					{
						var sQuery2="INSERT INTO Docente(Nome,Cognome,Email, Id) VALUES(?,?,?,?)";
						connection.query(sQuery2, data, function(err, rows, fields) {
							if (err) 
							{
								console.log(err);
								res.sendStatus(500); //Internal Server Error
							}						
							else   
							//res.status(200).send({ status:200, Message: "Ins OK" });
							res.status(200).send({ 
								status:  200, 
								Message: "Ins OK",
								data: 	 req.query  
							});
							//	res.sendStatus(200)
						});
					}
					else   
					{
						//res.sendStatus(200)
						res.status(200).send({ 
								status:  200, 
								Message: "Mod OK",
								data:    req.query   
							});
					}
				}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});

		app.put('/ModScuola', function(req, res){
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){
			if(!err) {
				var sQuery="UPDATE scuola SET Nome = ?, Citta = ?, Titolo = ? WHERE Id = ?;";
				var data = [];
				data.push(req.query.Nome);
				data.push(req.query.Citta);
				data.push(req.query.Titolo);
				data.push(req.query.Id);
				connection.query(sQuery, data, function(err, rows, fields) {
					if (err) 
					{	console.log(err);
						res.sendStatus(500); //Internal Server Error
					}
					else if (rows.affectedRows==0)
					{
						var sQuery2="INSERT INTO scuola(Nome, Citta, Titolo, Id) VALUES(?,?,?,?)";
						connection.query(sQuery2, data, function(err, rows, fields) {
							if (err) 
							{
								console.log(err);
								res.sendStatus(500); //Internal Server Error
							}						
							else   
							//res.status(200).send({ status:200, Message: "Ins OK" });
							res.status(200).send({ 
								status:  200, 
								Message: "Ins OK",
								data: 	 req.query  
							});
							//	res.sendStatus(200)
						});
					}
					else   
					{
						//res.sendStatus(200)
						res.status(200).send({ 
								status:  200, 
								Message: "Mod OK",
								data:    req.query   
							});
					}
				}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});

		app.put('/ModCorso', function(req, res){
			connection = mysql.createConnection(sConnection);
			connection.connect(function(err){
			if(!err) {
				var sQuery="UPDATE Corso SET Titolo = ?, Id_docente = ?, Ssd = ?, Cfu = ? WHERE Sigla = ?;";
				var data = [];
				data.push(req.query.Titolo);
				data.push(req.query.Id_docente);
				data.push(req.query.Ssd);
				data.push(req.query.Cfu);
				data.push(req.query.Sigla);
				connection.query(sQuery, data, function(err, rows, fields) {
					if (err) 
					{	console.log(err);
						res.sendStatus(500); //Internal Server Error
					}
					else if (rows.affectedRows==0)
					{
						var sQuery2="INSERT INTO Corso(Titolo,Id_docente,Ssd, Cfu,Sigla) VALUES(?,?,?,?,?)";
						connection.query(sQuery2, data, function(err, rows, fields) {
							if (err) 
							{
								console.log(err);
								res.sendStatus(500); //Internal Server Error
							}						
							else   
							//res.status(200).send({ status:200, Message: "Ins OK" });
							res.status(200).send({ 
								status:  200, 
								Message: "Ins OK",
								data: 	 req.query  
							});
							//	res.sendStatus(200)
						});
					}
					else   
					{
						//res.sendStatus(200)
						res.status(200).send({ 
								status:  200, 
								Message: "Mod OK",
								data:    req.query   
							});
					}
				}); 
			} else {
			console.log("Error connecting database ... ");    
			res.sendStatus(500); //Internal Server Error
			}
		});
		});

//#endregion

app.put('/InsLingua', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
	if(!err) {
		var sQuery="INSERT INTO conoscenzalingua(Matricola_studente, Id_lingua, Scritto, Orale) VALUES(?,?,?,?)";
		console.log(sQuery);
		var data = [];
		data.push(req.query.Matricola);
		data.push(req.query.Id_lingua);
		data.push(req.query.Scritto);
		data.push(req.query.Orale);
		console.log(sQuery);
		console.log(data);
		connection.query(sQuery, data, function(err, rows, fields) {
			if (err) 
			{
				console.log(err);
				res.sendStatus(500); //Internal Server Error
			}						
			else   
			//res.status(200).send({ status:200, Message: "Ins OK" });
				res.status(200).send({ 
					status:  200, 
					Message: "Ins OK",
					data: 	 req.query  
			});
		})
	}
})
});

app.put('/InsEsame', function(req, res){
	connection = mysql.createConnection(sConnection);
	connection.connect(function(err){
	if(!err) {
		var currentTime = new Date();
		var sQuery="INSERT INTO esame(Matricola_studente, Sigla_corso, Anno, Voto) VALUES(?,?,?,?)";
		console.log(sQuery);
		var data = [];
		data.push(req.query.Matricola);
		data.push(req.query.Sigla);
		data.push(year = currentTime.getFullYear());
		data.push(req.query.Voto);
		console.log(sQuery);
		console.log(data);
		connection.query(sQuery, data, function(err, rows, fields) {
			if (err) 
			{
				console.log(err);
				res.sendStatus(500); //Internal Server Error
			}						
			else   
			//res.status(200).send({ status:200, Message: "Ins OK" });
				res.status(200).send({ 
					status:  200, 
					Message: "Ins OK",
					data: 	 req.query  
			});
		})
	}
})
});


app.listen(3000);
console.log("------------ Servizi GET Attivi: ------------------");
console.log("http://localhost:3000/listStudenti");
console.log("http://localhost:3000/listDocenti");
console.log("http://localhost:3000/listDipartimenti");
console.log("http://localhost:3000/listCorsiLaurea");
console.log("http://localhost:3000/listCorsi");
console.log("http://localhost:3000/listEsamiStudenti");
console.log("http://localhost:3000/listLingue");
console.log("http://localhost:3000/listScuole");
console.log("http://localhost:3000/listConoscenzaLingue");
console.log("http://localhost:3000/listTitoliStudio");
console.log("http://localhost:3000/GetStudenti");
