const counter = document.getElementById("counter");
const input = document.getElementById("input");
const questionInput = document.getElementById("input");
const submitBtn = document.getElementById("submit-btn");

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
