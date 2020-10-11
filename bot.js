
// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function() {
  var params = {
        q: '#DCvsMI',  
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
      if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function (err, response) {
                console.log(err,response);
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                  console.log('error ocurred');
                }
            });
        }
        // if unable to Search a tweet
      else {
        console.log('no tweet found');
        }
    });
}

// grab & retweet as soon as program is running...
retweet();
// retweet in every 2 minute
setInterval(retweet,10000);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
  var params = {
    q: '#SRHvsRR OR ',  // REQUIRED
    result_type: "recent",
    lang: 'en',
      count:100
  }
  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
        }
        else{
        }
      });
    }
  });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 2 minute
setInterval(favoriteTweet, 10000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};