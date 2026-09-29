# LABHSETU AI — AI Welfare & Concessional Credit Portal
> **Empowering Beneficiaries Through Privacy-First Intelligent Matching**  
> A privacy-first opportunity finder for students, workers, women and girls, and persons with disabilities, alongside Scheduled Caste (SC) entrepreneurs seeking NSFDC concessional channel finance (**SIH26093**).

[![Live Portal](https://img.shields.io/badge/Live%20Demo-LABHSETU%20AI-00df9a?style=for-the-badge&logo=vercel)](https://samarthyai.vercel.app)
[![FastAPI Backend](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.14-009688?style=for-the-badge&logo=fastapi)](http://127.0.0.1:8000/docs)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-blue?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![DPDP Act 2023](https://img.shields.io/badge/Privacy-DPDP%20Act%202023%20Compliant-purple?style=for-the-badge)](#privacy-architecture)

------

## 🌟 Overview & Problem Statements

### Track 1: Welfare & Opportunity Schemes
The finder retains its disability-specific welfare catalogue and expands discovery to general college scholarships, girls' technical education support, girl-child savings, and registered apprenticeship opportunities. Audience views for students, work and careers, and women and girls organize results without replacing a scheme's statutory criteria. Profile scores are guidance; additional merit, course, registration, age, and application-window requirements must be confirmed with the official provider.

### Track 2: SC Entrepreneurs Seeking NSFDC Channel-Finance (SIH26093)
First-generation Scheduled Caste entrepreneurs face prohibitive commercial lending rates (12%–16%), complex moratorium policies, and high application rejection rates due to approaching distressed channel partners. LABHSEWA AI extends its client-side architecture to provide:
1. **Intelligent Credit Recommender**: Automatic matching across NSFDC Term Loans (up to ₹50L), Micro Finance (up to ₹1.4L), and Concessional Education Loans (up to ₹40L) at subsidized 6.5%–9.5% p.a. interest.
2. **Financial EMI & Moratorium Simulator**: Real-time amortization schedule calculating EMIs with interest waiver vs capitalization toggles, showing exact commercial market savings.
3. **"Nearest Capable" Partner Locator**: Embedded interactive Leaflet.js map and GPS/pincode locator ranking accredited State Channelizing Agencies (SCAs), Public Sector Banks (PSBs), and Regional Rural Banks (RRBs), filtering out high-NPA/paused branches to prevent dead-end applications.
4. **DIC & SC-ST Hub Camp Mode**: Batch processing for District Industries Centres (DIC) and National SC-ST Hubs to evaluate multi-entrepreneur cohorts and export credit mobilization reports to CSV.

---

## 🏛️ System Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                            LABHSEWA AI CLIENT (SPA)                     │
│   HTML5 Semantic SPA • Light UI / Dark Dual-Track Feature • Vanilla ES6+ │
└───────────────────┬──────────────────────────────────┬───────────────────┘
                    │                                  │
    ┌───────────────▼──────────────┐   ┌───────────────▼─────────────────┐
    │ Welfare & Opportunity Track  │   │     Credit Track (SIH26093)     │
    │ • Audience Scheme Views      │   │  • NSFDC Scheme Matrix          │
    │ • Age / Disability Engine    │   │  • 5-Checkpoint Credit Matcher  │
    │  • DBT Stepper Tracker       │   │  • EMI & Moratorium Calculator  │
    │  • Disability Camp Mode      │   │  • Leaflet Partner Locator      │
    │                              │   │  • DIC / SC-ST Hub Camp Mode    │
    └───────────────┬──────────────┘   └───────────────┬─────────────────┘
                    │                                  │
┌───────────────────┴──────────────────────────────────┴───────────────────┐
│                     SHARED ACCESSIBILITY & AI SUITE                      │
│   Voice Matching (Wispr) • LABHSEWA AI Chatbot • Bilingual (EN/HI)      │
│   High-Contrast / Dyslexia Suite • Offline-First Client Storage (IndexedDB)│
└──────────────────────────────────────┬───────────────────────────────────┘
                                       │ (Optional REST Sync)
                       ┌───────────────▼─────────────────┐
                       │      FASTAPI MICROSERVICE       │
                       │   Python 3.14 • Pydantic v2     │
                       │   Endpoints: Welfare & Credit   │
                       └─────────────────────────────────┘
```

---

## 🔒 Privacy-First Architecture (DPDP Act 2023)

- **Zero Aadhaar or Document Uploads**: Beneficiary eligibility is evaluated strictly client-side in the user's browser using self-declared statutory parameters.
- **Client-Side Processing**: No personal data or demographic records are stored on remote cloud databases without user consent.
- **Session Ephemerality**: User input data is stored in the browser's `localStorage` / `IndexedDB` and can be wiped with a single click.

---

## 🚀 Key Modules & Features

### 1. Dual Persona Selector
- Switch seamlessly between **Welfare & Opportunity Schemes** and **💼 Credit & Enterprise Loans (SC Entrepreneurs)**.
- Dynamically shifts intake forms, scoring matrix, and visual indicators across the portal.
- Browse welfare results by **Everyone**, **Students**, **Work & Careers**, or **Women & Girls**. These are discovery views, not additional eligibility guarantees.
- The 58-record catalog includes general college support, girls' technical education, girl-child savings, and registered apprenticeship information. Some qualifying details and live intake windows require official confirmation.

### 2. Statutory Credit Engine (`credit-matcher.js`)
- 5 weighted checkpoints evaluating applicant profiles:
  - **SC Category Verification (Weight: 30%)**: Validates caste certificate declaration.
  - **Family Income Ceiling Gate (Weight: 30%)**: Enforces NSFDC statutory ceiling of $\le ₹5,00,000$ annual household income.
  - **Purpose & Cost Alignment (Weight: 25%)**: Validates project cost limits (Micro Finance $\le ₹1.4\text{L}$, Term Loan $\le ₹50\text{L}$, Education Loan $\le ₹20\text{L}$/₹40L).
  - **Sector Viability (Weight: 10%)**: Scores commercial feasibility for retail trade, services, dairy, agro-processing, and manufacturing.
  - **Channel Partner Active Verification (Weight: 5%)**: Confirms active lending branches in the applicant's state.

### 3. Financial EMI & Moratorium Simulator (`financial-calculator.js`)
- Dynamic sliders for loan amount, repayment tenure (up to 120 months), and moratorium period (up to 36 months).
- **Moratorium Policy Toggle**:
  - *Interest Waived / Subsidized*: Standard government welfare benefit (zero payment during moratorium).
  - *Capitalized into Principal*: Standard banking convention (accrued simple interest added to principal).
- **Commercial Bank Savings Callout**: Demonstrates total interest saved compared to private/commercial bank rates (14% p.a.).
- **Amortization Schedule**: Expandable month-by-month repayment table with export to CSV.

### 4. Geo-Spatial Partner Locator (`partner-locator.js`)
- Embedded **Leaflet.js map** rendering channel partner branches across India.
- **"Nearest Capable" Filter**: Hides branches flagged with high-NPA risk or paused allocation, directing borrowers only to healthy lending institutions.
- Direct contact details, phone numbers, portal links, and average disbursal turnaround times.

### 5. Dual NGO & DIC Camp Mode (`ngo-mode.js`)
- **Disability Welfare Camp**: Bulk matching for multi-student cohorts across district institutions.
- **DIC / SC-ST Hub Credit Camp**: Cohort evaluation for 12+ SC entrepreneurs simultaneously, aggregating total concessional credit potential and average interest savings.
- Full CSV import, export, and sample template downloads.

### 6. Universal Accessibility Suite (`accessibility.js`)
- High-Contrast Obsidian and Dark High-Contrast modes.
- OpenDyslexic / Dyslexia-friendly font toggle.
- 4-level text scaling (Normal, Large, Extra Large, Huge).
- Built-in Screen Reader announcements and Web Speech API / TTS integration.
- Voice-assisted matching via **Wispr Flow**.

### 7. Multilingual Engine (`i18n.js`)
- Complete English and Hindi localization across all buttons, form inputs, tooltips, calculators, maps, and AI chatbot prompts.

---

## 📂 Repository Structure

```
LABHSEWA_AI/
├── index.html                  # Single Page Application entrypoint
├── css/
│   ├── main.css                # Obsidian design tokens, glassmorphism, grid
│   ├── components.css          # Form controls, buttons, cards, steppers
│   └── features.css            # Calculator, locator, camp mode, persona styles
├── js/
│   ├── app.js                  # SPA routing, persona switcher, form controllers
│   ├── db.js                   # Client-side IndexedDB and localStorage persistence
│   ├── schemes.js              # 50+ Welfare Scheme Database (PwD)
│   ├── credit-schemes.js       # NSFDC Scheme Database & 25+ Channel Partners
│   ├── matcher.js              # Client-side Welfare Matching Engine
│   ├── credit-matcher.js       # Client-side SC Credit Matching Engine
│   ├── financial-calculator.js # EMI, Moratorium & Amortization Calculator
│   ├── partner-locator.js      # Leaflet Map & Nearest Capable Channel Locator
│   ├── tracker.js              # Dual-Pipeline Application Tracker
│   ├── ngo-mode.js             # Dual Camp Mode (Disability & SC-ST Hub)
│   ├── samarthya-ai.js         # LABHSEWA AI virtual assistant module
│   ├── wispr-flow.js           # Voice Matching modal
│   ├── accessibility.js        # WCAG accessibility suite
│   ├── i18n.js                 # Bilingual translation engine (EN/HI)
│   ├── background-3d.js        # GPU 60fps ambient background waves
│   ├── cursor.js               # Interactive aura cursor effect
│   └── report.js               # PDF entitlement certificate generator
├── backend/
│   ├── main.py                 # FastAPI microservice (Welfare + NSFDC Credit)
│   ├── database.py             # SQLite schema, seed, and catalog access
│   ├── schemes.json            # Initial seed data for scheme catalogs
│   └── requirements.txt        # Backend dependencies
├── documentation/              # Complete In-Depth Documentation Suite
│   ├── README.md               # Documentation Master Hub & Index
│   ├── 01_SYSTEM_OVERVIEW_AND_VISION.md
│   ├── 02_ARCHITECTURE_AND_TECH_STACK.md
│   ├── 03_FEATURES_DEEP_DIVE.md
│   ├── 04_END_TO_END_PROCESSES_AND_USER_JOURNEYS.md
│   ├── 05_ALGORITHMS_AND_FORMULAS.md
│   ├── 06_API_SPECIFICATION.md
│   ├── 07_SCHEMES_AND_DATABASE_CATALOG.md
│   └── 08_DEPLOYMENT_AND_OPERATIONS_GUIDE.md
├── docs/
│   └── TECH_STACK.md           # Architectural specification
└── README.md                   # Project documentation
```

---

## ⚡ Quick Start

### 1. Run Frontend (Zero Build Step)
The frontend is built with pure Vanilla HTML5, CSS3, and ES6+ JavaScript. No build step or node package installation is required.

```bash
# Clone the repository
git clone https://github.com/AmanKumar731/Samarthya-AI.git LABHSEWA_AI
cd LABHSEWA_AI

# Serve using any local HTTP server:
python3 -m http.server 3000
# or
npx serve .
```
Visit `http://localhost:3000` in any modern web browser.

### 2. Run Backend Microservice (Optional)
The Python FastAPI backend provides REST endpoints for server-side evaluation. On first startup, it creates `backend/labhsewa.sqlite3` and seeds its scheme catalogs from `backend/schemes.json`. Catalog data remains in SQLite between restarts. Set `LABHSEWA_DB_PATH` to use a different database file.

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload --port 8000
```
Interactive OpenAPI Swagger docs will be available at `http://127.0.0.1:8000/docs`.
Check the database and catalog counts at `http://127.0.0.1:8000/api/database/health`.

---

## 📡 API Reference

### Welfare Scheme Endpoints
- `GET /api/database/health`: Check SQLite status and catalog record counts.
- `GET /api/schemes`: Fetch all welfare schemes in the database.
- `GET /api/metadata`: Fetch Indian states, disability categories, and education levels.
- `POST /api/match`: Evaluate beneficiary profile against the combined welfare and opportunity scheme catalogue.

### NSFDC Credit Endpoints (SIH26093)
- `GET /api/credit-schemes`: Fetch all NSFDC credit and loan schemes.
- `GET /api/channel-partners`: Fetch channel partner branches (Supports `?state=maharashtra&healthy_only=true`).
- `POST /api/match-credit`: Evaluate SC entrepreneur profile against NSFDC lending criteria:

```json
// POST /api/match-credit
{
  "name": "Ramesh Sonawane",
  "state": "maharashtra",
  "gender": "male",
  "householdIncome": 180000,
  "hasScCert": true,
  "purpose": "business",
  "sector": "agri_allied",
  "projectCost": 450000,
  "promoterContribution": 45000,
  "hasProjectReport": true,
  "trainingCompleted": true
}
```

---

## ⚖️ License & Statutory Attribution

- **Statutory Schemes Attribution**: Information sourced from official public domain guidelines of the **National Scheduled Castes Finance and Development Corporation (NSFDC)**, Ministry of Social Justice and Empowerment (MoSJE), Department of Empowerment of Persons with Disabilities (DEPwD), and National Scholarship Portal (NSP).
- **Privacy Notice**: LABHSEWA AI complies with the provisions of the Digital Personal Data Protection (DPDP) Act 2023.
- **License**: Distributed under the MIT License.