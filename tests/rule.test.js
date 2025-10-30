import { test } from "node:test";
import assert from "node:assert";
import { setOffer, calculateRuleScore } from "../src/services/ruleEngine.js";

setOffer({ ideal_use_cases: ["B2B SaaS mid-market"] });

test("max score", () => {
  const lead = { name: "A", role: "CEO", company: "X", industry: "B2B SaaS mid-market", location: "NY", linkedin_bio: "Founder" };
  assert.strictEqual(calculateRuleScore(lead), 50);
});

test("partial score", () => {
  const lead = { name: "B", role: "Manager", company: "Y", industry: "Cloud Computing", location: "", linkedin_bio: "" };
  assert.strictEqual(calculateRuleScore(lead), 20);
});