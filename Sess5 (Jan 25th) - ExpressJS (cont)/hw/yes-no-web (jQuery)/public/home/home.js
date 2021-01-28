let questionId = "";

$(function () {
  // console.log("page loaded");
  renderQuestion();

  $("#other-question").on("click", function () {
    //
    renderQuestion();
  });

  $("#yes").on("click", () => {
    vote("yes");
  });

  $("#no").on("click", () => {
    vote("no");
  });
});

const vote = async (type) => {
  const res = await fetch(`http://localhost:8080/add-vote/${questionId}`, {
    method: "PUT",
    body: new URLSearchParams({ type: type }),
  });
  const jsonRes = await res.json();
  if (jsonRes.success) {
    window.location.href = `/question/${jsonRes.data._id}`;
  }
};

const getRandomQuestion = async () => {
  const response = await fetch("http://localhost:8080/random-question");
  const jsonData = await response.json();
  const questionData = await jsonData.data;
  questionId = questionData._id;
  return questionData;
};

const renderQuestion = async () => {
  const randomQuestion = await getRandomQuestion();
  $("#question-container").html(randomQuestion.content);
};
