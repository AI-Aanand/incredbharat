// Share Package Utility Functions

/**
 * Builds share URLs for different platforms
 */
export const shareUrls = {
    whatsapp: (text, url) => `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + url)}`,

    facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,

    twitter: (text, url, hashtags = []) => {
        const hashtagStr = hashtags.length > 0 ? `&hashtags=${hashtags.join(',')}` : '';
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}${hashtagStr}`;
    },

    linkedin: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,

    email: (subject, body) => `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
};

/**
 * Formats share message for a package
 */
export const formatShareMessage = (pkg, state) => {
    const message = `🌏 ${pkg.title}\n📍 ${state?.name || 'India'}\n⏱️ ${pkg.duration}\n💰 Starting from ₹${pkg.price.toLocaleString('en-IN')}\n\nExplore this amazing tour package on IncredBharat!`;
    return message;
};

/**
 * Formats email share content
 */
export const formatEmailShare = (pkg, state, url) => {
    const subject = `Check out this tour: ${pkg.title}`;
    const body = `Hi,\n\nI found this amazing tour package that might interest you:\n\n${pkg.title}\nLocation: ${state?.name || 'India'}\nDuration: ${pkg.duration}\nPrice: ₹${pkg.price.toLocaleString('en-IN')}\n\n${pkg.description}\n\nView full details: ${url}\n\nHappy travels!\n`;
    return { subject, body };
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                textArea.remove();
                return true;
            } catch (err) {
                console.error('Fallback copy failed:', err);
                textArea.remove();
                return false;
            }
        }
    } catch (err) {
        console.error('Copy to clipboard failed:', err);
        return false;
    }
};

/**
 * Check if Web Share API is available
 */
export const canUseWebShare = () => {
    return typeof navigator !== 'undefined' && navigator.share !== undefined;
};

/**
 * Share using Web Share API
 */
export const shareViaWebAPI = async (shareData) => {
    if (!canUseWebShare()) {
        return false;
    }

    try {
        if (navigator.canShare && !navigator.canShare(shareData)) {
            return false;
        }
        await navigator.share(shareData);
        return true;
    } catch (err) {
        // User cancelled or error occurred
        if (err.name === 'AbortError') {
            // User cancelled, this is fine
            return true;
        }
        console.error('Web Share failed:', err);
        return false;
    }
};

/**
 * Get hashtags for a state
 */
export const getStateHashtags = (stateName) => {
    const baseHashtags = ['IncredibleIndia', 'TravelIndia'];
    if (stateName) {
        const stateTag = stateName.replace(/\s+/g, '').replace(/&/g, 'and');
        baseHashtags.push(stateTag);
    }
    return baseHashtags;
};
