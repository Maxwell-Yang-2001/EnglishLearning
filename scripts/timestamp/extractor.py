# copy the timestamp string on Youtube into raw_timestamps.txt (the existing file is just a sample)
# this file will process it and output it into arrays of strings in timestamps.json

import json

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

raw_file = open("raw_timestamps.txt", "r")
timestamps = []

for row in raw_file:
    row = row.strip()
    if row == '':
        continue
    if row.find(' ') == -1:
        raise ValueError("A timestamp row does not contain a space: {}".format(row))
    parts = row.split(" ", 1)
    timestamp = dict()
    timestamp["time"] = str_to_seconds(parts[0].strip())
    timestamp["part"] =  parts[1].strip()
    timestamps.append(timestamp)

raw_file.close()

processed_file = open("timestamps.json", "w")
json.dump(timestamps, processed_file, ensure_ascii=False, indent=4)

processed_file.close()
