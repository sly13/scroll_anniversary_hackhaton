-- CreateTable
CREATE TABLE "player_score" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_score_address_key" ON "player_score"("address");
