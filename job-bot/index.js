'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');
const { scrapeJobs } = require('./scraper');
const { getFitLevel, getJobSummary, getTweakSuggestion } = require('./ai');
const { appendRow, getExistingJobLinks } = require('./sheets');

const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '5', 10);
const BATCH_DELAY_MS = 30000; // stay under 50k tokens/min rate limit

async function processJob(job, profile, resume) {
  const fit = await getFitLevel(job, profile, resume);
  if (fit === 'no') {
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

  const allJobs = await scrapeJobs();
  const seen = await getExistingJobLinks();
  const jobs = allJobs.filter((job) => !seen.has((job.link || '').split('?')[0]));
  console.log(`${allJobs.length} scraped, ${jobs.length} new (${allJobs.length - jobs.length} already in sheet).`);
  console.log(`\nProcessing ${jobs.length} jobs in batches of ${BATCH_SIZE}...\n`);

  let added = 0;
  let skipped = 0;

  for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
    const batch = jobs.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map((job) => processJob(job, profile, resume)));
    results.forEach((wasAdded) => { if (wasAdded) added++; else skipped++; });
    if (i + BATCH_SIZE < jobs.length) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  console.log(`\nDone. Added ${added} new jobs, skipped ${skipped} irrelevant (+ ${allJobs.length - jobs.length} already in sheet).`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
