firebase.initializeApp({
    authDomain: 'favst-dojo.firebaseapp.com',
    databaseURL: 'https://favst-dojo.firebaseio.com'
});

// カラの記事リストを作成
var ganreArr = [];
var titleArticle = {'all':[], 'entertainment':[], 'IT':[], 'fashion':[], 'gourmet':[], 'news':[], 'sports':[], 'hobby':[]}
var voiceArticle = {'all':[], 'entertainment':[], 'IT':[], 'fashion':[], 'gourmet':[], 'news':[], 'sports':[], 'hobby':[]}
var linkArticle = {'all':[], 'entertainment':[], 'IT':[], 'fashion':[], 'gourmet':[], 'news':[], 'sports':[], 'hobby':[]}

// データベースとストレージの変数を宣言
var db = firebase.database();
var storage = firebase.storage();

console.log('Genres');
db.ref('/voices').once('value', function(snapshot) {
    console.log(snapshot.val);
    console.log('=====================================================================');
});

// 記事リストに'title', 'linkURL', 'voiceURL'をそれぞれ入れる
db.ref('/voices').once('value', function(snapshot) {
    var ganreArr = snapshot.val();
    get_list = Object.keys(ganreArr);
    get_list.forEach(function (x) {
        var obj = ganreArr[x];
        Object.keys(obj).forEach(function(id) {
            var val = obj[id];
            storage.refFromURL(val.voiceURL).getDownloadURL().then(function(voiceURL) {
                console.log('ID:', id);
                console.log('Title:', val.title);
                console.log('LinkURL:', val.linkURL);
                console.log('VoiceURL:', voiceURL);
                console.log('=====================================================================');
                titleArticle[x].push(val.title);
                voiceArticle[x].push(voiceURL);
                linkArticle[x].push(val.linkURL);
            });
        });
    });
});




// 音声再生用に色々宣言。
var choose_genre;
var choose_url = [];
var choose_title = [];
var choose_voice = [];
var audio = new Audio();

var num = 0;


//clickした時のアクション。
$(document).ready(function(){
    $('.category tr td').on('click', function(){
        choose_genre = $(this).attr("id");
        $("#genre").text(choose_genre);
        $("#title").text(title_hash[choose_genre][num]);
        audio.src = voice_hash[choose_genre][num];
        $('#listener').show();
    });
});

var audio = new Audio();
audio.src = "audio/sample.wav";

//function onNextClick(){};

//function onBackClick(){};

function onPlayClick(){
  var img = document.getElementById("play");
  var imgPath = img.getAttribute("src");
  if(imgPath == "image/Start.jpg"){
    document.getElementById("play").src = "image/stop.png";
    audio.play();
    imgPath = img.getAttribute("src");
  }else if(imgPath == "image/stop.png"){
    document.getElementById("play").src = "image/Start.jpg";
    audio.pause();
    imgPath = img.getAttribute("src");
  }
};
