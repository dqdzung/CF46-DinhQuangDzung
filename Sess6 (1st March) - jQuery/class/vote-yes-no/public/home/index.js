let idQuestion = "";

// const contentDOM = document.getElementById('contentQuestion');

const $contentDOM = $("#contentQuestion");

const getRandomQuestion = async () => {
  // const res = await fetch('http://localhost:8080/random-question');
  // const jsonRes = await res.json();

  const res = await $.ajax({
    type: "GET",
    url: "http://localhost:8080/random-question",
  });

  if (res.success) {
    const { content, _id } = res.data;
    $contentDOM.html(content);
    idQuestion = _id;
  }
};

getRandomQuestion();

const $otherBtn = $("#otherBtn");

$otherBtn.on("click", () => {
  // window.location.reload();
  getRandomQuestion();
});

const handleVote = async (type) => {
  try {
    const res = await $.ajax({
      url: `http://localhost:8080/add-vote/${idQuestion}`,
      method: "PUT",
      data: { type },
    });
    if (res.success) {
      window.location.href = `/question/${res.data._id}`;
    }
  } catch (err) {
    console.log(err);
  }
};

const $voteBtn = $(".voteBtn");

$voteBtn.on("click", function()  {
  const $this = $(this);
  const type = $this.attr("data-type")
  handleVote(type);
});
