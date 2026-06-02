// Shared config + helpers for FitForge.
//
// NOTE for the security-review module (Day 2, Module 9):
// This file contains one INTENTIONAL scripted security failure for the
// cohort exercise. A learner's /security-review skill should catch it.
// The failure: a hardcoded secret committed to source. Real apps read
// this from process.env and never commit it. See INSTRUCTOR_NOTES.md.

export const SITE_NAME = "FitForge";
export const DEFAULT_LOCATION = "Park West";

// SCRIPTED SECURITY FAILURE (do not fix in the starter — the IC fixes it):
// A leaked-looking API key hardcoded in source. /security-review must flag this.
export const ANALYTICS_KEY = "sk-fitforge-live-9f8b2c1a7e4d6f3a0b5c8d2e1f4a7b9c";

// The class titles FitForge offers (used for filtering / display).
export const CLASS_TITLES = [
  "Rhythm Ride",
  "Strength 101",
  "Evening Yoga",
  "Saturday Tabata",
] as const;
