/*
  Warnings:

  - Added the required column `duration` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `duration` INTEGER NOT NULL;
