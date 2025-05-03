import { NextResponse } from "next/server";
import { app, storage, database } from "@/firebaseConfig";

export async function GET() {
  return NextResponse.json({
    message: "Hello World",
  });
}
