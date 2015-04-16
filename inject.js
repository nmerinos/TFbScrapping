var db = [];
var myInfinity = 10000000000;

function getUsers () {
	var user;
        if (document.URL.substring(0,32) == "https://www.facebook.com/hashtag")
        { 
          user = document.evaluate("//span[@class='fwb fcg']/a", document, null, XPathResult.ANY_TYPE, null); 
        }
        else if (document.URL.substring(0,26) == "https://twitter.com/search")
        {
          user = document.evaluate("//span[@class='username js-action-profile-name']/b", document, null, XPathResult.ANY_TYPE, null);
        }
	var iterator = user.iterateNext();

	var users = [];

	while(iterator) {
		users.push(iterator.textContent);
		iterator = user.iterateNext();
	}

	return users;
}


function getTfbs() {
	var tfb = document.evaluate("//p[@class='js-tweet-text tweet-text']", document, null, XPathResult.ANY_TYPE, null);

	var tfb;
        if (document.URL.substring(0,32) == "https://www.facebook.com/hashtag")
        { 
          tfb = document.evaluate("//div[@class='_5pbx userContent']", document, null, XPathResult.ANY_TYPE, null); 
        }
        else if (document.URL.substring(0,26) == "https://twitter.com/search")
        {
          tfb = document.evaluate("//p[@class='js-tweet-text tweet-text']", document, null, XPathResult.ANY_TYPE, null);
        }

	var iterator = tfb.iterateNext();

	var tfbs = [];

	while (iterator) {
		tfbs.push(iterator.textContent);
		iterator = tfb.iterateNext();
	}

	return tfbs;
}


function tfbsCounter() {
	var tfbs = getTfbs();
	var tfbsLength = tfbs.length;

	return tfbsLength;
}


function startScraping(tfbsAmount) {
	var tfbs = getTfbs();
	var users = getUsers();

	var tfbsLength = tfbs.length;

	for(var i = 0; i <= tfbsAmount - 1; i++) {
		var item = {"User": users[i], "Mensaje": tfbs[i]};
		db.push(item);
	};

	var json_text = JSON.stringify(db, null, 2);
	console.log(json_text);
}


function scrollBottom(tfbsAmount) {
	setTimeout(function timeOut() {
		var tfbsLength = tfbsCounter();
		document.body.scrollTop = myInfinity;
		
		if (tfbsLength < tfbsAmount) {
			scrollBottom(tfbsAmount);
		}
		else {
			startScraping(tfbsAmount);		
		}

	}, 100);
}


scrollBottom(10);
