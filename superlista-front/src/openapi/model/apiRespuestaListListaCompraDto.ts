/**
 * OpenAPI definition
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ListaCompraDto } from './listaCompraDto';


/**
 * Respuestas estandarizadas de la api
 */
export interface ApiRespuestaListListaCompraDto { 
    data?: Array<ListaCompraDto>;
    estado?: ApiRespuestaListListaCompraDto.EstadoEnum;
}
export namespace ApiRespuestaListListaCompraDto {
    export type EstadoEnum = 'exito' | 'error';
    export const EstadoEnum = {
        Exito: 'exito' as EstadoEnum,
        Error: 'error' as EstadoEnum
    };
}


