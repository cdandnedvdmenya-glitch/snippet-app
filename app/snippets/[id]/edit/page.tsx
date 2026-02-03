// ЦЕЛЬ: Редактировать сниппет
import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/SnippetEditForm";

interface SnippetEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const { id } = await props.params;
  const snippetId = parseInt(id);
  const snippet = await db.snippet.findUnique({ where: { id: snippetId } });
  
  if (!snippet) {
    return notFound();
  }

  return <SnippetEditForm snippet={snippet} />;
}