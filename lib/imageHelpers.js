/**
 * Helper function to get package image with fallback to state image
 * @param {Object} pkg - Package object
 * @param {Object} state - State object  
 * @returns {string} - Image path (package hero image or state image fallback)
 */
export function getPackageImage(pkg, state) {
    // Primary: Use package's own image (local or external)
    if (pkg.images && pkg.images[0]) {
        return pkg.images[0];
    }

    // Fallback: Use state image
    if (state && state.image) {
        return state.image;
    }

    // Final fallback
    return '/images/fallback.svg';
}

/**
 * Check if package image is AI generated
 * @param {Object} pkg - Package object
 * @param {Object} state - State object
 * @returns {boolean} - Whether the displayed image (primary) is AI-generated
 */
export function isPackageImageAI(pkg, state) {
    // If package has an image, return its AI flag
    if (pkg.images && pkg.images[0]) {
        return pkg.isAIGenerated || false;
    }

    // If falling back to state image, return state's AI flag
    if (state && state.image) {
        return state.isAIGenerated || false;
    }

    return false;
}
