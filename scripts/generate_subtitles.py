# import sys
# import re
# from datetime import timedelta

# def generate_subtitles(text):
#     if not text.strip():  
#         return "No subtitles generated."

#     print(f"Generating subtitles for: {text}")  # Debug log

#     sentences = re.split(r'(?<=[.!?])\s+', text)
#     words_per_second = 2  

#     start_time = timedelta(seconds=0)
#     subtitles = []

#     for i, sentence in enumerate(sentences):
#         word_count = len(sentence.split())
#         duration = max(2, word_count // words_per_second)
#         end_time = start_time + timedelta(seconds=duration)

#         subtitles.append(f"{i+1}\n{start_time},000 --> {end_time},000\n{sentence}\n")
#         start_time = end_time  

#     return "\n".join(subtitles)

# if __name__ == "__main__":
#     if len(sys.argv) < 2:
#         print("Error: No input text provided.", file=sys.stderr)
#         sys.exit(1)

#     input_text = sys.argv[1].strip()
#     subtitles = generate_subtitles(input_text)
    
#     print("Generated subtitles:")
#     print(subtitles)

import os
import re
import sys
import json
from datetime import timedelta

def generate_subtitles(text):
    sentences = re.split(r'(?<=[.!?])\s+', text)
    words_per_second = 2  # Adjust reading speed
    start_time = timedelta(seconds=0)
    subtitles = []

    for i, sentence in enumerate(sentences):
        word_count = len(sentence.split())
        duration = max(2, word_count // words_per_second)
        end_time = start_time + timedelta(seconds=duration)

        subtitles.append({
            "index": i + 1,
            "start": str(start_time),
            "end": str(end_time),
            "text": sentence.strip()
        })
        start_time = end_time

    return subtitles

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No text provided"}))
        sys.exit(1)

    input_text = sys.argv[1]
    subtitles = generate_subtitles(input_text)

    print(json.dumps({"subtitles": subtitles}))

if __name__ == "__main__":
    main()
