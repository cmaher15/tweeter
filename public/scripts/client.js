/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const text = require("body-parser/lib/types/text");

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1653166304245
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1653252704245
  }
];

$( document ).ready(function() {
  const renderTweets = function(tweets) {
    for (let data of tweets) {
      const $newData = createTweetElement(data);
      $('.tweets-container').append($newData);
    }
  };
  
  const createTweetElement = function(tweet) {
    const $tweet = (`
    <article class="tweets">
      <header>
      <div><img src=${tweet.user.avatars}></div>
      <div class="name"><h3>${tweet.user.name}</h3>
       <h3 class="color">${tweet.user.handle}</h3></div>
      </header>
      <div class="tweet-text">${tweet.content.text}</div>
      <footer>
        ${tweet.created_at}
        <p class="images"><i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i></p>
      </footer>
  
    </article>`);
  
    return $tweet;
  };
  
  renderTweets(data);
});


