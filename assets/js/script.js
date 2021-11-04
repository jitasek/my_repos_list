// target HTML elements
const fetchButton = document.getElementById("fetch-button");
const reposList = document.getElementById("repos-list");
const errorMessageContainer = document.getElementById("error-msg");

// event handler function for the button click
const renderRepos = function () {
  // get data from response
  const getDataFromResponse = function (response) {
    // check if the response status is 200
    if (response.status !== 200) {
      console.log("ERROR");
      throw new Error("Something went wrong!!");
    }
    return response.json();
  };

  // get list of repos from response = in comes a big response:
  const getReposFromData = function (repos) {
    // callback function for map - returns a tiny object of name and url only
    const getRepo = function (repo) {
      return {
        name: repo.name,
        url: repo.html_url,
      };
    };
    // map through the repos and return the array of tiny objects (i.e. our repos) = condenses the big array into a small one
    return repos.map(getRepo);
  };

  // for each repo create and append list item to ul
  const createAndAppendRepos = function (repos) {
    const constructAndAppend = function (repo) {
      // create li and anchor tag inside that
      const li = document.createElement("li");
      const link = document.createElement("a");
      // set attribute to the anchor tag
      link.setAttribute("href", repo.url);
      link.setAttribute("target", "_blank"); // to open each repo link in a new tab
      // set content to that link
      link.textContent = repo.name;
      // append a to li
      li.append(link);
      // take that list and append it to my list repository as a child (append li to ul)
      reposList.appendChild(li);
    };

    // use foreach
    repos.forEach(constructAndAppend);
  };

  // function for handling errors in fetch response
  const handleError = function (error) {
    // get error message
    const errorMessage = error.message;

    // target the message container elemenet and set the text content to the error message
    errorMessageContainer.textContent = errorMessage;
  };

  // get data from API
  fetch("https://api.github.com/users/jitasek/repos")
    .then(getDataFromResponse)
    .then(getReposFromData)
    .then(createAndAppendRepos)
    .catch(handleError);
};

// add click event listener for the fetch button
fetchButton.addEventListener("click", renderRepos);
