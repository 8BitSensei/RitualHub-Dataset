import urllib.request
import json
import csv
from bs4 import BeautifulSoup
from bs4.element import Comment

templateSite = '{ "Title": "", "Location": "", "Phases": [] }'
templatePhase = '{ "Type": "", "Material": "", "Date": "", "Notes": "", "Source": "" }'
templeArray = []
funeralArray = []

def convert(easting, northing):
    response = urllib.request.urlopen("http://www.bgs.ac.uk/data/webservices/CoordConvert_LL_BNG.cfc?method=BNGtoLatLng&easting="+str(easting)+"&northing="+str(northing)).read()
    my_json = response.decode('utf8').replace("'", '"')
    values = json.loads(my_json)
    return values["LONGITUDE"], values["LATITUDE"]

def text_from_html(id):
    body = urllib.request.urlopen('https://archaeologydataservice.ac.uk/archives/view/romangl/fullrecord.cfm?id='+id).read()
    soup = BeautifulSoup(body, 'html.parser')
    texts = soup.findAll('tr')
    for tr in texts:
        summary = tr.find('th', {"class": "rc"})
        try:
            if summary.text == "Summary":
                td = tr.find('td')
                return td.text
        except:
            print("An exception occurred")

with open('../rsc/query.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count > 0:
            site = json.loads(templateSite)
            phase = json.loads(templatePhase)
            site["Title"] = row[3]
            la, lo = convert(row[6], row[7])
            site["Location"] = str(la)+", "+str(lo)
            phase["Type"] = row[9]
            phase["Notes"] = text_from_html(row[0])
            phase["Source"] = 'https://archaeologydataservice.ac.uk/archives/view/romangl/fullrecord.cfm?id='+row[0]
            site["Phases"].append(phase)
            if "funerary site" in phase["Type"]:
                funeralArray.append(site)
            else:
                templeArray.append(site)

        line_count = line_count + 1

with open('../Temples and Shrines/test.json', 'w') as outfile:
    print("Writing temple data")
    json.dump(templeArray, outfile, indent=2)

with open('../Funerary/test.json', 'w') as outfile:
    print("Writing funerary data")
    json.dump(funeralArray, outfile, indent=2)




