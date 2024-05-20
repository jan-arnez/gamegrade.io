"use server";
import { cleanText, validateText } from "@/lib/utils";
import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

export default async function addDataSource(
  prevState: any,
  formData: FormData,
) {
  const id = formData.get("id") as string;
  const dataSource = formData.get("data-source") as string;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    console.log("User not found");
    return {
      message: "User not found",
    };
  }

  const validatedText = validateText(dataSource);

  if (!validatedText.isValid) {
    return {
      message: validatedText.message,
    };
  }

  const currentDataSource = await prisma.dataSource.findFirst({
    where: {
      userId: id,
    },
  });

  if (!currentDataSource) {
    await prisma.dataSource.create({
      data: {
        userId: id,
        data: cleanText(dataSource),
      },
    });
  }

  await prisma.dataSource.update({
    where: {
      userId: id,
    },
    data: {
      data: cleanText(dataSource),
    },
  });

  revalidatePath("/platform/data-source");

  return { message: "Successfully added Data Source" };
}
