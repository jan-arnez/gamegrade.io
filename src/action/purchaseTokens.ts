"use server";
import getSession from "@/lib/getSession";
import { absoluteUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function purchaseTokens(formData: FormData) {
  const session = await getSession();
  const user = session?.user;

  if (!user || !user.id) {
    console.log("Not authorized");
    return redirect("/signin");
  }

  const tokensAmount = formData.get("tokens-amount");
  const price = formData.get("price");

  if (!tokensAmount) {
    console.log("Tokens amount is missing");
    return { message: "Tokens amount is missing" };
  }

  if (!price) {
    console.log("Price is missing");
    return { message: "Price is missign" };
  }

  try {
    const payload = {
      price,
      tokensAmount,
      user,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(absoluteUrl("/api/stripe"), requestOptions);

    const json = await response.json();
    console.log(json.url);
    redirect(json.url);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
