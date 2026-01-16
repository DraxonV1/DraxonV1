import { getUserProjects, ModrinthProject, getProjects } from '@/lib/api/modrinth';
import { searchModsByAuthor, CurseForgeProject, getMods } from '@/lib/api/curseforge';
import content from '@/config/content.json';
import ClientWrapper from '@/components/ClientWrapper';
import { UnifiedProject } from '@/components/sections/Mods';

async function getUnifiedMods(): Promise<UnifiedProject[]> {
  try {
    const { curseforgeIds, modrinthIds, authorName } = content.projects;
    console.log(`Starting unified fetch. CF IDs: ${curseforgeIds}, MR IDs: ${modrinthIds}`);

    // Fetch from both sources in parallel during build
    const [cfProjects, mrProjects] = await Promise.all([
      curseforgeIds.length > 0 
        ? getMods(curseforgeIds) 
        : searchModsByAuthor(authorName),
      modrinthIds.length > 0 
        ? getProjects(modrinthIds as string[])
        : getUserProjects(authorName)
    ]);

    console.log(`CF Results count: ${cfProjects?.length || 0}`);
    console.log(`MR Results count: ${mrProjects?.length || 0}`);

    const unified: UnifiedProject[] = [
      ...(cfProjects || []).map(p => ({
        id: p.id,
        title: p.name,
        description: p.summary,
        downloads: p.downloadCount,
        icon_url: p.logo?.url || '',
        slug: p.slug,
        source: 'CurseForge' as const,
        url: p.links.websiteUrl,
        categories: (p.categories || []).map(c => c.name)
      })),
      ...(mrProjects || []).map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        downloads: p.downloads,
        icon_url: p.icon_url,
        slug: p.slug,
        source: 'Modrinth' as const,
        url: `https://modrinth.com/mod/${p.slug}`,
        categories: p.categories || []
      }))
    ];

    // remove duplicates (by title)
    const uniqueMap = new Map<string, UnifiedProject>();
    unified.forEach(p => {
      const key = p.title.toLowerCase().trim();
      if (!uniqueMap.has(key) || (p.source === 'CurseForge' && uniqueMap.get(key)?.source === 'Modrinth')) {
        uniqueMap.set(key, p);
      }
    });

    return Array.from(uniqueMap.values()).sort((a, b) => b.downloads - a.downloads);
  } catch (error) {
    console.error('Build-time fetch error:', error);
    return [];
  }
}

export default async function Home() {
  const mods = await getUnifiedMods();

  return <ClientWrapper mods={mods} />;
}