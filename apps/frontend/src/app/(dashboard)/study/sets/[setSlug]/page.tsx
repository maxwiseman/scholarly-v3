import { sets } from "../../sets";
import { Flashcard } from "./flashcard";

export default function Page({
  params,
}: {
  params: { setSlug: string };
}): React.ReactElement {
  const setData = sets.filter((set) => set.slug === params.setSlug)[0];
  if (!setData) {
    return <div>Set not found</div>;
  }
  return (
    <div className="xl:gird-cols-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:gap-6 xl:grid-cols-3 xl:gap-8">
      {setData.cards.map((card) => (
        <Flashcard card={card} key={card.front.heading} />
      ))}
    </div>
  );
}
