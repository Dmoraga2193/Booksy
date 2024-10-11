import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark, X, ArrowRight } from "lucide-react";

interface Highlight {
  id: string;
  text: string;
  color: string;
  tag: string;
  startIndex: number;
  endIndex: number;
}

interface HighlightsListProps {
  highlights: Highlight[];
  onRemove: (id: string) => void;
  onScrollTo: (startIndex: number, highlightId: string) => void;
}

export default function HighlightsList({
  highlights,
  onRemove,
  onScrollTo,
}: HighlightsListProps) {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-4 bg-white border-b">
        <h3 className="text-lg font-semibold flex items-center">
          <Bookmark className="mr-2 h-5 w-5 text-blue-500" />
          Textos destacados
        </h3>
      </div>
      <ScrollArea className="flex-grow">
        <ul className="divide-y divide-gray-200">
          {highlights.map((highlight) => (
            <li
              key={highlight.id}
              className="p-4 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 mt-1.5 bg-${highlight.color}-200 border-2 border-${highlight.color}-400`}
                />
                <div className="flex-grow">
                  <p className="text-sm text-gray-800 line-clamp-2">
                    {highlight.text}
                  </p>
                  {highlight.tag && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-800 rounded-full">
                      {highlight.tag}
                    </span>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() =>
                        onScrollTo(highlight.startIndex, highlight.id)
                      }
                    >
                      Ir al texto
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-red-600 hover:text-red-700 hover:bg-red-100"
                      onClick={() => onRemove(highlight.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
      {highlights.length === 0 && (
        <div className="flex-grow flex items-center justify-center text-gray-500">
          <p>No hay textos destacados</p>
        </div>
      )}
    </div>
  );
}
