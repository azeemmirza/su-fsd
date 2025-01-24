import { headers } from 'next/headers';
import { parse } from 'papaparse';

export async function GET() {
  try {
    const headersList = headers();
    const host = (await headersList).get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const csvUrl = `${protocol}://${host}/data.csv`;

    const response = await fetch(csvUrl);
    const csvText = await response.text();
    
    const { data } = parse(csvText, {
      header: true,
      skipEmptyLines: true
    });

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch(e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: 'Failed to read CSV file' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}