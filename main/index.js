const fs = require('fs')
const _ = require('lodash')
const leven = require('leven')

/**
 * Normalises the description of a product to facilitate comparison.
 * - Converts to lower case.
 * - Removes punctuation marks.
 * - Sorts words alphabetically.
 *
 * @param {string} description - The product description.
 * @returns {string} The normalised description.
 */

function normalizeDescriptionProduct (description) {
    return description 
            .toLowerCase()
            .replace(/[^\w\s]/g, '') // Take out all scores
            .split(' ')
            .sort()
            .join(' ')
}
