import SecuenciaUsuario from '../entities/SecuenciaUsuario';

async function getNextSequenceValue(sequenceName: string): Promise<number> {
  const sequenceDocument = await SecuenciaUsuario.findByIdAndUpdate(
    sequenceName,
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  if (!sequenceDocument) {
    throw new Error(`Sequence document with ID ${sequenceName} not found`);
  }

  return sequenceDocument.value;
}

export default getNextSequenceValue;
