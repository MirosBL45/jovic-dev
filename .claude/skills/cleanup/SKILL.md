---
name: cleanup
description: Clean up project housekeeping tasks (add "run" to execute fixes)
argument-hint: run|check
---

Review the codebase for cleanup tasks:

1. Make sure that the history in @context/current-feature.md is in order from oldest to newest
2. Find unnecessary console.log statements in src/ (console.error for real server errors is fine)
3. Find unused imports
4. Check for stale TODO comments (report only — never change or remove an existing comment without the owner's approval)
5. Find orphaned/unused files
6. Check that context files match actual project state
7. Check that `.env.example` lists every variable the code reads (`process.env.*` in src/ and scripts/) plus the ones NextAuth reads implicitly (`NEXTAUTH_URL`, `NEXTAUTH_SECRET`). Compare with the variable NAMES in `.env.local` (names only, never print values). If something is missing, tell me.
8. Run `npm run sass:check` — every `.module.scss` must match its `.module.css`. Report mismatches and missing `.css` files.
9. Check that nothing from `backups/` and no `.env*` file except `.env.example` is tracked by git (`git ls-files`)

**Mode: $ARGUMENTS**

If no argument or argument is "check":

- Only report findings, don't modify anything
- List what WOULD be cleaned up

If the argument is "run" or "fix":

- First, report all findings with numbered items
- Then ask: "Which items would you like me to fix? (enter numbers like 1,3,5 or 'all' or 'none')"
- Wait for user response before making any changes
- Only fix the items the user specifies
- Report what you changed
