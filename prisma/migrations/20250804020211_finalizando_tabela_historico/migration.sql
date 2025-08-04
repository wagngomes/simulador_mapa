/*
  Warnings:

  - The required column `import_id` was added to the `Historic` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Historic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "import_id" TEXT NOT NULL,
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
INSERT INTO "new_Historic" ("cd", "data", "id", "product", "quantity", "scenario_description", "scenario_name", "scenario_tag", "source_file") SELECT "cd", "data", "id", "product", "quantity", "scenario_description", "scenario_name", "scenario_tag", "source_file" FROM "Historic";
DROP TABLE "Historic";
ALTER TABLE "new_Historic" RENAME TO "Historic";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
