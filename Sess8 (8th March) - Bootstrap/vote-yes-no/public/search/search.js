$(function () {
  //   console.log("page loaded");
  $("#search-btn").on("click", async () => {
    const searchInput = $("#search-input").val();
    if (!searchInput) {
      alert("Please enter something to search");
    }
    // console.log(searchInput);
    const res = await $.ajax({
      url: "http://localhost:8080/question-search",
      method: "GET",
      data: { keyword: searchInput },
    });
    console.log(res.data);
    if (res.success) {
      $("#result-container").html("");

      // let html = "";
      // res.data.forEach((elem) => {
      //   html += `<li><a href="/question/${elem._id}">${elem.content}</a></li>`;
      // });

      const html = res.data
        .map((elem) => {
          return `<li><a href="/question/${elem._id}">${elem.content}</a></li>`;
        })
        .join("");

      $("#result-container").append(html);

      $("#search-input").val("");
    }
  });
});
