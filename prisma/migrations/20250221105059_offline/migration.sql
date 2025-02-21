/*
  Warnings:

  - A unique constraint covering the columns `[appointmentId]` on the table `doctor_schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `doctor_schedule` ADD COLUMN `appointmentId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `appointment` (
    `id` VARCHAR(191) NOT NULL,
    `patientId` VARCHAR(191) NOT NULL,
    `doctorId` VARCHAR(191) NOT NULL,
    `scheduleId` VARCHAR(191) NOT NULL,
    `videoCallingId` VARCHAR(191) NOT NULL,
    `status` ENUM('SCHEDULED', 'INPROGRESS', 'COMPLETED', 'CANCELED') NOT NULL DEFAULT 'SCHEDULED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `appointment_scheduleId_key`(`scheduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `doctor_schedule_appointmentId_key` ON `doctor_schedule`(`appointmentId`);

-- AddForeignKey
ALTER TABLE `doctor_schedule` ADD CONSTRAINT `doctor_schedule_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `appointment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
