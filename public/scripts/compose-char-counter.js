$(document).ready(function() {
  $("textarea").on("keypress", onInput);

});

const onInput = function() {
  const textArea = $(this);
  const length = textArea.val().length;

  const $form = $(this).closest("form");
  const $counter = $form.find(".counter");
  $counter.text(140 - length);
};
