$(() => {
  countdown();
  const counter = setInterval(() => {
    if (countdown() < 0) {
      happyNewYear(counter);
    } else countdown();
  }, 1000);

  $("#end-timer-btn").on("click", () => {
    happyNewYear(counter);
  });
});

const countdown = () => {
  const timeLeft = getTimeLeft();
  const dayLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hourLeft = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minuteLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const secondLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

  $("#countdown-timer").html(
    `${dayLeft}d ${hourLeft}h ${minuteLeft}m ${secondLeft}s`
  );

  return timeLeft;
};

const getTimeLeft = () => {
  const currentDate = new Date();
  const lunarNYE = new Date();

  lunarNYE.setFullYear(2021, 1, 11);
  lunarNYE.setHours(0);
  lunarNYE.setMinutes(0);
  lunarNYE.setSeconds(0);

  return lunarNYE - currentDate;
};

const happyNewYear = (counter) => {
  clearInterval(counter);
  $("#content").html("HAPPY NEW YEAR!");
  $("#end-timer-btn").hide();
  $("#video").html(
    `<iframe             
        width="300"
        height="200"
        src="https://www.youtube.com/embed/3Uo0JAUWijM?start=2&autoplay=1"
        frameborder="0"
        allow=""
      ></iframe>`
  );
};
