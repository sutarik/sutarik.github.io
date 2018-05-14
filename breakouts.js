const binance = require('node-binance-api');

binance.options({
  APIKEY: 'tvRUcuB4JonQcCDDOQrLTDzmW2i1e7iVRGSHo4rFJu5zgGK90Z3qqxbWqHvejL67',
  APISECRET: 'RtrR8YSiUd8cBJ1capFBxeKajERhOqRhu0h4FkMXVU51aujZWuL6pCqEbl6zP2SU',
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: false // If you want to use sandbox mode where orders are simulated
});

binance.candlesticks("BNBBTC", "1d", (error, ticks, symbol) => {
  //console.log("candlesticks()", ticks);
  let last_tick = ticks[ticks.length - 1];
  let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
  console.log(symbol+" last tick: "+last_tick);
});