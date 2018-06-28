"use strict";

var ScholarItem = function(text) {
	if (text) {
		var obj = JSON.parse(text);
        this.md5 = obj.md5;
		this.title = obj.title;
        this.keywords = obj.keywords;
        this.abstract = obj.abstract;
		this.authors = obj.authors;
        this.publish = obj.publish;
        this.date = obj.date;
        this.link = obj.link;
        this.uploader = obj.uploader;
	} else {
	    this.title = "";
        this.keywords = [];
        this.abstract = "";
        this.authors = [];
        this.publish = "";
        this.date = "";
        this.link = "";
        this.uploader = "";
	}
};

ScholarItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var NebularsScholar = function () {
    LocalContractStorage.defineMapProperty(this, "libs", {
        parse: function (text) {
            return new ScholarItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

NebularsScholar.prototype = {
    init: function () {
        // todo
    },

    upload: function (md5, title, keywords, abstract, authors, publish, date, link) {
        title = title.trim();
        abstract = abstract.trim();
        keywords = keywords.trim().split(';');
        authors = authors.trim().split(";");
        publish = publish.trim();
        date = date.trim();
        link = link.trim();
        if (title === ""){
            throw new Error("empty title");
        }

        var from = Blockchain.transaction.from;

        var scholarItem = new ScholarItem();
        scholarItem.md5 = md5;
        scholarItem.authors = authors;
        scholarItem.title = title;
        scholarItem.abstract = abstract;
        scholarItem.keywords = keywords;
        scholarItem.publish = publish;
        scholarItem.date = date;
        scholarItem.link = link;
        scholarItem.uploader = from;

        this.libs.put(md5, scholarItem);
    },

    get: function (md5) {
        return this.libs.get(md5);
    }

    getAll: function () {

    }
};
module.exports = NebularsScholar;