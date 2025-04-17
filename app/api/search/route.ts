import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const skills = searchParams.get('skills')?.split(',') || [];
  const location = searchParams.get('location')?.toLowerCase();
  const experience = searchParams.get('experience');

  try {
    const filePath = path.join(process.cwd(), 'data', 'engineers.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    let results = data.engineers;

    // Apply filters
    if (query) {
      results = results.filter((engineer: any) => 
        engineer.name.toLowerCase().includes(query) ||
        engineer.title.toLowerCase().includes(query) ||
        engineer.bio.toLowerCase().includes(query)
      );
    }

    if (skills.length > 0) {
      results = results.filter((engineer: any) =>
        skills.every(skill => 
          engineer.skills.some((s: string) => 
            s.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    if (location) {
      results = results.filter((engineer: any) =>
        engineer.location.toLowerCase().includes(location)
      );
    }

    if (experience) {
      results = results.filter((engineer: any) =>
        engineer.experience >= parseInt(experience)
      );
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error searching engineers:', error);
    return NextResponse.json(
      { error: 'Failed to search engineers' },
      { status: 500 }
    );
  }
}

