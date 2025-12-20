import FlexMainDiv from "../components/ui/FlexMainDiv";
import FlexNavBar from "../components/ui/FlexNavBar";
import SvgRenderer from "../components/ui/SvgRenderer";
import Footer from "../components/ui/Footer";

export default function LandingPage() {
  // const theme = {
  //   primaryColor: "#6C63FF", // Example light theme color
  // };
  return (
    <FlexMainDiv >
        <FlexNavBar />

        <main className="flex-grow flex flex-col md:flex-row items-center justify-between px-6 md:px-16 mt-10 md:mt-0"> 
            {/* LEFT: Headline + One-liner */}
            <div className="max-w-xl text-center md:text-left space-y-4">
              <h1 className="text-blue-500 text-4xl md:text-6xl font-bold">
                chippin
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Chip in, split easy
              </p>
            </div>

            {/* RIGHT: SVG */}
            {/* nudge down: small on mobile, larger on desktop */}
              <div className="flex justify-center">
                <SvgRenderer name="pizza" className="h-auto p-4" />
              </div>
            {/* <SvgRenderer name="trip" 
            className="max-w-md mx-auto mt-10"
            />  */}
        </main>
        <Footer />
    </FlexMainDiv>
  );
}
