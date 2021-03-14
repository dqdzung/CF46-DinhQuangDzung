let cardId = "";

$(() => {
  console.log("Page loaded...");

  renderCard();

  $(".flip-card").on("click", () => {
    $(".flip-card").toggleClass("card-flipped");
  });

  $("#edit-btn").on("click", async () => {
    console.log("Edit clicked", cardId);
    await $.ajax({
      url: `http://localhost:6969/card/${cardId}`,
      method: "GET",
    });
    window.location.href = `/card/${cardId}`;
  });

  $("#remember-btn").on("click", () => {
    if (confirm('Mark word as "Remember"?')) {
      $("#isRememberBadge, #remember-btn, #forget-btn").toggleClass("hidden");

      $.ajax({
        url: `http://localhost:6969/remember-card/${cardId}`,
        method: "PUT",
      }).then((res) => {
        if (res.success) {
          console.log(res);
        }
      });
    }
  });

  $("#forget-btn").on("click", () => {
    if (confirm('Mark word as "Forget"?')) {
      $("#isRememberBadge, #remember-btn, #forget-btn").toggleClass("hidden");

      $.ajax({
        url: `http://localhost:6969/forget-card/${cardId}`,
        method: "PUT",
      }).then((res) => {
        if (res.success) {
          console.log(res);
        }
      });
    }
  });

  $("#next-btn").on("click", () => {
    renderCard();
  });
});

const getRandomCard = async () => {
  const res = await $.ajax({
    url: "http://localhost:6969/random-card",
  });

  return res.data;
};

const renderCard = async () => {
  const randomCard = await getRandomCard();

  console.log(randomCard);

  const { _id, category, front, back, remember } = randomCard;

  const html =
    /*html*/
    `          
    <div class="flip-card-front d-flex flex-column align-items-center justify-content-center">
      <span id="isRememberBadge" class="badge bg-success hidden" style="">Remember</span>
      <h5 id="category">${category}</h5>
      <h2 id="front-content">${front}</h2>
    </div>
    <div class="flip-card-back d-flex flex-column align-items-center justify-content-center">
      <div id="back-content">${back}</div>
    </div>
  `;

  $(".flip-card-inner").append(html);

  if (remember) {
    $("#isRememberBadge, #remember-btn, #forget-btn").toggleClass("hidden");
  }

  cardId = _id;
};
