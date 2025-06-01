import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as cheerio from "npm:cheerio@1.0.0-rc.12";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface CrawlResult {
  title: string;
  description: string;
  logo?: string;
  navigation: string[];
  sections: {
    type: string;
    content: any;
  }[];
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
    socialLinks?: string[];
  };
}

async function crawlWebsite(url: string): Promise<CrawlResult> {
  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    
    const response = await fetch(fullUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const title = $('title').text() || $('h1').first().text();
    const description = $('meta[name="description"]').attr('content') || 
                       $('meta[property="og:description"]').attr('content') ||
                       $('p').first().text();
    
    const logo = $('img[src*="logo"]').attr('src') ||
                $('a[href="/"] img').attr('src');
    
    const navigation = $('nav a, header a').map((_, el) => $(el).text().trim()).get()
      .filter(text => text && text.length > 2);
    
    const sections = [];
    
    const hero = {
      type: 'hero',
      content: {
        heading: $('h1').first().text(),
        subheading: $('h1').first().next('p, h2').text(),
        backgroundImage: $('header img, .hero img, section:first-child img').first().attr('src'),
      }
    };
    sections.push(hero);
    
    const services = $('section:contains("Services"), div:contains("Services")')
      .find('h3, .service')
      .map((_, el) => ({
        title: $(el).find('h3, h4').text() || $(el).text(),
        description: $(el).find('p').text(),
      }))
      .get();
    
    if (services.length > 0) {
      sections.push({
        type: 'services',
        content: { items: services }
      });
    }
    
    const aboutContent = $('section:contains("About"), div:contains("About")')
      .find('p')
      .map((_, el) => $(el).text())
      .get()
      .join('\n\n');
    
    if (aboutContent) {
      sections.push({
        type: 'text',
        content: { text: aboutContent }
      });
    }
    
    const contact = {
      email: $('a[href^="mailto:"]').first().attr('href')?.replace('mailto:', ''),
      phone: $('a[href^="tel:"]').first().attr('href')?.replace('tel:', ''),
      address: $('address').text() || $('*:contains("Address:")').text(),
      socialLinks: $('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"], a[href*="linkedin"]')
        .map((_, el) => $(el).attr('href'))
        .get()
    };
    
    if (Object.values(contact).some(v => v)) {
      sections.push({
        type: 'contact',
        content: contact
      });
    }
    
    return {
      title,
      description,
      logo,
      navigation,
      sections,
      contact
    };
    
  } catch (error) {
    console.error('Error crawling website:', error);
    throw new Error('Failed to crawl website');
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    const result = await crawlWebsite(url);
    
    return new Response(
      JSON.stringify(result),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});