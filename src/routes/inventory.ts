import express, { Router } from "express";
import InventoryController from "../controller/inventoryController";

const queryInventory = express.Router();

queryInventory.post("/cleanInventory", InventoryController.limpaBancoInventory);

export default queryInventory;
