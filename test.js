const { isEmpty, isArray } = require('lodash');

//ex:
let rules = {
    "nachType": ["emandate", "enach"],
    "loanVendor": ["avanse", "iifl"],
    "isSoftDeleted": "yes"
};

//which one passing from front end 
let nachIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const keys = Object.keys(rules);
let filterQuery = {"nachId": {
    "$in": nachIds
}};

keys.forEach((key, index) => {

    let isArrayTest = isArray(rules[key]);

    if (isArrayTest) {
        filterQuery[key] = { "$in": rules[key] }
    }
    else {
        filterQuery[key] = rules[key]
    }

});

console.log(JSON.stringify(filterQuery));

//Filter query needs to pass in the while query in db
/*
filterQuery = {
    "nachId": {
        "$in": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
        ]
    },
    "nachType": {
        "$in": [
            "emandate",
            "enach"
        ]
    },
    "loanVendor": {
        "$in": [
            "avanse",
            "iifl"
        ]
    },
    "isSoftDeleted": "yes"
}
*/

let records = await NachTransaction.find(filterQuery).lean() || {};
let validNachIds = [];
let invalidNachIds = [];

let validNachIds = records.map((ele) => validNachIds.push(ele.nachId)) || [];

const invalidNachIds = nachIds.filter(function(obj) { 
    return validNachIds.indexOf(obj) == -1; 
});

Send to response: validNachIds, invalidNachIds;





