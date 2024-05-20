import googleIcon from "@/assets/google.png";
import notionIcon from "@/assets/notion.png";
import { signIn } from "@/auth";
import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="h-max w-full max-w-[400px] space-y-6 rounded-md border bg-muted p-6">
      <div className="flex h-20 w-full items-center justify-center border-b">
        <Logo />
      </div>
      <div className="space-y-3">
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/platform" });
          }}
        >
          <Button
            type="submit"
            variant="outline"
            className="flex w-full gap-x-3"
            size="lg"
          >
            <Image src={googleIcon} alt="" className="aspect-square w-5" />
            Sign in with Google
          </Button>
        </form>
        <Button
          variant="outline"
          type="submit"
          className="flex w-full gap-x-3"
          size="lg"
          disabled
        >
          <Image src={notionIcon} alt="" className="aspect-square w-5" />
          Sign in with Notion
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
