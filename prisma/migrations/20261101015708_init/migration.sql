-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "clicks" INTEGER NOT NULL,
    "conseguidoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
