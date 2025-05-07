import { plainToInstance } from "class-transformer";

/**
 * Helper genérico para mapear um documento Mongoose ou objeto bruto para uma instância de um DTO.
 * @param dtoClass Classe do DTO para a qual o objeto será mapeado.
 * @param document Instância do Mongoose Document ou objeto bruto.
 * @returns Instância do DTO.
 */
export function mapToDto<T>(dtoClass: new () => T, document: any): T {
  const plainObject = document.toObject ? document.toObject() : document;

  return plainToInstance(dtoClass, plainObject, {
    excludeExtraneousValues: true,
  })
};