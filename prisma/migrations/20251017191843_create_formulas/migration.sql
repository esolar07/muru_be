-- CreateTable
CREATE TABLE "formulas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "name_2" TEXT NOT NULL,
    "name_3" TEXT NOT NULL,
    "symptom_category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formulas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "formulas_name_key" ON "formulas"("name");

-- AddForeignKey
ALTER TABLE "formulas" ADD CONSTRAINT "formulas_symptom_category_id_fkey" FOREIGN KEY ("symptom_category_id") REFERENCES "symptom_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
