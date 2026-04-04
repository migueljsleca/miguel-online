import WorkListSection from "@/components/site/work-list-section";
import type { WorkListSectionItem } from "@/components/site/work-list-section";

type WorkPlayShowcaseProps = {
  items: WorkListSectionItem[];
};

export default function WorkPlayShowcase({
  items,
}: WorkPlayShowcaseProps) {
  return (
    <WorkListSection
      id="work-play"
      title="WORK / PLAY"
      items={items}
    />
  );
}
