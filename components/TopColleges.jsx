"use client";

import { useState, useEffect, useCallback } from "react";

const COLLEGE_TYPES = [
  "All Types",
  "Government (IIT)",
  "Government (NIT)",
  "Government (Deemed)",
  "Government",
  "Private (Autonomous)",
  "Private (Deemed)",
  "Private (Aided)",
  "Private",
];

const LOCATIONS = [
  "All Cities",
  "Mumbai",
  "Pune",
  "Nagpur",
  "Nashik",
  "Aurangabad",
  "Amravati",
  "Nanded",
  "Sangli",
  "Kolhapur",
  "Loni",
  "Karad",
];

function CollegeCard({ college }) {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden hover-lift group">
      <div className="bg-gradient-to-r from-primary to-blue-600 p-4 text-white">
        <div className="flex items-start justify-between">
          <div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                college.type.startsWith("Government")
                  ? "bg-green-500/20 text-green-100"
                  : "bg-white/20"
              }`}
            >
              {college.type}
            </span>
            <h3 className="text-lg font-semibold mt-2">{college.name}</h3>
            <div className="flex items-center gap-1 mt-1 text-sm text-white/80">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {college.location}
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg">
            <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">{college.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Popular Branches</p>
          <div className="flex flex-wrap gap-2">
            {college.branches.map((branch, i) => (
              <span
                key={i}
                className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full"
              >
                {branch}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Key Highlights</p>
          <ul className="space-y-1">
            {college.highlights.map((highlight, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                <svg
                  className="w-4 h-4 text-green-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-24 w-full" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="flex gap-2">
          <div className="h-5 bg-gray-200 rounded-full w-12" />
          <div className="h-5 bg-gray-200 rounded-full w-14" />
          <div className="h-5 bg-gray-200 rounded-full w-10" />
        </div>
        <div className="h-3 bg-gray-200 rounded w-1/4 mt-2" />
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default function TopColleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [locationFilter, setLocationFilter] = useState("All Cities");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "6" });
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (typeFilter !== "All Types") params.set("type", typeFilter);
      if (locationFilter !== "All Cities") params.set("location", locationFilter);

      const res = await fetch(`/api/colleges?${params}`);
      if (!res.ok) throw new Error("Failed to load colleges");
      const data = await res.json();
      setColleges(data.colleges || []);
    } catch (err) {
      setError("Could not load colleges. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, typeFilter, locationFilter]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  return (
    <section id="colleges" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full mb-4 shadow-sm border border-blue-100">
            Top Institutes
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Top Engineering Colleges in Maharashtra
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore the best engineering colleges based on placements, faculty, infrastructure, and
            overall reputation.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search colleges, branches…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2.5 text-sm border border-border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {COLLEGE_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2.5 text-sm border border-border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {LOCATIONS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            <div className="col-span-full text-center py-12 text-red-500">{error}</div>
          ) : colleges.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No colleges found for your search.
            </div>
          ) : (
            <>
              {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}

              {/* View All Card */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center p-8 min-h-[300px]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Explore 350+ Colleges</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Access our complete database with detailed information
                </p>
                <a
                  href="#counselling"
                  className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-xl hover:bg-blue-700 transition-colors"
                >
                  View All Colleges
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
