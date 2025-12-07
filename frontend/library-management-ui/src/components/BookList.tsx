import { useState, useEffect } from "react";
import type { Book } from "../types";
import { booksAPI } from "../services/api";
import BookForm from "./BookForm";
import "./BookList.css";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await booksAPI.getAll();
      setBooks(data);
      setError("");
    } catch {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await booksAPI.delete(id);
        setBooks(books.filter((book) => book.id !== id));
      } catch {
        setError("Failed to delete book");
      }
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBook(null);
    fetchBooks();
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h1>Explore Books</h1>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          + Add New Book
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && <BookForm book={editingBook} onClose={handleFormClose} />}

      {filteredBooks.length === 0 ? (
        <div className="no-books">
          <p>No books found. Start by adding your first book!</p>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-card-header">
                <h3>{book.title}</h3>
                <span className="book-year">{book.publishedYear}</span>
              </div>
              <p className="book-author">by {book.author}</p>
              <p className="book-description">{book.description}</p>
              <div className="book-card-actions">
                <button className="btn-edit" onClick={() => handleEdit(book)}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
