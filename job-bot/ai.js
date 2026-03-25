'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = 'claude-haiku-4-5-20251001';

async function getFitLevel(job, profile, resume) {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 16,
    messages: [
      {
        role: 'user',
        content: `You are evaluating whether a job posting is a fit for a candidate.

## Candidate profile
${profile}

## Candidate resume
${resume}

## Job posting
Title: ${job.title}
Company: ${job.companyName}
Location: ${job.location}
Seniority: ${job.seniorityLevel}
Description:
${job.descriptionText}

Rate the fit. Reply with only one word: STRONG, MEDIUM, MILD, or NO.

Rate NO if any of these are true:
- The role is primarily regulatory affairs (510(k) authoring, submissions, international registrations, regulatory strategy)
- The role is focused on hardware medical devices with no software/SaMD component
- The role is pure complaint investigation or root cause analysis for physical products (no QMS/design control engineering)
- The role is purely auditing or documentation with no engineering overlap
- The role requires significant travel or on-site presence at manufacturing/customer sites
- The role is staff augmentation or contract with no ownership or leadership component

Only rate STRONG or MEDIUM if the company is building a regulated software product (SaMD, digital health, or AI-driven health tech) and the role involves building or improving quality systems — not just maintaining them.`,
      },
    ],
  });

  const answer = message.content[0].text.trim().toUpperCase();
  if (answer === 'STRONG' || answer === 'MEDIUM' || answer === 'MILD') {
    return answer.toLowerCase();
  }
  return 'no';
}

async function getJobSummary(job) {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 100,
    messages: [
      {
        role: 'user',
        content: `Summarize this job posting in exactly two sentences using this format:
Company: one sentence describing what the company does, based only on the job description.
Job: one sentence summarizing the core responsibilities of this role.

Job posting:
Title: ${job.title}
Company: ${job.companyName}
Description:
${job.descriptionText}`,
      },
    ],
  });

  return message.content[0].text.trim();
}

async function getTweakSuggestion(job, profile, resume) {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 150,
    messages: [
      {
        role: 'user',
        content: `You are giving a job applicant a short, specific resume tweak suggestion for one role.

## Candidate profile
${profile}

## Candidate resume
${resume}

## Job posting
Title: ${job.title}
Company: ${job.companyName}
Description:
${job.descriptionText}

Give a one or two sentence resume tweak suggestion. Be specific — reference actual accomplishments from the resume by name when relevant. Do not suggest generic changes like "tailor your resume to the job description."`,
      },
    ],
  });

  return message.content[0].text.trim();
}

module.exports = { getFitLevel, getJobSummary, getTweakSuggestion };
