$("#create-form").on("submit", async (e) => {
  e.preventDefault();

  const newCard = {
    front: $("#front-input").val(),
    back: $("#back-input").val(),
    category: $("#category-select").val(),
  };

  console.log("Request to Create...", newCard);

  const res = await $.ajax({
    url: "/api/flashcards",
    method: "POST",
    data: newCard,
  });

  console.log("Created", res);

  if (res.success) {
    alert("Card created!");
    $("#front-input").val("");
    $("#back-input").val("");
    $("#category-select").val("other");
  }
});
