import PortfolioHero from "../../components/sections/Portfolio/PortfolioHero/PortfolioHero";
import PortfolioGallery from "../../components/sections/Portfolio/PortfolioGallery/PortfolioGallery";
import PortfolioCTA from "../../components/sections/Portfolio/PortfolioCTA/PortfolioCTA";

function Portfolio() {
  return (
    <main>
      <PortfolioHero />
      <PortfolioGallery />
      <PortfolioCTA />
    </main>
  );
}

export default Portfolio;
