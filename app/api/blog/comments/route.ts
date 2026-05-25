import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getCommentsFile = () => {
  const logDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  const filePath = path.join(logDir, 'blog-comments.json');
  if (!fs.existsSync(filePath)) {
    // Seed with some initial mock comments so the blog looks active
    const defaultComments = [
      {
        slug: 'shop-black-paper-pencils',
        name: 'Aarav Mehta',
        comment: 'I bought these black paper pencils last week and the texture is really unique! Love the eco-friendly vibe.',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        slug: 'shop-black-paper-pencils',
        name: 'Pooja Sharma',
        comment: 'These are great for shading. Hard to believe they are made from recycled paper!',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        slug: 'akotro-pencil-pricing',
        name: 'Karan Malhotra',
        comment: 'Very transparent pricing breakdown. Definitely worth supporting women artisans in Mumbai.',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        slug: 'bulk-eco-friendly-paper-pens',
        name: 'Sneha Rao',
        comment: 'Our office ordered a bulk pack of 200 pens. They write super smoothly and the branding on the barrel looks professional.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ];
    fs.writeFileSync(filePath, JSON.stringify(defaultComments, null, 2), 'utf-8');
  }
  return filePath;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
    }

    const filePath = getCommentsFile();
    const data = fs.readFileSync(filePath, 'utf-8');
    const allComments = JSON.parse(data);

    // Filter comments for this article slug
    const filteredComments = allComments.filter((c: any) => c.slug === slug);

    return NextResponse.json({ success: true, comments: filteredComments });
  } catch (error: any) {
    console.error('Fetch comments error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, name, comment } = body;

    if (!slug || !name || !comment) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const filePath = getCommentsFile();
    const data = fs.readFileSync(filePath, 'utf-8');
    const allComments = JSON.parse(data);

    const newComment = {
      slug,
      name,
      comment,
      date: new Date().toISOString(),
    };

    allComments.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(allComments, null, 2), 'utf-8');

    return NextResponse.json({ success: true, comment: newComment });
  } catch (error: any) {
    console.error('Post comment error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
