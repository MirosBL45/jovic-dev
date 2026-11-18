# Test Action

1. Read current-feature.md to understand what was implemented
2. Identify utility functions, validation, permission rules and server logic (Route Handlers) added/modified for this feature
3. Check if tests already exist for these functions
4. For functions without tests that have testable logic, write unit tests:
   - Create unit tests using Vitest
   - Focus on utilities, validation, permissions and server logic (not components)
   - Logic inside Route Handlers that should be tested is extracted into pure functions in `src/utils/`
   - Test happy path and error cases
   - Do not write tests just to write them. Use your best judgement
5. Run `npm test` to verify all tests pass
6. Report test coverage for the new feature code