/* ========== Initialize all the Elements ========== */
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const errorMessage = document.getElementById("error-msg");
const bookContainer = document.getElementById("book-container");
const showResult = document.getElementById("show-result");
const loading = document.getElementById("loading");

/* ========== Function for Fetching Data ========== */
const fetchData = (value) => {
  const url = `https://openlibrary.org/search.json?q=${value}`;

  //   Fetching Data
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data, value))
    .catch((error) => alert(error));
};

/*  ========== Function for Showing Data in Website or Update data in UI ========== */
const showData = (data, value) => {
  const mainData = data.docs;
  const bookFound = data.numFound;

  // Condition Checking
  if (mainData.length === 0) {
    loading.classList.remove("d-block");
    loading.classList.add("d-none");
    errorMessage.textContent = `Sorry! There is no book named - "${value}"`;
    return;
  }

  // Showing Result Text and Stop Loading
  showResult.innerText = `Showing ${mainData.length} Books from ${bookFound} Books`;
  loading.classList.remove("d-block");
  loading.classList.add("d-none");

  // Passing mainData to UpdateData Function
  updateData(mainData);
};

/*  ========== Update Data ========== */
const updateData = (mainDataArr) => {
  //   Iterating mainData with foreach loop and append data in container
  mainDataArr.forEach((book) => {
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

/*  ========== Search Button Add Event Listener  ==========*/
searchBtn.addEventListener("click", () => {
  // Getting input value
  const value = searchInput.value;

  // Clear Elements
  errorMessage.textContent = "";
  showResult.textContent = "";
  bookContainer.textContent = "";

  //  Condition Checking
  if (value === "") {
    errorMessage.textContent = "You have to give the name or type of a Book";
  } else {
    // Add loading
    loading.classList.add("d-block");
    loading.classList.remove("d-none");

    // Passing Value
    fetchData(value);
  }

  //   Clear Input Value
  searchInput.value = "";
});
