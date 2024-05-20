import Link from "next/link";
import { Button } from "../ui/button";

const SignInButton = () => {
  return (
    <Link href="/signin">
      <Button type="submit" className="min-w-[150px]" variant="ghost">
        SignIn
      </Button>
    </Link>
  );
};

export default SignInButton;
