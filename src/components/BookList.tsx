import React from "react";
import BookCard from "./BookCard";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  format: string;
  progress: number;
  totalPages: number;
  currentPage: number;
  content: string;
}

interface BookListProps {
  books: Book[];
  isMenuOpen: boolean;
  toggleMenu: () => void;
  handleReadBook: (book: Book) => void;
  darkMode: boolean;
}

export default function BookList({
  books,
  handleReadBook,
  darkMode,
}: BookListProps) {
  return (
    <div
      className={`p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mi Biblioteca</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            handleReadBook={handleReadBook}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
}
