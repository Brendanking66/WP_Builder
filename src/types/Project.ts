export interface ProjectSource {
  id: string;
  type: 'facebook' | 'google' | 'website';
  url: string;
  credentials?: {
    username: string;
    password: string;
  };
  status: 'pending' | 'completed' | 'failed';
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  previewImage?: string;
  sources: ProjectSource[];
}

export interface CrawlResult {
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