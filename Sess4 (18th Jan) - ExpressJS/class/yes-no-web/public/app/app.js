const questionInput = document.getElementById("input");
const submitBtn = document.getElementById("submit-btn");

submitBtn.onclick = () => {
  const questionContent = questionInput.value;

  const question = { content: questionContent };

  fetch("http://localhost:8080/ask-question", {
    method: "POST",
    body: new URLSearchParams(question),
  }).then((res) => res.json());

  questionInput.value = "";
};
