export async function GET() {
  const items = [
    { createdAt: '2023-06-25 11:00', filename: '1abc.txt' },
    { createdAt: '2023-06-25 12:00', filename: 'abc.txt' },
    { createdAt: '2023-06-25 13:00', filename: '01abc.txt' },
    { createdAt: '2023-06-25 14:00', filename: '0010abc.txt' },
    { createdAt: '2023-06-25 15:00', filename: '011abc.txt' },
    { createdAt: '2023-06-25 16:00', filename: '20-abc.txt' },
    { createdAt: '2023-06-25 17:00', filename: '021-abc.txt' },
    { createdAt: '2023-06-25 18:00', filename: '002-abc.txt' },
    { createdAt: '2023-06-25 19:00', filename: 'cba.txt' },
    { createdAt: '2023-06-25 20:00', filename: 'abc010.txt' },
    { createdAt: '2023-06-25 21:00', filename: 'abc1.txt' },
  ];
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
}