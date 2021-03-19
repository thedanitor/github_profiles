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

async function getRepos(username) {
  // first try this request
  try {
    // destructure response to just fetch data object (need await with async)
    // sorted by date created using API query
    const { data } = await axios.get(APIURL + username + "/repos?sort=created");
    // call addReposToCard with data object
    // console.log(data);
    addReposToCard(data);
    // if error, call createErrorCard
  } catch (err) {
    createErrorCard("Problem fetching repos");
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

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  // iterate through first 10 repos
  repos.slice(0, 10).forEach(repo => {
    // create link
    const repoEl = document.createElement("a");
    // add class repo to link
    repoEl.classList.add("repo");
    // add href to repo url
    repoEl.href = repo.html_url;
    // make open in new window
    repoEl.target = "_blank";
    // make link repo name
    repoEl.innerText = repo.name;
    // append repo to reposEl
    reposEl.appendChild(repoEl);
  });
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
    getRepos(user);
    search.value = "";
  }
});
