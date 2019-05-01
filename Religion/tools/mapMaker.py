from gmplot import gmplot
import json

# Place map
gmap = gmplot.GoogleMapPlotter(37.766956, -122.438481, 13)

with open('sites.json', 'r') as f:
    array = json.load(f)
    for entry in array:
        entry["Location"].split(', ')[0]
        gmap.marker(float(entry["Location"].split(', ')[0]), float(entry["Location"].split(', ')[1]), 'cornflowerblue')

# Draw
gmap.draw("my_map.html")