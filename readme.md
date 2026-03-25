# Job Application Scraper

A Node.js script that scrapes LinkedIn job listings, checks them for relevance against your resume using Claude, and logs everything to a Google Sheet — including a company/role summary and a resume tweak suggestion per job.

## What it does

1. Hits the Apify LinkedIn Jobs scraper with one or more search URLs you provide
2. Reads your candidate profile and resume from local markdown files
3. Runs each job through Claude to check relevance (filters out mismatches)
4. For jobs that pass, generates a two-sentence summary (what the company does, what the role involves) and a short resume tweak suggestion
5. Appends a row to your Google Sheet with job details, the apply link, the summary, and the tweak suggestion
6. Deduplicates against the sheet on every run — jobs already logged are skipped

## Project structure

```
job-bot/
  index.js        ← main runner, orchestrates everything
  scraper.js      ← Apify client calls
  ai.js           ← Claude API calls (relevance check, summary, tweak suggestion)
  sheets.js       ← appends rows to Google Sheets
  .env
  package.json
context/
  profile.md      ← candidate briefing: expertise, fit criteria, accomplishments
  resume.md       ← resume text, update manually when needed
```

## Prerequisites

- Node.js 18+
- An Apify account (free tier gives you $5/month, plenty for ~5,000 jobs)
- An Anthropic API key
- A Google Cloud project with the Sheets API enabled, and a service account with credentials downloaded as JSON

## Setup

### 1. Install dependencies

```bash
npm install apify-client @anthropic-ai/sdk googleapis dotenv
```

### 2. Google Cloud service account

This is the part most people get stuck on — do it first.

- Go to console.cloud.google.com and create a project
- Enable the Google Sheets API
- Go to IAM → Service Accounts → Create a service account
- Download the credentials JSON file and save it somewhere safe (not in the repo)
- Open your tracking Google Sheet and share it with the service account email (it looks like `something@your-project.iam.gserviceaccount.com`) with Editor access

### 3. Environment variables

Create a `.env` file in the project root:

```
APIFY_TOKEN=your_apify_token
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_CREDENTIALS_PATH=/absolute/path/to/your/service-account.json
SPREADSHEET_ID=the_id_from_your_google_sheet_url
# Add as many search URLs as you want, numbered sequentially
LINKEDIN_SEARCH_URL_1=https://www.linkedin.com/jobs/search/?keywords=foo
LINKEDIN_SEARCH_URL_2=https://www.linkedin.com/jobs/search/?keywords=bar
BATCH_SIZE=5
MAX_JOBS=100
```

The doc/sheet IDs are the long string in the URL between `/d/` and `/edit`.

## Google Sheet columns

The script appends one row per relevant job with these columns:

| Column | Description |
|---|---|
| Job Title | Role name |
| Fit | Claude's rating: strong, medium, or mild |
| Company | Company name |
| Summary | Two-sentence Claude summary: what the company does and what the role involves |
| Location | Job location |
| Seniority | Entry / Mid / Senior etc. |
| Posted At | When the listing went up |
| Applicants | Number of applicants if available |
| Salary | Salary range if listed |
| Job Post Link | Link to the LinkedIn listing |
| Apply URL | Direct application link if available |
| Description | Full job description text |
| Resume Tweaks | Short Claude suggestion e.g. "Emphasize CAPA experience and mention ISO audit exposure" |

## Running it

```bash
node index.js
```

Jobs are processed in batches of 5 in parallel.  Depending on how many pass the relevance filter, a full run of 100 jobs typically takes 3 to 5 minutes.

## Changing your search

Add or update `LINKEDIN_SEARCH_URL_*` entries in your `.env`.  Go to LinkedIn Jobs, run your search with whatever filters you want (location, remote, experience level), and copy the full URL from the browser.  Use numbered variables and `#` comments to keep things readable:

```
# Senior frontend roles, remote
LINKEDIN_SEARCH_URL_1=https://www.linkedin.com/jobs/search/?keywords=foo

# ML engineering, NYC
LINKEDIN_SEARCH_URL_2=https://www.linkedin.com/jobs/search/?keywords=bar
```

The script deduplicates against your Google Sheet on each run, so jobs already logged won't be re-sent to Claude or re-added to the sheet.

## Cost

- Apify: ~$0.10 per 100 jobs scraped (well within the free $5 monthly credit)
- Anthropic: three Claude API calls per job that passes the relevance filter — relevance check, summary, and tweak suggestion.  At typical job volumes this runs well under $1 per session.

## Notes

- The script does not auto-apply to anything.  It just populates your tracker.
- The resume tweak column is a suggestion, not a rewrite.  You decide whether it's worth acting on for a given role.
- If an apply URL is missing, the job post link will take you to the LinkedIn listing where you can apply manually.