import json

fr = open("vocabulary/concept1.txt", "r")
fw = open("vocab.json", "w")

result = []
vocabs_per_lesson = []
for row in fr:
    row = row.strip()
    if len(row) == 0:
        if len(vocabs_per_lesson) > 0:
            result.append(vocabs_per_lesson)
            vocabs_per_lesson = []
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
    
    vocabs_per_lesson.append(entry)

if len(vocabs_per_lesson) > 0:
    result.append(vocabs_per_lesson)

json.dump(result, fw, ensure_ascii=False, indent=4)

fr.close()
fw.close()
