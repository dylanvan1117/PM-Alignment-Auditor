# PM Alignment Auditor

AI-powered safety audit tool for product specs and feature descriptions.

## What it does
Paste any product spec → get a structured audit across 6 alignment dimensions: user harm, misaligned incentives, dark patterns, privacy risks, fairness concerns, and unintended consequences.

## Motivation
As AI systems ship faster, safety reviews often happen after launch. This tool helps PMs catch alignment issues at the spec stage — before a single line of code is written.

## Demo
[screenshot or gif here]

## Tech stack
- React + Vite
- Claude Sonnet (Anthropic API)
- Tailwind CSS

## Setup
```bash
npm install
cp .env.example .env   # add your ANTHROPIC_API_KEY
npm run dev
```

## Usage
1. Paste a product feature spec into the text area
2. Click "Run Audit"
3. Review flagged risks and suggested mitigations
4. Copy the report as markdown

## Example output
[screenshot here]

## Why this matters
AI alignment isn't just a research problem — it starts at the product design level. This tool makes safety review accessible to non-researchers.
