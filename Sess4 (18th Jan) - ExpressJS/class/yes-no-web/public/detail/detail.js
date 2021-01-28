const questionContainer = document.getElementById("question-container");
const voteTotal = document.getElementById("vote-total");
const yesPercent = document.getElementById("yes-percent");
const noPercent = document.getElementById("no-percent");


let idFromUrl = window.location.pathname.split("/").pop();

const getQuestion = async () => {
  const res = await fetch(`http://localhost:8080/detail/${idFromUrl}`);
  const jsonRes = await res.json();
  console.log(jsonRes)
  if (jsonRes.success) {
    const { data: question } = jsonRes;
    const { content, yes, no } = question;
    questionContainer.innerHTML = content;
    const votes = parseInt(yes) + parseInt(no);
    voteTotal.innerHTML = votes;
    yesPercent.innerHTML = (parseInt(yes) / votes) * 100
    noPercent.innerHTML = (parseInt(no) / votes) * 100
  }
};

window.onload = async () => {
  await getQuestion();
};
