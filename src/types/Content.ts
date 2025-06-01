export interface PageSection {
  id: string;
  type: 'hero' | 'text' | 'services' | 'gallery' | 'team' | 'testimonials' | 'contact' | 'form';
  title: string;
  content: Record<string, any>;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  sections: PageSection[];
}