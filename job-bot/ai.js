'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 5 });
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
- The role is focused on hardware medical devices with no software component
- The role is pure complaint investigation or root cause analysis for physical/hardware products
- The role is purely auditing or documentation with no engineering overlap
- The role requires significant travel or on-site presence at manufacturing or customer sites
- The role is staff augmentation through a staffing agency with no real ownership (not the same as a direct contractor role at a tech company)

Rate STRONG or MEDIUM if the role involves building or improving quality systems, QA processes, or test infrastructure — especially at early-stage or growth-stage companies. Regulated software environments that qualify include but are not limited to: SaMD, digital health, AI-driven health tech, clinical research software (FDA 21 CFR Part 11), healthcare AI platforms, clinical decision support, and general health tech. Non-health-tech companies at early stage where QA ownership and process-building are central to the role may also qualify as MEDIUM.

Rate STRONG if the role is in regulated health tech or clinical software AND involves building quality systems, design controls, or test infrastructure from scratch or at significant scale.`,
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
