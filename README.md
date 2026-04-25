# PM Alignment Auditor

AI-powered safety audit tool for product specs and feature descriptions.

## What it does
Paste any product spec → get a structured audit across 6 alignment dimensions: user harm, misaligned incentives, dark patterns, privacy risks, fairness concerns, and unintended consequences.

## Motivation
As AI systems ship faster, safety reviews often happen after launch. This tool helps PMs catch alignment issues at the spec stage — before a single line of code is written.

## Demo
<img width="1321" height="550" alt="Screenshot 2026-04-25 121906" src="https://github.com/user-attachments/assets/e901878f-6deb-4efd-b5ee-36424b676a54" />


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
<img width="1453" height="902" alt="Screenshot 2026-04-25 123425" src="https://github.com/user-attachments/assets/c2bdcd15-f769-441c-beff-fd11dfbf4a4b" /> <img width="1279" height="625" alt="Screenshot 2026-04-25 123437" src="https://github.com/user-attachments/assets/d0e25120-a688-4d5f-8902-45250b441664" /> <img width="1237" height="660" alt="Screenshot 2026-04-25 123446" src="https://github.com/user-attachments/assets/05e9488c-10ca-4192-8dd7-d81892aac6e5" />



## Why this matters
AI alignment isn't just a research problem — it starts at the product design level. This tool makes safety review accessible to non-researchers.
