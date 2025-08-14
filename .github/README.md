# GitHub Repository Configuration

This directory contains all the GitHub-specific configuration files for the Servinoo Web Application project.

## 📁 Directory Structure

```
.github/
├── workflows/          # GitHub Actions workflows
│   ├── ci.yml         # Main CI/CD pipeline
│   ├── deploy.yml     # Deployment workflow
│   ├── codeql.yml     # Security analysis
│   ├── pr-labeler.yml # Automatic PR labeling
│   └── release.yml    # Release automation
├── ISSUE_TEMPLATE/     # Issue templates
│   ├── bug_report.yml
│   ├── feature_request.yml
│   ├── question.yml
│   └── config.yml
├── PULL_REQUEST_TEMPLATE/
│   └── pull_request_template.md
├── dependabot.yml     # Dependency updates
├── labeler.yml        # Labeling configuration
└── README.md          # This file
```

## 🚀 Workflows

### 1. CI/CD Pipeline (`ci.yml`)
**Triggers:** Push to `main`/`develop`, Pull Requests
**Features:**
- ✅ Dependency caching with pnpm
- ✅ ESLint code linting
- ✅ TypeScript type checking
- ✅ Build verification
- ✅ Security audit
- ✅ Conditional execution based on file changes
- ✅ Automatic PR comments on success

### 2. Deployment (`deploy.yml`)
**Triggers:** Push to `main`, Manual dispatch
**Features:**
- 🚀 Vercel deployment integration
- 🔍 Health checks
- 📝 Deployment comments on PRs
- 🎯 Environment-specific deployments (production/preview)

### 3. Security Analysis (`codeql.yml`)
**Triggers:** Push to `main`/`develop`, PRs, Weekly schedule
**Features:**
- 🔒 CodeQL security scanning
- 🛡️ Security and quality queries
- 📊 Security insights and alerts

### 4. PR Auto Labeler (`pr-labeler.yml`)
**Triggers:** PR events (opened, synchronized, edited)
**Features:**
- 🏷️ File-based automatic labeling
- 📏 Size-based labels (XS, S, M, L, XL)
- 🔤 Title-based type detection
- 🎯 Priority and breaking change detection

### 5. Release Automation (`release.yml`)
**Triggers:** Tag pushes (`v*`), Manual dispatch
**Features:**
- 📦 Automatic GitHub releases
- 📝 Changelog generation
- 🔢 Version management
- 🚀 Deployment integration

## 📋 Issue Templates

### Bug Report (`bug_report.yml`)
Structured template for reporting bugs with:
- Contact information
- Bug description and expected behavior
- Version and browser information
- Steps to reproduce
- Log output section

### Feature Request (`feature_request.yml`)
Template for suggesting new features:
- Problem description
- Proposed solution
- Alternative considerations
- Priority and category selection
- Additional context

### Question (`question.yml`)
Support template for questions:
- Question categorization
- Context and attempted solutions
- Checklist for documentation review

## 🔧 Configuration Files

### Dependabot (`dependabot.yml`)
- 📅 Weekly dependency updates on Mondays
- 📦 Grouped updates by dependency type
- 🏷️ Automatic labeling and assignment
- ⬆️ Emoji prefixes for commit messages

### Labeler (`labeler.yml`)
Automatic labeling based on file paths:
- `area/*` labels for different code areas
- `dependencies` for package changes
- `breaking-change` for breaking changes

## 🔐 Required Secrets

To use all workflows, set up these repository secrets:

### Vercel Deployment
```
VERCEL_TOKEN          # Vercel API token
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID
```

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL      # Public Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY # Public Supabase anonymous key
```

### Optional Services
```
SENTRY_DSN                    # Error tracking
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID # Analytics
```

## 📊 Workflow Status Badges

Add these badges to your main README.md:

```markdown
[![CI/CD](https://github.com/your-org/servinoo-web-application/workflows/🚀%20CI/CD%20Pipeline/badge.svg)](https://github.com/your-org/servinoo-web-application/actions/workflows/ci.yml)
[![Security](https://github.com/your-org/servinoo-web-application/workflows/🔒%20CodeQL%20Security%20Analysis/badge.svg)](https://github.com/your-org/servinoo-web-application/actions/workflows/codeql.yml)
[![Deploy](https://github.com/your-org/servinoo-web-application/workflows/🚀%20Deploy%20to%20Vercel/badge.svg)](https://github.com/your-org/servinoo-web-application/actions/workflows/deploy.yml)
```

## 🎯 Best Practices

### For Contributors
1. **Use descriptive PR titles** - Auto-labeling works based on titles
2. **Fill out PR templates** - Helps reviewers understand changes
3. **Wait for CI checks** - All checks must pass before merging
4. **Use conventional commits** - Helps with changelog generation

### For Maintainers
1. **Review security alerts** - Check CodeQL results regularly
2. **Monitor dependency updates** - Review Dependabot PRs
3. **Update templates** - Keep issue templates current
4. **Manage labels** - Maintain label consistency

## 🔄 Workflow Triggers Summary

| Workflow | Push (main) | Push (develop) | PR | Schedule | Manual |
|----------|-------------|----------------|----|---------:|--------|
| CI/CD    | ✅          | ✅             | ✅ | ❌       | ✅     |
| Deploy   | ✅          | ❌             | ❌ | ❌       | ✅     |
| CodeQL   | ✅          | ✅             | ✅ | Weekly   | ❌     |
| Labeler  | ❌          | ❌             | ✅ | ❌       | ❌     |
| Release  | ❌          | ❌             | ❌ | ❌       | ✅     |

## 🚨 Troubleshooting

### Common Issues

1. **Workflow fails on dependencies**
   - Check if `pnpm-lock.yaml` is committed
   - Verify Node.js version compatibility

2. **Deployment fails**
   - Verify Vercel secrets are set
   - Check environment variables

3. **Security scan fails**
   - Review CodeQL alerts in Security tab
   - Update vulnerable dependencies

4. **Auto-labeling not working**
   - Check `.github/labeler.yml` paths
   - Verify GitHub Actions permissions

## 📞 Support

For issues with GitHub configuration:
1. Check workflow run logs in Actions tab
2. Review repository settings and secrets
3. Create an issue using the question template

---

**Note:** This configuration is optimized for the Servinoo Web Application using Next.js 15, React 19, and Supabase.