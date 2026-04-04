'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');
const { scrapeJobs } = require('./scraper');
const { getFitLevel, getJobSummary, getTweakSuggestion } = require('./ai');
const { appendRow, getExistingJobLinks } = require('./sheets');

const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '5', 10);
const BATCH_DELAY_MS = 30000; // stay under 50k tokens/min rate limit

const BLOCKED_COMPANIES = new Set([
  'DataAnnotation',
]);

const BLOCKED_TITLE_PATTERNS = [
  /\bAI Trainer\b/i,
  /\bdata annotation\b/i,
];

function isBlocked(job) {
  if (BLOCKED_COMPANIES.has(job.companyName)) return true;
  if (BLOCKED_TITLE_PATTERNS.some((re) => re.test(job.title || ''))) return true;
  return false;
}

const MODES = [
  {
    name: 'samd',
    profilePath: '../context/profile.samd.md',
    resumePath: '../context/resume.samd.md',
    searchUrlPrefix: 'SAMD_SEARCH_URL_',
    sheetTab: 'SaMD',
    skippedLinksFile: 'skipped-links-samd.json',
  },
  {
    name: 'general-qa',
    profilePath: '../context/profile.general-qa.md',
    resumePath: '../context/resume.general-qa.md',
    searchUrlPrefix: 'GENERAL_QA_SEARCH_URL_',
    sheetTab: 'GeneralQA',
    skippedLinksFile: 'skipped-links-general-qa.json',
  },
];

function loadSkippedLinks(fileName) {
  const filePath = path.join(__dirname, fileName);
  try {
    return new Set(JSON.parse(fs.readFileSync(filePath, 'utf8')));
  } catch {
    return new Set();
  }
}

function saveSkippedLinks(skippedLinks, fileName) {
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, JSON.stringify([...skippedLinks], null, 2));
}

function getSearchUrlsForMode(prefix) {
  return Object.keys(process.env)
    .filter((k) => k.startsWith(prefix) && /\d+$/.test(k))
    .sort()
    .map((k) => process.env[k].trim())
    .filter(Boolean);
}

async function processJob(job, profile, resume, mode, sheetTab, skippedLinks) {
  const fit = await getFitLevel(job, profile, resume, mode);
  if (fit === 'no') {
    const link = (job.link || '').split('?')[0];
    if (link) skippedLinks.add(link);
    console.log(`  SKIP  ${job.title} @ ${job.companyName}`);
    return false;
  }
  const [summary, tweak] = await Promise.all([
    getJobSummary(job),
    getTweakSuggestion(job, profile, resume),
  ]);
  await appendRow(job, fit, summary, tweak, sheetTab);
  console.log(`  ADD [${fit}]  ${job.title} @ ${job.companyName}`);
  return true;
}

async function runMode(mode) {
  const { name, profilePath, resumePath, searchUrlPrefix, sheetTab, skippedLinksFile } = mode;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`MODE: ${name.toUpperCase()}`);
  console.log(`${'='.repeat(60)}\n`);

  const profile = fs.readFileSync(path.join(__dirname, profilePath), 'utf8');
  const resume = fs.readFileSync(path.join(__dirname, resumePath), 'utf8');
  const skippedLinks = loadSkippedLinks(skippedLinksFile);

  const searchUrls = getSearchUrlsForMode(searchUrlPrefix);
  if (!searchUrls.length) {
    console.log(`No search URLs found for prefix ${searchUrlPrefix} — skipping mode.`);
    return;
  }

  const allJobs = await scrapeJobs(searchUrls);
  const seenSets = await Promise.all(MODES.map((m) => getExistingJobLinks(m.sheetTab)));
  const seen = new Set(seenSets.flatMap((s) => [...s]));
  const jobsNotInSheet = allJobs.filter((job) => !seen.has((job.link || '').split('?')[0]));
  const jobsNotBlocked = jobsNotInSheet.filter((job) => !isBlocked(job));
  const jobs = jobsNotBlocked.filter((job) => !skippedLinks.has((job.link || '').split('?')[0]));
  const preFiltered = jobsNotBlocked.length - jobs.length;
  const blocked = jobsNotInSheet.length - jobsNotBlocked.length;
  console.log(`${allJobs.length} scraped, ${jobs.length} new (${allJobs.length - jobsNotInSheet.length} already in sheet, ${preFiltered} previously skipped, ${blocked} blocked).`);
  console.log(`\nProcessing ${jobs.length} jobs in batches of ${BATCH_SIZE}...\n`);

  let added = 0;
  let skipped = 0;

  for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
    const batch = jobs.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map((job) => processJob(job, profile, resume, name, sheetTab, skippedLinks))
    );
    results.forEach((wasAdded) => { if (wasAdded) added++; else skipped++; });
    saveSkippedLinks(skippedLinks, skippedLinksFile);
    if (i + BATCH_SIZE < jobs.length) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  console.log(`\nDone. Added ${added} new jobs, skipped ${skipped} irrelevant (+ ${allJobs.length - jobsNotInSheet.length} already in sheet, ${preFiltered} pre-filtered from cache).`);
}

async function run() {
  for (const mode of MODES) {
    await runMode(mode);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
