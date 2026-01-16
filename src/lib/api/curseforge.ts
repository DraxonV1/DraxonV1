// CurseForge API client for fetching mod data
// API Documentation: https://docs.curseforge.com/

export interface CurseForgeProject {
  id: number;
  name: string;
  slug: string;
  summary: string;
  downloadCount: number;
  dateCreated: string;
  dateModified: string;
  dateReleased: string;
  logo: {
    url: string;
    thumbnailUrl: string;
  };
  screenshots: Array<{
    url: string;
    thumbnailUrl: string;
    title: string;
  }>;
  links: {
    websiteUrl: string;
    wikiUrl?: string;
    issuesUrl?: string;
    sourceUrl?: string;
  };
  latestFiles: Array<{
    displayName: string;
    fileName: string;
    gameVersions: string[];
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

const CURSEFORGE_API_BASE = 'https://api.curseforge.com/v1';
const MINECRAFT_GAME_ID = 432;

// Note: CurseForge API requires an API key
// This key is used ONLY during build time to keep it secret
const API_KEY = process.env.CURSEFORGE_API_KEY || '';

async function curseforgeRequest(endpoint: string, options: RequestInit = {}) {
  if (!API_KEY) {
    console.error('CRITICAL: CURSEFORGE_API_KEY is not defined in environment variables!');
    return null;
  }

  try {
    console.log(`CurseForge Request: ${endpoint} (Key length: ${API_KEY.length})`);
    const response = await fetch(`${CURSEFORGE_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'x-api-key': API_KEY,
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...((options.headers as Record<string, string>) || {}),
      },
    });

    if (!response.ok) {
      console.error(`CurseForge API error (${response.status}):`, response.statusText);
      if (response.status === 403) {
        console.error('ERROR 403: Your API Key is likely invalid or has been blocked.');
      }
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching from CurseForge:', error);
    return null;
  }
}

// Search for mods by author
export async function searchModsByAuthor(authorName: string): Promise<CurseForgeProject[]> {
  // Use the search endpoint with more broad parameters if needed
  const endpoint = `/mods/search?gameId=${MINECRAFT_GAME_ID}&searchFilter=${encodeURIComponent(authorName)}&classId=6`;
  console.log(`Fetching CurseForge mods: ${endpoint}`);
  
  const data = await curseforgeRequest(endpoint);

  if (!data) {
    console.error(`No data returned from CurseForge for author: ${authorName}`);
    return [];
  }

  // Filter results to ensure the author name matches if the API is too broad
  // CurseForge search can be fuzzy
  return data;
}

// Get specific mod by ID
export async function getMod(modId: number): Promise<CurseForgeProject | null> {
  return await curseforgeRequest(`/mods/${modId}`);
}

// Get multiple mods by IDs
export async function getMods(modIds: number[]): Promise<CurseForgeProject[]> {
  if (modIds.length === 0) return [];
  console.log(`Fetching specific CurseForge mod IDs: ${modIds.join(', ')}`);

  const data = await curseforgeRequest('/mods', {
    method: 'POST',
    body: JSON.stringify({ modIds }),
  });

  if (!data) {
    console.warn(`CurseForge /mods POST failed for IDs: ${modIds.join(', ')}`);
    return [];
  }

  return data;
}

// Format download count similar to Modrinth
export function formatCurseForgeDownloads(downloads: number): string {
  if (downloads >= 1000000) {
    return `${(downloads / 1000000).toFixed(1)}M`;
  }
  if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(1)}K`;
  }
  return downloads.toString();
}
