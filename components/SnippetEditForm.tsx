'use client';
import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { editSnippet } from "@/actions";
import Link from "next/link";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);
  
  return (
    <div>
      <div className="mb-4">
        <Link 
          href={`/snippets/${snippet.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Назад к сниппету
        </Link>
      </div>

      <div className="mb-4">
        <h1 className="text-xl font-bold mb-2">Редактирование сниппета</h1>
        <p className="text-gray-600">{snippet.title}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Код</label>
        <div className="border border-gray-300 rounded overflow-hidden">
          <Editor
            height="50vh"
            theme="vs-light"
            language="javascript"
            value={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <form action={editSnippetAction} className="flex-1">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-300 text-black rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Сохранить изменения
          </button>
        </form>
        
        <Link
          href={`/snippets/${snippet.id}`}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Отмена
        </Link>
      </div>
    </div>
  );
}