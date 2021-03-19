const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const search = document.getElementById("search");


// fetch user
async function getUser(username) {
  // first try this request
  try {
    // destructure response to just fetch data object
    const { data } = await axios.get(APIURL + username);
    console.log(data);
    // if error, console.log
  } catch (err) {
    console.log(err);
  }
}

// listen for submit on form ("Enter" counts as submit)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // user is value of search box
    const user = search.value;
    // if there is a user, call getUser, then clear searchbar
    if (user) {
        getUser(user);
        search.value = "";
    }

})