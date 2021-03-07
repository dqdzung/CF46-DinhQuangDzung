let questionId = "";

$(function () {
  // console.log("page loaded");
  renderQuestion();
  renderMostYes(); 

  $("#other-question").on("click", function () {
    renderQuestion();
  });

  $(".vote-button").on("click", function () {
    const choice = $(this).attr("data-type");
    vote(choice);
  });

  $("#delete-btn").on("click", async function () {
    console.log("Deleting", questionId);
    try {
      if (confirm("Delete question?")) {
        const res = await $.ajax({
          url: `http://localhost:8080/question/${questionId}`,
          method: "DELETE",
        });

        if (res.success) {
          alert("Question deleted...");
          location.reload();
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
});

const vote = async (type) => {
  try {
    const res = await $.ajax({
      url: `http://localhost:8080/add-vote/${questionId}`,
      method: "PUT",
      data: { type },
    });
    if (res.success) {
      console.log(res);
      window.location.href = `/question/${res.data._id}`;
    }
  } catch (err) {
    console.log(err);
  }
};

const getRandomQuestion = async () => {
  const res = await $.ajax({
    url: "http://localhost:8080/random-question",
  });
  const questionData = res.data;
  questionId = questionData._id;
  return questionData;
};

const renderQuestion = async () => {
  const randomQuestion = await getRandomQuestion();
  $("#question-container").html(randomQuestion.content);
};

const getMostYes = async () => {
  const res = await $.ajax({
    url: "http://localhost:8080/most-yes",
  });
  const mostYes = res.data[0]; 
  return mostYes;
};

const renderMostYes = async () => {
  const mostYes = await getMostYes();
  console.log(mostYes)
  $("#most-yes").html(`${mostYes.content} - ${mostYes.yes} voted Yes`);
}