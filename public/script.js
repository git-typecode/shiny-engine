function start() {
console.log('onload: ',new Date());
  init();
  loadData();
  createChart();
};
var options = '';
function init() {
console.log('init: ',new Date());

	options = {
    chart: {
        type: 'line',
        width: 800
    },

    title: {
        text: 'ESTL METAR vinddata'
    },

    subtitle: {
        text: 'Source: https://aro.lfv.se/'
    },

    yAxis: {
    //opposite: true,
        title: {
            text: 'Vind in Knots'
        }
        
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    
    xAxis: {
    type: 'datetime',
			dateTimeLabelFormats: {
			hour: '%H:%M',
			//hour: '%H' //:%M'
		}},

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            
        }
    },

    series: [{
        name: 'Vind',
        data: [],
        //pointStart: Date.UTC(1511099882000),
        pointInterval: 1800 * 1000 // 30min
        
    }],


};
};

//var data = jQuery.getJSON('/data')

//data.responseJSON.forEach(function(data, index) {
//options.series[0].data[index] = data;
//});

function loadData() {

jQuery.getJSON({
	url: '/data',
	data: 'data' }, function(data, status, xhr) {
		if('success') {
			data.forEach(function(data, index) {
			options.series[0].data[index] = data;
			});
			//console.log(data);
		}
		else {
			console.log('Error: could not get data!')
		}
});

};

function createChart() {
	Highcharts.chart('container', options);
console.log('createChart:', new Date());
};
