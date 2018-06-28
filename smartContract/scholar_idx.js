"use strict";

var ScholarIdxItem = function(text) {
	if (text) {
		var obj = JSON.parse(text);
        this.key = obj.key;
		this.value = obj.value;
	} else {
	    this.key = "";
        this.value = [];
	}
};

ScholarIdxItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var ScholarIdx = function () {
    LocalContractStorage.defineMapProperty(this, "indices", {
        parse: function (text) {
            return new ScholarIdxItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

ScholarIdx.prototype = {
    init: function () {
        // todo
    },

    put: function (keys, value) {
        if (keys.length === 0){
            throw new Error("empty keys");
        }
        var scholarIdxItem;
        for(var i = 0; i < keys.length; i++) {
            scholarIdxItem = this.indices.get(keys[i]);
            if(scholarIdxItem) {
                scholarIdxItem.value.push(value);
            }
            else {
                scholarIdxItem = new ScholarIdxItem();
                scholarIdxItem.key = keys[i];
                scholarIdxItem.value.push(value);
            }
            this.indices.put(keys[i], scholarIdxItem);
        }

        var from = Blockchain.transaction.from;
        scholarIdxItem = this.indices.get(from);
        if(scholarIdxItem) {
            scholarIdxItem.value.push(value);
        }
        else {
            scholarIdxItem = new ScholarIdxItem();
            scholarIdxItem.key = from;
            scholarIdxItem.value.push(value);
        }
        this.indices.put(from, scholarIdxItem);
    },

    get: function (keys) {
        var results = [];
        for(var i = 0; i < keys.length; i++) {
            var idx = this.indices.get(keys[i]);
            results.push(...idx);
        }
        return [...new Set(results)];
    }
};
module.exports = ScholarIdx;