//  Initialize Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const errorMessage = document.getElementById("error-msg");
const bookContainer = document.getElementById("book-container");
const showResult = document.getElementById("show-result");
const loading = document.getElementById("loading");

// Function for Fetching Data
const fetchData = (value) => {
  const url = `https://openlibrary.org/search.json?q=${value}`;

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

  if (mainData.length === 0) {
    loading.classList.remove("d-block");
    loading.classList.add("d-none");
    errorMessage.textContent = `There is no Book Name of - "${value}"`;
    return;
  }

  window.scrollTo(0, 40);
  showResult.innerText = `Showing ${mainData.length} Books from ${bookFound} Books`;

  loading.classList.remove("d-block");
  loading.classList.add("d-none");

  //   Iterating mainData with foreach loop and append data in container
  mainData.forEach((book) => {
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

    // Create Elements and append to Container
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 shadow-lg">
              <img
                src=${image}
                class="card-img-top book-img"
                alt="books"
              />
              <div class="card-body p-4">
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
    errorMessage.textContent = "You have to give the name or type of a Book";
  } else {
    // Clear some element and  add loading
    errorMessage.textContent = "";
    showResult.textContent = "";
    bookContainer.textContent = "";
    loading.classList.add("d-block");
    loading.classList.remove("d-none");
    fetchData(value);
  }

  //   Clear Input Value
  searchInput.value = "";
});
