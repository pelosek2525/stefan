

const zdroje = document.querySelector('.zdroje');
const potrvrditBtn = document.querySelector("#potvrdit");
const body = document.querySelector("body");
let pocetZdroju = 0;
let zdrojaky = Array();

var agent = navigator.userAgent;
/*(function() {
   var cors_api_host = 'cors-anywhere.herokuapp.com';
    /var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();
*/
if(!agent.includes("Mozilla"))
{
    console.log("Používáš mozilu");
}
else {
    body.addEventListener('click', event => {
        
         if(event.target.className == "zdroj"){
            
            navigator.clipboard.readText()
            .then(text => {
                if(validateUrl(text)){
                    event.target.value = text;
                 }
            }).catch(err =>{
               console.log(err);
            }
           
            
     
         }
});
}
function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  };

function NovyZdroj(){
    pocetZdroju++;
    let novy = document.createElement('input');
    novy.type="url";
    novy.setAttribute.name = "adf";
    novy.className = `zdroj`;
   novy.placeholder = `Zdroj ${pocetZdroju}`;
   novy.name = `zdroj${pocetZdroju}`;
   
    if(pocetZdroju ==1)
    novy.value = "http://www.prvky.com/14.html";
   
   zdroje.appendChild(novy);


};
potrvrditBtn.addEventListener('click',(e) => {

    e.preventDefault();
    var audio = new Audio('smoke.mp3');
    audio.volume = 0.05;
        
    let kokot = $("ul").children("input");
    let pole = kokot.toArray();
    $.ajax({                                      
        url: 'https://calm-badlands-55983.herokuapp.com/zdroje.php',       
        type: "GET",
        data: pole, 
        beforeSend: function() {
            $("#loading-image").show();
            $("#stefan").hide();
         },
    }).done(function( msg ) {
        //console.log(msg);
        $("#loading-image").hide();
        $("#stefan").attr("src","stefanwin.png");
        $("#stefan").show(1000);
        audio.play();
        $("body,html").css("background-image", 'url(weed.jpg)');
        $("#results").css("display", 'block');
        $(".showresults").html(msg);

        
    });


});

