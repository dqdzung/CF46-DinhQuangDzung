let idFromUrl = window.location.pathname.split("/").pop();

$(() => {
  getQuestion();

  $("#other-question").on("click", () => {
    window.location.href = "/";
  });
});

const getQuestion = async () => {
  const res = await $.ajax({
    url: `http://localhost:8080/detail/${idFromUrl}`,
  });
  if (res.success) {    
    const question = res.data;    
    const { content, yes, no } = question;
    const votes = parseInt(yes) + parseInt(no);

    $("#question-container").html(content);
    $("#vote-total").html(votes);
    $("#yes-percent").html(((parseInt(yes) / votes) * 100).toFixed());
    $("#no-percent").html(((parseInt(no) / votes) * 100).toFixed());
  }
};
