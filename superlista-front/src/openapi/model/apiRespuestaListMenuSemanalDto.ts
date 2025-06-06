/**
 * OpenAPI definition
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { MenuSemanalDto } from './menuSemanalDto';


/**
 * Respuestas estandarizadas de la api
 */
export interface ApiRespuestaListMenuSemanalDto { 
    data?: Array<MenuSemanalDto>;
    estado?: ApiRespuestaListMenuSemanalDto.EstadoEnum;
}
export namespace ApiRespuestaListMenuSemanalDto {
    export type EstadoEnum = 'exito' | 'error';
    export const EstadoEnum = {
        Exito: 'exito' as EstadoEnum,
        Error: 'error' as EstadoEnum
    };
}


