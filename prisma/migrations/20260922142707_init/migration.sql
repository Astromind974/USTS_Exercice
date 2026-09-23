/*
  Warnings:

  - You are about to drop the column `content` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `isAuto` on the `Reply` table. All the data in the column will be lost.
  - Added the required column `body` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gmailMessageId` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reply" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "to" TEXT NOT NULL,
    "subject" TEXT,
    "body" TEXT NOT NULL,
    "gmailMessageId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emailId" TEXT NOT NULL,
    CONSTRAINT "Reply_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reply" ("createdAt", "emailId", "id", "updatedAt") SELECT "createdAt", "emailId", "id", "updatedAt" FROM "Reply";
DROP TABLE "Reply";
ALTER TABLE "new_Reply" RENAME TO "Reply";
CREATE UNIQUE INDEX "Reply_gmailMessageId_key" ON "Reply"("gmailMessageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
