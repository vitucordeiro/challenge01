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
            return brand
        }
    }
    return "Desconhecida"
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

/**
 * Categorizes products based on the similarity of their descriptions and brand.
 * - Groups equivalent products (same product with variations in description).
 * - Separates products with different types, brands or quantities.
 *
 * @param {Array<Object>} products - List of products to be categorized.
 * Each product must have a `title` property (product description).
 * @returns {Array<Object>} List of categories, where each category contains:
 * - `category`: Name of the category (description of the first product in the group).
 * - `count`: Number of products in the category.
 * - `products`: List of products in the category.
 */
function categorizeProducts(products) {
    const categories = [];

    products.forEach(item => {
        const brand = extractBrand(item.title); 
        const normalizeDescription = normalizeDescriptionProduct(item.title);

        let foundCategory = false;
        for (const category of categories) {
            const categoryBrand = extractBrand(category.category);
            const normalizedCategoryName = normalizeDescriptionProduct(category.category);

            if (brand === categoryBrand) {
                const similarity = calculateSimilarity(normalizedCategoryName, normalizeDescription);

                if (similarity > 0.7) { 
                    category.count++;
                    category.products.push({
                        title: item.title,
                        supermarket: item.supermarket
                    });
                    foundCategory = true;
                    break;
                }
            }
        }

        if (!foundCategory) {
            categories.push({
                category: item.title,
                count: 1,
                products: [{
                    title: item.title,
                    supermarket: item.supermarket
                }]
            });
        }
    });

    return categories;
}