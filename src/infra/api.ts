import { MagicWordsData } from 'scenes/game/magic-words/types';

const API_URL =
  'https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords';

/**
 * Fetches the Magic Words configuration data from the remote mock API.
 *
 * The API returns the list of dialogues, avatars and emojis that will be used by the game scenes.
 * On a non-successful HTTP response the promise is rejected with an `Error`.
 *
 * @returns A promise that resolves to the `MagicWordsData` object needed by the game.
 * @throws Will propagate any network or parsing errors so callers can handle them appropriately.
 */
export const fetchMagicWordsData = async (): Promise<MagicWordsData> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data: MagicWordsData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Magic Words data:', error);
    throw error;
  }
};
