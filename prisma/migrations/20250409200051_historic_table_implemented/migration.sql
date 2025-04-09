-- CreateTable
CREATE TABLE "Historic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "cd" TEXT NOT NULL,
    CONSTRAINT "Historic_product_fkey" FOREIGN KEY ("product") REFERENCES "Product" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);
