import { MagicWordsData } from 'scenes/game/magic-words/types';
import { magicWords } from '../data/magicWords';

const API_URL = 'http://localhost:3000/api/magic-words';

/**
 * Fetches the Magic Words configuration data.
 *
 * It first attempts to fetch from the remote mock API. If the fetch fails
 * (due to network issues or a non-successful HTTP response), it falls back
 * to using a local mock data object.
 *
 * @returns A promise that resolves to the `MagicWordsData` object needed by the game.
 */
export const fetchMagicWordsData = async (): Promise<MagicWordsData> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      // Throw an error to be caught by the catch block, triggering the fallback.
      throw new Error(`Failed to fetch remote data: ${response.statusText}`);
    }
    const data: MagicWordsData = await response.json();
    return data;
  } catch (error) {
    console.warn('Remote fetch failed, falling back to local data:', error);
    // Fallback to local data
    return Promise.resolve(magicWords as MagicWordsData);
  }
};
