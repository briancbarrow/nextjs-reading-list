import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log('GET route')
  const res = await fetch(
    `https://api.airtable.com/v0/appV4vhlXofp6BgID/tblQ6ii6JrKorm0jw`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
      },
    }
  );
  const books = await res.json();
  console.log("BOOKS", books);
  return NextResponse.json({ books });
}
