export function getProjectLabels(item: {
  category: string;
  deliverables: string[];
}) {
  const labels = [item.category, item.deliverables[0]].filter(
    (value): value is string => Boolean(value),
  );

  return Array.from(new Set(labels)).slice(0, 2);
}
