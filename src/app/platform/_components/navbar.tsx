import RegisterButton from "@/components/auth/register-button";
import SignInButton from "@/components/auth/signin-button";
import UserButton from "@/components/auth/user-button";
import Logo from "@/components/global/logo";
import getSession from "@/lib/getSession";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <div className="right fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b bg-muted px-6">
      <Logo />
      {session && user ? (
        <UserButton user={user} />
      ) : (
        <div className="space-x-3">
          <SignInButton />
          <RegisterButton />
        </div>
      )}
    </div>
  );
};

export default Navbar;
