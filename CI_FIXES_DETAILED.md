# CI Workflow - Issues Fixed

## Summary of Changes

Fixed critical GitHub Actions workflow issues that were causing test jobs to skip or not run in certain scenarios. The workflow now properly handles all branch triggers and PR conditions according to GitHub Actions best practices.

---

## Problems Fixed

### ❌ Problem 1: Incorrect PR Branch Reference

**Original Issue (Line 83, old workflow)**:
```yaml
if: (github.event_name == 'pull_request' && github.ref_name == 'main') || ...
```

**Why it was wrong**:
- `github.ref_name` contains the **source branch** name (the branch being PR'd from)
- For PRs, the source branch is never exactly 'main', it's typically `feature/xyz`
- The condition would NEVER trigger for PRs because source branch ≠ target branch
- Result: **PRs to main were silently skipped**

**How it's fixed**:
```yaml
if: |
  (github.event_name == 'pull_request' && 
   (github.base_ref == 'main' || github.base_ref == 'develop')) ||
  (github.event_name == 'push' && 
   github.ref == 'refs/heads/main')
```

**Explanation**:
- `github.base_ref`: The TARGET branch of the PR (only available in PR context)
- Now correctly checks if PR targets 'main' or 'develop'

---

### ❌ Problem 2: Missing 'main' Branch in Push Trigger

**Original Issue (Lines 4-6)**:
```yaml
on:
  push:
    branches:
      - develop        # ← Only develop, missing main!
  pull_request:
    branches:
      - main
      - develop
```

**Why it was wrong**:
- Pushes to `main` branch weren't triggering the workflow at all
- Production deployments had no quality gates
- Breaking changes could be pushed to main without linting or building
- Result: **All main branch pushes were silently skipped**

**How it's fixed**:
```yaml
on:
  push:
    branches:
      - main      # ← Added
      - develop
  pull_request:
    branches:
      - main
      - develop
```

---

### ❌ Problem 3: Duplicate Job Execution

**Original Issue**:
- `e2e-smoke` ran on: develop pushes
- `e2e-tests` ran on: develop pushes AND PR to main/develop

```yaml
# e2e-smoke condition
if: github.event_name == 'push' && github.ref_name == 'develop'

# e2e-tests condition  
if: (github.event_name == 'pull_request' && github.ref_name == 'main') || 
    (github.event_name == 'push' && github.ref_name == 'develop')
    # ↑ This caused both jobs to run on develop pushes
```

**Why it was wrong**:
- Both jobs would execute on develop push
- Duplicates wasted CI runner minutes
- Unclear which job was which
- More confusing to debug failures

**How it's fixed**:
```yaml
# e2e-smoke: ONLY develop pushes
if: github.event_name == 'push' && github.ref == 'refs/heads/develop'

# e2e-full: PR to main/develop OR push to main (NOT develop)
if: |
  (github.event_name == 'pull_request' && 
   (github.base_ref == 'main' || github.base_ref == 'develop')) ||
  (github.event_name == 'push' && 
   github.ref == 'refs/heads/main')
```

**Now**:
- Smoke tests run only on develop pushes (quick validation)
- Full tests run on main pushes and all PRs (comprehensive validation)
- No overlap, no wasted runners

---

### ❌ Problem 4: Ambiguous Reference Variables

**Original Issues**:
- Inconsistent use of `github.ref_name` (sometimes works, sometimes doesn't)
- Not clear which context each condition applies to
- Mixing push and PR event handling

**Why it was confusing**:
- `github.ref_name == 'main'` works for pushes but NOT for PRs
- Need different variables for different event types
- Hard to debug condition failures

**How it's fixed**:
```yaml
# For PUSH events: use github.ref (full reference path)
github.event_name == 'push' && github.ref == 'refs/heads/develop'
github.event_name == 'push' && github.ref == 'refs/heads/main'

# For PR events: use github.base_ref (target branch)
github.event_name == 'pull_request' && github.base_ref == 'main'
github.event_name == 'pull_request' && github.base_ref == 'develop'
```

**Benefits**:
- Consistent pattern: full form `refs/heads/branch` for all pushes
- Clear distinction: `base_ref` explicitly for PRs
- Easier to debug and maintain

---

### ❌ Problem 5: Non-Unique Artifact Names

**Original Issue**:
```yaml
name: playwright-chromium-artifacts
name: playwright-smoke-artifacts
```

**Why it was wrong**:
- Same name overwrites artifacts from previous runs
- Can't track multiple workflow runs
- Hard to correlate artifacts to specific runs

**How it's fixed**:
```yaml
name: playwright-smoke-report-${{ github.run_id }}
name: playwright-full-report-${{ github.run_id }}
```

**Benefits**:
- Each run gets unique artifacts: `playwright-smoke-report-12345`
- Can keep multiple runs' results for comparison
- Easy to identify which run produced which artifact

---

## Complete Condition Reference

### Variable Definitions

| Variable | Example | Available In | Context |
|----------|---------|--------------|---------|
| `github.event_name` | `push` \| `pull_request` | Always | What triggered the workflow |
| `github.ref` | `refs/heads/develop` | Always | Full git reference |
| `github.ref_name` | `develop` \| `feature/xyz` | Always | Simple branch/tag name |
| `github.base_ref` | `main` \| `develop` | PR only | PR target branch |
| `github.run_id` | `12345678` | Always | Unique run number |

### Usage Guide

**For PUSH events**:
```yaml
# ✓ Correct: use github.ref with full path
if: github.event_name == 'push' && github.ref == 'refs/heads/develop'

# ✗ Wrong: github.ref_name inconsistent, doesn't work for all cases
if: github.event_name == 'push' && github.ref_name == 'develop'
```

**For PR events**:
```yaml
# ✓ Correct: use github.base_ref for target branch
if: github.event_name == 'pull_request' && github.base_ref == 'main'

# ✗ Wrong: github.ref_name is source branch, not target
if: github.event_name == 'pull_request' && github.ref_name == 'main'
```

---

## Execution Scenarios - Before vs After

### Scenario A: Push to develop

**Before**:
```
✓ quality       → Runs
✓ e2e-smoke     → Runs
✓ e2e-tests     → Runs (duplicate!)
```

**After**:
```
✓ quality       → Runs
✓ e2e-smoke     → Runs
✗ e2e-full      → Skipped (correct: not a main push)
```

### Scenario B: Push to main

**Before**:
```
✗ quality       → SKIPPED! (main not in trigger)
✗ e2e-smoke     → SKIPPED (develop only)
✗ e2e-tests     → SKIPPED! (wrong condition for push to main)
```

**After**:
```
✓ quality       → Runs
✗ e2e-smoke     → Skipped (develop only)
✓ e2e-full      → Runs
```

### Scenario C: PR to main

**Before**:
```
✓ quality       → Runs
✗ e2e-smoke     → SKIPPED (push only)
✗ e2e-tests     → SKIPPED! (wrong ref_name condition)
```

**After**:
```
✓ quality       → Runs
✗ e2e-smoke     → Skipped (push only, correct)
✓ e2e-full      → Runs
```

### Scenario D: PR to develop

**Before**:
```
✓ quality       → Runs
✗ e2e-smoke     → SKIPPED (push only, correct)
✗ e2e-tests     → SKIPPED! (wrong ref_name condition)
```

**After**:
```
✓ quality       → Runs
✗ e2e-smoke     → Skipped (push only, correct)
✓ e2e-full      → Runs
```

---

## Key Improvements

✅ **Branch triggers complete**: Both `main` and `develop` now trigger on push
✅ **PR conditions fixed**: Now correctly uses `github.base_ref` for target branch  
✅ **No duplicate runs**: Clear separation between smoke and full tests
✅ **Better naming**: Unique artifact names with run IDs
✅ **Artifact retention**: Different policies (7d for smoke, 14d for full)
✅ **Concurrency control**: Cancels old runs to save minutes
✅ **Clear documentation**: Added comments explaining each job

---

## Files Changed

- `.github/workflows/ci.yml`: Fixed conditions and branch triggers
- `CHANGELOG.md`: Documented fixes in v1.1.0 release notes

## Testing

To verify these fixes work:

1. **Push to develop**: Should trigger quality + smoke tests
   ```bash
   git push origin develop
   # Check: quality and e2e-smoke should run
   ```

2. **Push to main**: Should trigger quality + full tests
   ```bash
   git push origin main
   # Check: quality and e2e-full should run (not e2e-smoke)
   ```

3. **PR to develop**: Should trigger quality + full tests
   ```bash
   git push origin feature/test
   # Create PR to develop
   # Check: quality and e2e-full should run (not e2e-smoke)
   ```

4. **PR to main**: Should trigger quality + full tests
   ```bash
   git push origin feature/test
   # Create PR to main
   # Check: quality and e2e-full should run
   ```
