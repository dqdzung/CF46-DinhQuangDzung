

const questionInput = document.getElementById("input");
const submitBtn = document.getElementById("submit-btn");

const counter = document.getElementById("counter");
const input = document.getElementById("input");

const questionContainer = document.getElementById("question-container");

const otherBtn = document.getElementById("other-question");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const voteTotal = document.getElementById("vote-total");

let questionId = "";

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
  const randomQuestion = await getRandomQuestion();
  if (questionContainer) {
    questionContainer.innerHTML = randomQuestion.content;
  }
};

const randomize = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
};

const getRandomQuestion = async () => {
  const data = await fetch("http://localhost:8080/data.json").then((res) =>
    res.json()
  );
  const randomQuestion = randomize(data);
  questionId = randomQuestion._id;

  return randomQuestion;
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

let idFromUrl  = window.location.pathname.split("/").pop();

const getQuestion = async (id) => {
  const res = await fetch(`http://localhost:8080/question/${id}`);
  const jsonRes = await res.json();

  if (jsonRes.success) {
    const {data: question} = jsonRes;
    const { content, yes, no} = question;

    questionContainer.innerHTML = content;
    voteTotal.innerHTML = `${parseInt(yes) + parseInt(no)} votes`;
    console.log(parseInt(yes) + parseInt(no));
  }
}

getQuestion(idFromUrl);
