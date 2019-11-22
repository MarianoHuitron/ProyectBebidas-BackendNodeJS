import { Schema, model } from 'mongoose';

const BebidaSchema = new Schema({
  nombreBebida:{ type: String  },
  nombre_tipo: { type: String },
  ingredientes: [
         {
            nombre_ingrediente: { type: String },
            cantidad:{ type: Number },
            unidad: { type: String }
         }
     ],
    preparacion: [
             {
              num_paso: { type: Number },
              descripcion:{ type: String }
             }
     ],
    categoria: [{
            type: Schema.Types.ObjectId,
            ref: 'Categorias'
         }],
    imgPath:{ type: String },
    cant_favoritos: { type: Number }
});

export default model('Bebida', BebidaSchema);