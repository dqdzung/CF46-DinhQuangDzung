console.log("Page loaded");

$("#flip-btn").on("click", () => {
  console.log("Flip clicked");  
  $(".flip-card-inner").toggleClass("card-flipped");  
});

$("#edit-btn").on("click", () => {
  console.log("Edit clicked");
});

$("#remember-btn").on("click", () => {
  console.log("Remember clicked");
});

$("#next-btn").on("click", () => {
  console.log("Next clicked");
});
