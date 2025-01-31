-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'DOCTOR', 'PATIENT') NOT NULL,
    `needPasswordChange` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('ACTIVE', 'BLOCKED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `profilePhoto` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `profilePhoto` VARCHAR(191) NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `registrationNumber` VARCHAR(191) NOT NULL,
    `experience` INTEGER NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `appointmentFee` INTEGER NOT NULL,
    `qualification` VARCHAR(191) NOT NULL,
    `currentWorkingPlace` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `averageRating` DOUBLE NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctor_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `specialities` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_email_fkey` FOREIGN KEY (`email`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor` ADD CONSTRAINT `doctor_email_fkey` FOREIGN KEY (`email`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient` ADD CONSTRAINT `patient_email_fkey` FOREIGN KEY (`email`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
