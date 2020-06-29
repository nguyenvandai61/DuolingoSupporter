var duoTextArea, _KBdom, _UWBdom, _Checkdom, _Continuedom, _Skipdom;
var duoLang;

try {
    if (duoLang == undefined) duoLang = "en-us";
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    if (chrome.storage.sync) {
        chrome.storage.sync.get("duoLang", function (obj) {
            if (!obj) return;
            console.log(obj);
            duoLang = obj.duoLang;
            recognition.lang = duoLang;
        });
    }
    
    recognition.lang = duoLang;
    console.log(recognition.lang);
}
catch (e) {
    console.error(e);
}


recognition.onstart = function () {
    
}

recognition.onspeechend = function () {
    recognition.stop();
    
    setTimeout(() => {
        recognition.start();
    }, 1000)
}

recognition.onerror = function (event) {
    if (event.error == 'no-speech') {
        recognition.stop();
        setTimeout(() => {
            recognition.start();
        }, 1000)
    };
}


document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp")        
        recognition.stop();
    else if (e.code === "ArrowDown")
    {
        if (chrome.storage.sync) {
            chrome.storage.sync.get("duoLang", function (obj) {
                if (!obj) return;
                console.log(obj);
                duoLang = obj.duoLang;
                recognition.lang = duoLang;
            });
        }
        recognition.start();
    }    

})

recognition.onresult = function (event) {
    duoTextArea = document.querySelector("#root > div > div > div > div > div._14_MG > div > div > div > div > div > div._1nhsa._2UxoD > div > textarea")
    if (duoTextArea == undefined) return;
    _UWBdom = document.querySelector("#root > div > div > div > div > div._1obm2 > div > div > div._3Bx93 > button > div > div._1vitk._1BWZU");
    _KBdom = document.querySelector("#root > div > div > div > div > div._1obm2 > div > div > div._3Bx93 > button > div > div._1vitk._1BWZU");
    _Checkdom = document.querySelector("#root > div > div > div > div > div._1obm2 > div > div > div._2MC5U > button");
    _Continuedom = document.querySelector("#root > div > div > div > div > div._1obm2 > div > div > div._2MC5U > button")
    _Skipdom = document.querySelector("#root > div > div > div > div > div._1obm2 > div > div > div._2G_Xe > button");
    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex;
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;

    console.log(transcript);
    process(transcript);
}




const process = function (transcript) {
    if (!transcript) return;
    switch (transcript) {
        case "shut down":
            recognition.stop();
            return;
        case "Bank":
            useWordBank();
            recognition.stop();
            break;
        case "Keyboard":
        case "keyboard":
            useKeyboard();
            break;
        case "check":
            checkAnswer();
            break;
        case "continue":
            continueQuestion();
            break;
        case "skip":
            skipQuestion();
            break;
        default:
            setKeywordText(transcript);
    }
}

const useWordBank = () => {
    if (_UWBdom)
        _UWBdom.click(); // Change to fill pick wordbank;
}

const useKeyboard = () => {
    if (_KBdom)
        _KBdom.click(); // Change to fill textarea
}

const checkAnswer = () => {
    if (_Checkdom)
        _Checkdom.click();
}

const continueQuestion = () => {
    if (_Continuedom)
        _Continuedom.click();
}

const skipQuestion = () => {
    if (_Skipdom)
        _Skipdom.click();
}
function setKeywordText(text) {
    duoTextArea.value = text;
    var evtduoTextArea = document.createEvent("Events");
    evtduoTextArea.initEvent("change", true, true);
    duoTextArea.dispatchEvent(evtduoTextArea);
}




