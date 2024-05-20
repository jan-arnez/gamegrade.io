import logoBlack from "@/assets/vector/logo-black.svg";
import logoDarkColored from "@/assets/vector/logo-dark-colored.svg";
import logoLightColored from "@/assets/vector/logo-light-colored.svg";
import logoWhite from "@/assets/vector/logo-white.svg";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  color?: "colored-lightmode" | "colored-darkmode" | "black" | "white";
  size?: "sm" | "default" | "lg";
};

const Logo = ({ color = "colored-lightmode", size = "default" }: LogoProps) => {
  const logoMap = {
    "colored-darkmode": logoDarkColored,
    black: logoBlack,
    white: logoWhite,
    "colored-lightmode": logoLightColored,
  };

  const sizeClassMap = {
    lg: "h-8 w-auto",
    sm: "h-4 w-auto",
    default: "h-6 w-auto",
  };

  const logo = logoMap[color];
  const sizeClass = sizeClassMap[size];

  return (
    <Link href="/">
      <Image src={logo} alt="Logo" className={sizeClass} priority />
    </Link>
  );
};

export default Logo;
