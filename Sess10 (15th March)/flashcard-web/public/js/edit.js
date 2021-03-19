const cardId = window.location.pathname.split("/").pop();

const getDetailCard = async () => {
  const res = await $.ajax({
    url: `/api/flashcards/${cardId}`,
    method: "GET",
  });

  if (res.success) {
    const { front, back, category } = res.data;
    $("#front-input").val(front);
    $("#back-input").val(back);
    $("#category-select").val(category);
  }
};

$(() => {
  getDetailCard();
});
