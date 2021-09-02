//  Initialize Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const errorMessage = document.getElementById("error-msg");
const bookContainer = document.getElementById("book-container");
const showResult = document.getElementById("show-result");

// Function for Fetching Data
const fetchData = (value) => {
  const url = `http://openlibrary.org/search.json?q=${value}`;

  //   Fetching Data
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data, value))
    .catch((error) => alert(error));
};

// Function for Showing Data in Website or Update data in UI
const showData = (data, value) => {
  const mainData = data.docs;
  const bookFound = data.numFound;

  if (mainData.length == 0) {
    errorMessage.textContent = `There is no Book Name of - ${value}`;
    return;
  }

  showResult.innerText = `Showing ${mainData.length} Books from ${bookFound} Books`;

  //   Iterating mainData with foreach loop and append data in container
  mainData.forEach((book) => {
    console.log(book);

    const {
      title,
      cover_i,
      author_name,
      publisher,
      first_publish_year,
      publish_date,
    } = book;

    const image = cover_i
      ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
      : `images/no-book.jpg`;

    const author = Array.isArray(author_name) ? author_name[0] : "";
    const publisherName = Array.isArray(publisher) ? publisher[0] : "";
    const publishDate = Array.isArray(publish_date) ? publish_date[0] : "";
    const firstPublish = first_publish_year || "";

    // Create Elements
    const div = document.createElement("div");

    // Class Add
    div.classList.add("col");

    div.innerHTML = `
    <div class="card h-100 shadow-lg">
              <img
                src=${image}
                class="card-img-top book-img"
                alt="books"
              />
              <div class="card-body">
                <h4 class="card-title my-3">Name: ${title}</h4>
                <p> Author:  ${author}  </p>
                <p> Publisher: ${publisherName}  </p>
                <p> First Publish Year: ${firstPublish}   </p>
                <p> Last Publish Date : ${publishDate}   </p>
              
              </div>
            </div>
    `;

    bookContainer.appendChild(div);
  });
};

// Search Button Add Event Listener
searchBtn.addEventListener("click", () => {
  // Getting input value
  const value = searchInput.value;

  //   Condition Checking
  if (value === "") {
    errorMessage.textContent = "You have to give a Book Name";
  } else {
    // Clear Book Container
    errorMessage.textContent = "";
    bookContainer.textContent = "";
    showResult.textContent = "";
    fetchData(value);
  }

  //   Clear Value
  searchInput.value = "";
});
