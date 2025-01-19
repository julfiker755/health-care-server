-- CreateTable
CREATE TABLE `patient` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `profilePhoto` VARCHAR(191) NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `patient_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient` ADD CONSTRAINT `patient_email_fkey` FOREIGN KEY (`email`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
