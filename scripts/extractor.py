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
        lessons_info_list = courses_info_map[entry[:entry.rfind(".")]]
        raw_file = open(os.path.join(directory, entry), "r")

        for i, row in enumerate(raw_file):
            lessons_info_list[i]["pageNumber"] = int(row.strip())
    raw_file.close()

processed_file = open(os.path.join("..", "src", "data", "coursesInfo.json"), "w")
json.dump(courses_info_map, processed_file, ensure_ascii=False, indent=4)

processed_file.close()