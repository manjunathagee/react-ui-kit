# Security Guidelines

## Environment Variables and Secrets

### ✅ Secure Practices

1. **Never commit secrets to version control**
   - Use `.env` files for local development
   - Ensure `.env` is in `.gitignore`
   - Use GitHub Secrets for CI/CD pipelines

2. **Use environment variables for sensitive data**
   ```bash
   # ✅ Good - in .env file (not committed)
   CHROMATIC_PROJECT_TOKEN=chpt_your_actual_token
   
   # ❌ Bad - hardcoded in source code
   const token = "chpt_274a93683bdfede"
   ```

3. **Provide examples without real values**
   ```bash
   # ✅ Good - in .env.example (committed)
   CHROMATIC_PROJECT_TOKEN=chpt_your_project_token_here
   ```

### Current Implementation

- **Chromatic Token**: Stored in `.env` file (gitignored)
- **GitHub Actions**: Uses `CHROMATIC_PROJECT_TOKEN` secret
- **Local Development**: Reads from environment variables
- **Configuration**: No hardcoded tokens in config files

### Setting Up Secrets

#### Local Development
1. Copy `.env.example` to `.env`
2. Replace placeholder values with actual tokens
3. Never commit the `.env` file

#### GitHub Actions
1. Go to Repository Settings → Secrets and Variables → Actions
2. Add `CHROMATIC_PROJECT_TOKEN` with your actual token
3. Reference in workflows as `${{ secrets.CHROMATIC_PROJECT_TOKEN }}`

#### Production Deployment
- Use your deployment platform's secret management system
- Never expose tokens in logs or error messages
- Rotate tokens regularly

## File Security

### Committed Files (✅ Safe)
- `.env.example` - Template with placeholder values
- Configuration files - No hardcoded secrets
- Documentation - References to environment variables only

### Ignored Files (🔒 Secret)
- `.env` - Contains actual token values
- Local environment configurations
- Development certificates

## Token Management

### Chromatic Project Token
- **Format**: `chpt_` followed by alphanumeric string
- **Location**: Environment variable `CHROMATIC_PROJECT_TOKEN`
- **Rotation**: Change in Chromatic dashboard when needed
- **Scope**: Limited to this specific project

### Best Practices
1. **Principle of Least Privilege**: Use tokens with minimal required permissions
2. **Regular Rotation**: Update tokens periodically
3. **Monitoring**: Watch for unauthorized usage
4. **Incident Response**: Revoke and regenerate if compromised

## Audit Checklist

- [ ] No secrets in committed files
- [ ] `.env` file in `.gitignore`
- [ ] GitHub secrets configured
- [ ] Documentation references environment variables
- [ ] Configuration files use environment variables
- [ ] Team members trained on security practices

## Incident Response

If a secret is accidentally committed:

1. **Immediately** revoke the exposed token
2. Generate a new token
3. Update all environments with the new token
4. Consider git history cleanup (if repository is private)
5. Document the incident and lessons learned

## Contact

For security concerns or questions, contact the repository maintainers.