import { getJobListingGlobalTag } from "@/features/jobListings/db/cache/jobListings"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

/**
 * Revalidates the job listings cache. Call after seeding the database
 * so the home page shows fresh data. Usage: GET /api/revalidate
 */
export async function GET() {
  revalidateTag(getJobListingGlobalTag())
  return NextResponse.json({ revalidated: true })
}
