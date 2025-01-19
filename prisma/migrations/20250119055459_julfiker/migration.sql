/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `doctor_email_key` ON `doctor`(`email`);

-- AddForeignKey
ALTER TABLE `doctor` ADD CONSTRAINT `doctor_email_fkey` FOREIGN KEY (`email`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
