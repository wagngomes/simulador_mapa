-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Map" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "produto" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "b_o" TEXT NOT NULL,
    "mat_med" TEXT NOT NULL,
    "fornecedor" TEXT NOT NULL,
    "comprador" TEXT NOT NULL,
    "primeira_filial_rota" TEXT NOT NULL,
    "filial_dest" TEXT NOT NULL,
    "sigla_dest" TEXT NOT NULL,
    "empresa_dest" TEXT NOT NULL,
    "grupo_tributacao" TEXT NOT NULL,
    "flag_tributacao" TEXT NOT NULL,
    "rota" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "gui_semana_saida" TEXT NOT NULL,
    "gui_semana_chegada" TEXT NOT NULL,
    "modo_compra" TEXT NOT NULL,
    "dia_sugerido_pedido" TEXT NOT NULL,
    "qtd_comprada" INTEGER NOT NULL,
    "preco_total" DECIMAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Map" ("b_o", "codigo", "comprador", "createdAt", "descricao", "dia_sugerido_pedido", "empresa_dest", "filial_dest", "flag_tributacao", "fornecedor", "grupo_tributacao", "gui_semana_chegada", "gui_semana_saida", "id", "mat_med", "modo_compra", "preco_total", "primeira_filial_rota", "produto", "qtd_comprada", "rota", "sigla_dest", "status", "updatedAt") SELECT "b_o", "codigo", "comprador", "createdAt", "descricao", "dia_sugerido_pedido", "empresa_dest", "filial_dest", "flag_tributacao", "fornecedor", "grupo_tributacao", "gui_semana_chegada", "gui_semana_saida", "id", "mat_med", "modo_compra", "preco_total", "primeira_filial_rota", "produto", "qtd_comprada", "rota", "sigla_dest", "status", "updatedAt" FROM "Map";
DROP TABLE "Map";
ALTER TABLE "new_Map" RENAME TO "Map";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
