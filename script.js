// Mock data for demonstration
const books = [
    {
      title: "Book 1",
      author: "Author 1",
      summary: "Summary of Book 1",
      rating: 4.5,
      genre: "Fiction",
      language: "English",
      publicationDate: "2022-01-01",
      imageUrl: "book1.jpg"
    },
    {
        title: "Book 2",
        author: "Author 2",
        summary: "Summary of Book 2",
        rating: 4.5,
        genre: "Fiction",
        language: "English",
        publicationDate: "2022-01-01",
        imageUrl: "book2.jpg"
    }
];
  
// Function to render book cards
function renderBooks(books) {
    const booksGrid = document.getElementById("books-grid");
    booksGrid.innerHTML = "";
  
    books.forEach(book => {
      const bookCard = document.createElement("div");
      bookCard.className = "book-card";
  
      const bookImage = document.createElement("img");
      bookImage.src = book.imageUrl;
      bookCard.appendChild(bookImage);
  
      const bookTitle = document.createElement("h2");
      bookTitle.textContent = book.title;
      bookCard.appendChild(bookTitle);
  
      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = "Author: " + book.author;
      bookCard.appendChild(bookAuthor);
  
      const bookSummary = document.createElement("p");
      bookSummary.textContent = book.summary;
      bookCard.appendChild(bookSummary);
  
      // Add more book details here...  
      booksGrid.appendChild(bookCard);
    });
  }
  
  // Event listener for search button click
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value;
    // Perform search based on the input value and update the books array with the search results
    const searchResults = books.filter(book =>
      book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
      book.summary.toLowerCase().includes(searchInput.toLowerCase())
    );
    renderBooks(searchResults);
  });

// Function to filter books based on selected options
function filterBooks() {
    const genreFilter = document.getElementById("genre-select").value;
    const languageFilter = document.getElementById("language-select").value;
    const ratingFilter = document.getElementById("rating-select").value;
  
    let filteredBooks = books;
  
    if (genreFilter) {
      filteredBooks = filteredBooks.filter(book => book.genre === genreFilter);
    }
  
    if (languageFilter) {
      filteredBooks = filteredBooks.filter(book => book.language === languageFilter);
    }
  
    if (ratingFilter) {
      filteredBooks = filteredBooks.filter(book => book.rating >= ratingFilter);
    }
  
    renderBooks(filteredBooks);
}

// Event listeners for filter options change
document.getElementById("genre-select").addEventListener("change", filterBooks);
document.getElementById("language-select").addEventListener("change", filterBooks);
document.getElementById("rating-select").addEventListener("change", filterBooks);

// Initial rendering of books
renderBooks(books);
  