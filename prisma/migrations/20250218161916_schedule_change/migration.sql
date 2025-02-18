/*
  Warnings:

  - You are about to drop the column `endDateTime` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `startDateTime` on the `schedule` table. All the data in the column will be lost.
  - Added the required column `date` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `endDateTime`,
    DROP COLUMN `startDateTime`,
    ADD COLUMN `date` VARCHAR(191) NOT NULL,
    ADD COLUMN `endTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `startTime` VARCHAR(191) NOT NULL;
