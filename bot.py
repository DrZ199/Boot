import os
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
from telegram.ext.webhook import WebhookHandler
import requests

# Load environment variables
load_dotenv()

BOT_TOKEN = os.getenv("7819805722:AAGRFk_78anuSlLdl0IJSc3EZ9mrwpK2tsU")
MISTRAL_API_KEY = os.getenv("clkU70jpgcejg8ejWcYt3UidmLpFPJxK")
WEBHOOK_URL = os.getenv("WEBHOOK_URL")  # Add your Vercel URL here

# Mistral API call function
def query_mistral_api(prompt):
    url = "https://api.mistral.ai/v1/completions"  # Replace with the correct endpoint
    headers = {"Authorization": f"Bearer {MISTRAL_API_KEY}"}
    data = {"prompt": prompt, "max_tokens": 100}
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json().get("choices", [{}])[0].get("text", "No response from Mistral API")
    else:
        return f"Error: {response.status_code} - {response.text}"

# Message handler
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_message = update.message.text
    mistral_response = query_mistral_api(user_message)
    await update.message.reply_text(mistral_response)

# Main function for webhook setup
def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()

    # Add message handler
    app.add_handler(WebhookHandler())

    # Set webhook
    app.set_webhook(url=WEBHOOK_URL)
    print(f"Webhook set to {WEBHOOK_URL}")

    return app  # Required for serverless platforms like Vercel