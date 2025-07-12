import { MagicWordsData } from 'scenes/game/magic-words/types';

const API_URL = 'https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords';

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
