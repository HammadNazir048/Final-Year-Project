from flask import Flask, request, send_file, jsonify
from gtts import gTTS
import os

app = Flask(__name__)

if not os.path.exists("static"):
    os.makedirs("static")

@app.route('/api/voiceover', methods=['POST'])
def generate_voiceover():
    data = request.get_json()
    text = data.get("text")
    lang = data.get("lang", "en")  # Default language: English

    if not text:
        return jsonify({"error": "No text provided"}), 400

    filename = "voiceover.mp3"
    filepath = os.path.abspath(os.path.join("static", filename))  # Absolute path

    try:
        tts = gTTS(text=text, lang=lang, slow=False)
        tts.save(filepath)
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": f"Failed to generate voiceover: {str(e)}"}), 500

    return send_file(filepath, as_attachment=True, download_name=filename)

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Use port 5001 to avoid conflicts
