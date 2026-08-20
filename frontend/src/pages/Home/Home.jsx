import Hero from "../../components/sections/home/Hero/Hero";
import MeetBruno from "../../components/sections/home/MeetBruno/MeetBruno";
import ExploreTheWork from "../../components/sections/home/ExploreTheWork/ExploreTheWork";
import SelectedWork from "../../components/sections/home/SelectedWork/SelectedWork";
import WeddingsPreview from "../../components/sections/home/WeddingsPreview/WeddingsPreview";
import BehindTheBrush from "../../components/sections/home/BehindTheBrush/BehindTheBrush";
import KindWords from "../../components/sections/home/KindWords/KindWords";
import EducationPreview from "../../components/sections/home/EducationPreview/EducationPreview";
import InstagramPreview from "../../components/sections/home/InstagramPreview/InstagramPreview";
import FinalCTA from "../../components/sections/home/FinalCTA/FinalCTA";

function Home() {
  return (
    <>
        <Hero />
        <MeetBruno />
        <ExploreTheWork />
        <SelectedWork />
        <WeddingsPreview />
        <BehindTheBrush />
        <KindWords />
        <EducationPreview />
        <InstagramPreview />
        <FinalCTA />
    </>
  );
}

export default Home;
