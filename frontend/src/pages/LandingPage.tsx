import FlexMainDiv from "../components/ui/FlexMainDiv";
import FlexNavBar from "../components/ui/FlexNavBar";

export default function LandingPage() {
  return (
    <FlexMainDiv >
        <FlexNavBar />

        <main className="flex-grow relative">
            <img 
                src="/cartoon.png" 
                alt="Landing Page Image" 
                className="absolute inset-0 w-full h-full"
            />
        </main>
    </FlexMainDiv>
  );
}
