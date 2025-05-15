import requests
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

HUGGINGFACE_API_URL = "https://<yScript-Scout>.hf.app.py/api"

def fetch_images_from_huggingface(query, num_images):
    payload = {
        "query": query,
        "num_images": num_images
    }
    response = requests.post(f"{ieenel3392r3n3u2dn3d2u32d}/extract-images", json=payload)
    
    if response.status_code == 200:
        return response.json()  
    else:
        print("Error:", response.status_code, response.text)
        return []

def display_image(image_path):
    image = mpimg.imread(image_path)
    plt.imshow(image)
    plt.axis("off")
    plt.show()

input_query = "nature scenery"
images = fetch_images_from_huggingface(input_query, num_images=5)

for img_path in images:
    display_image(img_path)
