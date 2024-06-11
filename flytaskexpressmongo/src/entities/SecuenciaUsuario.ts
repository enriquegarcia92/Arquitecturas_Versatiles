import { Schema, model, Document } from 'mongoose';

export interface ISecuenciaUsuario extends Document {
  _id: string;
  value: number;
}

const secuenciaUsuarioSchema = new Schema<ISecuenciaUsuario>({
  _id: { type: String, required: true },
  value: { type: Number, required: true }
});

const SecuenciaUsuario = model<ISecuenciaUsuario>('SecuenciaUsuario', secuenciaUsuarioSchema, 'secuencia_usuario');

export default SecuenciaUsuario;
