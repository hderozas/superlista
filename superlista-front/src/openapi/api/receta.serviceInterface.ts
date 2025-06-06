/**
 * OpenAPI definition
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { ApiRespuestaBoolean } from '../model/models';
import { ApiRespuestaListRecetaDto } from '../model/models';
import { RecetaDto } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface RecetaServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * 
     * 
     * @param recetaDto 
     */
    actualizarReceta(recetaDto: RecetaDto, extraHttpRequestParams?: any): Observable<ApiRespuestaBoolean>;

    /**
     * 
     * 
     * @param recetaDto 
     */
    altaReceta(recetaDto: RecetaDto, extraHttpRequestParams?: any): Observable<ApiRespuestaBoolean>;

    /**
     * 
     * 
     * @param nombre 
     */
    buscarRecetaPorNombre(nombre: string, extraHttpRequestParams?: any): Observable<ApiRespuestaListRecetaDto>;

    /**
     * 
     * 
     */
    buscarTodasRecetas(extraHttpRequestParams?: any): Observable<ApiRespuestaListRecetaDto>;

    /**
     * 
     * 
     * @param recetaDto 
     */
    eliminarReceta(recetaDto: RecetaDto, extraHttpRequestParams?: any): Observable<ApiRespuestaBoolean>;

}
