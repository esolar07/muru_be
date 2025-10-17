-- CreateTable
CREATE TABLE "symptoms" (
    "id" SERIAL NOT NULL,
    "high_indications" JSONB NOT NULL,
    "low_indications" JSONB NOT NULL,
    "symptom_category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "symptoms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "symptoms" ADD CONSTRAINT "symptoms_symptom_category_id_fkey" FOREIGN KEY ("symptom_category_id") REFERENCES "symptom_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
