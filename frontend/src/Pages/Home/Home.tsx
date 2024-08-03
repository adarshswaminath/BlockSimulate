import LatestBlocks from "./LatestBlocks";

import BlockDetails from "./BlockDetails";
import Hero from "./Hero";

export default function Home() {
  return (
    <section className="p-2 md:p-4 lg:p-8">
      <Hero/>
      <BlockDetails/>
      <LatestBlocks/>
    </section>
  )
}
