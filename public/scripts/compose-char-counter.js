$(document).ready(function() {
  $("textarea").on("keyup", onInput);

});

const onInput = function() {
  const $textArea = $(this);
  const $length = 140 - $textArea.val().length;

  const $form = $(this).closest("form");
  const $counter = $form.find(".counter");
  $counter.text($length);
  if ($length <= 0) {
    $counter.addClass("red-font");
  }
};
