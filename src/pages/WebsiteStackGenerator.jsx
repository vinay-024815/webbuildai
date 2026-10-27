
import { useState } from "react";
import { Container } from "../ui";

const STACKS = {
  business: {
    frontend: "React + Tailwind CSS",
    backend: "Node.js + Express",
    cms: "Contentful or Sanity",
    hosting: "Vercel",
    ui: "Radix UI components",
    database: "PostgreSQL",
  },
  blog: {
    frontend: "Astro + Tailwind",
    backend: "Node.js (optional)",
    cms: "Astro Content Collections",
    hosting: "Vercel or Netlify",
    ui: "Custom components",
    database: "PostgreSQL or MongoDB",
  },
  portfolio: {
    frontend: "React + Vite",
    backend: "Node.js + Express",
    cms: "Contentful",
    hosting: "Netlify",
    ui: "Tailwind UI",
    database: "MongoDB or PostgreSQL",
  },
  store: {
    frontend: "Next.js + Commerce",
    backend: "Node.js + Sanity",
    cms: "Shopify or Contentful",
    hosting: "Vercel or Shopify",
    ui: "Tailwind CSS",
    database: "PostgreSQL",
  },
  landing: {
    frontend: "React + Tailwind",
    backend: "Serverless functions",
    cms: "Strapi",
    hosting: "Vercel",
    ui: "Custom components",
    database: "Supabase",
  },
  "web-app": {
    frontend: "React + TypeScript",
    backend: "Node.js + NestJS",
    cms: "Sanity",
    hosting: "AWS or Vercel",
    ui: "Radix UI",
    database: "MongoDB",
  },
  "ai-tool": {
    frontend: "React + Tailwind",
    backend: "Python + FastAPI",
    cms: "Not applicable",
    hosting: "Vercel or Railway",
    ui: "Custom components",
    database: "Supabase or PostgreSQL",
  },
  membership: {
    frontend: "Next.js",
    backend: "Node.js + Supabase",
    cms: "Supabase",
    hosting: "Vercel",
    ui: "Tailwind CSS",
    database: "PostgreSQL",
  },
};

function getStackForType(websiteType) {
  return STACKS[websiteType] || STACKS.business;
}

const techDescriptions = {
  frontend: "The user-facing part of your website that users interact with directly. Modern frameworks like React, Astro, or Next.js provide fast, responsive experiences.",
  backend: "The server-side logic that handles data processing, business rules, and communication between the frontend and database.",
  cms: "Content Management System - allows you to easily update and manage website content without developer assistance.",
  hosting: "Where your website lives on the internet. Services like Vercel, Netlify, or AWS provide deployment, scaling, and CDN delivery.",
  ui: "User Interface components and libraries that provide pre-built design elements, consistency, and faster development.",
  database: "Where your website's data is stored and retrieved. Options range from relational (PostgreSQL) to document-based (MongoDB) or serverless (Supabase).",
};

export default function WebsiteStackGenerator() {
  const [step, setStep] = useState(1);
  const [websiteType, setWebsiteType] = useState("business");

  const stack = getStackForType(websiteType);

  const handleTypeChange = (e) => {
    setWebsiteType(e.target.value);
    setStep(1);
  };

  const handleGenerate = () => {
    setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setWebsiteType("business");
  };

  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">
            Website Stack Generator
          </h2>

          {step === 1 ? (
            <div className="space-y-5">
              <p className="text-slate-600">
                Select your website type to generate a recommended tech stack.
              </p>

              <div>
                <label
                  htmlFor="websiteType"
                  className="mb-2 block font-medium text-slate-700"
                >
                  Website Type
                </label>

                <select
                  id="websiteType"
                  value={websiteType}
                  onChange={handleTypeChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-emerald-600"
                >
                  <option value="business">Business Website</option>
                  <option value="blog">Blog Website</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
              >
                Generate Stack
              </button>
            </div>
          ) : (
            <div>
              <h3 className="mb-4 text-xl font-semibold text-slate-900">
                Recommended Tech Stack
              </h3>

              <div className="space-y-3">
                {Object.entries(stack).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-sm capitalize text-slate-500">
                      {key}
                    </p>
                    <p className="font-medium text-slate-900">{value}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-5 rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Start Again
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
