// The following documentation was used to integrate the google API
// https://developers.google.com/books/docs/viewer/developers_guide


// This script is responsible for handling interactions with the Google Books API, displaying search results, and dynamically adding student information to the page.

// Function to execute when the window has finished loading
window.onload = function () {
    // Dynamically adding student id and name to the page
    var studentInfo = document.getElementById('student-info');
    studentInfo.innerText = "Student ID: 200556037 | Name: Arvinder Singh Mehra";
}

// Function to search for books using the Google Books API
function searchBooks() {
    // Retrieve the search query entered by the user
    var query = document.getElementById('search-input').value;
    // Construct the URL for the API request
    var url = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(query);

    // Fetch data from the API
    fetch(url)
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            // Call the function to display the search results
            displayResults(data);
        })
        .catch(error => console.log(error)); // Log any errors that occur during the fetch operation
}

// Function to display search results on the page
function displayResults(data) {
    // Retrieve the container where the search results will be displayed
    var resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear any previous search results

    // Check if there are items in the response data
    if (data.items) {
        // Loop through each item in the response data
        data.items.forEach(item => {
            // Extract relevant information about the book
            var title = item.volumeInfo.title;
            var authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown';
            var thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';

            // Create elements to display the book information
            var bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            var titleElement = document.createElement('h2');
            titleElement.textContent = title;

            var authorElement = document.createElement('p');
            authorElement.textContent = 'Author(s): ' + authors;

            var thumbnailElement = document.createElement('img');
            thumbnailElement.src = thumbnail;

            // Append the elements to the book container
            bookDiv.appendChild(titleElement);
            bookDiv.appendChild(authorElement);
            bookDiv.appendChild(thumbnailElement);

            // Append the book container to the results container
            resultsContainer.appendChild(bookDiv);
        });
    } else {
        // If no results are found, display a message indicating so
        resultsContainer.textContent = 'No results found.';
    }
}
