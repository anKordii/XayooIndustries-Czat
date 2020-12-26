var jsonXD = '';
var scrollStatus = 1;
var urlParams = parseURLParams(window.location.href);
var a = ["PogChamp", "VisLaud", "BibleThump", "tf", "ResidentSleeper", "AYAYA", "B"];


$("body").append(`<div class="container"><div class="gierczak" id="heheszki"><div class="title"><h1>Zapis Czatu - ID: <b style="color:#277df9;">${urlParams.chat}</b></h1></div><div class="m-2" id="put-chat"></div></div></div>`)
$("body").append(`<span onclick="scrollChatStatus(0)" id="buttonScroll" title="Kliknij aby wyłączyć">Auto Scroll 🖱️ <b style="color:lime;">ON</b></span>`)
//$(".dis").append(`<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${urlParams.youtube}?controls=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)

if(!urlParams.full){
    $.getJSON( `https://ankordii.github.io/XayooIndustries-Czat/${urlParams.chat}.json`, function( data ) {
        let msg = document.querySelector("#put-chat")
      
        let display = ([x, ...rest]) => {
          if (!x) return
          setTimeout(_ => {
            msg.innerHTML += `<p>
            <span class="timestamp">${x.time}</span>
            <b><span style="color: ${x.color}">${x.nickname}</span></b>:
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
        $("h1").append(`<br/> <b class="gardient">${data.messages.length} wiadomości</b>`)

        let display = ([x, ...rest]) => {
          if (!x) return
          setTimeout(_ => {
            msg.innerHTML += `<p>
            <span class="timestamp">${x.time}</span>
            <b><span style="color: ${x.color}">${x.nickname}</span></b>:
            <span>${emotes(x.message)}</span></p>`
            display(rest)
            scrollChat()
          }, 1)
        }
        
        display(data.messages)
    });
}

function scrollChat(){
    if(scrollStatus === 1){
        var elem = document.getElementById('heheszki');
        elem.scrollTop = elem.scrollHeight;
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