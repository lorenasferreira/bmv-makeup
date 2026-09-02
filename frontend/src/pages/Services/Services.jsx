import ServicesHero from "../../components/sections/Services/ServicesHero/ServicesHero";
import ServicesOverview from "../../components/sections/Services/ServicesOverview/ServicesOverview";
import ServicesExperience from "../../components/sections/Services/ServicesExperience/ServicesExperience";
import ServicesCTA from "../../components/sections/Services/ServicesCTA/ServicesCTA";

function Services() {
  return (
    <main>
      <ServicesHero />
      <ServicesOverview />
      <ServicesExperience />
      <ServicesCTA />
    </main>
  );
}

export default Services;
