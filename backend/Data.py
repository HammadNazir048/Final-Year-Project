from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI

app = Flask(__name__)
CORS(app) 

OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
GEMMA_MODEL = "google/gemma-3-1b-it:free" 


OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "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")

YOUR_SITE_URL = os.environ.get("YOUR_SITE_URL", "http://localhost:5003") 
YOUR_SITE_NAME = os.environ.get("YOUR_SITE_NAME", "Script Scout AI Chatbot") 

@app.route('/chat', methods=['POST'])
def chat():
    if not request.is_json:
        return jsonify({'error': 'Invalid content type, expected application/json'}), 400

    user_input = request.json.get('user_input')
    if not user_input:
        return jsonify({'error': 'No input provided'}), 400

    if not OPENROUTER_API_KEY or OPENROUTER_API_KEY == "YOUR_OPENROUTER_API_KEY":
         return jsonify({'error': 'OpenRouter API key not configured or is placeholder.'}), 500

    try:
        client = OpenAI(
            base_url=OPENROUTER_BASE_URL,
            api_key=OPENROUTER_API_KEY,
        )

        extra_headers = {
            "HTTP-Referer": YOUR_SITE_URL,
            "X-Title": YOUR_SITE_NAME,
        }


        completion = client.chat.completions.create(
            extra_headers=extra_headers,
            model=GEMMA_MODEL,
            messages=[
               
                {
                    "role": "user",
                    "content": user_input 
                }
             
            ],
             temperature=0.7, 
             max_tokens=500 
        )

        if not completion.choices:
             print(f"Unexpected response structure from OpenRouter/Gemma: {completion}") # Log the unexpected structure
             return jsonify({'error': 'Unexpected response format from API.'}), 500

        bot_reply = completion.choices[0].message.content

        if bot_reply is None: 
             print(f"Received empty content from OpenRouter/Gemma: {completion}") # Log the unexpected structure
             return jsonify({'error': 'API returned an empty response.'}), 500


        return jsonify({'response': bot_reply})

    except Exception as e: 
        print(f"API request error or unexpected error: {e}")
        error_message = str(e)
        if hasattr(e, 'status_code'): # Check if it's an HTTP error
             return jsonify({'error': f'API error ({e.status_code}): {error_message}'}), e.status_code
        elif hasattr(e, 'response') and hasattr(e.response, 'text'): # Check for requests-like response
             try:
                 error_details = e.response.json()
                 error_message = error_details.get("error", {}).get("message", e.response.text)
                 return jsonify({'error': f'API error ({e.response.status_code}): {error_message}'}), e.response.status_code
             except:
                  return jsonify({'error': f'API error: {e.response.text}'}), e.response.status_code
        else:
             return jsonify({'error': f'An error occurred: {error_message}'}), 500


if __name__ == '__main__':

    app.run(debug=True, port=5003)