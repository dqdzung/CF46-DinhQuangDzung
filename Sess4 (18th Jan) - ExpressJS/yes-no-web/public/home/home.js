const questionContainer = document.getElementById("question-container");
const otherBtn = document.getElementById("other-question");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

let questionId = "";

window.onload = async () => {
  const randomQuestion = await getRandomQuestion();
  if (questionContainer) {
    questionContainer.innerHTML = randomQuestion.content;
  }
};

const getRandomQuestion = async () => {
  const response = await fetch("http://localhost:8080/random-question");
  const jsonData = await response.json();
  const questionData = await jsonData.data;
  questionId = questionData._id;
  return questionData;
};

otherBtn.onclick = async () => {
  const randomQuestion = await getRandomQuestion();
  questionContainer.innerHTML = randomQuestion.content;
};

if (yesBtn) {
  yesBtn.onclick = async () => {
    vote("yes");
  };
}

if (noBtn) {
  noBtn.onclick = async () => {
    vote("no");
  };
}

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
