const e="32948800-94d9-4115-a6d7-7014ef43c6f3",t="cache-"+e;self.addEventListener("activate",a=>{console.log("activate "+e),a.waitUntil((async()=>{let e=await caches.keys();console.log(e);for(let a of e)a!==t&&(console.log("deleteing cache "+a),await caches.delete(a))})())}),self.addEventListener("install",a=>a.waitUntil((async()=>{console.log("installing "+e);let a=await caches.open(t),c=await fetch("cache.json"),n=await c.json();return console.log("adding files",n),await a.addAll(n)})())),self.addEventListener("fetch",e=>e.respondWith((async()=>{console.log(e);let t=e.request.url;t.endsWith("/")&&(t+="index.html");let a=new URL(t);return a.search="",t=a.toString(),e.request.url=t,Promise.race([fetch(e.request).catch(()=>caches.match(t,{ignoreSearch:!0})),caches.match(t,{ignoreSearch:!0}).catch(()=>fetch(e.request))])})()));
