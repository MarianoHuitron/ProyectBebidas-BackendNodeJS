import { Schema, model } from 'mongoose';

const CategoriasSchema = new Schema({
    nombre_categoria: { type: String, required: true },
    nombre_subcategoria: [{ type: String, required: true }]
});

export default model('Categorias', CategoriasSchema);
