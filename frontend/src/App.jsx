import Header from "./components/layout/Header/Header";
import Hero from "./components/sections/home/Hero/Hero";
import MeetBruno from "./components/sections/home/MeetBruno/MeetBruno";
import ExploreTheWork from "./components/sections/home/ExploreTheWork/ExploreTheWork";
import SelectedWork from "./components/sections/home/SelectedWork/SelectedWork";
import WeddingsPreview from "./components/sections/home/WeddingsPreview/WeddingsPreview";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <MeetBruno />
        <ExploreTheWork />
        <SelectedWork />
        <WeddingsPreview />
      </main>
    </>
  );
}

export default App;
