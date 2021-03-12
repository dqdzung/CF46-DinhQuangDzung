console.log("create loaded");

$("#create-form").on("submit", (e) => {
  e.preventDefault();
  console.log("save clicked");
  if ($("#front-input").val() && $("#back-input").val()) {
    const content = {
      front: $("#front-input").val(),
      back: $("#back-input").val(),
    };
    
    $.ajax({
      url: "http://localhost:5000/new-card",
      method: "POST",
      data: content,
    }).then((res) => {
      if (res.success) {
        console.log(res);
      }
    });
  }
});
