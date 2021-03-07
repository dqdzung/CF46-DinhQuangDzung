$(function () {
  //   console.log("page loaded");
  $("#search-btn").on("click", async () => {
    $("#result-container").html("");
    const searchInput = $("#search-input").val();
    if (!searchInput) {
      alert("Please enter something to search");
    }
    // console.log(searchInput);
    const res = await $.ajax({
      url: `http://localhost:8080/question-search/${searchInput}`,
    });
    res.data.forEach((elem) => {
      $("#result-container").append(
        `<li><a href="/question/${elem._id}">${elem.content}</a></li>`
      );
    });
    $("#search-input").val("");
  });
});
