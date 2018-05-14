var keys;
var dataset = new Object();

var twKey = 'SLC9HUpOgyLIqCMZIbmYJzE8v';
var twSecret = 'nkImc6YlVKNww7T1wJbOzAavBycsBkoCXCYZOuUQleZLeaB9pR';

function setup(){
	noCanvas();
	let url = 'https://api.coinmarketcap.com/v2/ticker/?convert=BTC&limit=100';
	loadJSON(url, createDataset);
}

function createDataset(data){
	keys = Object.keys(data.data);

	for(let i=0;i<keys.length;i++){
		dataset[data.data[keys[i]].symbol] = data.data[keys[i]];
	}

	return dataset;
}

function getTweets(currencySymbol){
	//TODO
	//get number of tweets in [timespan]

	return tweets;
}

function evaluateTweets(tweets){


	return tweetsValue;
}

function getPriceUSD(currencySymbol){
	return dataset[currencySymbol].quotes.USD.price;
}

function getPriceBTC(currencySymbol){

	return dataset[currencySymbol].quotes.BTC.price;;
}

function getVolumeUSD(currencySymbol){

	return dataset[currencySymbol].quotes.USD.volume_24h;
}
function getVolumeBTC	(currencySymbol){

	return dataset[currencySymbol].quotes.BTC.volume_24h;
}

function compare(currencyCode, price, tweets){

}