// console.log("create page loaded");

$("#create-form").on("submit", (e) => {
  e.preventDefault();

  console.log("save clicked");

  const content = {
    category: ($("#category-select option:selected").text()).toLowerCase(),
    front: $("#front-input").val(),
    back: $("#back-input").val(),
  };

  $.ajax({
    url: "http://localhost:6969/new-card",
    method: "POST",
    data: content,
  }).then((res) => {
    if (res.success) {
      console.log("Card added", res.data);
      $("#front-input").val("") & $("#back-input").val("");
      if (confirm("Card added successfully! Go back to homepage?")) {
        window.location.href = "/";
      }
    }
  });
});
