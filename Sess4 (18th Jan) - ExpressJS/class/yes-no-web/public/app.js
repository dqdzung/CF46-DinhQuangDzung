const questionInput = document.getElementById("input");
const submitBtn = document.getElementById("submit-btn");

const counter = document.getElementById("counter");
const input = document.getElementById("input");

const questionContainer = document.getElementById("question-container");

if (submitBtn) {
  submitBtn.onclick = () => {
    const questionContent = questionInput.value;
    if (questionContent) {
      const question = { content: questionContent };

      fetch("http://localhost:8080/add-question", {
        method: "POST",
        body: new URLSearchParams(question),
      })
        .then((res) => res.json())
        .then((window.location.href = "/"));
    } else {
      alert("Please enter a question!");
    }
    questionInput.value = "";
  };
}

if (input) {
  input.oninput = () => {
    const charLeft = 200 - input.value.length;
    counter.innerHTML = `${charLeft}/200`;
  };
}

window.onload = async () => {
  const data = await fetch("http://localhost:8080/data.json").then((res) =>
    res.json()
  );
  const randomQuestion = randomize(data);
  console.log(randomQuestion);
  if (questionContainer) {
    questionContainer.innerHTML = randomQuestion.content;
  }
};

const randomize = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  console.log(randomIndex);
  return array[randomIndex];
};
