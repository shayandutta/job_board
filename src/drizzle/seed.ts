/**
 * Seed script for Student Opportunity & Internship Portal
 * Populates the database with sample organizations and opportunities for the Northeast region.
 *
 * Run with: npm run seed
 */

import "dotenv/config"
import { db } from "@/drizzle/db"
import { JobListingTable, OrganizationTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

const SEED_ORG_IDS = ["seed_org_guwahati_tech", "seed_org_northeast_dev"]

async function seed() {
  console.log("🌱 Starting database seed...")

  // Step 1: Clear existing seed data (organizations cascade to job listings)
  for (const orgId of SEED_ORG_IDS) {
    await db.delete(OrganizationTable).where(eq(OrganizationTable.id, orgId))
  }
  console.log("   Cleared existing seed organizations (if any)")

  // Step 2: Insert Organizations (Organizers)
  await db.insert(OrganizationTable).values([
    {
      id: SEED_ORG_IDS[0],
      name: "Guwahati Tech Startup",
      imageUrl: null,
    },
    {
      id: SEED_ORG_IDS[1],
      name: "Northeast Dev Community",
      imageUrl: null,
    },
  ])
  console.log("   Inserted 2 organizations")

  // Step 3: Insert Job Listings (Opportunities)
  const now = new Date()
  await db.insert(JobListingTable).values([
    {
      organizationId: SEED_ORG_IDS[0],
      title: "Frontend React Internship",
      description: `Join our growing product team as a Frontend React Intern! Work on real-world projects building responsive web applications for Northeast India's tech ecosystem.

**What you'll do:**
- Build and maintain React components
- Collaborate with designers and backend developers
- Learn modern tooling (TypeScript, Tailwind, Vite)

**Ideal for:** Students in CS, IT, or related fields. Basic JavaScript knowledge required.`,
      wage: 15,
      wageInterval: "hourly",
      city: "Guwahati",
      stateAbbreviation: "AS",
      locationRequirement: "hybrid",
      experienceLevel: "junior",
      status: "published",
      type: "internship",
      postedAt: now,
      isFeatured: true,
    },
    {
      organizationId: SEED_ORG_IDS[1],
      title: "Assam Web3 Hackathon",
      description: `48-hour hackathon focused on Web3, blockchain, and decentralized applications. Compete for prizes, network with developers across the Northeast, and build something innovative!

**Tracks:**
- DeFi & Payments
- NFT & Digital Identity
- DAO & Governance

**Prizes:** ₹50,000 total prize pool. Food and swag included.`,
      wage: null,
      wageInterval: null,
      city: "Guwahati",
      stateAbbreviation: "AS",
      locationRequirement: "in-office",
      experienceLevel: "junior",
      status: "published",
      type: "hackathon",
      postedAt: now,
      isFeatured: true,
    },
    {
      organizationId: SEED_ORG_IDS[0],
      title: "Campus Ambassador",
      description: `Represent Guwahati Tech Startup on your campus! Help us connect with talented students, organize events, and grow the Northeast tech community.

**Responsibilities:**
- Promote our events and opportunities
- Organize 1–2 campus meetups per semester
- Share feedback from the student community

**Compensation:** Stipend + swag. Flexible hours, remote-friendly.`,
      wage: 10,
      wageInterval: "hourly",
      city: null,
      stateAbbreviation: null,
      locationRequirement: "remote",
      experienceLevel: "junior",
      status: "published",
      type: "event",
      postedAt: now,
      isFeatured: false,
    },
    {
      organizationId: SEED_ORG_IDS[1],
      title: "UI/UX Design Project",
      description: `Collaborative project to redesign our community website. Work with a small team of designers and developers to create a modern, accessible experience for Northeast developers.

**Scope:**
- User research and wireframing
- High-fidelity mockups in Figma
- Design system documentation

**Duration:** 6–8 weeks. Portfolio piece guaranteed. Unpaid but great for building experience.`,
      wage: null,
      wageInterval: null,
      city: "Shillong",
      stateAbbreviation: "ML",
      locationRequirement: "remote",
      experienceLevel: "junior",
      status: "published",
      type: "project",
      postedAt: now,
      isFeatured: false,
    },
    {
      organizationId: SEED_ORG_IDS[0],
      title: "Full-Stack Developer (Startup Role)",
      description: `Early-stage startup seeking a passionate full-stack developer to help build our MVP. Tech stack: Next.js, PostgreSQL, Drizzle ORM.

**What we offer:**
- Equity stake for the right candidate
- Flexible work (hybrid in Guwahati)
- Mentorship from experienced founders

**Requirements:** 1+ year of experience or strong side projects. Students in final year welcome.`,
      wage: 25,
      wageInterval: "hourly",
      city: "Guwahati",
      stateAbbreviation: "AS",
      locationRequirement: "hybrid",
      experienceLevel: "junior",
      status: "published",
      type: "startup_role",
      postedAt: now,
      isFeatured: true,
    },
  ])
  console.log("   Inserted 5 job listings (opportunities)")

  // Revalidate Next.js cache so the home page shows fresh data
  try {
    const res = await fetch("http://localhost:3000/api/revalidate")
    if (res.ok) {
      console.log("   Cache revalidated — refresh the page to see listings")
    }
  } catch {
    console.log("   ⚠️  Dev server not running — restart it and refresh to see listings")
  }

  console.log("✅ Seed complete!")
}

seed()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("❌ Seed failed:", err)
    process.exit(1)
  })
