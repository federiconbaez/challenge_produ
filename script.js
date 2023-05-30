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
      booksGrid.appendChild(bookCard);
    });
  }
  
  // Function to filter books based on selected options
  function filterBooks() {
    const genreFilter = document.getElementById("genre-select").value;
    const languageFilter = document.getElementById("language-select").value;
    const ratingFilter = document.getElementById("rating-select").value;
  
    const filteredBooks = books.filter(book => {
      if (genreFilter && book.genre !== genreFilter) {
        return false;
      }
      if (languageFilter && book.language !== languageFilter) {
        return false;
      }
      if (ratingFilter && book.rating < ratingFilter) {
        return false;
      }
      return true;
    });
  
    renderBooks(filteredBooks);
  }
  
  // Event listeners
  document.getElementById("search-button").addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const searchResults = books.filter(
      book =>
        book.title.toLowerCase().includes(searchInput) ||
        book.author.toLowerCase().includes(searchInput) ||
        book.summary.toLowerCase().includes(searchInput)
    );
    renderBooks(searchResults);
  });
  
  document.getElementById("genre-select").addEventListener("change", filterBooks);
  document.getElementById("language-select").addEventListener("change", filterBooks);
  document.getElementById("rating-select").addEventListener("change", filterBooks);
  
  // Initial rendering of books
  renderBooks(books);
  