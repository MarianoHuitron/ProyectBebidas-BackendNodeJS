import { Request, Response, Router } from 'express';

import Categorias from '../models/Categorias';

class CategoriaRouter {
    router: Router;

    constructor() {

        this.router = Router();
        this.routes();

    }

    //All shows
    async getCategorias( req: Request, res: Response ) {
        try{
            const categorias = await Categorias.find();
            res.json(categorias);
        }
        catch(error){
            console.log(error);
            res.json({ Error: 'No existe ningun dato' +error });
        }
    }


    //Created
    async createCategoria( req: Request, res: Response ) {
        //Validando
        const newCategorias = new Categorias(req.body);
        try{
            await newCategorias.save();
            res.json({ data: newCategorias });
        }
        catch(error){
            console.log(error);
            res.json({ ERROR: 'Este dato ya existe' +error });
        }
    }

    //Updated
    async updatedCategoria( req: Request, res: Response ) {
       //Validando
       const nombre_categoria = req.params.nombre_categoria;
       try{
        const categorias = await Categorias.findOneAndUpdate({ nombre_categoria }, req.body, { new: true });
        res.json(categorias);
       }
       catch(error){
           console.log(error);
           res.json({ ERROR: error });
       }
    }

    //Deleted
    async deleteCategorias( req: Request, res: Response ) {
        const { _id } = req.params;
        await Categorias.findOneAndDelete({ _id });
        res.json({
            Response: 'Categorias Deleted Successfully'
        });
    }

    routes() {
        this.router.get('/', this.getCategorias);
        this.router.post('/', this.createCategoria);
        this.router.put('/:nombre_categoria', this.updatedCategoria);
        this.router.delete('/:_id', this.deleteCategorias);
    }
}

const categoriasRoutes = new CategoriaRouter();

export default categoriasRoutes.router;