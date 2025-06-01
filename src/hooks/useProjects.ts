import { useState, useEffect } from 'react';
import { Project } from '../types/Project';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // In a real app, this would fetch from an API
        // For demo purposes, we'll return mock data after a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data
        const mockProjects: Project[] = [
          {
            id: '1',
            name: 'ABC Plumbing',
            description: 'Local plumbing company website',
            status: 'completed',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            previewImage: 'https://images.pexels.com/photos/8347501/pexels-photo-8347501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            sources: [],
          },
          {
            id: '2',
            name: 'Green Cafe',
            description: 'Organic cafe and restaurant',
            status: 'in-progress',
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            previewImage: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            sources: [],
          },
          {
            id: '3',
            name: 'Fitness Studio',
            description: 'Local gym and fitness center',
            status: 'draft',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            sources: [],
          },
        ];
        
        setProjects(mockProjects);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};