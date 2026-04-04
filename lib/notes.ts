export type NoteItem = {
  slug: string;
  title: string;
  meta: string;
  summary: string;
  year: string;
  category: string;
  location: string;
  deliverables: string[];
  previewImage: string;
  content: string;
};

const noteItems: NoteItem[] = [
  {
    slug: "learning-in-public",
    title: "Learning in public",
    meta: "Thoughts, learnings, side paths",
    summary:
      "A place to collect what I’m learning while building, testing ideas, and figuring things out in real time.",
    year: "2026",
    category: "Notes",
    location: "Madeira, PT",
    deliverables: ["Thoughts", "Learnings"],
    previewImage: "",
    content: `
<TextBlock>
  This space is for the things that don’t always fit neatly inside a project:
  ideas that are still forming, observations from making, and lessons that
  become clearer after shipping something.

  Sometimes that means writing about process. Sometimes it means sharing a
  small shift in perspective, a tool I’m testing, or a question I keep coming
  back to while building.

  It’s less about polished conclusions and more about keeping track of what’s
  changing, what’s working, and what feels worth exploring further.
</TextBlock>
`,
  },
];

export async function getNotes(): Promise<NoteItem[]> {
  return noteItems;
}

export async function getNoteBySlug(slug: string): Promise<NoteItem | null> {
  return noteItems.find((item) => item.slug === slug) ?? null;
}
