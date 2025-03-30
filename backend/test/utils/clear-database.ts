import { Connection } from "mongoose";

export async function clearDatabase(connection: Connection) {
  const collections = await connection.db.collections();

  for (const collection of collections) {
    try {
      await collection.deleteMany({});
    } catch (err) {
      console.warn(`Erro ao limpar ${collection.collectionName}:`, err.message);
    }
  }
}
