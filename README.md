# MedSenseAI SPM Assignment 02

MedSenseAI is an AI-assisted pharmacy management and medication-safety platform. This separate repository contains a focused development slice for CS4002 Assignment 02 and demonstrates traceability from Jira stories to GitHub branches, commits, and pull requests.

## Student

- Shawal Ahmad - 22F-3303
- BCS-9C
- CS4002 Fundamentals of Software Project Management

## Technologies

- JavaScript with ES modules
- React 18
- Node.js built-in test runner
- Jira and GitHub

## Included Structure

```text
medsense_ai/
  src/
    components/storefront/   Notification UI reference
    pages/storefront/        Prescription history reference
    services/                Order service reference
    utils/                   Tested Assignment 02 improvements
  test/                      Focused unit tests
```

The reference modules were copied from the working MedSenseAI project. All Assignment 02 changes are developed only in this isolated repository. Operational databases, environment files, credentials, runtime logs, generated assets, and portable runtime files are excluded.

## Verification

```bash
cd medsense_ai
npm test
```
