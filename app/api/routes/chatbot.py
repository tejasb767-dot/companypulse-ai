from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.groq_client import get_groq_client
from app.services.company_service import CompanyService

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


COMPANY_MAP = {
    "apple": "AAPL",
    "microsoft": "MSFT",
    "amazon": "AMZN",
    "amzn": "AMZN",
    "google": "GOOGL",
    "alphabet": "GOOGL",
    "tesla": "TSLA",
    "meta": "META",
    "facebook": "META",
    "nvidia": "NVDA",
    "netflix": "NFLX",
    "reliance": "RELIANCE.NS",
    "tcs": "TCS.NS",
    "infosys": "INFY.NS",
    "hdfc": "HDFCBANK.NS",
    "icici": "ICICIBANK.NS",
}


@router.post("/chatbot")
async def chatbot_chat(request: ChatRequest):
    try:
        message = request.message.lower().strip()

        matched_companies = []

        for company, ticker in COMPANY_MAP.items():
            if company in message:
                matched_companies.append((company, ticker))

        # Compare two companies
        if len(matched_companies) >= 2:
            company1_name, symbol1 = matched_companies[0]
            company2_name, symbol2 = matched_companies[1]

            service = CompanyService()

            data1 = await service.get_company(symbol1)
            data2 = await service.get_company(symbol2)

            company1 = data1.get("company", {})
            company2 = data2.get("company", {})

            price1 = data1.get("price", {})
            price2 = data2.get("price", {})

            valuation1 = data1.get("valuation", {})
            valuation2 = data2.get("valuation", {})

            performance1 = data1.get("performance", {})
            performance2 = data2.get("performance", {})

            better_company = (
                company1.get("name", symbol1)
                if (performance1.get("roe") or 0)
                > (performance2.get("roe") or 0)
                else company2.get("name", symbol2)
            )

            reply = f"""
# Company Comparison

## {company1.get('name', symbol1)} vs {company2.get('name', symbol2)}

### Current Price
• {company1.get('name', symbol1)}: ${price1.get('current', 'N/A')}
• {company2.get('name', symbol2)}: ${price2.get('current', 'N/A')}

### P/E Ratio
• {company1.get('name', symbol1)}: {valuation1.get('pe', 'N/A')}
• {company2.get('name', symbol2)}: {valuation2.get('pe', 'N/A')}

### EPS
• {company1.get('name', symbol1)}: {performance1.get('eps', 'N/A')}
• {company2.get('name', symbol2)}: {performance2.get('eps', 'N/A')}

### ROE
• {company1.get('name', symbol1)}: {performance1.get('roe', 'N/A')}
• {company2.get('name', symbol2)}: {performance2.get('roe', 'N/A')}

### Better Financial Strength
🏆 {better_company} currently appears stronger based on profitability and return on equity.

### Suggested Follow-Up
• Ask for long-term outlook  
• Ask for risks and opportunities  
• Ask which is better for short-term investing
"""

            return {"reply": reply}

        # Single company analysis
        elif len(matched_companies) == 1:
            _, symbol = matched_companies[0]

            service = CompanyService()
            company_data = await service.get_company(symbol)

            company = company_data.get("company", {})
            price = company_data.get("price", {})
            valuation = company_data.get("valuation", {})
            performance = company_data.get("performance", {})

            company_name = company.get("name", symbol)
            current_price = price.get("current", "N/A")
            daily_change = price.get("percent", "N/A")
            high_price = price.get("high", "N/A")
            low_price = price.get("low", "N/A")

            pe = valuation.get("pe", "N/A")
            eps = performance.get("eps", "N/A")
            roe = performance.get("roe", "N/A")
            net_margin = performance.get("net_margin", "N/A")

            ai_summary = company_data.get("ai_summary")

            if not ai_summary or ai_summary == "AI analysis generating...":
                if (roe or 0) > 20:
                    performance_text = (
                        "The company appears financially strong with high profitability and efficient management."
                    )
                elif (roe or 0) > 10:
                    performance_text = (
                        "The company appears financially stable with moderate profitability."
                    )
                else:
                    performance_text = (
                        "The company may face challenges in profitability and growth."
                    )

                if (daily_change or 0) > 0:
                    market_text = (
                        "The stock is showing positive market momentum today."
                    )
                else:
                    market_text = (
                        "The stock is under slight pressure today."
                    )

                ai_summary = f"""
{company_name} is currently trading at ${current_price}.

{market_text}

The company has a P/E ratio of {pe}, EPS of {eps}, and ROE of {roe}%.

{performance_text}
"""

            if (roe or 0) > 20 and (daily_change or 0) > 0:
                recommendation = "Strong Buy"
                recommendation_reason = (
                    "The company has strong returns, healthy profitability, and positive momentum."
                )
            elif (roe or 0) > 15:
                recommendation = "Buy"
                recommendation_reason = (
                    "The company looks financially healthy and attractive for long-term investors."
                )
            else:
                recommendation = "Hold"
                recommendation_reason = (
                    "The company is stable, but investors should watch future growth and risks."
                )

            reply = f"""
# {company_name} ({symbol})

{'🟢 Positive Momentum Today' if (daily_change or 0) > 0 else '🔴 Slight Weakness Today'}

## Market Snapshot

• Current Price: ${current_price}  
• Daily Change: {daily_change}%  
• Day High: ${high_price}  
• Day Low: ${low_price}

## AI Analysis

{ai_summary.strip()}

## Key Financial Metrics

• P/E Ratio: {pe}  
• EPS: {eps}  
• ROE: {roe}  
• Net Margin: {net_margin}

## Investment Recommendation

### {recommendation}

{recommendation_reason}

## What You Can Ask Next

• Compare this company with another company  
• Ask for risks and opportunities  
• Ask for long-term vs short-term outlook  
• Ask whether the stock is overvalued or undervalued
"""

            return {"reply": reply}

        # General chatbot response
        client = get_groq_client()

        system_prompt = """
You are CompanyPulse AI, a professional and highly intelligent stock market assistant.

Rules:
- Give structured, beautiful, and easy-to-read responses
- Use short sections and bullet points
- Explain finance concepts simply
- Keep the response concise but useful
- Sound like a modern premium finance product
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": request.message,
                },
            ],
            temperature=0.4,
            max_tokens=350,
        )

        return {
            "reply": response.choices[0].message.content
        }

    except Exception as e:
        print("CHATBOT ERROR:", e)

        return {
            "reply": "Sorry, something went wrong while generating the response."
        }