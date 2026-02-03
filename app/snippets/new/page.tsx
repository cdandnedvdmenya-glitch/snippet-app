// app/snippets/new/page.tsx  
// ЦЕЛЬ: Создать новый сниппет
// ДЕЙСТВИЕ: Принимаем форму → сохраняем в БД
// КЛЮЧЕВОЙ КОД: await db.snippet.create()
'use client'
import React from "react";
import { useActionState, startTransition } from "react";
import { createSnippet } from '@/actions';

export default function SnippetCreatePage() {
  const [formState, action] = useActionState(createSnippet, { message: '' });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold m-3">Создать сниппет</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-16" htmlFor="title">Название</label>
          <input name="title" className="border rounded p-2 w-full" id="title"/>
        </div>
        <div className="flex gap-4">
          <label className="w-16" htmlFor="code">Код</label>
          <textarea name="code" className="border rounded p-2 w-full" id="code"/>
        </div>
      </div>
      {formState.message ? (
        <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
          {formState.message}
        </div>
      ) : null}
      <button type="submit" className="rounded p-2 bg-blue-200">Создать</button>
    </form>
  );
}