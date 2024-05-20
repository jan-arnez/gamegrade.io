import GameCard from "@/components/game-card";
import { Card } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="container flex flex-col gap-y-6">
      <div className="flex h-[350px] w-full flex-col items-center justify-center gap-y-3 rounded-md bg-gradient-to-b from-primary">
        <div className="w-full  text-center text-5xl">
          Welcome to our pre-Alpha release
        </div>
        <div className="text-xl text-foreground/90">
          Platform is still in earliest stages of development. Any feedback is
          appreciated.
        </div>
      </div>
      <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-4">
        <GameCard />
        <Card className="flex items-center justify-center">
          <div className="text-sm text-card-foreground">Coming soon...</div>
        </Card>
        <Card className="flex items-center justify-center">
          <div className="text-sm text-card-foreground">Coming soon...</div>
        </Card>
        <Card className="flex items-center justify-center">
          <div className="text-sm text-card-foreground">Coming soon...</div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
