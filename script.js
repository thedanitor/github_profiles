const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// fetch user (async function)
async function getUser(username) {
  // first try this request
  try {
    // destructure response to just fetch data object (need await with async)
    const { data } = await axios.get(APIURL + username);
    // call createUserCard with data object
    createUserCard(data);
    // if error is 404, call createErrorCard
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard("No profile with this username");
    }
  }
}

function createUserCard(user) {
  const cardHTML = `
    <div class="card">
    <div>
      <img src=${user.avatar_url} alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${user.name}</h2>
      <p>${user.bio}</p>
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>
      <div id="repos"></div>
    </div>
  </div>`;
  main.innerHTML = cardHTML;
}

function createErrorCard(message) {
    const cardHTML = `
    <div class="card">
        <h1>${message}</h1>
    </div>
    `;
    main.innerHTML = cardHTML;
}

// listen for submit on form ("Enter" counts as submit)
form.addEventListener("submit", e => {
  e.preventDefault();
  // user is value of search box
  const user = search.value;
  // if there is a user, call getUser, then clear searchbar
  if (user) {
    getUser(user);
    search.value = "";
  }
});
