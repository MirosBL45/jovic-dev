# Review Action

**IMPORTANT:** Do not add Claude or Codex or any AI to any commit messages

1. Read current-feature.md to understand the goals
2. Review all code changes made for this feature
3. Check for:
   - ✅ Goals met
   - ❌ Goals missing or incomplete
   - ⚠️ Code quality issues or bugs
   - 🚫 Scope creep (code beyond goals)
   - 🔒 Security: identity and permissions checked on the server from the session, never from the request body; server-side validation present
   - 💬 Existing comments: none changed, moved or removed without the owner's approval (check the diff)
   - 🎨 Styles: every changed `.module.scss` has a regenerated `.module.css` (`npm run sass:check`)
   - 🧪 Tests: new logic in `src/utils/` has Vitest tests and `npm run test` passes
4. Final verdict: Ready to complete or needs changes

**IMPORTANT:** Do not add Claude or Codex or any AI to any commit messages