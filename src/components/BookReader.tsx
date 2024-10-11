import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  User,
  BookOpen,
  FileText,
  Bookmark,
  Book,
  Atom,
  Clock,
  Brain,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
} from "lucide-react";
import HighlightPopover from "./HighlightPopover";
import HighlightsList from "./HighlightsList";

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

interface Highlight {
  id: string;
  text: string;
  color: string;
  tag: string;
  startIndex: number;
  endIndex: number;
}

interface BookReaderProps {
  book: Book;
  warmBackground: boolean;
  setWarmBackground: (value: boolean) => void;
  handleBackToLibrary: () => void;
}

const getCategoryIcon = (categoryName: string) => {
  const categories = [
    { name: "Ficción", icon: <Book className="h-4 w-4" /> },
    { name: "No ficción", icon: <FileText className="h-4 w-4" /> },
    { name: "Ciencia", icon: <Atom className="h-4 w-4" /> },
    { name: "Historia", icon: <Clock className="h-4 w-4" /> },
    { name: "Filosofía", icon: <Brain className="h-4 w-4" /> },
  ];
  const category = categories.find((c) => c.name === categoryName);
  return category ? category.icon : <Bookmark className="h-4 w-4" />;
};

export default function BookReader({
  book,
  warmBackground,
  setWarmBackground,
  handleBackToLibrary,
}: BookReaderProps) {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selection, setSelection] = useState<{
    text: string;
    startIndex: number;
    endIndex: number;
    top: number;
    left: number;
  } | null>(null);
  const [isHighlightsOpen, setIsHighlightsOpen] = useState(false);
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(
    null
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cargar destacados guardados
    const savedHighlights = localStorage.getItem(`book_${book.id}_highlights`);
    if (savedHighlights) {
      setHighlights(JSON.parse(savedHighlights));
    }
  }, [book.id]);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const selection = window.getSelection();
      const selectedText = selection?.toString();
      if (selectedText && contentRef.current) {
        const range = selection?.getRangeAt(0);
        if (range) {
          const preSelectionRange = range.cloneRange();
          preSelectionRange.selectNodeContents(contentRef.current);
          preSelectionRange.setEnd(range.startContainer, range.startOffset);
          const startIndex = preSelectionRange.toString().length;
          const endIndex = startIndex + selectedText.length;

          const rect = range.getBoundingClientRect();
          const contentRect = contentRef.current.getBoundingClientRect();
          setSelection({
            text: selectedText,
            startIndex,
            endIndex,
            top: rect.top - contentRect.top,
            left: rect.left - contentRect.left,
          });
        }
      } else if (
        !e.target ||
        !(e.target as HTMLElement).closest(".highlight-popover")
      ) {
        setSelection(null);
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener("mouseup", handleMouseUp);
      return () => content.removeEventListener("mouseup", handleMouseUp);
    }
  }, []);

  const addHighlight = (color: string, tag: string) => {
    if (selection) {
      const newHighlight: Highlight = {
        id: Date.now().toString(),
        text: selection.text,
        color,
        tag,
        startIndex: selection.startIndex,
        endIndex: selection.endIndex,
      };
      const updatedHighlights = [...highlights, newHighlight];
      setHighlights(updatedHighlights);
      setSelection(null);
      // Guardar destacados actualizados
      localStorage.setItem(
        `book_${book.id}_highlights`,
        JSON.stringify(updatedHighlights)
      );
    }
  };

  const removeHighlight = (id: string) => {
    const updatedHighlights = highlights.filter((h) => h.id !== id);
    setHighlights(updatedHighlights);
    // Guardar destacados actualizados
    localStorage.setItem(
      `book_${book.id}_highlights`,
      JSON.stringify(updatedHighlights)
    );
  };

  const scrollToHighlight = (startIndex: number, highlightId: string) => {
    if (contentRef.current) {
      const range = document.createRange();
      const textNode = contentRef.current.firstChild;
      if (textNode) {
        range.setStart(textNode, startIndex);
        range.setEnd(textNode, startIndex);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        range.startContainer.parentElement?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
    setActiveHighlightId(highlightId);
    setTimeout(() => setActiveHighlightId(null), 2000);
  };

  const toggleHighlights = () => {
    setIsHighlightsOpen(!isHighlightsOpen);
  };

  const renderContent = () => {
    let lastIndex = 0;
    const result = [];
    const sortedHighlights = [...highlights].sort(
      (a, b) => a.startIndex - b.startIndex
    );

    for (const highlight of sortedHighlights) {
      if (highlight.startIndex > lastIndex) {
        result.push(book.content.slice(lastIndex, highlight.startIndex));
      }
      result.push(
        <span
          key={highlight.id}
          className={`bg-${highlight.color}-200 cursor-pointer ${
            activeHighlightId === highlight.id ? "animate-pulse" : ""
          }`}
          onClick={() => scrollToHighlight(highlight.startIndex, highlight.id)}
          title={highlight.tag}
        >
          {book.content.slice(highlight.startIndex, highlight.endIndex)}
        </span>
      );
      lastIndex = highlight.endIndex;
    }

    if (lastIndex < book.content.length) {
      result.push(book.content.slice(lastIndex));
    }

    return result;
  };

  return (
    <div
      className={`min-h-screen ${
        warmBackground ? "bg-amber-50" : "bg-white"
      } relative transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={handleBackToLibrary}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Volver a la biblioteca
          </Button>
          <div className="flex items-center space-x-3">
            <Label
              htmlFor="warm-mode"
              className="text-sm text-gray-600 cursor-pointer flex items-center"
            >
              {warmBackground ? (
                <Sun className="h-4 w-4 mr-2 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 mr-2 text-gray-400" />
              )}
              Modo cálido
            </Label>
            <Switch
              id="warm-mode"
              checked={warmBackground}
              onCheckedChange={setWarmBackground}
              className="data-[state=checked]:bg-amber-500"
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{book.title}</h1>
        <div className="flex flex-wrap gap-3 mb-8">
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200 px-3 py-1 text-sm flex items-center"
          >
            <User className="h-4 w-4 mr-2" />
            {book.author}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200 px-3 py-1 text-sm flex items-center"
          >
            {getCategoryIcon(book.category)}
            <span className="ml-2">{book.category}</span>
          </Badge>
          <Badge
            variant="secondary"
            className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-200 px-3 py-1 text-sm flex items-center"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            {book.totalPages} páginas
          </Badge>
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors duration-200 px-3 py-1 text-sm flex items-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            Página {book.currentPage} de {book.totalPages}
          </Badge>
        </div>
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progreso de lectura</span>
            <span className="font-medium">
              {Math.round((book.currentPage / book.totalPages) * 100)}%
            </span>
          </div>
          <Progress
            value={(book.currentPage / book.totalPages) * 100}
            className="w-full h-2"
            aria-label={`Progreso de lectura: ${Math.round(
              (book.currentPage / book.totalPages) * 100
            )}%`}
          />
        </div>
        <div
          ref={contentRef}
          className={`mb-8 p-8 rounded-lg shadow-md ${
            warmBackground
              ? "bg-amber-100 text-amber-900"
              : "bg-white text-gray-800"
          } relative transition-colors duration-300 text-lg leading-relaxed`}
        >
          {renderContent()}
          {selection && (
            <div
              className="highlight-popover"
              style={{
                position: "absolute",
                top: `${selection.top}px`,
                left: `${selection.left}px`,
                zIndex: 10,
              }}
            >
              <HighlightPopover
                onHighlight={addHighlight}
                onClose={() => setSelection(null)}
              />
            </div>
          )}
        </div>
      </div>
      {highlights.length > 0 && (
        <>
          <Button
            onClick={toggleHighlights}
            className={`fixed top-1/2 transform -translate-y-1/2 ${
              isHighlightsOpen ? "left-80" : "left-0"
            } z-50 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-full shadow-lg transition-all duration-300 ease-in-out`}
            aria-label={
              isHighlightsOpen
                ? "Cerrar lista de destacados"
                : "Abrir lista de destacados"
            }
          >
            {isHighlightsOpen ? (
              <ChevronLeft className="h-6 w-6" />
            ) : (
              <ChevronRight className="h-6 w-6" />
            )}
          </Button>
          <div
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
              isHighlightsOpen ? "translate-x-0" : "-translate-x-full"
            } z-40`}
          >
            <HighlightsList
              highlights={highlights}
              onRemove={removeHighlight}
              onScrollTo={(startIndex, highlightId) =>
                scrollToHighlight(startIndex, highlightId)
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
