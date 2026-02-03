// ЦЕЛЬ: Показать все сниппеты
// ДЕЙСТВИЕ: Запрашиваем ВСЕ записи из БД
// КЛЮЧЕВОЙ КОД: await db.snippet.findMany()
import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        className="flex items-center justify-between p-2 border rounded border-gray-300"
        href={`/snippets/${snippet.id}`}
        key={snippet.id}
      >
        <div>{snippet.title}</div>
        <div>Подробнее</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Сниппеты</h1>
        <Link
          className="border border-gray-300 p-2 rounded"
          href="/snippets/new"
        >
          Создать сниппет
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {renderedSnippets}
      </div>
    </div>
  );
}
