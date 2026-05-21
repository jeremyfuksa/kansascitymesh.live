# Security

This is a static website. There's no backend, no user accounts, no database, no form handlers. Almost all the "security surface" that normally matters in a web app doesn't apply.

That said, there are still a few categories of issue worth flagging:

## What to report

- **A way to inject content into the site without a PR review** — for example, an unfiltered query-string render, or a path that escapes the static-site contract.
- **A leaked credential or secret in the repo history** — anything that looks like an API key, an SMTP password, a private signing key.
- **A supply-chain concern** — for example, a dependency in `package.json` or `package-lock.json` that's been compromised upstream.
- **A redirect or link that points somewhere it shouldn't** — anything you'd flag as a phishing risk for a visitor.

## What's out of scope

- **Dependabot alerts on dev-only dependencies.** Things like the YAML parser inside `@astrojs/check` only run at build time, not in the shipped site. They're worth fixing, but they're not "go report this privately first" material.
- **Outdated versions of dependencies that don't have known vulnerabilities.** "You're on Astro 6.3.7 and 6.4 is out" is a regular PR, not a security report.
- **General "your CSP is missing" kind of feedback** — open an issue. Static sites are fine without one for most threat models, but we're happy to discuss.

## How to report

Email **hello@orangefla.me** with "Security" in the subject line. Please don't open a public GitHub issue for a real issue until we've had a chance to fix it.

Include:

- What the issue is
- How you found it
- Whether you've shared it anywhere else
- Whether you want credit when we fix it

We'll respond within a few days. If it's something we can fix, we'll fix it and credit you (with your permission) in the fix's commit message and the project's changelog.

## What we can promise

This is a community project. We don't have a security team, a bug-bounty program, or an SLA. What we can promise is: we'll read your report, we'll respond, and we'll fix what's fixable.
