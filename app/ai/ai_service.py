import json
import re

from app.ai.groq_client import get_groq_client
from app.ai.prompts import company_analysis_prompt


class AIService:

    def __init__(self):
        self.client = get_groq_client()

    async def analyze_company(self, data):

        prompt = company_analysis_prompt(data)

        response = self.client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": prompt}
            ],
        )

        text = response.choices[0].message.content

        # remove ```json ```
        text = re.sub(r"```json", "", text)
        text = re.sub(r"```", "", text)

        try:
            return json.loads(text)
        except:
            return {
                "summary": "No AI summary",
                "trend": "neutral",
                "risk": "medium",
                "buy_signal": "hold",
                "graph_color": "blue",
                "graph_style": "smooth",
            }