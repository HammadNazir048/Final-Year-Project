import io
import os 
import csv
import time
import urllib
import datetime
import pandas as pd
from PIL import Image
from io import BytesIO
from tqdm import tqdm
import dateutil.parser
from datetime import datetime
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support import expected_conditions as EC
import urllib.request

def search_google(search_query, num_of_images):
    search_query = "https://www.google.com/search?site=&tbm=isch&source=hp&biw=1873&bih=990&q=" + search_query
    driver.get( search_query )
    
    image_sources = []
    for ith in range(10,num_of_images+1):
        try:
            img_box = driver.find_element_by_xpath('/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div['+str(ith)+']/a[1]/div[1]/img')
            img_box.click()
            time.sleep(2)
            image = driver.find_element_by_xpath('/html/body/div[2]/c-wiz/div[3]/div[2]/div[3]/div[2]/div[2]/div[2]/div[2]/c-wiz/div/div/div/div[3]/div[1]/a/img[1]')
            image_src = image.get_attribute('src')
            image_sources.append( image_src )
        except: 
            print('skipping '+ str(ith)+" iteration of image search")
    
    return image_sources

user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
headers={'User-Agent':user_agent,} 

def extract_google_images( query, folder_path, num_of_images, image_extension=".png" ):
    try: os.mkdir(folder_path) 
    except: pass  
    query_processed = modify_query(query=query)
    image_sources = search_google(query_processed,num_of_images)
    for index, data_src in enumerate(image_sources):
        request=urllib.request.Request(data_src,None,headers) #The assembled request
        with urllib.request.urlopen(request) as response:
            data_temp = response.read()
            with open(folder_path + query + " " + str(index+1) +  image_extension, mode="wb") as file:
                file.write(data_temp)
                
    return data_temp
    
def show_image(file_path_name):
    image = mpimg.imread(file_path_name)
    plt.imshow(image)
    print(image.shape)
    plt.axis("off")
    plt.show()


input_query = "Sentence, {keyword}"
print('Input Query: ', input_query)
query_processed = modify_query(query=input_query)
print('Modified Query: ', query_processed)
image_data = extract_google_images( query=input_query, folder_path="/kaggle/working/images/", num_of_images=1, image_extension=".jpg" )
show_image( file_path_name='/kaggle/working/images/'+ input_query + ' 1.jpg')