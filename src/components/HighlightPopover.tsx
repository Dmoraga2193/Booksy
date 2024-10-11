import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HighlightPopoverProps {
  onHighlight: (color: string, tag: string) => void;
  onClose: () => void;
}

const colors = ["yellow", "green", "blue", "red", "purple"];

export default function HighlightPopover({
  onHighlight,
  onClose,
}: HighlightPopoverProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [tag, setTag] = useState("");

  const handleHighlight = () => {
    if (selectedColor) {
      onHighlight(selectedColor, tag);
      onClose();
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80"
      onClick={(e) => e.stopPropagation()}
    >
      <h4 className="font-medium mb-3">Selecciona un color y una etiqueta</h4>
      <div className="flex space-x-2 mb-3">
        {colors.map((color) => (
          <Button
            key={color}
            type="button"
            className={`w-8 h-8 rounded-full ${
              color === "yellow"
                ? "bg-yellow-200 hover:bg-yellow-300"
                : color === "green"
                ? "bg-green-200 hover:bg-green-300"
                : color === "blue"
                ? "bg-blue-200 hover:bg-blue-300"
                : color === "red"
                ? "bg-red-200 hover:bg-red-300"
                : "bg-purple-200 hover:bg-purple-300"
            } ${
              selectedColor === color
                ? "ring-2 ring-offset-2 ring-blue-500"
                : ""
            }`}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      <div className="space-y-2 mb-3">
        <Label htmlFor="tag">Etiqueta (opcional)</Label>
        <Input
          id="tag"
          type="text"
          placeholder="Ej: Frase Romántica"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={handleHighlight}
          disabled={!selectedColor}
        >
          Destacar
        </Button>
      </div>
    </div>
  );
}
