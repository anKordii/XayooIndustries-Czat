var jsonXD = '';
var scrollStatus = 1;
var loaded = 0;
var urlParams = parseURLParams(window.location.href);
var badgesList = {};
//var ffzEmote = {};
//var bttvEmoteG = {};
var a = ["PogChamp", "VisLaud", "BibleThump", "tf", "ResidentSleeper", "AYAYA"];

$.getJSON( `https://raw.githubusercontent.com/anKordii/XayooIndustries-Czat/main/assets/emotes/badgesttv.json`, function( data ) {
    badgesList = data
});
/*$.getJSON( `https://api.betterttv.net/3/cached/frankerfacez/emotes/global`, function( data ) {
    ffzEmote = data
});
$.getJSON( `https://api.betterttv.net/3/cached/emotes/global`, function( data ) {
    bttvEmoteG = data
});*/


$("body").append(`<div class="container"><div class="gierczak" id="heheszki"><div class="title"><h1>Zapis Czatu - ID: <b style="color:#277df9;">${urlParams.chat}</b></h1></div><div class="m-2" id="put-chat"></div></div></div>`)
$("body").append(`<span onclick="scrollChatStatus(0)" id="buttonScroll" title="Kliknij aby wyłączyć">Auto Scroll 🖱️ <b style="color:lime;">ON</b></span>`)

if(urlParams.chat >= '860069762'){
    if(!urlParams.full){
        $.getJSON( `https://ankordii.github.io/XayooIndustries-Czat/${urlParams.chat}.json`, function( data ) {
            let msg = document.querySelector("#put-chat")
          
            let display = ([x, ...rest]) => {
              if (!x) return
              setTimeout(_ => {
                msg.innerHTML += `<p>
                <span class="timestamp">${x.time}</span>
                ${badges(x.user_badges)}
                <b><span style="color: ${checkvalidcolor(x.color)}">${x.nickname}</span></b>:
                <span>${emotes(x.message)}</span></p>`
                display(rest)
                scrollChat()
              }, 1000)
            }
            
            display(data.messages)
        });
    }else if(urlParams.full){
        $.getJSON( `https://ankordii.github.io/XayooIndustries-Czat/${urlParams.chat}.json`, function( data ) {
            let msg = document.querySelector("#put-chat")
            $("h1").append(`<br/> <b class="gardient"><b id="loadedDiv">-</b>/${data.messages.length} wiadomości</b>`)
    
            let display = ([x, ...rest]) => {
              if (!x) return
              setTimeout(_ => {
                loaded++
                msg.innerHTML += `<p>
                <span class="timestamp">${x.time}</span>
                ${badges(x.user_badges)}
                <b><span style="color: ${checkvalidcolor(x.color)}">${x.nickname}</span></b>:
                <span>${emotes(x.message)}</span></p>`
                display(rest)
                scrollChat()
              }, 1)
            }
            
            display(data.messages)
        });
    
        setInterval(() => {
            $("#loadedDiv").text(loaded);
        }, 3 * 1000);
    }
}else{
    if(!urlParams.full){
        $.getJSON( `https://ankordii.github.io/XayooIndustries-Czat/${urlParams.chat}.json`, function( data ) {
            let msg = document.querySelector("#put-chat")
          
            let display = ([x, ...rest]) => {
              if (!x) return
              setTimeout(_ => {
                msg.innerHTML += `<p>
                <span class="timestamp">${x.time}</span>
                <b><span style="color: ${checkvalidcolor(x.color)}">${x.nickname}</span></b>:
                <span>${emotes(x.message)}</span></p>`
                display(rest)
                scrollChat()
              }, 1000)
            }
            
            display(data.messages)
        });
    }else if(urlParams.full){
        $.getJSON( `https://ankordii.github.io/XayooIndustries-Czat/${urlParams.chat}.json`, function( data ) {
            let msg = document.querySelector("#put-chat")
            $("h1").append(`<br/> <b class="gardient"><b id="loadedDiv">-</b>/${data.messages.length} wiadomości</b>`)
    
            let display = ([x, ...rest]) => {
              if (!x) return
              setTimeout(_ => {
                loaded++
                msg.innerHTML += `<p>
                <span class="timestamp">${x.time}</span>
                <b><span style="color: ${checkvalidcolor(x.color)}">${x.nickname}</span></b>:
                <span>${emotes(x.message)}</span></p>`
                display(rest)
                scrollChat()
              }, 1)
            }
            
            display(data.messages)
        });
    
        setInterval(() => {
            $("#loadedDiv").text(loaded);
        }, 3 * 1000);
    }
}
function checkvalidcolor(data){
    const months = ["#00ff7f", "#8a2be2", "#1e90ff", "#ff69b4", "#5f9ea0", "#d2691e", "#daa520", "#2e8b57", "#ff4500", "#9acd32", "#ff7f50", "#b22222", "#008000", "#0000ff", "#f00", "#fff"];
    const random = Math.floor(Math.random() * months.length);

    if(data === 'undefined'){
        return months[random];
    }else{
        return data;
    }
}
function scrollChat(){
    if(scrollStatus === 1){
        var elem = document.getElementById('heheszki');
        elem.scrollTop = elem.scrollHeight;
    }
}
function badges(name){
    return name.map((item, i) => badgesImg(item.badge));
}
function badgesImg(XDname){
    if(XDname === 'brak'){
        
    }else{
        return `<img src="${badgesList.badge_sets[XDname].versions[1].image_url}">`;
    }

}
function scrollChatStatus(a){
    if(a === 1){
        scrollStatus = 1;
        console.warn('Włączono automatyczne przesuwanie');
        $( "#buttonScroll" ).remove();
        $("body").append(`<span onclick="scrollChatStatus(0)" id="buttonScroll" title="Kliknij aby włączyć">Auto Scroll 🖱️ <b style="color:lime;">ON</b></span>`);
    }else if(a === 0){
        scrollStatus = 0;
        console.warn('Wyłączono automatyczne przesuwanie');
        $( "#buttonScroll" ).remove();
        $("body").append(`<span onclick="scrollChatStatus(1)" id="buttonScroll" title="Kliknij aby włączyć">Auto Scroll 🖱️ <b style="color:red;">OFF</b></span>`);
    }
}
/*function emotesXD(str){
    for (var i = 0; i < a.length; i++) {

    }
    //return str;
}*/
function httpRequest(str){
    const Http = new XMLHttpRequest();
    const url=`https://www.twitchmetrics.net/e/${str}`;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        return Http.responseText;
    }
}
function emotes(str) {
    for (var i = 0; i < a.length; i++) {
        str = str.replace(new RegExp(a[i] + '( |$)', 'g'), `<img src="https://raw.githubusercontent.com/anKordii/XayooIndustries-Czat/main/assets/emotes/${a[i]}/1.png" alt="${a[i]}" />`);
        
    }
    return str;
}
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}