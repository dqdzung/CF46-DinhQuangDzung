console.log("Detail page loaded...");

$(() => {
  renderCardDetail();

  $("#edit-form").on("submit", (e) => {
    e.preventDefault();

    const content = {
      category: $("#category-select option:selected").text().toLowerCase(),
      front: $("#front-input").val(),
      back: $("#back-input").val(),
      remember: $("#flexCheck").prop("checked"),
    };

    console.log(content);

    $.ajax({
      url: `http://localhost:6969/edit/${cardId}`,
      method: "PUT",
      data: content,
    }).then((res) => {
      if (res.success) {
        console.log("Card edited", res.data);        
        if (confirm("Card edited successfully! Go back to homepage?")) {
          window.location.href = "/";
        }
      }
    });
  });
});

const cardId = window.location.pathname.split("/").pop();

const getCardDetail = async () => {
  const res = await $.ajax({
    url: `http://localhost:6969/detail/${cardId}`,
    method: "GET",
  });
  return res.data;
};

const renderCardDetail = async () => {
  const card = await getCardDetail();
  const { front, back, category, remember } = card;
  let selectValue = "";

  $("#front-input").val(front);
  $("#back-input").val(back);

  switch (category) {
    case "code": {
      selectValue = 1;
      break;
    }
    case "vocal": {
      selectValue = 2;
      break;
    }
    case "other": {
      selectValue = 3;
      break;
    }
  }

  $("#category-select").val(selectValue);

  if (remember) {
    $("#flexCheck").attr("checked", true);
  }

  return;
};
