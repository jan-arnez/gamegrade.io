import step4 from "@/assets/tutorial/Group 37.png";
import step3 from "@/assets/tutorial/Group 38.png";
import step2 from "@/assets/tutorial/Group 39.png";
import step1 from "@/assets/tutorial/Group 40.png";
import Image from "next/image";

const Tutorial = () => {
  return (
    <div>
      <div className="text-4xl font-medium">Tutorial</div>
      <div className="mx-auto max-w-[800px] space-y-6 text-center">
        <div className="text-lg">
          <span className="font-medium">Step 1:</span> Navigate to data source
          tab
        </div>
        <Image
          src={step1}
          alt="Step 1"
          className="mx-auto max-h-[500px] w-auto"
        />
        <div className="text-lg">
          <span className="font-medium">Step 2:</span> Add data source by
          pasting your lecture inside the text area
        </div>
        <Image
          src={step2}
          alt="Step 2"
          className="mx-auto max-h-[500px] w-auto"
        />
        <div className="text-lg">
          <span className="font-medium">Step 3:</span> Go back to the home page
          and press - Play Now
        </div>
        <Image
          src={step3}
          alt="Step 3"
          className="mx-auto max-h-[500px] w-auto"
        />
        <div className="text-lg">
          <span className="font-medium">Step 4:</span> Select the number of
          questions you want to generate. *Optionally you can select a time
          limit. Press - Generate Quiz and your quiz will be generated shortly.
          You will get redirected and the game will start immediately.
        </div>
        <Image
          src={step4}
          alt="Step 4"
          className="mx-auto max-h-[500px] w-auto"
        />
      </div>
    </div>
  );
};

export default Tutorial;
