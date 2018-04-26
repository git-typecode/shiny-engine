//const https = require('https');
var datastore = require('@google-cloud/datastore')({
  projectId: 'flighttracker-f9127',
  keyFilename: 'service-account-flighttracker.json'
});
const ejs = require('ejs');
const express = require('express')
const app = express()

  const estlQuery = datastore.createQuery('METAR')
  .filter('CCCC', '=', 'ESTL')
  .order('obsTimeunix', {
  descending: true})
  .limit(6);
  
    const estaQuery = datastore.createQuery('METAR')
  .filter('CCCC', '=', 'ESTA')
  .order('obsTimeunix', {
  descending: true})
  .limit(6);
  
    const esmkQuery = datastore.createQuery('METAR')
  .filter('CCCC', '=', 'ESMK')
  .order('obsTimeunix', {
  descending: true})
  .limit(6);
  
    const esmsQuery = datastore.createQuery('METAR')
  .filter('CCCC', '=', 'ESMS')
  .order('obsTimeunix', {
  descending: true})
  .limit(6);
  
//var google = require('googleapis');
// The kind for the new entity
const kind = 'METAR';
// The name/ID for the new entity
//const name = '';
// The Cloud Datastore key for the new entity
//var taskKey = datastore.key([kind]);
var path = require('path');
var metarsArray = [];
var metarsArray2 = [];
var data = [];

//var metars = [];
//var bodyParser = require('body-parser')
//var Highcharts = require('highcharts', function(){
	// Load module after Highcharts is loaded
//	require('highcharts/modules/exporting')(Highcharts);
//});

var vindDirection = -1;


var metarQuery = datastore.createQuery('METAR').limit(24).order('obsTimeunix', {descending: true});
//var metarQueryData = datastore.createQuery('METAR').limit(10).order('obsTimeunix', {descending: false});
	const query4 = datastore.createQuery('METAR')
	//.groupBy('CCCC')
	.select(['CCCC', 'obsTime' ,'rawMetar'])
	//.limit(9)
	//.groupBy('CCCC')
	.order('obsTimeunix', {
		descending: true
	}).limit(24);


/*
var getMetar = function(req, res, next) {
  datastore.runQuery(metarQuery).then((results) => {metars = results[0];console.log('METAR:');metars.forEach((metar) => console.log(metar.rawMetar));})
  next();
};
*/


/*
var createChartData = function(req, res, next) {

  console.log('Time:', Date.now())
 
 metars.forEach(function(metar, index) {
  var vind = metar.vindSpeed;
  var obstime = metar.obsTimeunix;
  var metarData = [];

  metarData[0] = obstime;
  metarData[1] = vind;
  data[index] = metarData

 // console.log("METAR DATA: ", metars.length, data)
});
	//metars = [];
  next();
};
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//app.use(bodyParser.json());
//app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')));
//app.use(getMetar);
//app.use(createChartData);

//res.status(200).send('Hello test-apps!');
//var logger = function(req, res, next) {
//  console.log('Logging ...');
//  next();
//};

//app.use(logger);
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next();
})

app.use('/getmetars', function (req, res, next) {
  console.log('Request Type:', res)
  //getMetars();
  var estlMetars = [];
  var estaMetars = [];
  var esmkMetars = [];
  var esmsMetars = [];
  	
  datastore.runQuery(estlQuery)
  .then((results) => {
	
  // Task entities found.
  var metars = results[0];
  
  console.log('METARs: ESTL');
  metars.forEach((metar) => 
  //console.log(metar)
  estlMetars.push(metar)
  )
  metarsArray[0] = estlMetars;
  //console.log(metarsArray);
  });
  
  datastore.runQuery(estaQuery)
  .then((results) => {
  // Task entities found.
  var metars = results[0];
  console.log('METARs: ESTA');
  metars.forEach((metar) => 
  //console.log(metar)
  estaMetars.push(metar)
  )
  metarsArray[1] = estaMetars;
  //console.log(metarsArray);
  });
  
  datastore.runQuery(esmkQuery)
  .then((results) => {
  // Task entities found.
  var metars = results[0];
  console.log('METARs: ESMK');
  metars.forEach((metar) => 
  //console.log(metar)
  esmkMetars.push(metar)
  )
  metarsArray[2] = esmkMetars;
  //console.log(metarsArray);
  });
  
  datastore.runQuery(esmsQuery)
  .then((results) => {
  // Task entities found.
  var metars = results[0];
  console.log('METARs: ESMS');
  metars.forEach((metar) => 
  //console.log(metar)
  esmsMetars.push(metar)
  )
  metarsArray[3] = esmsMetars;

  });
  //console.log(metarsArray);
    
  next();
});

app.use('/skanemetars', function(req, res, next) {

	
  var estlMetars = [];
  var estaMetars = [];
  var esmkMetars = [];
  var esmsMetars = [];
  	
  datastore.runQuery(estlQuery)
  .then((results) => {
	
  // Task entities found.
  var metars = results[0];
  
  console.log('METARs: ESTL');
  metars.forEach((metar) => 
  //console.log(metar)
  estlMetars.push(metar)
  )
  metarsArray[0] = estlMetars;
  //console.log(metarsArray);
  });
  
  datastore.runQuery(estaQuery)
  .then((results) => {
  // Task entities found.
  var metars = results[0];
  console.log('METARs: ESTA');
  metars.forEach((metar) => 
  //console.log(metar)
  estaMetars.push(metar)
  )
  metarsArray[1] = estaMetars;
  //console.log(metarsArray);
  });
  
  datastore.runQuery(esmkQuery)
  .then((results) => {
  // Task entities found.
  var metars = results[0];
  console.log('METARs: ESMK');
  metars.forEach((metar) => 
  //console.log(metar)
  esmkMetars.push(metar)
  )
  metarsArray[2] = esmkMetars;
  //console.log(metarsArray);
  });
  
  datastore.runQuery(esmsQuery)
  .then((results) => {
  // Task entities found.
  var metars = results[0];
  console.log('METARs: ESMS');
  metars.forEach((metar) => 
  //console.log(metar)
  esmsMetars.push(metar)
  )
  metarsArray[3] = esmsMetars;

  });
  next();
});



//app.use('/skanemetars', function(req, res, next) {
	
//	metarsArray2 = [];
//	var metars = [];
	
//	datastore.runQuery(query4).then((results) => {
	

    // Task entities found.
//    metars = results[0];
	
//    console.log('METARs:');
	
//    metars.forEach(function(metar, index) {
	//console.log(metar)
	//metarsArray.push(metar)
//	metarsArray2.push(metar);
	
//	})
	//console.log(metarsArray);
	
  
//  })
  //getMetars();
//  next();
//});




app.use('/data',function(req, res, next) {
  //datastore.runQuery(metarQueryData).then((results) => {metarsData = results[0];console.log('METAR:');metarsData.forEach((metar) => console.log(metar.rawMetar));})
//datastore.runQuery(metarQuery).then((results) => {metars = results[0];console.log('METAR:');metars.forEach((metar) => console.log(metar.rawMetar));})

 // console.log('Time:', Date.now())
var metarData = [];
	data = [];
var metars = [];
 
datastore.runQuery(metarQuery).then((results) => {
	// Task entities found.
    metars = results[0];
	
 metars.forEach(function(metar, index) {
	var vind = metar.vindSpeed;
	var obstime = metar.obsTimeunix;
		

		metarData[0] = obstime;
		metarData[1] = vind;
		data[index] = metarData;

//  console.log("METAR DATA: ", metars.length, data)
})
console.log(data);
	next();
})
});
//app.get('/metar', function(req, res){
//  res.status(200).send('hello world');
//});

app.get('/skanemetars', function(req, res){
//  datastore.runQuery(metarQuery).then((results) => {metars = results[0];console.log('METAR:');metars.forEach((metar) => console.log(metar.rawMetar));})
//  datastore.runQuery(metarQuery).then((results) => {metars = results[0];console.log('METAR:');metars.forEach((metar) => console.log(metar.rawMetar));})
  
  res.status(200).render('index', {
	//chartData:chartData,
    metars:metarsArray
  });
});


app.get('/data', function(req, res) {
//  datastore.runQuery(metarQueryData).then((results) => {metarsData = results[0];console.log('METAR:');metarsData.forEach((metar) => console.log(metar.rawMetar));})

  res.status(200).send(data.reverse())
 // console.log(data);
});

app.get('/getmetars', function(req, res) {
//  datastore.runQuery(metarQueryData).then((results) => {metarsData = results[0];console.log('METAR:');metarsData.forEach((metar) => console.log(metar.rawMetar));})
  res.status(200).send(metarsArray);
  //metarsArray = [];
  //res.status(200).send(data.reverse())
 // console.log(data);
});


var server = app.listen(process.env.PORT || '8080', function() {
  console.log('Ready');
//  datastore.runQuery(metarQuery).then((results) => {metars = results[0];console.log('METAR:');metars.forEach((metar) => console.log(metar.rawMetar));})
});
