import { CrawlResult } from '../types/Project';

export async function crawlWebsite(url: string): Promise<CrawlResult> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/crawler`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to crawl website');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error crawling website:', error);
    throw error;
  }
}