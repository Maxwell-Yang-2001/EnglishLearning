# copy the timestamp string on Youtube into raw_timestamps folder as txt files (the existing files are just a sample)
# please name the files the same name as the mp4 videos to be played, so they can be matched up
# this file will process the folder and output it into timestamps.json

import json
import os

class Timestamp:
    def __init__(self, time: int, label: str):
        self.time = time
        self.label = label
    def toJSON(self):
        # Referenced from: https://stackoverflow.com/a/15538391
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

def str_to_seconds(label: str) -> int:
    parts = label.split(':')
    # Referenced from: https://stackoverflow.com/a/12739542
    if len(parts) == 1: # seconds only
        ftr = [1]
    elif len(parts) == 2: # M:S
        ftr = [60, 1]
    elif len(parts) == 3: # H:M:S
        ftr = [3600, 60, 1]
    elif len(parts) == 4: # D:H:M:S
        ftr = [86400, 3600, 60, 1]
    return sum([a*b for a,b in zip(ftr, map(int, label.split(':')))])

# load in the timestamps
directory = "timestamps"
entries = os.listdir(directory)

courses_info_map = dict()

for entry in entries:
    raw_file = open(os.path.join(directory, entry), "r")
    lessons_info_list = []

    for row in raw_file:
        row = row.strip()
        if row == '':
            continue
        if row.find(' ') == -1:
            raise ValueError("A timestamp row does not contain a space: {}".format(row))
        parts = row.split(" ", 1)
        lesson_info = dict()
        lesson_info["name"] = parts[1].strip()
        lesson_info["time"] = str_to_seconds(parts[0].strip())
        lessons_info_list.append(lesson_info)

    raw_file.close()
    courses_info_map[entry[:entry.rfind(".")]] = lessons_info_list

# load in the pages (if provided)
directory = "pages"
if (os.path.isdir(directory) and len(os.listdir(directory)) > 0):
    entries = os.listdir(directory)

    for entry in entries:
        raw_file = open(os.path.join(directory, entry), "r")
        lessons_info_list = courses_info_map[entry[:entry.rfind(".")]]

        for i, row in enumerate(raw_file):
            lessons_info_list[i]["pageNumber"] = int(row.strip())
    raw_file.close()

# load in vocabulary (if provided)
directory = "vocabulary"
if (os.path.isdir(directory) and len(os.listdir(directory)) > 0):
    entries = os.listdir(directory)

    for entry in entries:
        raw_file = open(os.path.join(directory, entry), "r")
        lessons_info_list = courses_info_map[entry[:entry.rfind(".")]]

        lesson_vocab_list = []
        lesson_index = 0

        for row in raw_file:
            row = row.strip()
            if len(row) == 0:
                if len(lesson_vocab_list) > 0:
                    
                    lessons_info_list[lesson_index]["vocabulary"] = lesson_vocab_list
                    lesson_vocab_list = []
                    lesson_index += 1
                continue

            parts = row.split("#")
            if len(parts) % 2 == 0 or len(parts) < 3:
                raise ValueError("A vocabulary row does not contain odd number (at least 3) of parts separated by #: {}".format(row))
            
            entry = dict()
            entry["word"] = parts[0].strip()
            entry["meanings"] = []

            for i in range(len(parts) // 2):
                meaning = dict()
                meaning_type = parts[2 * i + 1].strip()
                if meaning_type.find(",") == -1:
                    meaning["type"] = meaning_type
                else:
                    type_parts = meaning_type.split(",")
                    if len(type_parts) != 5 or type_parts[0].strip() != 'v.':
                        raise ValueError("A vocabulary row does not contain exactly 5 forms (default, third person, present participle, past, past participle) for a verb: {}".format(row))
                    meaning["type"] = type_parts[0].strip()
                    meaning["thirdPerson"] = type_parts[1].strip()
                    meaning["presentParticiple"] = type_parts[2].strip()
                    meaning["past"] = type_parts[3].strip()
                    meaning["pastParticiple"] = type_parts[4].strip()
                
                meaning["meaning"] = parts[2 * i + 2].strip()
                
                entry["meanings"].append(meaning)
            
            lesson_vocab_list.append(entry)

        if len(lesson_vocab_list) > 0:
            lessons_info_list[lesson_index]["vocabulary"] = lesson_vocab_list

processed_file = open(os.path.join("..", "src", "data", "coursesInfo.json"), "w")
json.dump(courses_info_map, processed_file, ensure_ascii=False, indent=4)

processed_file.close()
