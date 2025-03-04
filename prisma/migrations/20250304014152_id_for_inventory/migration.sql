/*
  Warnings:

  - The primary key for the `Inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventory" (
    "codigo" TEXT NOT NULL,
    "filial" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "rota" TEXT NOT NULL,
    "m4" REAL NOT NULL,
    "m3" REAL NOT NULL,
    "m2" REAL NOT NULL,
    "m1" REAL NOT NULL,
    "forecast" REAL NOT NULL,
    "estoque_in" REAL NOT NULL,
    "estoque_livre" REAL NOT NULL,
    "compras" REAL NOT NULL,
    "transferencias" REAL NOT NULL,
    "estoque_total" REAL NOT NULL,
    "cmv" REAL NOT NULL,
    "mediaSimples" REAL NOT NULL,
    "ultimoMes" REAL NOT NULL,
    "novaMedia" REAL NOT NULL,
    "menorVenda" REAL NOT NULL,
    "maiorVenda" REAL NOT NULL,
    "mediaPonderada" REAL NOT NULL,
    CONSTRAINT "Inventory_codigo_fkey" FOREIGN KEY ("codigo") REFERENCES "Product" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inventory" ("cmv", "codigo", "compras", "estoque_in", "estoque_livre", "estoque_total", "filial", "forecast", "m1", "m2", "m3", "m4", "maiorVenda", "mediaPonderada", "mediaSimples", "menorVenda", "novaMedia", "rota", "transferencias", "ultimoMes") SELECT "cmv", "codigo", "compras", "estoque_in", "estoque_livre", "estoque_total", "filial", "forecast", "m1", "m2", "m3", "m4", "maiorVenda", "mediaPonderada", "mediaSimples", "menorVenda", "novaMedia", "rota", "transferencias", "ultimoMes" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
