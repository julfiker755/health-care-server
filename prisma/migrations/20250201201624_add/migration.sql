-- CreateTable
CREATE TABLE `doctor_specialities` (
    `specialitiesId` VARCHAR(191) NOT NULL,
    `doctorId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`specialitiesId`, `doctorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `doctor_specialities` ADD CONSTRAINT `doctor_specialities_specialitiesId_fkey` FOREIGN KEY (`specialitiesId`) REFERENCES `specialities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_specialities` ADD CONSTRAINT `doctor_specialities_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
