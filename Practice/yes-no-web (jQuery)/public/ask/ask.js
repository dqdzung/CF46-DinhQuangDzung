$(() => {
  $("#submit-btn").on("click", async () => {
    const questionContent = $("#input").val();
    // console.log(questionContent);
    if (questionContent) {
      if (confirm("Submit question?")) {
        const question = { content: questionContent };
        await fetch("http://localhost:8080/add-question", {
          method: "POST",
          body: new URLSearchParams(question),
        });
        window.location.href = "/";
      }
    } else {
      alert("Please enter a question!");
    }
  });

  $("#input").on("input", () => {
    const charLeft = 200 - $("#input").val().length;
    $("#counter").html(`${charLeft}/200`);
  })
});


