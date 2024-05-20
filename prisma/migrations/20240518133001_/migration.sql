-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tokens" INTEGER NOT NULL DEFAULT 20;

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "priceInCents" INTEGER NOT NULL,
    "tokensAmount" INTEGER NOT NULL,
    "currency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
