let cardId;

$("#flip-btn").on("click", () => {
  // console.log("clicked")
  $(".flip-card").toggleClass("flipped");
});

const getRandomCard = async () => {
  try {
    const category = $('input[name="category"]:checked').val();
    const res = await $.ajax({
      url: "/api/flashcards/random",
      method: "GET",
      data: { category },
    });

    if (res.success) {
      const { _id, front, back, category, isRemembered } = res.data;
      cardId = _id;
      $("#category").html(category);
      $("#front").html(front);
      $("#back").html(back);
      if (isRemembered) {
        $("#remember-btn").show();
        $("#forget-btn").hide();
      }
      $("#remember-btn").hide();
      $("#forget-btn").show();
    }
  } catch (err) {
    console.log(err);
  }
};

getRandomCard();

$("#next-btn").on("click", () => {
  getRandomCard();
});

$('input[name="category"]').on("input", () => {
  getRandomCard();
});

$("#remember-btn").on("click", async () => {
  const res = await $.ajax({
    url: `/api/flashcards/${cardId}`,
    method: "PUT",
    data: {
      isRemembered: true,
    },
  });

  if (res.success) {
    console.log(res.data);
    $("#remember-btn").hide();
    $("#forget-btn").show();
  }
});

$("#forget-btn").on("click", async () => {
  const res = await $.ajax({
    url: `/api/flashcards/${cardId}`,
    method: "PUT",
    data: {
      isRemembered: false,
    },
  });

  if (res.success) {
    console.log(res.data);
    $("#remember-btn").show();
    $("#forget-btn").hide();
  }
});

$("#edit-btn").on("click", () => {
  if (cardId) {
    window.location.href = `edit/flashcards/${cardId}`;
  }
});
