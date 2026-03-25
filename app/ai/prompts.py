def company_analysis_prompt(data):

    return f"""
Return ONLY valid JSON.

No text.
No explanation.
No markdown.

Format:

{{
  "summary": "2 lines only",
  "trend": "up/down/neutral",
  "risk": "low/medium/high",
  "buy_signal": "buy/hold/sell",
  "graph_color": "green/red/blue",
  "graph_style": "smooth/sharp"
}}

DATA:
{data}
"""