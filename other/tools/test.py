from bs4 import BeautifulSoup
from bs4.element import Comment
import urllib.request

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
        

print(text_from_html("2139"))
