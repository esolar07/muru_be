-- AlterTable
ALTER TABLE "formulas" ADD COLUMN     "extra_details" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name_4" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "short_description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "special_details" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "supports" TEXT NOT NULL DEFAULT '';
