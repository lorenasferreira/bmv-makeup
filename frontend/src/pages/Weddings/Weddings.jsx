import WeddingsHero from "../../components/sections/Weddings/WeddingsHero/WeddingsHero";
import WeddingsIntro from "../../components/sections/Weddings/WeddingsIntro/WeddingsIntro";
import WeddingsProcess from "../../components/sections/Weddings/WeddingsProcess/WeddingsProcess";
import WeddingsReviews from "../../components/sections/Weddings/WeddingsReviews/WeddingsReviews";
import WeddingsPartners from "../../components/sections/Weddings/WeddingsPartners/WeddingsPartners";
import WeddingsCTA from "../../components/sections/Weddings/WeddingsCTA/WeddingsCTA";

function Weddings() {
  return (
    <main>
      <WeddingsHero />
      <WeddingsIntro />
      <WeddingsProcess />
      <WeddingsReviews />
      <WeddingsPartners />
      <WeddingsCTA />
    </main>
  );
}

export default Weddings;
