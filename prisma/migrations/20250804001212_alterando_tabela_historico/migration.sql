/*
  Warnings:

  - Added the required column `scenario_description` to the `Historic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scenario_name` to the `Historic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scenario_tag` to the `Historic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_file` to the `Historic` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Historic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scenario_name" TEXT NOT NULL,
    "scenario_tag" TEXT NOT NULL,
    "scenario_description" TEXT NOT NULL,
    "source_file" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "cd" TEXT NOT NULL,
    CONSTRAINT "Historic_product_fkey" FOREIGN KEY ("product") REFERENCES "Product" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Historic" ("cd", "data", "id", "product", "quantity") SELECT "cd", "data", "id", "product", "quantity" FROM "Historic";
DROP TABLE "Historic";
ALTER TABLE "new_Historic" RENAME TO "Historic";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
