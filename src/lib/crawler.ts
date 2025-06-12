import { CrawlResult } from '../types/Project';
import { isSupabaseConfigured } from './supabase';

export async function crawlWebsite(url: string): Promise<CrawlResult> {
  if (!isSupabaseConfigured()) {
    // Return mock data when Supabase is not configured
    return {
      title: `Website: ${url}`,
      description: 'This is a sample description extracted from the website.',
      navigation: ['Home', 'About', 'Services', 'Contact'],
      sections: [
        {
          type: 'hero',
          content: {
            heading: 'Welcome to Our Business',
            subheading: 'Your trusted partner for quality services',
            backgroundImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
          }
        },
        {
          type: 'services',
          content: {
            items: [
              {
                title: 'Service 1',
                description: 'Description of service 1',
                icon: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg'
              },
              {
                title: 'Service 2',
                description: 'Description of service 2',
                icon: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'
              }
            ]
          }
        },
        {
          type: 'text',
          content: {
            text: 'We are a dedicated team of professionals committed to providing the highest quality services to our clients.'
          }
        }
      ],
      contact: {
        email: 'contact@example.com',
        phone: '(555) 123-4567',
        address: '123 Main St, City, State 12345'
      }
    };
  }

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