
let offer = null;

export function setOffer(o) {
  offer = o;
}

export function calculateRuleScore(lead) {
  let score = 0;

  const role = lead.role.toLowerCase();
  if (/head|director|vp|cxo|chief|ceo|cfo|cto/.test(role)) score += 20;
  else if (/manager|specialist|lead|analyst/.test(role)) score += 10;

  if (offer) {
    const icp = offer.ideal_use_cases.map((s) => s.toLowerCase());
    const industry = lead.industry.toLowerCase();
    if (icp.some((k) => industry.includes(k))) score += 20;
    else if (/tech|software|saas|cloud|ai/.test(industry)) score += 10;
  }

  const values = [lead.name, lead.role, lead.company, lead.industry, lead.location, lead.linkedin_bio];
  if (values.every((v) => v && v.trim())) score += 10;

  return Math.min(score, 50);
}