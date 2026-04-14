import json
import re

from app.ai.groq_client import get_groq_client
from app.ai.prompts import company_analysis_prompt


class AIService:

    def __init__(self):
        self.client = get_groq_client()

    async def analyze_company(self, data):

        compact_data = {
            "company": data.get("profile", {}).get("name"),
            "symbol": data.get("profile", {}).get("ticker"),

            "price": data.get("quote", {}).get("c"),
            "change_percent": data.get("quote", {}).get("dp"),

            "valuation": {
                "pe": data.get("metrics", {}).get("peBasicExclExtraTTM"),
                "forward_pe": data.get("metrics", {}).get("peTTM"),
                "pb": data.get("metrics", {}).get("pbQuarterly"),
                "ps": data.get("metrics", {}).get("psTTM"),
            },

            "performance": {
                "eps": data.get("metrics", {}).get("epsTTM"),
                "roe": data.get("metrics", {}).get("roeTTM"),
                "net_margin": data.get("metrics", {}).get("netMargin"),
                "gross_margin": data.get("metrics", {}).get("grossMarginTTM"),
            },

            "safety": {
                "debt_equity": data.get("metrics", {}).get("totalDebtToEquityQuarterly"),
                "current_ratio": data.get("metrics", {}).get("currentRatioQuarterly"),
                "beta": data.get("metrics", {}).get("beta"),
            },

            "range_52w": {
                "high": data.get("metrics", {}).get("52WeekHigh"),
                "low": data.get("metrics", {}).get("52WeekLow"),
            }
        }

        prompt = f"""
You are a professional financial analyst.

Analyze the following company data and give a concise investment summary.

Company Data:
{json.dumps(compact_data, indent=2)}

Return ONLY valid JSON in this format:

{{
  "summary": "3-5 sentence explanation of how the company has performed, its strengths/weaknesses, and future outlook for investors."
}}
"""

        response = self.client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=300,
        )

        text = response.choices[0].message.content

        # remove ```json ```
        text = re.sub(r"```json", "", text)
        text = re.sub(r"```", "", text).strip()

        try:
            match = re.search(r"\{.*\}", text, re.DOTALL)

            if match:
                parsed = json.loads(match.group())
            else:
                raise Exception("No JSON found")

            return parsed.get(
                "summary",
                "The company has shown stable performance, but no detailed AI summary was generated."
            )

        except Exception as e:
            print("AI PARSE ERROR:", e)
            print("RAW AI RESPONSE:", text)

            return text