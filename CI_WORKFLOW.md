# CI/CD Workflow Documentation

## Overview

The CI/CD workflow is configured in `.github/workflows/ci.yml` and follows GitHub Actions best practices. It runs automated checks and tests on code changes across the `develop` and `main` branches.

## Workflow Triggers

The workflow is triggered by:

### Push Events
- **Push to `develop`**: Runs quality checks + smoke tests
- **Push to `main`**: Runs quality checks + full E2E tests

### Pull Request Events
- **PR targeting `develop`**: Runs quality checks + full E2E tests
- **PR targeting `main`**: Runs quality checks + full E2E tests

## Jobs

### 1. Quality (Always Runs)

**Trigger**: Every push to `main`/`develop` and every PR to `main`/`develop`

**Steps**:
- Checkout code
- Set up Node.js 20
- Install dependencies (`npm ci`)
- Run ESLint (`npm run lint`)
- Build production bundle (`npm run build`)

**Purpose**: Ensure code quality and builds successfully before running any tests.

### 2. E2E Smoke Tests

**Trigger**: Push to `develop` branch only

**Condition**: `github.event_name == 'push' && github.ref == 'refs/heads/develop'`

**Steps**:
- All quality jobs must pass first (`needs: quality`)
- Checkout code
- Set up Node.js 20
- Install dependencies
- Install Playwright browsers
- Run all E2E tests (`npm run test:e2e`)
- Upload artifacts (7-day retention) on failure

**Purpose**: 
- Quick validation after pushing to develop
- Catch regressions before merging to main
- Lightweight smoke test of the full test suite

### 3. E2E Full Tests

**Trigger**: 
- PR targeting `main` or `develop`
- Push to `main` branch

**Condition**:
```yaml
if: |
  (github.event_name == 'pull_request' && 
   (github.base_ref == 'main' || github.base_ref == 'develop')) ||
  (github.event_name == 'push' && 
   github.ref == 'refs/heads/main')
```

**Steps**:
- All quality jobs must pass first (`needs: quality`)
- Checkout code
- Set up Node.js 20
- Install dependencies
- Install Playwright browsers
- Run all E2E tests (`npm run test:e2e`)
- Upload artifacts (14-day retention) on failure

**Purpose**:
- Comprehensive validation before merging to main
- Enforce test coverage on all PRs targeting main/develop
- Ensure production builds are tested

## Key GitHub Actions Concepts

### Branch References
- `github.ref`: Full reference like `refs/heads/develop`
- `github.ref_name`: Simple branch name like `develop`
- `github.base_ref`: Target branch for PRs (only in PR events)

### Condition Evaluation
Conditions use multi-line YAML with proper formatting:
```yaml
if: |
  condition1 ||
  condition2
```

### Job Dependencies
- `needs: quality`: E2E tests only run if quality checks pass

### Artifact Upload
- `if: failure()`: Upload only on test failure
- Unique naming: `playwright-report-${{ github.run_id }}`
- Different retention: 7 days for smoke, 14 days for full

## Execution Scenarios

### Scenario 1: PR to develop
```
Jobs to run:
✓ quality        (always on PR)
✗ e2e-smoke      (only on develop push)
✓ e2e-full       (PR to develop)
```

### Scenario 2: PR to main
```
Jobs to run:
✓ quality        (always on PR)
✗ e2e-smoke      (only on develop push)
✓ e2e-full       (PR to main)
```

### Scenario 3: Push to develop
```
Jobs to run:
✓ quality        (always on push)
✓ e2e-smoke      (push to develop)
✗ e2e-full       (only on main push or PR)
```

### Scenario 4: Push to main
```
Jobs to run:
✓ quality        (always on push)
✗ e2e-smoke      (only on develop push)
✓ e2e-full       (push to main)
```

## Performance Optimization

1. **Node cache**: Uses npm cache from actions/setup-node
2. **Conditional jobs**: E2E tests only run on specific branches/events
3. **Concurrent runs**: Cancels stale runs on the same branch
4. **Artifact cleanup**: Auto-deletes artifacts after retention period

## Troubleshooting

### Jobs not running?
1. Check the branch name in the trigger
2. Verify you're pushing to the correct branch
3. Look at the workflow run logs in the Actions tab

### PR checks not passing?
1. Run `npm run lint` locally
2. Run `npm run build` locally
3. Run `npm run test:e2e` locally
4. Fix issues and re-push
