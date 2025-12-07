import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import type { Book, CreateBookRequest, UpdateBookRequest } from "../types";
import { booksAPI } from "../services/api";
import "./BookForm.css";

interface BookFormProps {
  book: Book | null;
  onClose: () => void;
}

export default function BookForm({ book, onClose }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishedYear, setPublishedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
      setPublishedYear(book.publishedYear);
    }
  }, [book]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (book) {
        const updateData: UpdateBookRequest = {
          id: book.id,
          title,
          author,
          description,
          publishedYear,
        };
        await booksAPI.update(book.id, updateData);
      } else {
        const createData: CreateBookRequest = {
          title,
          author,
          description,
          publishedYear,
        };
        await booksAPI.create(createData);
      }
      onClose();
    } catch {
      setError("Failed to save book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{book ? "Edit Book" : "Add New Book"}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="publishedYear">Published Year *</label>
            <input
              type="number"
              id="publishedYear"
              value={publishedYear}
              onChange={(e) => setPublishedYear(parseInt(e.target.value))}
              min="1000"
              max={new Date().getFullYear()}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              disabled={loading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Saving..." : book ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
