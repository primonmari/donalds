/*
  Warnings:

  - You are about to drop the column `consumptionMethod` on the `Order` table. All the data in the column will be lost.
  - Added the required column `ConsumptionMethod` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ConsumptionMethod" AS ENUM ('TAKEAWAY', 'DINE_IN');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "consumptionMethod",
ADD COLUMN     "ConsumptionMethod" "ConsumptionMethod" NOT NULL;

-- DropEnum
DROP TYPE "consumptionMethod";
