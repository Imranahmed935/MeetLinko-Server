-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'BANNED', 'PENDING', 'DELETED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userStatus" "Status" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "UserStatus";
