const getUser = async (userName) => {
  const data = await fetch(`https://api.github.com/users/${userName}`).then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else alert(`${userName} is not on GitHub!`);
    }
  );
  return {
    name: data.login,
    avatar: data.avatar_url,
    email: data.email,
    company: data.company,
    follower: data.followers,
  };
};

const toGitHub = () => {
  window.location.href = "http://github.com";
};

const toMe = () => {
  window.location.href = "https://github.com/hihi-haha-hoho";
};

const $searchInput = document.getElementById("search-input"),
  $searchBtn = document.getElementById("search-btn"),
  $name = document.getElementById("name"),
  $email = document.getElementById("email"),
  $company = document.getElementById("company"),
  $follower = document.getElementById("follower"),
  $imgContainer = document.getElementById("img-container");

const renderInfo = (DOM, data) => {
  if (data == null) {
    data = "No info";
  }
  DOM.innerHTML = data;
};

$searchBtn.onclick = async () => {
  const username = $searchInput.value;
  if (!username) {
    alert("Please enter a username!");
  } else {
    const user = await getUser(username);
    console.log(user);
    let { name, email, company, follower, avatar } = user;
    renderInfo($name, name);
    renderInfo($email, email);
    renderInfo($company, company);
    renderInfo($follower, follower);
    $searchInput.value = "";
    const imgHTML = `<img id="avatar" src="${avatar}" alt=""></img>`;
    renderInfo($imgContainer, imgHTML);
  }
};

$searchInput.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    $searchBtn.onclick();
  }
});
