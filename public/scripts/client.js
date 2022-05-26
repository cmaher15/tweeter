/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { send } = require("express/lib/response");

// const text = require("body-parser/lib/types/text");


$(document).ready(function() {
  jQuery("time.timeago").timeago();
  const renderTweets = function(tweets) {
    for (let data of tweets) {
      const $newData = createTweetElement(data);
      $('.tweets-container').prepend($newData);
    }
  };

  const createTweetElement = function(tweet) {
    const newDate = jQuery.timeago(new Date(tweet.created_at));
    const $tweet = (`
    <article class="tweets">
      <header>
      <div><img src=${tweet.user.avatars}></div>
      <div class="name"><h3>${tweet.user.name}</h3>
       <h3 class="color">${tweet.user.handle}</h3></div>
      </header>
      <div class="tweet-text">${tweet.content.text}</div>
      <footer>
        ${newDate}
        <p class="images"><i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i></p>
      </footer>
  
    </article>`);

    return $tweet;
  };


  $('form').on('submit', (evt) => {
    evt.preventDefault();
    if ($('textarea').val().length === 0) {
      alert("You must not leave this space empty!");
      return;
    } if ($('textarea').val().length > 140) {
      alert("Your tweet must not exceed 140 characters!");
      return;
    }

    let sendData = $('form').serialize();
    $.post('/tweets', sendData)
      .then(() => {
        loadTweets();
        $('textarea').val("").trigger("keyup");
      });

  });

  const loadTweets = function() {
    $.get('/tweets', (data) => {
      renderTweets(data);
    });
  };

  loadTweets();


});







