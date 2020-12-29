import json

def searchJson(entry, array):
    i = 0
    for value in array:
        if entry['Location'] in value["Location"]:
            return True, i
        i = i + 1
    
    return False, i

with open('sites.json', 'r') as f:
    array = json.load(f)

templateSite = '{ "Title": "", "Location": "", "Phases": [] }'
templatePhase = '{ "Type": "", "Material": "", "Date": "", "Notes": "", "Source": "" }'

jsonArray = []

for entry in array:
    phase = json.loads(templatePhase)
    phase["Type"] = entry['Type']
    phase["Material"] = entry['Material']
    phase["Date"] = entry['Date']
    phase["Notes"] = entry['Notes']
    phase["Source"] = entry['Source']
    success, index = searchJson(entry, jsonArray)
    if success == False:
        site = json.loads(templateSite)
        site['Title'] = entry['Title']
        site['Location'] = entry['Location']
        site["Phases"].append(phase)
        jsonArray.append(site)
    else:
        jsonArray[index]["Phases"].append(phase)

print(jsonArray)
with open('data.json', 'w') as outfile:
    json.dump(jsonArray, outfile, indent=2)

    




