import Header from "./components/layout/Header/Header";
import Hero from "./components/sections/home/Hero/Hero";
import MeetBruno from "./components/sections/home/MeetBruno/MeetBruno";
import ExploreTheWork from "./components/sections/home/ExploreTheWork/ExploreTheWork";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <MeetBruno />
        <ExploreTheWork />
      </main>
    </>
  );
}

export default App;
