/**
 * Retrieves a random quote from a remote API.
 *
 * @return {Array} An array containing the randomly selected quote and its author.
 */
export const randomQuote = async () => {
    const url = "/type.fit_api_quotes.txt";
    const response = await fetch(url);
    const quoteCollection = await response.json();
    const index = Math.floor(Math.random() * quoteCollection.length);
    const { text, author } = quoteCollection[index];
    const authorName = author || "Unknown";
    return [text, authorName];
}

export const bgImg = (x) => `linear-gradient(to top, rgba(0,0,0,.5), transparent), url('/bg-${x}.jpg')`;
