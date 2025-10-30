# Lead Scorer API

**Live URL**:https://lead-scorer-1.onrender.com

## Features

| Feature | Status |
|-------|--------|
| CSV Upload & Parsing | Done |
| Rule Engine (Role, Industry, Data) | Done |
| AI Intent Classification (Gemini 2.0) | Done |
| Final Score = Rule + AI | Done |
| CSV Export | Done |
| Unit Tests | Done |
| Docker Support | Done |
| Deployed on Render (Free) | Done |

---

## Project structure

lead-scorer/
├── src/
│   ├── config/       → env.js
│   ├── routes/       → offer, upload, score, results
│   ├── services/     → csvParser, ruleEngine, aiClient
│   ├── utils/        → csvExport
│   └── server.js
├── tests/
├── Dockerfile
├── .env
├── package.json
└── README.md

## Setup (Local)

```bash
# 1. Clone
git clone https://github.com/Amanchahar1507/lead-scorer.git
cd lead-scorer

# 2. Install
npm install

# 3. Get Gemini API Key
# → https://aistudio.google.com/app/apikey 

# 4. Create .env
cp .env.example .env
# Edit .env:
GEMINI_API_KEY=AIzaSy...
PORT=3000

# 5. Run
npm run dev



## Result of Api


All commands tested on https://lead-scorer.onrender.com



1. Save Offer (POST /offer)
bashcurl -X POST https://lead-scorer.onrender.com/offer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "AI Outreach Automation",
    "value_props": ["6x more meetings", "24/7 outreach"],
    "ideal_use_cases": ["B2B SaaS mid-market"]
  }'
Result:
json{ "message": "Offer saved" }

2. Upload Leads CSV (POST /leads/upload)

Save this as leads-example.csv in your folder first

csvname,role,company,industry,location,linkedin_bio
Ava Patel,Head of Growth,FlowMetrics,B2B SaaS mid-market,New York,"Growth leader at SaaS scale-up"
John Doe,Marketing Manager,CloudCo,Cloud Computing,SF,"Loves AI and automation"
bashcurl -X POST https://lead-scorer.onrender.com/leads/upload \
  -F "file=@leads-example.csv"
Result:
json{ "message": "Leads uploaded", "count": 2 }

3. Run Scoring (POST /score)
bashcurl -X POST https://lead-scorer.onrender.com/score
Result:
json{ "message": "Scoring complete", "count": 2 }

4. Get Results (GET /results)
bashcurl https://lead-scorer.onrender.com/results
Result:
json[
  {
    "name": "Ava Patel",
    "role": "Head of Growth",
    "company": "FlowMetrics",
    "intent": "High",
    "score": 90,
    "ai_points": 50,
    "rule_points": 40,
    "reasoning": "High: Decision-maker in exact B2B SaaS mid-market ICP with strong value prop alignment (6x meetings, 24/7 outreach)."
  },
  {
    "name": "John Doe",
    "role": "Marketing Manager",
    "company": "CloudCo",
    "intent": "Medium",
    "score": 50,
    "ai_points": 30,
    "rule_points": 20,
    "reasoning": "Medium: Influencer in adjacent cloud industry; bio shows interest in AI tools, but not exact ICP match."
  }
]

