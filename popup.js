var btnSetOptions = document.getElementById('btnSetOptions');
var eles = document.getElementsByName('myduo');
btnSetOptions.addEventListener('click', setOptions);
tickRadio();

function setOptions() {
    for (i = 0; i < eles.length; i++) {
        if (eles[i].checked) {
            duoLang = eles[i].value;
            console.log(duoLang);
        }
    }

    chrome.storage.sync.set({
        "duoLang": duoLang
    }, function () {
        // Update status to let user know options were saved.
        console.log("Save data lang" + duoLang);
        let status = document.getElementById('status');
        status.textContent = 'Options ' + duoLang + ' saved. Press Up and Down to activate!';


        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function tickRadio() {

    if (!chrome.storage) {
        duoLang = "en-US";
        return;
    }
    chrome.storage.sync.get("duoLang", function (obj) {
        if (!obj) return;
        lang = obj.duoLang;
        // tick radio
        for (i = 0; i < eles.length; i++) {
            if (eles[i].value == lang) {
                eles[i].checked = true;
            }
        }
    });

}