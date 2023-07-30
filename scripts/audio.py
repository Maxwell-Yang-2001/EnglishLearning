import subprocess

import os

directory = "vocabulary"
entries = os.listdir(directory)

vocabulary_set = set()

for entry in entries:
    fr = open(os.path.join(directory, entry), "r")

    for row in fr:
        row = row.strip()
        if row == '':
            continue
        parts = row.split("#")
        if len(parts) % 2 == 0 or len(parts) < 3:
            raise ValueError("A vocabulary row does not contain odd number (at least 3) of parts separated by #: {}".format(row))
        
        vocabulary = parts[0].strip()
        if len(vocabulary) == 0:
            raise ValueError("Vocabulary is empty: {}".format(row))
        vocabulary_set.add(vocabulary)
    
        for i in range(len(parts) // 2):
            meaning_type = parts[2 * i + 1].strip()
            if meaning_type.find(",") == -1:
                continue
            type_parts = meaning_type.split(",")
            if len(type_parts) != 5 or type_parts[0].strip() != 'v.':
                raise ValueError("A vocabulary row does not contain exactly 5 forms (default, third person, present participle, past, past participle) for a verb: {}".format(row))
            for j in range(1, 5):
                vocabulary = type_parts[j].strip()
                if len(vocabulary):
                    vocabulary_set.add(vocabulary)

# function to call polly.
# If not forced and audio file with same name already exists, call will not go through (to save cost)
def polly(vocabulary: str, file_name: str, forced: bool = False):
    path = os.path.join("../", "public", "audio", "{}.mp3".format(file_name))
    if not forced and os.path.exists(path) and os.path.isfile(path):
        return
    subprocess.run(["aws", "polly", "synthesize-speech", "--output-format", "mp3",
                    "--voice-id", "Ruth", "--engine", "neural",
                    "--text", "'{}'".format(vocabulary), path])

# A default sorry message is always included for a default error message (for pronunciations not added)
polly("Sorry, no pronunciation available.", "sorry-message")

# Then call polly to populate for all vocabularies (that do not currently have a pronunciation)
for vocabulary in vocabulary_set:
    file_name = vocabulary.lower().replace(",", "").replace(".", "").replace("!", "").replace("?", "").replace(" ", "-")
    polly(vocabulary, file_name)