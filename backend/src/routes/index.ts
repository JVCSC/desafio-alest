import express, { Router, Request, Response } from "express";
import { ProdutosController } from "../controllers/product.controller";

const router = Router();

const productController = new ProdutosController();

router.get('/products', productController.listProducts);
router.post('/products', productController.addProducts);
router.delete('/products/:productName', productController.deleteProducts);
router.put('/products/:productName', productController.updateProducts);

export { router };