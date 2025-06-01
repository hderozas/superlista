'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">superlistafront documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiModule.html" data-type="entity-link" >ApiModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-e2fe7c571c1d32a5e18fe8445cf7f7b629a19731bfd9b6c052f5c8f406823654ec1995c896eb5074ee604c5c5840080b745065609ed574079377dae87d88b2ba"' : 'data-bs-target="#xs-components-links-module-AppModule-e2fe7c571c1d32a5e18fe8445cf7f7b629a19731bfd9b6c052f5c8f406823654ec1995c896eb5074ee604c5c5840080b745065609ed574079377dae87d88b2ba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e2fe7c571c1d32a5e18fe8445cf7f7b629a19731bfd9b6c052f5c8f406823654ec1995c896eb5074ee604c5c5840080b745065609ed574079377dae87d88b2ba"' :
                                            'id="xs-components-links-module-AppModule-e2fe7c571c1d32a5e18fe8445cf7f7b629a19731bfd9b6c052f5c8f406823654ec1995c896eb5074ee604c5c5840080b745065609ed574079377dae87d88b2ba"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePublicoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePublicoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-94ff3fdfec455410bd63ce0a81629826fe7befb3811d4b18208ecc9c7553d89cd8e8e023d180aebea469cb7b3bf3a3c5fec51b2f18494ba4c453d9fb571cc45c"' : 'data-bs-target="#xs-components-links-module-AuthModule-94ff3fdfec455410bd63ce0a81629826fe7befb3811d4b18208ecc9c7553d89cd8e8e023d180aebea469cb7b3bf3a3c5fec51b2f18494ba4c453d9fb571cc45c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-94ff3fdfec455410bd63ce0a81629826fe7befb3811d4b18208ecc9c7553d89cd8e8e023d180aebea469cb7b3bf3a3c5fec51b2f18494ba4c453d9fb571cc45c"' :
                                            'id="xs-components-links-module-AuthModule-94ff3fdfec455410bd63ce0a81629826fe7befb3811d4b18208ecc9c7553d89cd8e8e023d180aebea469cb7b3bf3a3c5fec51b2f18494ba4c453d9fb571cc45c"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistroComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistroComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsuarioModule.html" data-type="entity-link" >UsuarioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UsuarioModule-1fc7c5ce493b9e8d6fb136f7a5b638cb31eeddeb0e7a1afa2dfdbe813331c19a4bc54d8e716c1b108482e76347faf399aaeb12efdbe7c4a701527b76515e27ec"' : 'data-bs-target="#xs-components-links-module-UsuarioModule-1fc7c5ce493b9e8d6fb136f7a5b638cb31eeddeb0e7a1afa2dfdbe813331c19a4bc54d8e716c1b108482e76347faf399aaeb12efdbe7c4a701527b76515e27ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsuarioModule-1fc7c5ce493b9e8d6fb136f7a5b638cb31eeddeb0e7a1afa2dfdbe813331c19a4bc54d8e716c1b108482e76347faf399aaeb12efdbe7c4a701527b76515e27ec"' :
                                            'id="xs-components-links-module-UsuarioModule-1fc7c5ce493b9e8d6fb136f7a5b638cb31eeddeb0e7a1afa2dfdbe813331c19a4bc54d8e716c1b108482e76347faf399aaeb12efdbe7c4a701527b76515e27ec"' }>
                                            <li class="link">
                                                <a href="components/CrearMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CrearMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IngredientesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IngredientesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecetasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecetasComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuarioRoutingModule.html" data-type="entity-link" >UsuarioRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/FormlyHorizontalWrapper.html" data-type="entity-link" >FormlyHorizontalWrapper</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListadoIngredientesComponent.html" data-type="entity-link" >ListadoIngredientesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ListadoRecetasComponent.html" data-type="entity-link" >ListadoRecetasComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuDetalleComponent.html" data-type="entity-link" >MenuDetalleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuTablaComponent.html" data-type="entity-link" >MenuTablaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModalComponent.html" data-type="entity-link" >ModalComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseService.html" data-type="entity-link" >BaseService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Configuration.html" data-type="entity-link" >Configuration</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomHttpParameterCodec.html" data-type="entity-link" >CustomHttpParameterCodec</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthControllerService.html" data-type="entity-link" >AuthControllerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriaIngredienteService.html" data-type="entity-link" >CategoriaIngredienteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataRefreshService.html" data-type="entity-link" >DataRefreshService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IngredienteService.html" data-type="entity-link" >IngredienteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListaCompraResourceService.html" data-type="entity-link" >ListaCompraResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuSemanalService.html" data-type="entity-link" >MenuSemanalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecetaService.html" data-type="entity-link" >RecetaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackbarService.html" data-type="entity-link" >SnackbarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuariosService.html" data-type="entity-link" >UsuariosService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActualizarRecetasMenuDto.html" data-type="entity-link" >ActualizarRecetasMenuDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActualizarUsuarioDto.html" data-type="entity-link" >ActualizarUsuarioDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthControllerServiceInterface.html" data-type="entity-link" >AuthControllerServiceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoriaIngredienteDto.html" data-type="entity-link" >CategoriaIngredienteDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoriaIngredienteServiceInterface.html" data-type="entity-link" >CategoriaIngredienteServiceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurationParameters.html" data-type="entity-link" >ConfigurationParameters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EliminarListaDto.html" data-type="entity-link" >EliminarListaDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenerarListaDto.html" data-type="entity-link" >GenerarListaDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IngredienteServiceInterface.html" data-type="entity-link" >IngredienteServiceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListaCompraDto.html" data-type="entity-link" >ListaCompraDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListaCompraResourceServiceInterface.html" data-type="entity-link" >ListaCompraResourceServiceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginRequest.html" data-type="entity-link" >LoginRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponse.html" data-type="entity-link" >LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuSemanalDto.html" data-type="entity-link" >MenuSemanalDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuSemanalServiceInterface.html" data-type="entity-link" >MenuSemanalServiceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModificarItemsDto.html" data-type="entity-link" >ModificarItemsDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Param.html" data-type="entity-link" >Param</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecetaDto.html" data-type="entity-link" >RecetaDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecetaServiceInterface.html" data-type="entity-link" >RecetaServiceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsuariosServiceInterface.html" data-type="entity-link" >UsuariosServiceInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});