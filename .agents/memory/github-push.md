---
name: GitHub push method
description: gitPush() callback has no credentials in this repl — must use shell with token embedded in remote URL
---

The `gitPush()` CodeExecution callback returns `NO_CREDENTIALS` because there is no Replit GitHub OAuth connection. Always push via ShellExec:

```bash
TOKEN=$(printenv GITHUB_TOKEN)
git remote set-url origin "https://dogxhood:${TOKEN}@github.com/dogxhood/DOGXHOOD.git"
git push origin main
```

**Why:** The GITHUB_TOKEN secret is available at runtime via `printenv GITHUB_TOKEN`. The token must be embedded in the remote URL each time because the URL is not persisted with credentials between sessions.

**How to apply:** Whenever pushing to GitHub in this project, use the shell command above. Do not use `gitPush()` callback — it will always fail with NO_CREDENTIALS.
