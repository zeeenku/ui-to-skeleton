// import { NextResponse } from 'next/server';
// import db from '../../../lib/db';

// // GET request: Fetch the current count
// export async function GET() {
//   try {
//     const row = db.prepare('SELECT count FROM skeletons WHERE id = 1').get();

//     if (!row) {
//       return NextResponse.json({ error: 'Record not found' }, { status: 404 });
//     }

//     return NextResponse.json({ count: row.count });
//   } catch (err) {
//     if (err instanceof Error) {
//       return NextResponse.json({ error: 'Error retrieving count', details: err.message }, { status: 500 });
//     } else {
//       return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
//     }
//   }
// }

// // POST request: Update the count
// export async function POST(req) {
//   try {
//     const { count } = await req.json();
// // 
//     if (typeof count !== 'number') {
//       return NextResponse.json({ error: 'Invalid count' }, { status: 400 });
//     }

//     db.prepare('UPDATE skeletons SET count = ? WHERE id = 1').run(count);

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     if (err instanceof Error) {
//       return NextResponse.json({ error: 'Error updating count', details: err.message }, { status: 500 });
//     } else {
//       return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
//     }
//   }
// }
