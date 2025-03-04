-- CreateTable
CREATE TABLE "Inventory" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "filial" TEXT NOT NULL,
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
