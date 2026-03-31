'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');
const { scrapeJobs } = require('./scraper');
const { getFitLevel, getJobSummary, getTweakSuggestion } = require('./ai');
const { appendRow, getExistingJobLinks } = require('./sheets');

const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '5', 10);
const BATCH_DELAY_MS = 30000; // stay under 50k tokens/min rate limit
const SKIPPED_LINKS_PATH = path.join(__dirname, 'skipped-links.json');

function loadSkippedLinks() {
  try {
    return new Set(JSON.parse(fs.readFileSync(SKIPPED_LINKS_PATH, 'utf8')));
  } catch {
    return new Set();
  }
}

function saveSkippedLinks(skippedLinks) {
  fs.writeFileSync(SKIPPED_LINKS_PATH, JSON.stringify([...skippedLinks], null, 2));
}

async function processJob(job, profile, resume, skippedLinks) {
  const fit = await getFitLevel(job, profile, resume);
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
  await appendRow(job, fit, summary, tweak);
  console.log(`  ADD [${fit}]  ${job.title} @ ${job.companyName}`);
  return true;
}

async function run() {
  const profile = fs.readFileSync(path.join(__dirname, '../context/profile.md'), 'utf8');
  const resume = fs.readFileSync(path.join(__dirname, '../context/resume.md'), 'utf8');

  const skippedLinks = loadSkippedLinks();

  const allJobs = await scrapeJobs();
  const seen = await getExistingJobLinks();
  const jobsNotInSheet = allJobs.filter((job) => !seen.has((job.link || '').split('?')[0]));
  const jobs = jobsNotInSheet.filter((job) => !skippedLinks.has((job.link || '').split('?')[0]));
  const preFiltered = jobsNotInSheet.length - jobs.length;
  console.log(`${allJobs.length} scraped, ${jobs.length} new (${allJobs.length - jobsNotInSheet.length} already in sheet, ${preFiltered} previously skipped).`);
  console.log(`\nProcessing ${jobs.length} jobs in batches of ${BATCH_SIZE}...\n`);

  let added = 0;
  let skipped = 0;

  for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
    const batch = jobs.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map((job) => processJob(job, profile, resume, skippedLinks)));
    results.forEach((wasAdded) => { if (wasAdded) added++; else skipped++; });
    saveSkippedLinks(skippedLinks);
    if (i + BATCH_SIZE < jobs.length) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  console.log(`\nDone. Added ${added} new jobs, skipped ${skipped} irrelevant (+ ${allJobs.length - jobsNotInSheet.length} already in sheet, ${preFiltered} pre-filtered from cache).`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
