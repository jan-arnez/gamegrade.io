import Link from "next/link";
import { Button } from "../ui/button";

const RegisterButton = () => {
  return (
    <Link href="/register">
      <Button type="submit" className="min-w-[150px]">
        Register
      </Button>
    </Link>
  );
};

export default RegisterButton;
