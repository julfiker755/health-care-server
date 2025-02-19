/*
  Warnings:

  - The primary key for the `doctor_schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `doctor_schedule` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`doctorId`, `scheduleId`);
