-- CreateTable
CREATE TABLE "Forecast" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigo_produto" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "previsao" REAL NOT NULL,
    "cd" TEXT NOT NULL,
    CONSTRAINT "Forecast_codigo_produto_fkey" FOREIGN KEY ("codigo_produto") REFERENCES "Product" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);
