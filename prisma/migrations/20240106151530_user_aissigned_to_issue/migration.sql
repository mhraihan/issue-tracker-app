-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assigenedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assigenedToUserId_fkey` FOREIGN KEY (`assigenedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
