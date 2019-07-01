var finalData = [];
var request2Url = [];

const request1 = async (text) => {
    //console.log(text);
    const response1 = await fetch('https://api.github.com/search/repositories?q=' + text);
    const json1 = await response1.json();
    //console.log(json1);
    var data = json1.items.filter((a) => (a.name == text));
    //console.log(data);
    return data;
}

const request2 =async (text, data) =>{
    //console.log(data);
    var ownerUrl = data.filter((d) => (d.name == text)).map((val, i, arr) => { return val.owner.url});
    console.log(ownerUrl);
    var ownerData = Promise.all(ownerUrl.map(async(url) => 
    await fetch(url).then(js => js.json())));
    return ownerData;
}

const request3 = async (text, data) => {
    var branchUrl = data.filter((d) => d.name == text).map(val => { return val.branches_url.substring(0, val.branches_url.indexOf("{")) });
    console.log(branchUrl);
    var branchData = Promise.all(branchUrl.map(async(url) => 
    await fetch(url).then(js => js.json()))); 
    return branchData;
}

async function myFunction(){
    var searchText = document.getElementById("txt").value;
    
    var result = await request1(searchText);
    //console.log(result);
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

    //console.log(finalData);

    // var result2 = await request2(searchText, result);
    // result2.forEach((val, index) => {
    //     finalData[index].owner.login = val.login;
    //     finalData[index].owner.name = val.name;
    //     finalData[index].owner.followersCount = val.followers;
    //     finalData[index].owner.followingCount = val.following;
    // })
    // //console.log(result2);
    // console.log(finalData);

    // var result3 = await request3(searchText, result);
    // console.log(typeof result3);
    // console.log(result3);
    // Array.prototype.forEach.call((result3), (res, index) => {
    //     finalData[index].numberOfBranch = res.length
    // });
    
    Promise.all([request2(searchText, result), request3(searchText, result)]).then(data => {
        console.log(data);
        data[0].forEach((val, index) => {
                finalData[index].owner.login = val.login;
                finalData[index].owner.name = val.name;
                finalData[index].owner.followersCount = val.followers;
                finalData[index].owner.followingCount = val.following;
                //console.log(finalData);
            });

        Array.prototype.forEach.call((data[1]), (res, index) =>{
            finalData[index].numberOfBranch = res.length;
        })
        console.log(finalData);
    })
}