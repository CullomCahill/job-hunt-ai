'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { ApifyClient } = require('apify-client');

const ACTOR_ID = 'curious_coder/linkedin-jobs-scraper';
const POLL_INTERVAL_MS = 5000;
const TERMINAL_STATUSES = new Set(['SUCCEEDED', 'FAILED', 'ABORTED', 'TIMED-OUT']);

async function scrapeJobs(searchUrls) {
  const token = process.env.APIFY_TOKEN;
  if (!token) throw new Error('APIFY_TOKEN is not set in .env');

  if (!searchUrls || !searchUrls.length) throw new Error('No search URLs provided to scrapeJobs()');

  const maxJobsPerSearch = parseInt(process.env.MAX_JOBS || '100', 10);
  const totalCount = maxJobsPerSearch * searchUrls.length;

  const client = new ApifyClient({ token });

  console.log(`Starting actor ${ACTOR_ID} with ${searchUrls.length} search URL(s), up to ${maxJobsPerSearch} per search (${totalCount} total)...`);
  const run = await client.actor(ACTOR_ID).start({
    count: totalCount,
    scrapeCompany: true,
    splitByLocation: false,
    urls: searchUrls,
  });

  console.log(`Run ID: ${run.id} — polling every ${POLL_INTERVAL_MS / 1000}s...`);

  let status = run.status;
  while (!TERMINAL_STATUSES.has(status)) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    const current = await client.run(run.id).get();
    status = current.status;
    console.log(`  status: ${status}`);
  }

  if (status !== 'SUCCEEDED') {
    throw new Error(`Actor run ended with status: ${status}`);
  }

  const { items } = await client.dataset(run.defaultDatasetId).listItems({ clean: true });
  console.log(`Scraped ${items.length} jobs.`);
  return items;
}

module.exports = { scrapeJobs };
