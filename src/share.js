import getUrls from 'get-urls';
import M from 'materialize-css';
import linkifyUrls from 'linkify-urls';
let { search } = new URL(window.location);
let params = new URLSearchParams(search);
let share = {
    title: params.get('title'),
    text: params.get('text'),
    url: params.get('url')
}
processShare(share)

function processShare(share) {
    if (share.text) {
        let urls = getUrls(share.text)
        if (share.url) {
            urls.add(share.url)
        }
        console.log(urls.values())

        if (urls.size === 1 && localStorage.getItem('openSettings') == "1") {
            window.location = urls.entries().next().value[0]
            document.getElementById('redirecting').classList.remove("hidden");
        } else if (urls.size > 1 && localStorage.getItem('openSettings') == "2") {
            window.location = urls.entries().next().value[0]
            document.getElementById('redirecting').classList.remove("hidden");
        } else if (urls.size > 0 && localStorage.getItem('openSettings') == "0" && localStorage.getItem("helpShown") != "1") {
            var elems = document.querySelectorAll('.tap-target');
            var instances = M.TapTarget.init(elems, {
                onClose: function () {
                    localStorage.setItem('helpShown', '1')
                }
            });
            for (let i of instances) {
                i.open();
            }
        }
    } else if (share.url && (localStorage.getItem('openSettings') == "1" || localStorage.getItem('openSettings') == "2")) {
        window.location = share.url;
        document.getElementById('redirecting').classList.remove("hidden");
    }
    let element = document.getElementById('main');
    if (share.title) {
        let title = document.createElement('h2')
        title.classList.add("center")
        title.textContent = share.title
        element.appendChild(title);
    }
    if (share.url) {
        let url = document.createElement('h3')
        let urlLink = document.createElement('a');
        urlLink.textContent = share.url;
        urlLink.href = share.url;
        url.appendChild(urlLink)
        element.appendChild(url)
    }
    if (share.text) {
    let text = document.createElement('h5')
    text.appendChild(linkifyUrls(share.text, {
        type: 'dom'
    }))
    element.appendChild(text);
    }
}