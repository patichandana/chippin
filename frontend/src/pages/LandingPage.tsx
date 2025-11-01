import FlexMainDiv from "../components/ui/FlexMainDiv";
import FlexNavBar from "../components/ui/FlexNavBar";
import SvgRenderer from "../components/ui/SvgRenderer";

export default function LandingPage() {
  // const theme = {
  //   primaryColor: "#6C63FF", // Example light theme color
  // };
  return (
    <FlexMainDiv >
        <FlexNavBar />

        <main className="flex-grow flex items-center justify-center"> 
            {/* <img 
                src="/cartoon.png" 
                alt="Landing Page Image" 
                className="absolute inset-0 w-full h-full"
            /> */}
            
              {/* nudge down: small on mobile, larger on desktop */}
              <div className="translate-y-6 md:translate-y-10">
                <SvgRenderer name="pizza" className="w-64 h-auto p-4" />
              </div>
            {/* <SvgRenderer name="trip" 
            className="max-w-md mx-auto mt-10"
            />  */}
        </main>
    </FlexMainDiv>
  );
}
