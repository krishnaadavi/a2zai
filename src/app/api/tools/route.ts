import { NextResponse } from 'next/server';
import { AI_TOOLS, TOOL_CATEGORIES } from '@/lib/tools-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const category = searchParams.get('category');
    const q = searchParams.get('q')?.toLowerCase().trim();

    let tools = [...AI_TOOLS];

    if (category) {
      tools = tools.filter((tool) => tool.category === category);
    }

    if (q) {
      tools = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(q) ||
          tool.tagline.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          (tool.company?.toLowerCase().includes(q) ?? false)
      );
    }

    const safeLimit = Math.min(Math.max(limit, 1), 200);
    const data = tools.slice(0, safeLimit);

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
      categories: TOOL_CATEGORIES,
    });
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}
