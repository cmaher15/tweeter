/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { send } = require("express/lib/response");

// const text = require("body-parser/lib/types/text");

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


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
      <div><img src=${escape(tweet.user.avatars)}></div>
      <div class="name"><h3>${escape(tweet.user.name)}</h3>
       <h3 class="color">${escape(tweet.user.handle)}</h3></div>
      </header>
      <div class="tweet-text">${escape(tweet.content.text)}</div>
      <footer>
        ${escape(newDate)}
        <p class="images"><i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i></p>
      </footer>
  
    </article>`);

    return $tweet;
  };

  $('.error').hide();

  $('form').on('submit', (evt) => {
    $('.error').slideUp();
    evt.preventDefault();
    if ($('textarea').val().length === 0) {
      $('.error-msg').text("Whoopsie! Your tweet can't be blank. Please try again.");
      $('.error').slideDown();
      return;
    } if ($('textarea').val().length > 140) {
      $('.error-msg').text("Whoopsie! Your tweet is too long. Please try again.");
      $('.error').slideDown();
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







