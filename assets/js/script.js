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

  // get list of repos from response
  const getReposFromData = function (data) {
    console.log(data);
  };

  // for each repo create and append list item to ul
  const createAndAppendRepos = function () {};

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
