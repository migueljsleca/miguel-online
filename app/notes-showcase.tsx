import WorkListSection from "@/components/site/work-list-section";
import { getNotes } from "@/lib/notes";

export default async function NotesShowcase() {
  const items = await getNotes();

  return (
    <WorkListSection
      id="notes"
      title="NOTES"
      items={items.map((item) => ({
        href: `/notes/${item.slug}`,
        title: item.title,
        meta: item.meta,
        labels: [item.date || item.year].filter(Boolean),
      }))}
    />
  );
}
