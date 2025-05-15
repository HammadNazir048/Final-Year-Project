import requests
from flask import Flask, request, jsonify, send_from_directory 
from flask_cors import CORS 
import os
import spacy
from bing_image_downloader import downloader
import concurrent.futures
import time

app = Flask(__name__)
CORS(app)

nlp = spacy.load("en_core_web_sm")

IMAGE_FOLDER = "downloaded_images"
os.makedirs(IMAGE_FOLDER, exist_ok=True)

def download_with_retry(keyword, num_images, retries=3):
    attempt = 0
    while attempt < retries:
        try:
            downloader.download(keyword, limit=num_images, output_dir=IMAGE_FOLDER, adult_filter_off=False, force_replace=False)
            print(f"Downloaded images for {keyword}")
            return True
        except requests.exceptions.Timeout:
            print(f"Timeout error for {keyword}. Retrying...")
        except requests.exceptions.RequestException as e:
            print(f"Error downloading {keyword}: {e}. Retrying...")
        attempt += 1
        time.sleep(2)  
    return False

def download_images_for_keyword(keyword, num_images):
    success = download_with_retry(keyword, num_images)
    if not success:
        print(f"Failed to download images for {keyword} after retries")

@app.route('/extract_keywords', methods=['POST'])
def extract_keywords():
    data = request.json
    sentence = data.get('sentence', '')
    if not sentence:
        return jsonify({'error': 'Sentence is required'}), 400

    doc = nlp(sentence)
    keywords = [token.text for token in doc if token.pos_ in ['NOUN', 'PROPN'] and not token.is_stop]
    return jsonify({'keywords': keywords})

@app.route('/download_images', methods=['POST'])
def download_images_for_keywords():
    data = request.json
    keywords = data.get('keywords', [])
    num_images = data.get('num_images', 10)
    
    if not keywords:
        return jsonify({'error': 'Keywords are required'}), 400

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = []
        for keyword in keywords:
            futures.append(executor.submit(download_images_for_keyword, keyword, num_images))

        concurrent.futures.wait(futures)
    
    return jsonify({'message': 'Images downloaded successfully'})

@app.route('/images/<path:filename>', methods=['GET'])
def get_image(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

@app.route('/get_images', methods=['GET'])
def get_all_images():
    images = []
    for folder in os.listdir(IMAGE_FOLDER):
        folder_path = os.path.join(IMAGE_FOLDER, folder)
        if os.path.isdir(folder_path):
            for image in os.listdir(folder_path):
                if image.endswith(('jpg', 'jpeg', 'png')):
                    # Modify the path to include the base URL for image retrieval
                    images.append(f"http://127.0.0.1:5000/images/{folder}/{image}")
    return jsonify({'images': images})

if __name__ == '__main__':
    app.run(debug=True)
