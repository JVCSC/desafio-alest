import {Request, Response } from "express";
import { paginateProducts, setProduct, deleteProduct } from '../firestore/products.db'

interface ListProductsRequest {
    offset: string
}

export class ProdutosController {

    public async listProducts(request: Request, response: Response){

        try{

            const { offset } = request.query as unknown as ListProductsRequest;

            const snapshot = await paginateProducts(offset);

            response.status(200);
            response.json({
                offset,
                data: snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            })

        } catch (err) {
            console.error('Algo de errado ocorreu ao tentar ler os produtos.')
            console.error(err)
            response.status(500);
        }

        return response;

    }

    public async addProducts(request: Request, response: Response){

        try {

            const data = request.body.product;
            const productName = request.body.productName;

            await setProduct(productName, data);
            
            response.status(201);
            response.json({
                id: productName,
                ...data
            })

        } catch (err) {
            console.error('Algo de errado ocorreu ao tentar salvar novos produtos.')
            console.error(err)
            response.status(500);
        }

        return response;
    }

    public async updateProducts(request: Request, response: Response){

        try {

            const data = request.body;
            const docname = request.params.productName;

            await setProduct(docname, data);
            
            response.status(200);
            response.json({
                updated: true
            })

        } catch (err) {
            console.error('Algo de errado ocorreu ao tentar atualizar produtos.')
            console.error(err)
            response.status(500);
        }

        return response;
    }

    public async deleteProducts(request: Request, response: Response){

        try {

            const productName = request.params.productName;

            await deleteProduct(productName);
            
            response.status(200);
            response.json({
                deleted: true
            })

        } catch (err) {
            console.error('Algo de errado ocorreu ao tentar remover produtos.')
            console.error(err)
            response.status(500);
        }

        return response;
    }

}