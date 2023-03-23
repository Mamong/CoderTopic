// ==UserScript==
// @name         CoderTopic
// @namespace    http://tampermonkey.net/
// @version      0.1
// @require      https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.js
// @description  parse and show IT interview questions!
// @author       Marco
// @match        http://api.codertopic.com/itapi/questionsapi/*
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var string = unsafeWindow.document.getElementsByTagName("body")[0].textContent;
    var reg = new RegExp("\r\n", "g");//g,表示全部替换

    var json = JSON.parse(string);
    var html = "<style>body{padding:40px} .item,.nav{margin:20px} .nav a{margin-right:20px} .item .question{font-weight:700} .item .answer{margin-top: 10px;}</style>";
    html += "<div class='nav'>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=10'>OC</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=11'>Java</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=12'>C/C++</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=13'>PHP</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=14'>JS</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=19'>Swift</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=16'>SQL</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=17'>C#</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=18'>HTML5</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=15'>Python</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=20'>Ruby</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=22'>Linux</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=25'>Scala</a>"+
    "<a href='/itapi/questionsapi/questions.php?typeID=26'>Kotlin</a>"+
    "</div>";
    for(var i=0,length= json.result.length; i<length;i++ ){
        var item = json.result[i];
        item.question = desEncrypt(item.question).replace(reg, "<br/>");
        item.answer = desEncrypt(item.answer).replace(reg, "<br/>");
        html += "<div class='item'><div class='question'>"+ (i+1) + "."+item.question +"</div><div class='answer'>"+ item.answer +"</div></div>";
    }

    var jsonString = JSON.stringify(json);
    unsafeWindow.document.write(html);
    //document.write(jsonString);
    //document.getElementsByTagName("body").innerHtml=jsonString;

    function desEncrypt(msg){
        var key = CryptoJS.enc.Utf8.parse('0102030405060708');
        var iv = key;

        var cipherText = msg;

        var base64deString = CryptoJS.enc.Base64.parse(cipherText);

        var decrypted = decrypt(base64deString, key, iv);

        return decrypted.toString(CryptoJS.enc.Utf8);
    }


    function encrypt (msg, key, iv) {
        return  CryptoJS.AES.encrypt(msg,  key, {
            iv: iv,
            padding: CryptoJS.pad.NoPadding,
            mode: CryptoJS.mode.CBC
        });
    }


    function decrypt (cipherText, key, iv) {
        return  CryptoJS.AES.decrypt({ ciphertext: cipherText }, key, {
            iv: iv,
            padding: CryptoJS.pad.NoPadding,
            mode: CryptoJS.mode.CBC
        });
    }
})();
