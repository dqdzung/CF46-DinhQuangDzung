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
    console.log(res.data);

    let html = "";
    res.data.forEach((elem) => {
      html += `<li><a href="/question/${elem._id}">${elem.content}</a></li>`;
    });

    $("#result-container").append(html);

    $("#search-input").val("");
  });
});
