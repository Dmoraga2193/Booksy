import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface FileUploadProps {
  darkMode: boolean;
}

export default function FileUpload({ darkMode }: FileUploadProps) {
  return (
    <div
      className={` p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Subir nuevo documento</h2>
      <div className="flex items-center space-x-2">
        <Input type="file" id="file-upload" className="hidden" />
        <label
          htmlFor="file-upload"
          className={`cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${
            darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } h-10 py-2 px-4`}
        >
          <Upload className="mr-2 h-4 w-4" /> Seleccionar archivo
        </label>
        <Button
          className={`${
            darkMode
              ? "bg-green-600 hover:bg-green-700"
              : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          Subir
        </Button>
      </div>
    </div>
  );
}
