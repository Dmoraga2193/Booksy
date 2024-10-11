import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Bookmark,
  Book,
  FileText,
  Atom,
  Clock,
  Brain,
} from "lucide-react";

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

interface BookCardProps {
  book: Book;
  handleReadBook: (book: Book) => void;
  darkMode: boolean;
}

const getCategoryIcon = (categoryName: string) => {
  const categories = [
    { name: "Ficción", icon: <Book className="h-4 w-4 mr-2" /> },
    { name: "No ficción", icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: "Ciencia", icon: <Atom className="h-4 w-4 mr-2" /> },
    { name: "Historia", icon: <Clock className="h-4 w-4 mr-2" /> },
    { name: "Filosofía", icon: <Brain className="h-4 w-4 mr-2" /> },
  ];
  const category = categories.find((c) => c.name === categoryName);
  return category ? category.icon : <Bookmark className="h-4 w-4 mr-2" />;
};

export default function BookCard({
  book,
  handleReadBook,
  darkMode,
}: BookCardProps) {
  return (
    <Card
      className={`border-0 shadow-sm hover:shadow-md transition-shadow duration-200 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{book.title}</CardTitle>
        <CardDescription
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {book.author}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2 text-sm">
          {getCategoryIcon(book.category)}
          <span>{book.category}</span>
        </div>
        <p className="text-sm">Formato: {book.format}</p>
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Progreso</span>
            <span>{book.progress}%</span>
          </div>
          <Progress
            value={book.progress}
            className="w-full"
            aria-label={`Progreso de lectura: ${book.progress}%`}
          />
        </div>
        <p
          className={`text-xs mt-2 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Página {book.currentPage} de {book.totalPages}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => handleReadBook(book)}
        >
          <BookOpen className="mr-2 h-4 w-4" /> Leer
        </Button>
      </CardFooter>
    </Card>
  );
}
