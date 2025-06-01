import {RecetaDto} from '../../../openapi';
/**
 * @file utils
 * @description
 * Funciones y constantes auxiliares para trabajar con categorías, emojis y estilos visuales
 * en la aplicación SúperLista.
 * Incluye lógica para determinar la clase visual o emoji dominante de una receta según sus ingredientes.
 */

/**
 * Devuelve una lista de clases CSS de borde según la categoría del ingrediente.
 * @param categoria Categoría del ingrediente.
 * @returns Array de clases CSS (ej. ['border-success']).
 */
export function getCardClasses(categoria: string): string[] {
  switch (categoria) {
    case 'FRUTAS':
    case 'VERDURAS':
      return ['border-success'];

    case 'CARNE':
      return ['border-danger'];

    case 'PESCADO':
      return ['border-primary'];

    case 'LEGUMBRES':
      return ['border-warning'];

    case 'LACTEOS':
      return ['border-light'];

    case 'CEREALES':
    case 'GRASAS_ACEITES':
      return ['border-warning'];

    case 'FRUTOS_SECOS':
      return ['border-dark'];

    default:
      return ['border-0'];
  }
}
/**
 * Mapa de categorías a emojis representativos.
 */
export const EMOJIS_POR_CATEGORIA: Record<string, string> = {
  FRUTAS: '🍓',
  VERDURAS: '🥦',
  CARNE: '🍗',
  PESCADO: '🐟',
  LEGUMBRES: '🫘',
  LACTEOS: '🍶',
  CEREALES: '🌾',
  GRASAS_ACEITES: '🧈',
  FRUTOS_SECOS: '🥜',
  DEFAULT: '🍴'
};
/**
 * Devuelve el emoji correspondiente a una categoría.
 * @param categoria Nombre de la categoría.
 * @returns Emoji representativo como string.
 */
export function getEmojiPorCategoria(categoria: string): string {
  return EMOJIS_POR_CATEGORIA[categoria] || EMOJIS_POR_CATEGORIA['DEFAULT'];
}
/**
 * Calcula el emoji dominante de una receta según la categoría mayoritaria de sus ingredientes.
 * @param receta Objeto RecetaDto.
 * @returns Emoji representativo como string.
 */
export function getEmojiDominantePorReceta(receta: RecetaDto): string {
  if (!receta.ingredientes || receta.ingredientes.length === 0) {
    return getEmojiPorCategoria('DEFAULT');
  }

  const contador: Record<string, number> = {};
  for (const ing of receta.ingredientes) {
    const cat = ing.categoria || 'DEFAULT';
    contador[cat] = (contador[cat] || 0) + 1;
  }

  const categoriaDominante = Object.entries(contador)
    .sort((a, b) => b[1] - a[1])[0][0];

  return getEmojiPorCategoria(categoriaDominante);
}
/**
 * Calcula las clases de borde dominantes de una receta según la categoría mayoritaria de sus ingredientes.
 * @param receta Objeto RecetaDto.
 * @returns Array de clases CSS.
 */
export function getCardClassesPorReceta(receta: RecetaDto): string[] {
  if (!receta.ingredientes || receta.ingredientes.length === 0) {
    return getCardClasses('DEFAULT');
  }

  const contador: Record<string, number> = {};
  for (const ing of receta.ingredientes) {
    const cat = ing.categoria || 'DEFAULT';
    contador[cat] = (contador[cat] || 0) + 1;
  }

  const categoriaDominante = Object.entries(contador)
    .sort((a, b) => b[1] - a[1])[0][0];

  return getCardClasses(categoriaDominante);
}

