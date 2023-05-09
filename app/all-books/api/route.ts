import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const res = await fetch(
    `https://api.airtable.com/v0/appV4vhlXofp6BgID/tblQ6ii6JrKorm0jw`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
      },
    }
  );
  const product = await res.json();

  return NextResponse.json({ product });
}
