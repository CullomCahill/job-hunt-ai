# CLAUDE.md

Instructions for Claude when working in this codebase.

## What this project does

Scrapes LinkedIn job listings via Apify, checks each one for relevance against a candidate profile using the Anthropic API, and appends matching jobs to a Google Sheet with a short resume tweak suggestion per job.  No auto-applying.  No resume rewriting.  Just a populated tracker.

## File structure

```
/
  claude.md               ← you are here
  readme.md               ← human-facing setup and usage docs
  context/
    profile.md            ← candidate briefing sheet (expertise, fit criteria, accomplishments)
    resume.md             ← static resume text, update manually when needed
  job-bot/
    index.js              ← main runner, reads context files, orchestrates the pipeline
    scraper.js            ← Apify client: runs actor, polls until done, returns job array
    ai.js                 ← Anthropic API calls: relevance check and tweak suggestion
    sheets.js             ← Google Sheets append row
```

## Key decisions already made — do not re-litigate these

- Resume is a static markdown file in `/context/resume.md`, not pulled live from Google Docs.  There is no googleapis dependency.
- Jobs are processed in batches of 5 using `Promise.all()` — do not collapse this into a single large API call.
- Relevance check and tweak suggestion are two separate Claude API calls per job — keep them separate so each prompt stays focused.
- The tweak suggestion is a short one or two sentence string appended as a column in the sheet — it is NOT a full resume rewrite and should not generate one.
- `org_tutorial.md` in the root is reference only, do not modify it or import it anywhere.

## Environment variables (all required)

```
APIFY_TOKEN
ANTHROPIC_API_KEY
GOOGLE_CREDENTIALS_PATH       ← service account JSON for Sheets access only
SPREADSHEET_ID
LINKEDIN_SEARCH_URL
BATCH_SIZE=5
MAX_JOBS=100
```

## Dependencies

```
apify-client
@anthropic-ai/sdk
googleapis
dotenv
```

Note: `googleapis` is used only for Google Sheets (`sheets.spreadsheets.values.append`).  There is no Google Docs usage.

## How context files are used

`index.js` reads both `context/profile.md` and `context/resume.md` at startup using `fs.readFileSync`.  Both are passed as strings into `ai.js` functions.  Do not fetch them per-job — read once at the top of the run.

## Google Sheet columns (in order)

Job Title, Company, Location, Seniority, Posted At, Applicants, Salary, Job Post Link, Apply URL, Description, Resume Tweaks

## Running the project

```bash
cd job-bot
node index.js
```