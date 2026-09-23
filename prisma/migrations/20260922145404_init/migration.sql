-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reply" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "to" TEXT NOT NULL,
    "subject" TEXT,
    "body" TEXT NOT NULL,
    "isAuto" BOOLEAN NOT NULL DEFAULT false,
    "gmailMessageId" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "emailId" TEXT NOT NULL,
    CONSTRAINT "Reply_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reply" ("body", "createdAt", "date", "emailId", "gmailMessageId", "id", "subject", "to", "updatedAt") SELECT "body", "createdAt", "date", "emailId", "gmailMessageId", "id", "subject", "to", "updatedAt" FROM "Reply";
DROP TABLE "Reply";
ALTER TABLE "new_Reply" RENAME TO "Reply";
CREATE UNIQUE INDEX "Reply_gmailMessageId_key" ON "Reply"("gmailMessageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
