import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import BookList from "../components/BookList";
import BookReader from "../components/BookReader";
import FileUpload from "../components/FileUpload";

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

export default function Home() {
  const [books] = useState<Book[]>([
    {
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      category: "Ficción",
      format: "PDF",
      progress: 30,
      totalPages: 417,
      currentPage: 125,
      content:
        "Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo...",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      category: "Ficción",
      format: "EPUB",
      progress: 50,
      totalPages: 328,
      currentPage: 164,
      content:
        "Era un día luminoso y frío de abril y los relojes daban las trece. Winston Smith, con la barbilla clavada en el pecho en su esfuerzo por burlar el molestísimo viento, se deslizó rápidamente por entre las puertas de cristal de las Casas de la Victoria, aunque no con la suficiente rapidez para evitar que una ráfaga polvorienta se colara con él.",
    },
    {
      id: 3,
      title: "Orgullo y prejuicio",
      author: "Jane Austen",
      category: "Ficción",
      format: "MOBI",
      progress: 75,
      totalPages: 432,
      currentPage: 324,
      content:
        "Es una verdad mundialmente reconocida que un hombre soltero, poseedor de una gran fortuna, necesita una esposa.",
    },
    {
      id: 4,
      title: "It",
      author: "Stephen King",
      category: "Ficción",
      format: "PDF",
      progress: 20,
      totalPages: 1138,
      currentPage: 227,
      content:
        "El terror, que no terminará en otros veintiocho años —si es que termina alguna vez—, empezó, hasta donde yo sé o puedo contar, con un barco de papel que flotaba por una alcantarilla henchida de lluvia.",
    },
    {
      id: 5,
      title: "Una breve historia del tiempo",
      author: "Stephen Hawking",
      category: "Ciencia",
      format: "PDF",
      progress: 60,
      totalPages: 256,
      currentPage: 153,
      content:
        "Vivimos en un universo extraño y maravilloso. Se necesita una extraordinaria imaginación para apreciar su edad, tamaño, violencia e incluso belleza.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [warmBackground, setWarmBackground] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(book.category)) &&
      (selectedAuthors.length === 0 || selectedAuthors.includes(book.author)) &&
      (selectedFormats.length === 0 || selectedFormats.includes(book.format))
  );

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleAuthor = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  const toggleFormat = (format: string) => {
    setSelectedFormats((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format]
    );
  };

  const handleReadBook = (book: Book) => {
    setCurrentBook(book);
    setIsMenuOpen(false);
  };

  const handleBackToLibrary = () => {
    setCurrentBook(null);
    setIsMenuOpen(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        selectedAuthors={selectedAuthors}
        toggleAuthor={toggleAuthor}
        selectedFormats={selectedFormats}
        toggleFormat={toggleFormat}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isMenuOpen && !currentBook ? "ml-64" : "ml-0"
        }`}
      >
        {currentBook ? (
          <BookReader
            book={currentBook}
            warmBackground={warmBackground}
            setWarmBackground={setWarmBackground}
            handleBackToLibrary={handleBackToLibrary}
          />
        ) : (
          <>
            <BookList
              books={filteredBooks}
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
              handleReadBook={handleReadBook}
              darkMode={darkMode}
            />
            <FileUpload darkMode={darkMode} />
          </>
        )}
      </div>
    </div>
  );
}
