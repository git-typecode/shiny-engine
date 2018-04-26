const datastore = require('@google-cloud/datastore')({
  projectId: 'flighttracker-f9127',
  keyFilename: 'service-account-flighttracker.json'
});
  
  var metarsArray = [];
  
const query = datastore.createQuery('METAR')
	//.groupBy('CCCC')
	.select(['CCCC', 'obsTime' ,'rawMetar'])
	.limit(9)
	.groupBy('CCCC')
	.order('obsTimeunix', {
		descending: true
	});
	
	const query4 = datastore.createQuery('METAR')
	//.groupBy('CCCC')
	.select(['CCCC', 'obsTime' ,'rawMetar'])
	//.limit(9)
	//.groupBy('CCCC')
	//.filter('CCCC', '=', 'ESTL')
	.order('obsTimeunix', {
		descending: true
	}).limit(24);
  
  const query2 = datastore.createQuery('METAR')
  .select(['CCCC', 'obsTime' ,'rawMetar'])
  .limit(6);
  
  const query5 = datastore.createQuery('METAR')
  .filter('CCCC', '=', 'ESTL')
  //.select(['CCCC', 'obsTime' ,'rawMetar'])
  .order('obsTimeunix', {
  descending: true})
  .limit(4);
  
  
  const groupby = datastore.createQuery('Task')
	.groupBy('category')
	.order('category')
	.order('priority');
  
  
datastore.runQuery(query5)
  .then((results) => {
    // Task entities found.
    const metars = results[0];
    console.log('METARs:');
    metars.forEach((metar) => 
	//console.log(metar)
	metarsArray.push(metar)
	
	)
	console.log(metarsArray)
  });