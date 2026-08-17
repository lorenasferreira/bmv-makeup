import Header from "./components/layout/Header/Header";
import Hero from "./components/sections/home/Hero/Hero";
import MeetBruno from "./components/sections/home/MeetBruno/MeetBruno";
import ExploreTheWork from "./components/sections/home/ExploreTheWork/ExploreTheWork";
import SelectedWork from "./components/sections/home/SelectedWork/SelectedWork";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <MeetBruno />
        <ExploreTheWork />
        <SelectedWork />
      </main>
    </>
  );
}

export default App;
