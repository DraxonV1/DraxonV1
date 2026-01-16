// Modrinth API client for fetching user projects and mod data
// API Documentation: https://docs.modrinth.com/api-spec

export interface ModrinthProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  categories: string[];
  client_side: string;
  server_side: string;
  body: string;
  status: string;
  downloads: number;
  followers: number;
  published: string;
  updated: string;
  approved: string;
  icon_url: string;
  versions: string[];
  game_versions: string[];
  loaders: string[];
  gallery?: Array<{
    url: string;
    featured: boolean;
    title?: string;
    description?: string;
  }>;
}

export interface ModrinthUser {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar_url: string;
  created: string;
}

const MODRINTH_API_BASE = 'https://api.modrinth.com/v2';
const USER_AGENT = 'DraxonV1/Portfolio-Website (draxon.asia)';

// Fetch all projects for a specific user
export async function getUserProjects(username: string): Promise<ModrinthProject[]> {
  try {
    const response = await fetch(
      `${MODRINTH_API_BASE}/user/${username}/projects`,
      {
        headers: {
          'User-Agent': USER_AGENT
        }
      }
    );
    
    if (!response.ok) {
      console.error(`Modrinth API error for ${username}:`, response.status, response.statusText);
      const text = await response.text();
      console.error('Response body:', text);
      return [];
    }
    
    const projects: ModrinthProject[] = await response.json();
    return projects.sort((a, b) => b.downloads - a.downloads);
  } catch (error) {
    console.error('Error fetching Modrinth projects:', error);
    return [];
  }
}

// Fetch detailed project information including versions
export async function getProject(slug: string): Promise<ModrinthProject | null> {
  try {
    const response = await fetch(`${MODRINTH_API_BASE}/project/${slug}`);
    
    if (!response.ok) {
      console.error('Failed to fetch Modrinth project:', response.statusText);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Modrinth project:', error);
    return null;
  }
}

// Fetch multiple projects by IDs or slugs
export async function getProjects(ids: string[]): Promise<ModrinthProject[]> {
  if (ids.length === 0) return [];
  try {
    const response = await fetch(
      `${MODRINTH_API_BASE}/projects?ids=${JSON.stringify(ids)}`,
      {
        headers: {
          'User-Agent': USER_AGENT
        }
      }
    );
    
    if (!response.ok) {
      console.error('Failed to fetch Modrinth projects by IDs:', response.statusText);
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Modrinth projects by IDs:', error);
    return [];
  }
}

// Format numbers for display (e.g., 1234 -> 1.2K)
export function formatDownloads(downloads: number): string {
  if (downloads >= 1000000) {
    return `${(downloads / 1000000).toFixed(1)}M`;
  }
  if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(1)}K`;
  }
  return downloads.toString();
}

// Get loader icon class based on loader name
export function getLoaderIcon(loader: string): string {
  const loaders: Record<string, string> = {
    fabric: '🧶',
    forge: '⚒️',
    quilt: '🪡',
    neoforge: '🔨',
  };
  
  return loaders[loader.toLowerCase()] || '📦';
}
