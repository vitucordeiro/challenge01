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
    const distanceBetweenString = leven( firstString, secondString )
    return 1 - distanceBetweenString / maxLengthBetweenStrings
}

