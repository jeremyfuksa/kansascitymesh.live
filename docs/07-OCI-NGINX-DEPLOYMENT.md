# OCI/Nginx Deployment Guide

## Kansas City Meshtastic Network Website

**Version**: 1.0
**Date**: 2025-10-04
**Status**: Planning Phase - OCI Infrastructure

---

## 1. Overview

This document provides deployment instructions for hosting the Kansas City Meshtastic Network website on your existing Oracle Cloud Infrastructure (OCI) instance running Nginx on Ubuntu.

**Infrastructure**:

- Platform: Oracle Cloud Infrastructure (OCI)
- OS: Ubuntu
- Web Server: Nginx
- Deployment Method: Git-based with automated builds

---

## 2. Advantages of Self-Hosted OCI

### vs Netlify

**Pros**:

- ✅ **Full Control**: Complete server access
- ✅ **No Bandwidth Limits**: OCI free tier includes 10 TB egress/month
- ✅ **Cost**: Potentially $0 if within OCI free tier
- ✅ **Learning**: Experience with server administration
- ✅ **Flexibility**: Can run additional services (API, database if needed)

**Cons**:

- ❌ **Manual SSL Management**: Need to set up Let's Encrypt, configure renewals
- ❌ **No Built-in Forms**: Need to implement form handling separately
- ❌ **Manual Deployment Pipeline**: Need to set up Git hooks or CI/CD
- ❌ **Server Maintenance**: Ubuntu updates, security patches, monitoring
- ❌ **No Automatic CDN**: Need to configure caching carefully

**Recommendation**: OCI is excellent choice if you're comfortable with server administration. Saves money and provides full control.

---

## 3. Server Requirements

### OCI Instance Specs (Minimum)

**Free Tier Eligible**:

- Shape: VM.Standard.E2.1.Micro (1 OCPU, 1 GB RAM)
- Storage: 50 GB boot volume
- OS: Ubuntu 22.04 LTS
- Network: 480 Mbps bandwidth

**Sufficient For**:

- Static site hosting (Astro build outputs ~50-100 MB)
- Expected traffic: 1,000+ sessions/month easily handled
- Nginx serves static files efficiently (thousands of requests/second)

**If Traffic Grows**:

- Upgrade to larger shape
- Add load balancer (OCI Load Balancer service)
- Implement caching proxy (Cloudflare in front)

### Software Requirements

**Installed on Server**:

- ✅ Nginx (web server)
- [ ] Node.js 18+ (for building Astro site)
- [ ] Git (for pulling code)
- [ ] Certbot (for Let's Encrypt SSL)
- [ ] PM2 or systemd (optional: for running build scripts)

---

## 4. Initial Server Setup

### 4.1 Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### 4.2 Install Node.js

```bash
# Install Node.js 18 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should be v18.x
npm --version   # Should be v9.x or v10.x
```

### 4.3 Install Git

```bash
sudo apt install -y git

# Configure Git (if not already)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 4.4 Nginx Configuration Check

```bash
# Verify Nginx installed and running
sudo systemctl status nginx

# If not installed
sudo apt install -y nginx

# Enable and start Nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 4.5 Install Certbot (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Verify installation
certbot --version
```

---

## 5. Directory Structure

### Recommended Structure

```
/var/www/
├── kansascitymesh.live/
│   ├── repo/                    # Git repository
│   │   ├── .git/
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── ...
│   └── html/                    # Built site (Nginx serves this)
│       ├── index.html
│       ├── about/
│       ├── get-started/
│       ├── images/
│       └── ...
```

### Create Directories

```bash
# Create directory structure
sudo mkdir -p /var/www/kansascitymesh.live/{repo,html}

# Set ownership (replace 'ubuntu' with your user)
sudo chown -R ubuntu:ubuntu /var/www/kansascitymesh.live
```

---

## 6. Clone Repository and Build Site

### 6.1 Clone Repository

```bash
cd /var/www/kansascitymesh.live/repo

# Clone repository (replace with your repo URL)
git clone https://github.com/your-username/kansascitymesh-website.git .

# Or if using SSH
# git clone git@github.com:your-username/kansascitymesh-website.git .
```

### 6.2 Install Dependencies

```bash
cd /var/www/kansascitymesh.live/repo

# Install npm dependencies
npm ci  # Use 'ci' for production (respects lockfile exactly)
```

### 6.3 Build Site

```bash
# Build Astro site
npm run build

# Build output goes to ./dist by default
# Copy to html directory (where Nginx serves from)
rsync -av --delete dist/ /var/www/kansascitymesh.live/html/

# Or use cp (less efficient for updates)
# rm -rf /var/www/kansascitymesh.live/html/*
# cp -r dist/* /var/www/kansascitymesh.live/html/
```

### 6.4 Verify Build

```bash
# Check that files exist
ls -la /var/www/kansascitymesh.live/html/

# Should see:
# - index.html
# - about/
# - get-started/
# - images/
# - _astro/ (hashed CSS/JS)
```

---

## 7. Nginx Configuration

### 7.1 Create Nginx Server Block

```bash
sudo nano /etc/nginx/sites-available/kansascitymesh.live
```

**Configuration** (before SSL):

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name kansascitymesh.live www.kansascitymesh.live;

    root /var/www/kansascitymesh.live/html;
    index index.html;

    # Logging
    access_log /var/log/nginx/kansascitymesh.access.log;
    error_log /var/log/nginx/kansascitymesh.error.log;

    # Serve static files
    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json image/svg+xml;
}
```

### 7.2 Enable Site

```bash
# Create symbolic link to sites-enabled
sudo ln -s /etc/nginx/sites-available/kansascitymesh.live /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

### 7.3 Verify HTTP Works

```bash
# From your local machine (or server if curl installed)
curl -I http://kansascitymesh.live

# Should return HTTP 200 and headers
# If DNS not configured yet, test with server IP:
# curl -I http://<your-oci-ip>
```

---

## 8. SSL Configuration (Let's Encrypt)

### 8.1 OCI Firewall Rules

**Before running Certbot**, ensure OCI allows HTTPS:

**In OCI Console**:

1. Navigate to: Networking → Virtual Cloud Networks
2. Select your VCN
3. Click Security Lists
4. Click Default Security List
5. Add Ingress Rule:
   - Source CIDR: `0.0.0.0/0`
   - IP Protocol: TCP
   - Destination Port Range: `443`
   - Description: "HTTPS"

**Ubuntu Firewall** (if using ufw):

```bash
sudo ufw allow 443/tcp
sudo ufw reload
```

### 8.2 Obtain SSL Certificate

```bash
# Run Certbot (Nginx plugin automatically configures Nginx)
sudo certbot --nginx -d kansascitymesh.live -d www.kansascitymesh.live

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (recommended: yes)
```

**Certbot Will**:

- Verify domain ownership (HTTP-01 challenge)
- Obtain certificate from Let's Encrypt
- Modify Nginx config to enable SSL
- Set up auto-renewal (systemd timer)

### 8.3 Verify SSL

```bash
# Test HTTPS
curl -I https://kansascitymesh.live

# Should return HTTP 200 with HTTPS

# Check SSL grade (external tool)
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=kansascitymesh.live
# Should get A or A+ rating
```

### 8.4 Auto-Renewal

Certbot installs systemd timer for auto-renewal:

```bash
# Check renewal timer
sudo systemctl status certbot.timer

# Test renewal (dry run, doesn't actually renew)
sudo certbot renew --dry-run

# If successful, renewal will happen automatically every 60 days
```

---

## 9. Deployment Automation

### 9.1 Manual Deployment Script

**Create Deploy Script**: `/var/www/kansascitymesh.live/deploy.sh`

```bash
#!/bin/bash

# Kansas City Mesh Website Deployment Script

set -e  # Exit on error

REPO_DIR="/var/www/kansascitymesh.live/repo"
HTML_DIR="/var/www/kansascitymesh.live/html"

echo "========================================="
echo "Deploying Kansas City Mesh Website"
echo "========================================="

# Navigate to repository
cd $REPO_DIR

# Pull latest changes
echo "Pulling latest changes from Git..."
git pull origin main

# Install dependencies (if package.json changed)
echo "Installing dependencies..."
npm ci

# Build site
echo "Building site..."
npm run build

# Sync to html directory
echo "Deploying to web root..."
rsync -av --delete dist/ $HTML_DIR/

# Reload Nginx (to clear any caches, optional)
echo "Reloading Nginx..."
sudo systemctl reload nginx

echo "========================================="
echo "Deployment complete!"
echo "========================================="
```

**Make Executable**:

```bash
chmod +x /var/www/kansascitymesh.live/deploy.sh
```

**Run Deploy**:

```bash
/var/www/kansascitymesh.live/deploy.sh
```

### 9.2 Automated Deployment (Git Hooks)

**Option A: Post-Receive Hook** (if you push directly to server):

```bash
# In bare repository on server (advanced)
# Create bare repo: git init --bare ~/kansascitymesh-website.git
# Add post-receive hook to run deploy script
# Push from local: git remote add production user@server:kansascitymesh-website.git
# git push production main
```

**Option B: GitHub Actions** (recommended):

**Workflow File**: `.github/workflows/deploy.yml` (in your repository)

```yaml
name: Deploy to OCI

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to OCI via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.OCI_HOST }}
          username: ${{ secrets.OCI_USERNAME }}
          key: ${{ secrets.OCI_SSH_KEY }}
          script: |
            /var/www/kansascitymesh.live/deploy.sh
```

**GitHub Secrets** (configure in GitHub repo settings):

- `OCI_HOST`: Your OCI instance public IP or domain
- `OCI_USERNAME`: SSH username (e.g., `ubuntu`)
- `OCI_SSH_KEY`: Private SSH key (paste entire key)

**How it Works**:

1. Push to `main` branch on GitHub
2. GitHub Actions triggers
3. Connects to OCI server via SSH
4. Runs deploy script
5. Site updated automatically

### 9.3 Deployment Notifications

**Add to Deploy Script** (email on success/failure):

```bash
# At end of deploy.sh
if [ $? -eq 0 ]; then
    echo "Deployment successful" | mail -s "KC Mesh Deploy Success" your@email.com
else
    echo "Deployment failed" | mail -s "KC Mesh Deploy FAILURE" your@email.com
fi
```

**Install mail** (if not installed):

```bash
sudo apt install -y mailutils
```

Or use **webhook** to notify Discord/Slack:

```bash
# At end of deploy.sh
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"KC Mesh website deployed successfully"}' \
  YOUR_WEBHOOK_URL
```

---

## 10. Forms Handling (Self-Hosted)

Since you can't use Netlify Forms, implement form handling on server.

### Option A: Simple PHP Form Handler

**Install PHP**:

```bash
sudo apt install -y php-fpm php-cli
```

**Configure Nginx** (add to server block):

```nginx
location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
}
```

**Form Handler** (`/var/www/kansascitymesh.live/html/contact.php`):

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    // Validate
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'All fields required']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email']);
        exit;
    }

    // Send email
    $to = "contact@kansascitymesh.live";
    $subject = "Contact Form Submission from $name";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: noreply@kansascitymesh.live\r\nReply-To: $email";

    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Message sent']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to send']);
    }
}
?>
```

**HTML Form** (in your Astro page):

```html
<form id="contact-form" action="/contact.php" method="POST">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" required />

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />

  <label for="message">Message</label>
  <textarea id="message" name="message" required></textarea>

  <button type="submit">Send</button>
</form>

<script>
  document
    .getElementById("contact-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const response = await fetch("/contact.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      alert(result.message);
      if (result.success) e.target.reset();
    });
</script>
```

### Option B: Use External Form Service

**Formspree** (free tier: 50 submissions/month):

- Sign up at formspree.io
- Get form endpoint
- Point HTML form to Formspree endpoint
- No server-side code needed

**Pros**: Simple, no backend required
**Cons**: External dependency, limited free tier

---

## 11. Performance Optimization

### 11.1 Nginx Caching

**Add to Nginx config**:

```nginx
# In server block
location / {
    try_files $uri $uri/ =404;

    # Enable browser caching
    expires 1h;
    add_header Cache-Control "public, max-age=3600";
}

# Static assets: long cache
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp|woff|woff2|ttf)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML: short cache (content updates)
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, max-age=3600";
}
```

### 11.2 Cloudflare as CDN (Optional)

**Add Cloudflare** in front of OCI:

- Sign up at cloudflare.com
- Add domain
- Point DNS to Cloudflare nameservers
- Cloudflare proxies traffic (CDN, DDoS protection, caching)
- Free tier includes CDN and SSL

**Benefits**:

- Global CDN (faster worldwide delivery)
- DDoS protection
- Free SSL (in addition to Let's Encrypt)
- Caching rules (reduce server load)
- Analytics

**Nginx Config** (if using Cloudflare):

```nginx
# Trust Cloudflare IPs (for real client IP)
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
# ... (add all Cloudflare IP ranges)
real_ip_header CF-Connecting-IP;
```

### 11.3 Gzip/Brotli Compression

**Already enabled** in Nginx config above (Gzip).

**For Brotli** (better compression):

```bash
# Install Brotli module
sudo apt install -y libnginx-mod-http-brotli

# Add to Nginx config
brotli on;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
```

---

## 12. Monitoring and Logging

### 12.1 Nginx Logs

**Access Log**: `/var/log/nginx/kansascitymesh.access.log`
**Error Log**: `/var/log/nginx/kansascitymesh.error.log`

**View Logs**:

```bash
# Tail access log (real-time)
sudo tail -f /var/log/nginx/kansascitymesh.access.log

# Tail error log
sudo tail -f /var/log/nginx/kansascitymesh.error.log

# Search for errors
sudo grep "error" /var/log/nginx/kansascitymesh.error.log
```

### 12.2 Log Rotation

Nginx logs auto-rotate (logrotate):

```bash
# Check logrotate config
cat /etc/logrotate.d/nginx

# Logs rotate daily, keep 14 days, compress old logs
```

### 12.3 Server Monitoring

**UptimeRobot** (external, free):

- Monitor https://kansascitymesh.live
- Alerts via email if site down

**On Server** (optional):

**Install htop** (system monitor):

```bash
sudo apt install -y htop
htop  # View CPU, RAM, processes
```

**Check Disk Space**:

```bash
df -h
```

**Check Nginx Status**:

```bash
sudo systemctl status nginx
```

---

## 13. Security Hardening

### 13.1 Firewall (UFW)

**Enable UFW** (if not already):

```bash
sudo ufw enable

# Allow SSH (important! Don't lock yourself out)
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

### 13.2 Fail2Ban (Brute Force Protection)

**Install Fail2Ban**:

```bash
sudo apt install -y fail2ban

# Configure (optional: customize)
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local

# Enable and start
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

**Fail2Ban** monitors logs and bans IPs with repeated failed attempts.

### 13.3 Keep System Updated

```bash
# Update packages weekly
sudo apt update
sudo apt upgrade -y

# Auto-security updates (recommended)
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

### 13.4 SSH Hardening (If Not Already)

**Disable Root Login**:

```bash
sudo nano /etc/ssh/sshd_config

# Set:
PermitRootLogin no
PasswordAuthentication no  # Use SSH keys only

# Reload SSH
sudo systemctl reload sshd
```

---

## 14. Backup Strategy

### 14.1 Code Backup

**Git Repository**: Primary backup (GitHub)

### 14.2 Server Backup

**OCI Boot Volume Backup**:

- In OCI Console: Create manual backup of boot volume
- Or set up automatic backups (OCI policy-based)

**File-Level Backup** (optional):

```bash
# Backup entire www directory
tar -czf /tmp/kansascitymesh-backup-$(date +%F).tar.gz /var/www/kansascitymesh.live

# Copy to local machine or S3/OCI Object Storage
scp /tmp/kansascitymesh-backup-*.tar.gz user@local-machine:/backups/
```

### 14.3 Database Backup (If Using)

If you add database later (PostgreSQL, MySQL):

```bash
# Example: PostgreSQL dump
pg_dump kansascitymesh > /tmp/kansascitymesh-db-$(date +%F).sql
```

---

## 15. Troubleshooting

### Site Not Loading

**Check Nginx Running**:

```bash
sudo systemctl status nginx

# If not running:
sudo systemctl start nginx
```

**Check Nginx Config**:

```bash
sudo nginx -t

# Fix any errors shown, then reload:
sudo systemctl reload nginx
```

**Check Logs**:

```bash
sudo tail -50 /var/log/nginx/kansascitymesh.error.log
```

---

### SSL Certificate Issues

**Certificate Expired**:

```bash
# Renew manually
sudo certbot renew

# Reload Nginx
sudo systemctl reload nginx
```

**Check Certificate**:

```bash
sudo certbot certificates
```

---

### Deployment Script Fails

**Check Git**:

```bash
cd /var/www/kansascitymesh.live/repo
git status
git pull origin main  # Manual pull to see errors
```

**Check Node**:

```bash
node --version
npm --version
```

**Check Build**:

```bash
cd /var/www/kansascitymesh.live/repo
npm run build  # See build errors
```

---

### Form Not Submitting

**Check PHP Running** (if using PHP):

```bash
sudo systemctl status php8.1-fpm
```

**Check Nginx PHP Config**:

```bash
sudo nginx -t
```

**Check Logs**:

```bash
sudo tail -50 /var/log/nginx/kansascitymesh.error.log
```

---

## 16. Cost Summary (OCI)

**Oracle Cloud Free Tier** (if eligible):

- VM.Standard.E2.1.Micro: Free forever
- 50 GB boot volume: Free
- 10 TB outbound data/month: Free
- Public IP: Free

**Additional Costs**:

- Domain: ~$1/month ($12/year)
- Email forwarding (Cloudflare): Free
- Plausible Analytics: $9/month (optional)

**Total**: ~$1-10/month depending on analytics choice

**vs Netlify**: Potentially cheaper ($0 vs $0, but Netlify would charge if exceed free tier)

---

## 17. Deployment Checklist (OCI/Nginx)

### Pre-Deployment

- [ ] OCI instance running Ubuntu
- [ ] Nginx installed and running
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] Domain DNS points to OCI public IP
- [ ] OCI firewall allows HTTP (80) and HTTPS (443)
- [ ] Ubuntu firewall (ufw) allows 80 and 443

### Initial Deployment

- [ ] Create directory structure
- [ ] Clone repository
- [ ] Install npm dependencies
- [ ] Build site (`npm run build`)
- [ ] Copy build to web root
- [ ] Create Nginx server block
- [ ] Enable site in Nginx
- [ ] Test Nginx config (`nginx -t`)
- [ ] Reload Nginx
- [ ] Verify HTTP works

### SSL Setup

- [ ] Run Certbot (`certbot --nginx`)
- [ ] Verify HTTPS works
- [ ] Test auto-renewal (`certbot renew --dry-run`)
- [ ] Check SSL grade (ssllabs.com)

### Automation

- [ ] Create deploy script
- [ ] Test deploy script
- [ ] Set up GitHub Actions (optional)
- [ ] Test automated deployment

### Security

- [ ] UFW enabled and configured
- [ ] SSH hardened (no root login, key-only auth)
- [ ] Fail2Ban installed
- [ ] Security headers in Nginx config
- [ ] SSL configured correctly

### Forms

- [ ] PHP installed (if using PHP forms)
- [ ] Form handler script created
- [ ] Test form submission
- [ ] Or configure external form service (Formspree)

### Monitoring

- [ ] UptimeRobot monitoring configured
- [ ] Log rotation working
- [ ] Plausible Analytics installed (if using)
- [ ] Google Search Console configured

### Performance

- [ ] Gzip compression enabled
- [ ] Browser caching headers set
- [ ] Static asset caching (long expiry)
- [ ] Optional: Cloudflare CDN configured

### Ongoing

- [ ] Weekly: Check logs, monitor uptime
- [ ] Monthly: Update system packages
- [ ] Quarterly: Review security, update dependencies

---

## 18. Quick Command Reference

**Deploy Site**:

```bash
/var/www/kansascitymesh.live/deploy.sh
```

**Check Nginx Status**:

```bash
sudo systemctl status nginx
```

**Reload Nginx** (after config change):

```bash
sudo nginx -t && sudo systemctl reload nginx
```

**View Access Log**:

```bash
sudo tail -f /var/log/nginx/kansascitymesh.access.log
```

**View Error Log**:

```bash
sudo tail -f /var/log/nginx/kansascitymesh.error.log
```

**Renew SSL**:

```bash
sudo certbot renew
```

**Check Disk Space**:

```bash
df -h
```

**Update System**:

```bash
sudo apt update && sudo apt upgrade -y
```

---

**Document Status**: Complete
**Infrastructure**: Oracle Cloud Infrastructure (OCI) + Nginx
**Next Steps**: Follow deployment checklist above
