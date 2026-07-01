# Saudade

A community platform for graduate students — real stories, quiet solidarity, and the reminder that you are not walking this road alone.

Built with Eleventy 2.0, Decap CMS, and Netlify.

---

## Prerequisites

Before you start, make sure you have:

- **Node.js 18 or higher** — download from [nodejs.org](https://nodejs.org)
- **Git** — download from [git-scm.com](https://git-scm.com)
- **A GitHub account** — [github.com](https://github.com)
- **A Netlify account** — [netlify.com](https://netlify.com) (free tier is fine)
- **A Formspree account** — [formspree.io](https://formspree.io) (free tier handles the contact and story forms; ID already set to `xlgypekv`)

---

## Running the Site Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/saudade.git
cd saudade
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The site will be available at `http://localhost:8080`. Eleventy will watch for changes and rebuild automatically. The CMS at `/admin` only works on the live Netlify site — local CMS access requires additional setup not covered here.

### 4. Build for production

```bash
npm run build
```

This generates the static site in the `_site` folder.

---

## Deploying to Netlify

### Step 1 — Push your code to GitHub

If you have not already, create a new repository on GitHub and push the project:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/saudade.git
git push -u origin main
```

### Step 2 — Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Select **GitHub** and authorize Netlify
4. Find and select your `saudade` repository
5. Netlify will detect the `netlify.toml` and pre-fill the settings:
   - Build command: `npm run build`
   - Publish directory: `_site`
6. Click **Deploy site**

Netlify will build and deploy the site. Every time you push to `main`, Netlify rebuilds automatically.

---

## Enabling the CMS

The CMS lives at `yoursite.netlify.app/admin`. It needs two Netlify features enabled before it works.

### Step 1 — Enable Netlify Identity

1. In the Netlify dashboard, go to your site
2. Click **Site configuration** → **Identity**
3. Click **Enable Identity**
4. Under **Registration**, set it to **Invite only** (important — you do not want anyone to be able to register)
5. Under **External providers**, you can optionally add Google login for convenience
6. Click **Save**

### Step 2 — Enable Git Gateway

1. Still in **Identity**, scroll down to **Services**
2. Click **Enable Git Gateway**
3. This allows the CMS to commit content directly to your GitHub repository

### Step 3 — Invite yourself

1. In the **Identity** tab, click **Invite users**
2. Enter your email address
3. Check your email and follow the invitation link to set a password

### Step 4 — Access the CMS

Go to `yoursite.netlify.app/admin`. Log in with your email and password. You should see the Decap CMS dashboard with four collections: Journal Posts, Community Stories, About Page, and Resources.

---

## Writing and Publishing a Journal Post

1. Go to `/admin` and log in
2. Click **Journal Posts** in the left sidebar
3. Click **New Journal Post**
4. Fill in:
   - **Title** — the name of your post
   - **Date** — defaults to today
   - **Category** — choose the one that fits best
   - **Excerpt** — one or two sentences shown on the listing card (max 200 characters)
   - **Body** — your full post, written in Markdown
   - **Sidebar Note** — optional; a short annotation shown in the article sidebar in handwritten style
   - **Draft** — leave this ON while you are writing; toggle it OFF when you are ready to publish
5. Click **Publish** in the top right when you are done
6. Netlify will rebuild the site within a minute or two. Your post appears at `/journal/` once the build finishes.

---

## Approving and Publishing a Community Story

Stories arrive via the submission form at `/stories/#submit`. Formspree sends them to your email. To publish a story:

1. Read the submission and decide whether to publish it
2. If yes, go to `/admin` → **Community Stories** → **New Community Story**
3. Fill in the fields using the submitted content (title, topic, author name if they provided one, details, excerpt, body)
4. Leave **Approved** toggled OFF for now
5. Click **Publish** to save it as a draft in the CMS
6. When you are ready for it to go live, edit the entry and toggle **Approved** to ON
7. Save and publish — Netlify rebuilds and the story appears at `/stories/`

Nothing auto-publishes. You control every story that appears on the site.

---

## Editing the About Page

1. Go to `/admin` → **About Page** → **About Page Content**
2. Fill in:
   - **Why I Built This** — your story, in your voice. This appears on the home page and the about page.
   - **A Little About Me** — whatever you want to share about yourself
   - **What I Hope You Feel Here** — one to three sentences
3. Click **Publish**
4. The site rebuilds and your words replace the placeholders

---

## Adding a Resource

1. Go to `/admin` → **Resources** → **New Resources**
2. Fill in:
   - **Title** — the name of the book, podcast, tool, etc.
   - **Type** — Book, Podcast, Article, Tool, App, Community, Crisis Line, Video, or Website
   - **Category** — which section it belongs to on the Resources page
   - **Description** — a short description in your own words (one to three sentences)
   - **Link** — the URL if it has one (optional)
3. Click **Publish**
4. The resource appears on the Resources page grouped under its category

---

## Updating Placeholder Content

The site ships with placeholder text in the About section so you can see where your words go before you write them. To replace the placeholders:

1. Go to `/admin` → **About Page**
2. Edit each field with your own content
3. Publish

The placeholders on the home page and about page will be replaced automatically once you save real content.

---

## Formspree Setup

The contact form and story submission form send to Formspree ID `xlgypekv`. This is already configured in the code.

To verify it is working:
1. Log in to [formspree.io](https://formspree.io)
2. Find the form with ID `xlgypekv`
3. Make sure your email address is set as the notification recipient
4. Submit a test message from the live site to confirm delivery

If you need to use a different Formspree form, update the ID in `src/stories.njk` and `src/contact.njk` (the fetch URL in each form's submit handler).

---

## Troubleshooting

### The CMS at /admin shows a blank page or login error

- Make sure Netlify Identity is enabled for your site
- Make sure Git Gateway is enabled
- Make sure you accepted the invitation email and set a password
- Try clearing your browser cache and loading `/admin` again

### Content I published is not showing up on the site

- Check the Netlify dashboard for build status — there may be a build error
- For journal posts, make sure **Draft** is toggled OFF before publishing
- For community stories, make sure **Approved** is toggled ON before publishing
- Wait a minute or two after publishing for the Netlify build to complete

### The build is failing on Netlify

- Check the build log in the Netlify dashboard under **Deploys**
- The most common cause is a syntax error in a content file
- Make sure all content Markdown files have valid front matter (the `---` block at the top)

### The contact or story form is not sending

- Open your browser's developer tools (F12) and check the Console for errors
- Make sure you are testing on the live Netlify site, not locally (Formspree requires a live domain)
- Check your Formspree dashboard to confirm the form ID is correct

### Images uploaded via CMS are not showing

- Images upload to `public/images/` and are served from `/images/`
- Make sure `public` is listed in the passthrough copy in `.eleventy.js` (it is, by default)
- After uploading an image and publishing content that references it, wait for the Netlify rebuild to complete

---

## File Structure Reference

```
saudade/
├── .eleventy.js          Eleventy configuration
├── package.json          Dependencies and scripts
├── netlify.toml          Netlify build and redirect config
├── admin/
│   ├── index.html        CMS entry point
│   └── config.yml        CMS collection definitions
├── src/
│   ├── _includes/        Nunjucks layouts and macros
│   ├── _data/            Global site data
│   ├── assets/css/       Complete stylesheet
│   ├── index.njk         Home page
│   ├── journal.njk       Journal listing
│   ├── stories.njk       Stories listing + submission form
│   ├── resources.njk     Resources page
│   ├── about.njk         About page
│   ├── contact.njk       Contact page
│   ├── blog/             Blog collection data file
│   └── stories-content/  Stories collection data file
├── content/
│   ├── blog/             Markdown files for journal posts (created by CMS)
│   ├── stories/          Markdown files for stories (created by CMS)
│   ├── resources/        Markdown files for resources (created by CMS)
│   └── about.md          About page content (edited via CMS)
└── public/
    └── images/           Media uploads from CMS
```

---

Built with care. Every word on this site was written by a real person.
