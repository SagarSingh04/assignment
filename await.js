var finalData = [];
var request2Url = [];

const request1 = async (text) => {
    console.log(text);
    const response1 = await fetch('https://api.github.com/search/repositories?q=' + text);
    const json1 = await response1.json();
    //console.log(json1);
    var data = json1.items.filter((a) => (a.name == text));
    //console.log(data);
    return data;
}

const request2 = async (data) =>{
    
}

async function myFunction(){
    var searchText = document.getElementById("txt").value;
    
    var result = await request1(searchText);
    console.log(result);
    result.forEach(res => {
        finalData.push({
            'name': res.name,
            'full-name': res.full_name,
            'private': res.private,
            'owner':{
                'login': '',
                'name': '',
                'followersCount': '',
                'followingCount': ''
            },
            'licenseName': res.license == null ? '' : res.license.name,
            'score': res.score,
            'numberOfBranch': ''
        })
    });

    console.log(finalData);

    var result2 = await request2(data);
}