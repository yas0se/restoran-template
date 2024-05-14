/*
  Warnings:

  - You are about to drop the column `catigoryID` on the `meal` table. All the data in the column will be lost.
  - Added the required column `categoryID` to the `meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `meal` DROP FOREIGN KEY `meal_catigoryID_fkey`;

-- AlterTable
ALTER TABLE `meal` DROP COLUMN `catigoryID`,
    ADD COLUMN `categoryID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `meal` ADD CONSTRAINT `meal_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
