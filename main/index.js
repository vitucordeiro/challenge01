const fs = require('fs')
const leven = require('fast-levenshtein')
const path = require('path')


const KNOWN_BRANDS = [
    "Piracanjuba", "Italac", "Parmalat", "Elegê", "Ninho", "Tio João", "Camil", "Kicaldo",
    "Soya", "Liza", "Cocinero", "Adria", "Renata", "Barilla", "Fortaleza", "Del Valle",
    "Maguary", "Aurora", "Casa de Madeira", "Friboi", "Seara", "Swift", "Sadia", "Perdigão",
    "Tirolez", "Scala", "Polenghi"
];

/**
 * Extracts the brand from the product description.
 * Searches for known brands in the description.
 *
 * @param {string} description - The product description.
 * @returns {string} The brand name or "Desconhecida" if not found.
 */
function extractBrand(description) {
    for (const brand of KNOWN_BRANDS) {
        if (description.toLowerCase().includes(brand.toLowerCase())) {
            return brand;
        }
    }
    return "Desconhecida"; // Retorna "Desconhecida" se a marca não for encontrada
}

/**
 * Normalises the description of a product to facilitate comparison.
 * - Converts to lower case.
 * - Removes punctuation marks.
 * - Sorts words alphabetically.
 *
 * @param {string} description - The product description.
 * @returns {string} The normalised description.
 */

function normalizeDescriptionProduct(description) {
    return description
        .toLowerCase()
        .replace(/[^\w\s]/g, '') 
        .split(' ')
        .sort() 
        .join(' ')
}


/**
 * Calculates the similarity between two strings using the Levenshtein distance.
 * The similarity is normalised to a value between 0 and 1.
 *
 * @param {string} firstString - The first string.
 * @param {string} secondString- The second string.
 * @returns {number} The similarity between the strings (0 to 1).
 */

function calculateSimilarity (firstString, secondString){
    const maxLengthBetweenStrings = Math.max(firstString.length, secondString.length)
    if (maxLengthBetweenStrings == 0 ) return 1
    const distanceBetweenString = leven.get( firstString, secondString )
    return 1 - distanceBetweenString / maxLengthBetweenStrings
}

