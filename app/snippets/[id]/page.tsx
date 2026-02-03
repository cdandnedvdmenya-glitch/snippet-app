// ЦЕЛЬ: Показать ОДИН сниппет
// ДЕЙСТВИЕ: Ищем по ID → показываем
// КЛЮЧЕВОЙ КОД: await db.snippet.findUnique()
import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteSnippet } from "@/actions";

interface SnippetPageProps {
  params: Promise<{ id: string }>;
}

export default async function SnippetPage(props: SnippetPageProps) {
  const { id } = await props.params;
  const snippetId = parseInt(id);
  const snippet = await db.snippet.findUnique({ where: { id: snippetId } });
  
  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);
  
  return (  
    <div>
        <div className="mb-4">
        <Link 
          href="/"
          className="text-black-500 hover:text-blue-700"
        >
          ← Назад к списку
        </Link>
      </div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link 
            className="p-2 border border-gray-300 rounded" 
            href={`/snippets/${snippet.id}/edit`}
          >
            Редактировать
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border border-gray-300 rounded">
              Удалить
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border border-gray-300 bg-gray-300">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

  export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();

    return snippets.map(snippet => ({
      id: snippet.id.toString(),
    }));
  }