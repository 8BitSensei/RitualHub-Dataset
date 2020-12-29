{
	"translatorID": "73c424fd-a649-49a8-bd7a-2314c6465327",
	"translatorType": 2,
	"label": "RitualHub",
	"creator": "Charlie Tizzard Ó Kevlahan",
	"target": "json",
	"minVersion": "1.0.0b4.r1",
	"maxVersion": "",
	"priority": 99,
	"configOptions": {
		"getCollections": "true"
	},
	"inRepository": false,
	"lastUpdated": "2019-08-11 12:58:13"
}

var sites = [];
var items = [];

function get(obj, key) {
    return key.split(".").reduce(function(o, x) {
        return (typeof o == "undefined" || o === null) ? o : o[x];
    }, obj);
}

function getItem(key)
{
    var item;
    if(items.length ==0)
        while(item = Zotero.nextItem())
            items.push(item);

    var ref = items.find(item => item.key == key);
    var creatorIndex = 0;
	var creatorLength = ref.creators.length;
	var authorsArray = [];
    var editorArray = [];
    for(creatorIndex; creatorIndex < creatorLength; creatorIndex++)
	{
        if(ref.creators[creatorIndex].creatorType == "author")
        {
            if(creatorIndex > 2)
            authorsArray.push(", et al.");
            if(creatorIndex == 0)
                authorsArray.push(ref.creators[creatorIndex].lastName + ((ref.creators[creatorIndex].firstName != undefined && ref.creators[creatorIndex].firstName != "") ? ", " + ref.creators[creatorIndex].firstName[0] : "") + ".");
            else if(creatorIndex != creatorLength)
                authorsArray.push(" " + ref.creators[creatorIndex].lastName + ((ref.creators[creatorIndex].firstName != undefined && ref.creators[creatorIndex].firstName != "") ? ", " + ref.creators[creatorIndex].firstName[0] : "") + ".");
            else if(creatorIndex == (creatorLength - 1))
                authorsArray.push(" and " + ref.creators[creatorIndex].lastName + ((ref.creators[creatorIndex].firstName != undefined && ref.creators[creatorIndex].firstName != "") ? ", " + ref.creators[creatorIndex].firstName[0] : "") + ".");
        }
        else if(ref.creators[creatorIndex].creatorType == "editor")
        {
            if(creatorIndex > 2)
                editorArray.push(", et al.");
            if(creatorIndex == 0)
                editorArray.push(ref.creators[creatorIndex].lastName + ((ref.creators[creatorIndex].firstName != undefined && ref.creators[creatorIndex].firstName != "") ? ", " + ref.creators[creatorIndex].firstName[0] : "") + ".");
            else if(creatorIndex != creatorLength)
                editorArray.push(" " + ref.creators[creatorIndex].lastName + ((ref.creators[creatorIndex].firstName != undefined && ref.creators[creatorIndex].firstName != "") ? ", " + ref.creators[creatorIndex].firstName[0] : "") + ".");
            else if(creatorIndex == (creatorLength - 1))
                editorArray.push(" and " + ref.creators[creatorIndex].lastName + ((ref.creators[creatorIndex].firstName != undefined && ref.creators[creatorIndex].firstName != "") ? ", " + ref.creators[creatorIndex].firstName[0] : "") + ".");
        }
        
    }
    
    var date = get(ref, 'date'); 
    var title = get(ref, 'title');
    var bookTitle = get(ref, 'bookTitle');
    var edition = get(ref, 'edition');
    var place = get(ref, 'place');
    var publisher = get(ref, 'publisher');
    var pages = get(ref, 'numPages');
    var type = get(ref, "itemType");
    var publication = get(ref, "publicationTitle");
    var volume = get(ref, "volume");
    var issue = get(ref, "issue");
    var url = get(ref, "url");
    var websiteTitle = get(ref, "websiteTitle");

    var itemData = {"authors":authorsArray.join(), "editors":editorArray.join(),  "date":date, "title":title, "bookTitle":bookTitle, "edition":edition, "place":place, "publisher":publisher, "pages":pages, "type":type, "publication":publication, "volume":volume, "issue":issue, "url":url, "websiteTitle":websiteTitle};
    return itemData;
}

function citeBook(itemData)
{
    var stringBuilder = [];
    
    if(itemData['authors'] != undefined)
        stringBuilder.push(itemData['authors'] + " ");
    if(itemData['date'] != undefined)
        stringBuilder.push("(" + itemData['date'] + "). ");
    if(itemData['title'] != undefined)
        stringBuilder.push(itemData['title'] + ". ");
    if(itemData['edition'] != undefined)
        stringBuilder.push(itemData['edition'] + ". ");
    if(itemData['place'] != undefined && itemData['publisher'] != undefined)
        stringBuilder.push(itemData['place'] + ": ");
    if(itemData['publisher'] != undefined && itemData['pages'] == undefined)
        stringBuilder.push(itemData['publisher'] + ". ");
    if(itemData['publisher'] != undefined && itemData['pages'] != undefined)
        stringBuilder.push(itemData['publisher'] + ", ");
    if(itemData['pages'] != undefined)
        stringBuilder.push("pp." + itemData['pages'] + ". ");

    var ref = stringBuilder.join(''); 
    return ref;
}

function citeBookSection(itemData)
{
    var stringBuilder = [];
    
    if(itemData['authors'] != undefined)
        stringBuilder.push(itemData['authors'] + " ");
    if(itemData['date'] != undefined)
        stringBuilder.push("(" + itemData['date'] + "). ");
    if(itemData['title'] != undefined)
        stringBuilder.push(itemData['title'] + ". In: ");
    if(itemData['editors'] != undefined)
        stringBuilder.push(itemData['editors'] + " ed., ");
    if(itemData['bookTitle'] != undefined)
        stringBuilder.push(itemData['bookTitle'] + ". ");
    if(itemData['edition'] != undefined)
        stringBuilder.push(itemData['edition'] + ". ");
    if(itemData['place'] != undefined && itemData['publisher'] != undefined)
        stringBuilder.push(itemData['place'] + ": ");
    if(itemData['publisher'] != undefined && itemData['pages'] == undefined)
        stringBuilder.push(itemData['publisher'] + ". ");
    if(itemData['publisher'] != undefined && itemData['pages'] != undefined)
        stringBuilder.push(itemData['publisher'] + ", ");
    if(itemData['pages'] != undefined)
        stringBuilder.push("pp." + itemData['pages'] + ". ");

    var ref = stringBuilder.join(''); 
    return ref;
}

function citeJournalArticle(itemData)
{
    var stringBuilder = [];
    
    if(itemData['authors'] != undefined)
        stringBuilder.push(itemData['authors'] + " ");
    if(itemData['date'] != undefined)
        stringBuilder.push("(" + itemData['date'] + "). ");
    if(itemData['title'] != undefined)
        stringBuilder.push(itemData['title'] + ". ");
    if(itemData['publication'] != undefined)
        stringBuilder.push(itemData['publication'] + ". ");
    if(itemData['url'] != undefined)
        stringBuilder.push("[online] ");
    if(itemData['volume'] != undefined && itemData['issue'] != undefined)
        stringBuilder.push("Volume " + itemData['volume'] + "(" + itemData['issue'] + "), ");
    else if(itemData['volume'] != undefined)
        stringBuilder.push("Volume " + itemData['volume'] + ", ");
    if(itemData['pages'] != undefined)
        stringBuilder.push("pp." + itemData['pages'] + ". ");
    if(itemData['url'] != undefined)
        stringBuilder.push("Available at: URL " + itemData['url'] + ". ");

    var ref = stringBuilder.join(''); 
    return ref;
}

function citeWebsite(itemData)
{
    var stringBuilder = [];

    if(itemData['authors'].length != 0)
    {
        if(itemData['authors'] != undefined)
            stringBuilder.push(itemData['authors'] + " ");
        if(itemData['date'] != undefined)
            stringBuilder.push("(" + itemData['date'] + "). ");
        if(itemData['title'] != undefined)
            stringBuilder.push(itemData['title'] + ". ");
        stringBuilder.push("[online] ");
        if(itemData['websiteTitle' != undefined])
            stringBuilder.push(itemData['websiteTitle'] + ". ")
        if(itemData['url'] != undefined)
            stringBuilder.push("Available at: URL " + itemData['url'] + ". ");
    }
    else
    {
        if(itemData['websiteTitle' != undefined])
            stringBuilder.push(itemData['websiteTitle'] + ". ")
        if(itemData['date'] != undefined)
            stringBuilder.push("(" + itemData['date'] + "). ");
        if(itemData['title'] != undefined)
            stringBuilder.push(itemData['title'] + ". ");
        stringBuilder.push("[online] ");
        if(itemData['url'] != undefined)
            stringBuilder.push("Available at: URL " + itemData['url'] + ". ");
    }

    var ref = stringBuilder.join(''); 
    return ref;
}

function citeNewsArticle(itemData)
{
    var stringBuilder = [];
    
    if(itemData['authors'] != undefined)
        stringBuilder.push(itemData['authors'] + " ");
    if(itemData['date'] != undefined)
        stringBuilder.push("(" + itemData['date'] + "). ");
    if(itemData['title'] != undefined)
        stringBuilder.push(itemData['title'] + ". ");
    if(itemData['edition'] != undefined)
        stringBuilder.push(itemData['edition'] + ". ");
    if(itemData['place'] != undefined && itemData['publisher'] != undefined)
        stringBuilder.push(itemData['place'] + ": ");
    if(itemData['publisher'] != undefined && itemData['pages'] == undefined)
        stringBuilder.push(itemData['publisher'] + ". ");
    if(itemData['publisher'] != undefined && itemData['pages'] != undefined)
        stringBuilder.push(itemData['publisher'] + ", ");
    if(itemData['pages'] != undefined)
        stringBuilder.push("pp." + itemData['pages'] + ". ");

    var ref = stringBuilder.join(''); 
    return ref;
}

function citeDefault(itemData)
{
    var stringBuilder = [];
    
    if(itemData['authors'] != undefined)
        stringBuilder.push(itemData['authors'] + " ");
    if(itemData['date'] != undefined)
        stringBuilder.push("(" + itemData['date'] + "). ");
    if(itemData['title'] != undefined)
        stringBuilder.push(itemData['title'] + ". ");
    if(itemData['url'] != undefined)
        stringBuilder.push("[online] ");
    if(itemData['place'] != undefined && itemData['publisher'] != undefined)
        stringBuilder.push(itemData['place'] + ": ");
    if(itemData['publisher'] != undefined && itemData['pages'] == undefined)
        stringBuilder.push(itemData['publisher'] + ". ");
    if(itemData['publisher'] != undefined && itemData['pages'] != undefined)
        stringBuilder.push(itemData['publisher'] + ", ");
    if(itemData['pages'] != undefined)
        stringBuilder.push("pp." + itemData['pages'] + ". ");
    if(itemData['url'] != undefined)
        stringBuilder.push("Available at: URL " + itemData['url'] + ". ");

    var ref = stringBuilder.join(''); 
    return ref;
}

function cite(key)
{
    var ref = "";
    var itemData = getItem(key);
    switch(itemData['type']) {
        case 'book':
            ref = citeBook(itemData)
            break;
        case 'bookSection':
            ref = citeBookSection(itemData)
            break;
        case 'journalArticle':
            ref = citeJournalArticle(itemData)
            break;
        case 'webpage':
            ref = citeWebsite(itemData)
            break;
        default:
            ref = citeDefault(itemData);
      }

    return ref;
}

function doExport() {
    var collection;
    while(collection = Zotero.nextCollection()) {
        var siteReferences = [];
        collection.descendents.forEach(descendent => {
            var ref = cite(descendent.key);
            siteReferences.push(ref);
        });

        var siteAddress = collection.fields.name.split(',');
        var address = siteAddress.slice(1, siteAddress.length).join(',');
        var site = {"site":siteAddress[0], "start":"", "end":"", "location":address, "description":"", "bibliography":siteReferences};
        sites.push(site);
    }

    Zotero.write(JSON.stringify(sites, null, 1));
}
