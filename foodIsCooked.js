/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function (kind, internalTemp, doneness) {
    // Write function HERE
    if (kind === "chicken") {
        return internalTemp >= 165 && doneness === undefined

    } else if (kind === "beef") {
        if (internalTemp >= 125 && internalTemp < 138) {
            return (doneness === "rare")
        }
        else if (internalTemp >= 138 && internalTemp < 155) {
            return (doneness === "medium")
        }
        else if (internalTemp >= 155) {
            return (doneness === "well")
        }
    }
}


// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true