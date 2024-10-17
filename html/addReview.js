// Book class to create book objects
class Book {
    constructor(title, author, review, rating) {
        this.title = title;
        this.author = author;
        this.review = review;
        this.rating = rating;
        this.dateAdded = new Date();
    }
}

// BookReviewManager class to handle all book-related operations
class BookReviewManager {
    constructor() {
        this.books = JSON.parse(localStorage.getItem('books')) || [];
    }

    addBook(title, author, review, rating) {
        const book = new Book(title, author, review, rating);
        this.books.push(book);
        this.saveToLocalStorage();
        this.displayBooks();
    }

    removeBook(index) {
        this.books.splice(index, 1);
        this.saveToLocalStorage();
        this.displayBooks();
    }

    saveToLocalStorage() {
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    displayBooks() {
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';

        this.books.forEach((book, index) => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book-card';
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Rating:</strong> ${'⭐'.repeat(book.rating)}</p>
                <p><strong>Review:</strong> ${book.review}</p>
                <p><small>Added on: ${book.dateAdded.toLocaleDateString()}</small></p>
                <button onclick="bookManager.removeBook(${index})" class="delete-btn">Delete Review</button>
            `;
            bookList.appendChild(bookElement);
        });
    }

    searchBooks(query) {
        const searchResults = this.books.filter(book => 
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );

        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';

        searchResults.forEach((book, index) => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book-card';
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Rating:</strong> ${'⭐'.repeat(book.rating)}</p>
                <p><strong>Review:</strong> ${book.review}</p>
                <p><small>Added on: ${book.dateAdded.toLocaleDateString()}</small></p>
                <button onclick="bookManager.removeBook(${index})" class="delete-btn">Delete Review</button>
            `;
            bookList.appendChild(bookElement);
        });
    }
}

// Initialize BookReviewManager
const bookManager = new BookReviewManager();

// Event listener for form submission
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const review = document.getElementById('review').value;
    const rating = parseInt(document.getElementById('rating').value);

    bookManager.addBook(title, author, review, rating);
    this.reset();
});

// Event listener for search
document.getElementById('searchInput').addEventListener('input', function(e) {
    const query = e.target.value;
    bookManager.searchBooks(query);
});

// Initial display of books
bookManager.displayBooks();