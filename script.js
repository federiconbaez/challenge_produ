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
    // Add more books here...
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
  
  // Initial rendering of books
  renderBooks(books);
  