import { Request, Response, Router } from 'express';

import Bebida from '../models/Bebida';

class BebidaRoutes {

    router: Router;

    constructor() {

        this.router = Router();
        this.routes();

    }

    //All shows
    async getBebidas( req: Request, res: Response ) {
        //Validacion
        try{
            const bebidas = await Bebida.find().populate('categoria', 'nombre_categoria nombre_subcategoria -_id');
            res.json(bebidas);
        }
        catch(error){
            console.log(error);
            res.json({ Error: 'No existe ningun dato' +error });
        }
    }

    //Ordenar por mas favoritos
    //1 for asc and -1 for desc
    async getFavoritas( req: Request, res: Response ) {
        //Validacion
        try{
            const bebidas = await Bebida.find().populate('categoria', 'nombre_categoria nombre_subcategoria -_id').sort({"cant_favoritos": -1}).limit(10);
            res.json(bebidas);
        }
        catch(error){
            console.log(error);
            res.json({ Error: 'No existe ningun dato' +error });
        }
    }

    // async getBebidasSub( req: Request, res: Response ) {
    //     try{
            // const bebidas = await Bebida.find({ nombre_subcategoria: req.params.nombre_subcategoria });
            // res.json(bebidas);
    //         const nombre_subcategoria = req;
    //         console.log('El _id es'+nombre_subcategoria);
    //         res.json(nombre_subcategoria);
    //     }
    //     catch(error){
    //         console.log(error);
    //     }

    // }

    //One Show for name
    async getBebida( req: Request, res: Response ) {
        try{
            const bebida = await Bebida.findOne({ nombreBebida: req.params.nombreBebida }).populate('categoria', 'nombre_categoria nombre_subcategoria -_id');
            res.json(bebida);
        }
        catch(error){
            console.log(error);
            res.json({ Error: 'Esta bebida no existe' +error });
        }
    }

    //Created
    async createBebidas( req: Request, res: Response ) {
        //Validando
        const newBebida = new Bebida(req.body);
        try{
            await newBebida.save();
            res.json({ data: newBebida });
        }
        catch(error){
            console.log(error);
            res.json({ ERROR: 'Este dato ya existe' +error });
        }
    }

    //Updated
    async updatedBebida( req: Request, res: Response ) {
       //Validando
       const nombreBebida = req.params.nombreBebida;
       try{
        const bebida = await Bebida.findOneAndUpdate({ nombreBebida }, req.body, { new: true });
        res.json(bebida);
       }
       catch(error){
           console.log(error);
           res.json({ ERROR: error });
       }
    }

    //Deleted
    async deleteBebida( req: Request, res: Response ) {
        const { nombreBebida } = req.params;
        await Bebida.findOneAndDelete({ nombreBebida });
        res.json({
            Response: 'Bebida Deleted Successfully'
        });
    }

    routes() {
        this.router.get('/', this.getBebidas);
        this.router.get('/:nombreBebida', this.getBebida);
        this.router.post('/', this.createBebidas);
        this.router.put('/:nombreBebida', this.updatedBebida);
        this.router.delete('/:nombreBebida', this.deleteBebida);

        //Sub consultas
        this.router.get('/favoritas', this.getFavoritas);
        // this.router.get('/:categoria', this.getBebidasSub);
    }
}

const bebidasRoutes = new BebidaRoutes();

export default bebidasRoutes.router;