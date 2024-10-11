import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Book,
  FileText,
  Atom,
  Clock,
  Brain,
  Sun,
  Moon,
  User,
  FileType,
} from "lucide-react";

interface Category {
  name: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  selectedAuthors: string[];
  toggleAuthor: (author: string) => void;
  selectedFormats: string[];
  toggleFormat: (format: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const categories: Category[] = [
  { name: "Ficción", icon: <Book className="h-4 w-4" /> },
  { name: "No ficción", icon: <FileText className="h-4 w-4" /> },
  { name: "Ciencia", icon: <Atom className="h-4 w-4" /> },
  { name: "Historia", icon: <Clock className="h-4 w-4" /> },
  { name: "Filosofía", icon: <Brain className="h-4 w-4" /> },
];

const authors = [
  "Gabriel García Márquez",
  "George Orwell",
  "Jane Austen",
  "Stephen King",
];
const formats = ["PDF", "EPUB", "MOBI", "TXT"];

export default function Sidebar({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  toggleCategory,
  selectedAuthors,
  toggleAuthor,
  selectedFormats,
  toggleFormat,
  darkMode,
  toggleDarkMode,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      } fixed h-full overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      } shadow-lg`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-xl font-semibold ${isExpanded ? "" : "hidden"}`}>
            Filtros
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label={isExpanded ? "Minimizar filtros" : "Expandir filtros"}
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>

        {isExpanded && (
          <ScrollArea className="flex-grow">
            <div className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="dark-mode"
                  className="text-sm flex items-center"
                >
                  {darkMode ? (
                    <Moon className="h-4 w-4 mr-2" />
                  ) : (
                    <Sun className="h-4 w-4 mr-2" />
                  )}
                  Modo {darkMode ? "oscuro" : "claro"}
                </Label>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                  className="data-[state=checked]:bg-blue-500"
                />
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar libros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 focus:border-blue-500"
                      : "bg-gray-50 border-gray-200 focus:border-blue-300"
                  } focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                />
              </div>

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  Categorías
                </h3>
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => toggleCategory(category.name)}
                    className={`flex items-center w-full p-2 rounded-md mb-1 transition-colors ${
                      selectedCategories.includes(category.name)
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {category.icon}
                    <span className="ml-2 text-sm">{category.name}</span>
                  </button>
                ))}
              </div>

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Autores
                </h3>
                {authors.map((author) => (
                  <button
                    key={author}
                    onClick={() => toggleAuthor(author)}
                    className={`flex items-center w-full p-2 rounded-md mb-1 transition-colors ${
                      selectedAuthors.includes(author)
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="text-sm">{author}</span>
                  </button>
                ))}
              </div>

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <FileType className="h-4 w-4 mr-2" />
                  Formatos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {formats.map((format) => (
                    <button
                      key={format}
                      onClick={() => toggleFormat(format)}
                      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                        selectedFormats.includes(format)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
