'use server';

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code }
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: {id}
  });
  redirect('/');
  
}

export async function createSnippet(formState: { message: string }, formData: FormData) {
  // Получение данных
  const title = formData.get("title");
  const code = formData.get("code");

  // Валидация заголовка
  if (!title || typeof title !== 'string' || title.length < 3) {
    return { message: "Название сниппета должно состоять минимум из 3 символов." };
  }

  // Валидация кода
  if (!code || typeof code !== 'string' || code.length < 10) {
    return { message: "Код сниппета должен состоять минимум из 10 символов." };
  }

  try {
    // Создание новой записи
    await db.snippet.create({
      data: { title, code },
    });
  } catch (error: unknown) {
    return (error instanceof Error) ? { message: error.message } : { message: 'Что-то пошло не так' };
  }
  revalidatePath(`/`);
  // Перенаправление на домашнюю страницу
  redirect(`/`);
}
