
var searchButton = document.getElementById("btn");
var finalData = {
    'name': '',
    'full_name': '',
    'private': '',
    'owner':{
        'login': '',
        'name': '',
        'followersCount': '',
        'followingCount': ''
    },
    'licenseName': '',
    'score': '',
    'numberOfBranch': ''
}

function myFunction() {
    var searchText = document.getElementById("txt").value;
    //console.log(searchText);
    // document.getElementById("para").innerHTML = searchText;
    // var ourRequest = new XMLHttpRequest();
    
    // ourRequest.open('GET','https://api.github.com/search/repositories?q=' + searchText);
    // ourRequest.onload = function(){
    // ourData = JSON.parse(ourRequest.responseText);
    // console.log(ourData);
    //getData(ourData);
    //}
    //ourRequest.send();
    fetch('https://api.github.com/search/repositories?q=' + searchText)
        .then(response => response.json())
        .then( response => {
            finalData.name = response.items[0].name;
            finalData.full_name = response.items[0].full_name;
            finalData.private = response.items[0].private;
            finalData.licenseName = response.items[0].license.name;
            finalData.score = response.items[0].score;
            //console.log(finalData);
            //console.log(response.items[0].branches_url.indexOf('{'));

            fetch(response.items[0].owner.url)
                .then(response => response.json())
                .then(response => {
                    finalData.owner.login = response.login;
                    finalData.owner.name = response.name;
                    finalData.owner.followersCount = response.followers;
                    finalData.owner.followingCount = response.following;
                    //console.log(finalData);
                })
                
            fetch(response.items[0].branches_url.substring(0, response.items[0].branches_url.indexOf("{")))
                .then(response => response.json())
                .then(response => {
                    finalData.numberOfBranch = response.length;
                    console.log(response);
                    console.log(finalData);
                })
            
        });
}