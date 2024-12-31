from fastapi import FastAPI, Request
from telegram import Update, Bot
import requests

# Hardcoded Configuration (Replace with your actual keys)
BOT_TOKEN = "7819805722:AAGRFk_78anuSlLdl0IJSc3EZ9mrwpK2tsU"
MISTRAL_API_KEY = "clkU70jpgcejg8ejWcYt3UidmLpFPJxK"
WEBHOOK_URL = "https://boot-zfu4-pohno4x5c-drz199s-projects.vercel.app"

bot = Bot(token=BOT_TOKEN)

# FastAPI application
app = FastAPI()

# Mistral API call function
def query_mistral_api(prompt):
    url = "https://api.mistral.ai/v1/completions"
    headers = {"Authorization": f"Bearer {clkU70jpgcejg8ejWcYt3UidmLpFPJxK}"}
    data = {"prompt": prompt, "max_tokens": 100}
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json().get("choices", [{}])[0].get("text", "No response from Mistral API")
    else:
        return f"Error: {response.status_code} - {response.text}"

# Webhook handler
@app.post("/")
async def telegram_webhook(request: Request):
    try:
        data = await request.json()
        update = Update.de_json(data, bot)
        if update.message:
            user_message = update.message.text
            response = query_mistral_api(user_message)
            await update.message.reply_text(response)
        return {"ok": True}
    except Exception as e:
        print(f"Error: {e}")
        return {"ok": False}