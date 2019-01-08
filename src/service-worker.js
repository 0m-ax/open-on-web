const buildID = 'BUILD_ID';
const cacheID = 'cache-' + buildID;
self.addEventListener('activate', event => {
    console.log("activate "+buildID);
    event.waitUntil((async () => {
        let keys = await caches.keys();
        console.log(keys)
        for (let key of keys) {
            if (key !== cacheID) {
                console.log("deleteing cache "+key);
                await caches.delete(key);
            }
        }
    })());
});
self.addEventListener('install', event => event.waitUntil(
    (async () => {
        console.log("installing "+buildID);
        let cache = await caches.open(cacheID);
        let resp = await fetch('cache.json');
        let files = await resp.json();
        console.log('adding files',files)
        return await cache.addAll(files);
    })()
));
self.addEventListener('fetch', event => event.respondWith(
    (async ()=>{
        console.log(event)
        let url = event.request.url;
        if(url.endsWith('/')){
            url+='index.html';
        }
        //for privacy reasons we remove the search params (share text etc) so they are not sent to the server
        let parsedUrl = new URL(url);
        parsedUrl.search = "";
        url = parsedUrl.toString()
        event.request.url=url;
        return Promise.race([
            fetch(event.request).catch(()=>{
                return caches.match(url,{ignoreSearch:true});
            }),
            caches.match(url,{ignoreSearch:true}).catch(()=>{
                return fetch(event.request);
            }),
        ])
    })()
));