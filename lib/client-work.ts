export type ClientWorkItem = {
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

const clientWorkItems: ClientWorkItem[] = [
  {
    slug: "web-systems-launches",
    title: "Some client work",
    meta: "Marketing systems, web direction, launch support",
    summary:
      "A mix of launch pages, service surfaces, and web systems designed to help teams move faster without losing clarity.",
    year: "2024 - Now",
    category: "NDA protected",
    location: "Remote",
    deliverables: [],
    previewImage: "",
    content: `
<TextBlock>
  Most of this work sat between design craft and execution: shaping page
  structures, refining storytelling, and giving teams reusable patterns they
  could keep building on.

  Because much of it sits behind NDA constraints, I keep the details high
  level. What I can share is the kind of work itself: helping teams launch
  more clearly, design more intentionally, and create web systems that are
  easier to evolve over time.

  My role usually covered concept direction, page design, content pacing, and
  the details that make a web experience feel considered. The names and
  specifics stay private, but the focus was always the same: stronger rhythm,
  clearer communication, and better digital experiences.
</TextBlock>
`,
  },
];

export async function getClientWorkItems(): Promise<ClientWorkItem[]> {
  return clientWorkItems;
}

export async function getClientWorkBySlug(
  slug: string,
): Promise<ClientWorkItem | null> {
  return clientWorkItems.find((item) => item.slug === slug) ?? null;
}
