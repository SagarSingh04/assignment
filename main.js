var btn = document.getElementById("btn");
var ourData = {};
var finalData = {
    'most_active':{
        'attacker_king': '',
        'defender_king': '',
        'region': '',
        'name': ''
    },
    'attacker_outcome':{
        'win': '', // total win
        'loss': '' // total loss
    },
    'battle_type':[], // unique battle types
    'defender_size':{
        'average': '',
        'min': '',
        'max': ''
        }
}

btn.addEventListener("click", function(){
    var ourRequest = new XMLHttpRequest();
    
    ourRequest.open('GET','https://sagarsingh04.github.io/assignment/battles.json');
    ourRequest.onload = function(){
    ourData = JSON.parse(ourRequest.responseText);
    console.log(ourData);
    getData(ourData);
    }
    ourRequest.send();
   });

function getData(data){
    
    //For attacker_king
    var arr1= data.map((val, i, arr) => { return val.attacker_king; })
        .reduce((acc, curr) => {
         (typeof acc[curr] == 'undefined') ? acc[curr] = 1 : acc[curr] += 1; return acc;
         }, {});
    
    finalData.most_active.attacker_king = sortObject(arr1).pop().key;
    

    //For defender_king
    var defenderKing = data.map((val, i, arr) => { return val.defender_king })
        .reduce((acc, curr) => {
            (typeof acc[curr] == 'undefined') ? acc[curr] = 1 : acc[curr] += 1; return acc; 
        }, {});

    finalData.most_active.defender_king = sortObject(defenderKing).pop().key;

    //For region
    var region = data.map((val, i, arr) => { return val.region })
        .reduce((acc, curr) => {
            (typeof acc[curr] == 'undefined') ? acc[curr] = 1 : acc[curr] += 1; return acc; 
        }, {});

    finalData.most_active.region = sortObject(region).pop().key;

    //For name
    var name = data.map((val, i, arr) => { return val.name })
        .reduce((acc, curr) => {
            (typeof acc[curr] == 'undefined') ? acc[curr] = 1 : acc[curr] += 1; return acc; 
        }, {});
    
    finalData.most_active.name = sortObject(name).pop().key;

    //For win
    finalData.attacker_outcome.win = data.reduce((acc, curr) => { return curr.attacker_outcome == 'win' ? acc + 1 : acc;}, 0);

    //For loss
    finalData.attacker_outcome.loss = data.reduce((acc, curr) => { return curr.attacker_outcome == 'loss' ? acc + 1 : acc;}, 0);

    //For Battle type
    finalData.battle_type = [... new Set(data.map(x => x.battle_type))];
    

    //For Average
    finalData.defender_size.average = data.filter((a) => (a.defender_size !== null)).reduce((acc, curr) => {acc+=curr.defender_size ; return acc;},0)
    / data.filter((a) => (a.defender_size !== null)).reduce((acc, curr) => {acc += 1; return acc}, 0) ;

    //For Max
    finalData.defender_size.max = data.filter((a) => (a.defender_size !== null)).map((val, i, arr) => {return val.defender_size}).sort((a,b) => {return a - b}).pop();

    //For Min
    finalData.defender_size.min = data.filter((a) => (a.defender_size !== null)).map((val, i, arr) => {return val.defender_size}).sort((a,b) => {return b - a}).pop()
    console.log(finalData);
}

function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return a.value - b.value; });
    //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
    return arr; // returns array
}




