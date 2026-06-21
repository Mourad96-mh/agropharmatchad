import { site } from '@/lib/site';

export const dynamic = 'force-static';

// Moteurs de réponse IA explicitement autorisés (citation dans ChatGPT, Claude, Gemini, Perplexity…)
const aiBots = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-Web', 'anthropic-ai',
  'Google-Extended', 'PerplexityBot', 'Perplexity-User',
  'Applebot-Extended', 'CCBot',
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...aiBots.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
