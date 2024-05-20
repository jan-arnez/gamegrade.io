import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function validateText(
  text: string,
  minLength = 6000,
  maxLength = 80000,
): { isValid: boolean; message: string } {
  if (text.length < minLength) {
    return {
      isValid: false,
      message: `Text is too short (minimum ${minLength} characters).`,
    };
  }

  if (text.length > maxLength) {
    return { isValid: false, message: "Text is too long." };
  }

  const words = text.split(" ");
  if (words.length < 500) {
    return { isValid: false, message: "Text does not match the criterias." };
  }

  return { isValid: true, message: "Text is valid." };
}

export function cleanText(input: string) {
  const regex = /[^\p{L}\p{N}\s]/gu;

  let cleanedText = input.replace(regex, "");

  cleanedText = cleanedText.replace(/\s+/g, " ");

  cleanedText = cleanedText.trim();

  return cleanedText;
}

export function formateDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return date.toLocaleDateString("en-US", options);
}
