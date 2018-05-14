console.log('Bot is working');

var Twit = require('twit');
var config = require('./config');
const binance = require('node-binance-api');


var spam = ['discount', '000%'];
var keywords = ['$BTC', '$ETH']
var counter = 0;

var T = new Twit(config);

binance.options({
  APIKEY: 'tvRUcuB4JonQcCDDOQrLTDzmW2i1e7iVRGSHo4rFJu5zgGK90Z3qqxbWqHvejL67',
  APISECRET: 'RtrR8YSiUd8cBJ1capFBxeKajERhOqRhu0h4FkMXVU51aujZWuL6pCqEbl6zP2SU',
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: false // If you want to use sandbox mode where orders are simulated
});

var params = { track: '$ETH,$BTC,$LTC,$BAX,$EOS' };	

//T.get('search/tweets', params, gotData);

/*
var stream = T.stream('statuses/filter', params);

stream.on('tweet', gotData);

function gotData(data){
	var tweet = data.text.toLowerCase();
	console.log('hashtags: '+ data.entities.hashtags.toString());
	console.log('symbols:' + data.entities.symbols);
}

*/


var user;

//Coin signal bot
//user = '909009874498940928';

// me
user = '1520198065';

// metis
//user = '914663684928139264'

var params = { follow: user };
var stream = T.stream('statuses/filter', params);

stream.on('tweet', gotData);

console.log(binance.balance());
openOrder('one','two', 'three');

binance.candlesticks("BNBBTC", "1d", (error, ticks, symbol) => {
  //console.log("candlesticks()", ticks);
  let last_tick = ticks[ticks.length - 1];
  let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
  console.log(symbol+" last tick: "+last_tick);
});

function gotData(data){
	//console.log(data);
	var tweetText;
	if(data.extended_tweet){
		tweetText = data.extended_tweet.full_text;
	}else{
		tweetText = data.text;
	}

	console.log(tweetText);
	// check if it's update or not

	analyzeTweet(tweetText);	
}

function analyzeTweet(tweetText){
	var symbol = tweetText.split(' ')[0].toUpperCase();

	if(symbol[0] == '$'){
		console.log(symbol);
		symbol = symbol.substring(1);
		checkBinance(symbol);
	}else{
		console.log('just an update - no action');
	}
}

function openOrder(symbol,price,quantity){

	console.log('opening order');
    //binance.buy(symbol+"BTC", quantity, price*0.5);
/*
    binance.buy(symbol+'BTC', quantity, price, {type:'LIMIT'}, (error, response) => {
  		console.log("Limit Buy response", response);
  		console.log("order id: " + response.orderId);
	});*/

	quantity = 1, price = 0.00001;
	binance.buy("BNBBTC", quantity, price, {type:'LIMIT'}, (error, response) => {
  		console.log("Limit Buy response", response);
  		console.log("order id: " + response.orderId);
  		//console.log(error);
	});
}

function checkBinance(symbol){
	binance.prices((error, ticker) => {
  		//console.log("prices()", ticker);
  		//console.log("Price of BTC: ", ticker.BTCUSDT);
  		var keys = Object.keys(ticker);

  		for(let i=0;i<keys.length;i++){
  			if(keys[i] == symbol+'BTC'){
  				console.log('$'+symbol+' is trading on Binance! :)');
  				getBalance(symbol,ticker[keys[i]]);
  				//console.log('available BTC balance: '+bal)
  				return;
  			}
  		}

  		console.log('$'+symbol+' is NOT trading on Binance! :(')
	});

}

function getPriceTweet(symbol){

}

function getPriceBinance(symbol){
	symbol = symbol.substring(1).toUpperCase();

	binance.prices(symbol+'BTC', (error, ticker) => {
  		console.log('Price of '+symbol+': ', ticker[symbol+'BTC']);
	});
}

function getBalance(symbol, price){
	console.log('currency: '+symbol+', price: '+price);
	binance.balance((error, balances) => {
	  var btcBalance = balances['BTC'].available;
	  if(btcBalance > price){
	  	let quantity = btcBalance / price;
	  	openOrder(symbol, price, quantity);
	  }else{
	  	console.log('unsufficent funds :(');
	  }
	});
}