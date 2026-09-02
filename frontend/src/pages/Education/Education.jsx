import EducationHero from "../../components/sections/Education/EducationHero/EducationHero";
import EducationIntro from "../../components/sections/Education/EducationIntro/EducationIntro";
import EducationCourses from "../../components/sections/Education/EducationCourses/EducationCourses";
import EducationProfessional from "../../components/sections/Education/EducationProfessional/EducationProfessional";
import EducationCTA from "../../components/sections/Education/EducationCTA/EducationCTA";

function Education() {
  return (
    <main>
      <EducationHero />
      <EducationIntro />
      <EducationCourses />
      <EducationProfessional />
      <EducationCTA />
    </main>
  );
}

export default Education;
