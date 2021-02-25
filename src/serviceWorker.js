
// const staticCacheName = 'site-static-v1';
// const dynamicCacheName = 'site-dynamic-v1';
// const assets = [
//   '/',
//   '/index.html',
//   '/offline.html',
//   '/assets/add1.svg',
//   '/assets/edit.svg',
//   '/assets/home1.webp',
//   '/assets/home2.webp',
//   '/assets/home3.webp',
//   '/assets/home4.webp',
//   '/assets/homecardbg.webp',
//   '/assets/lawlogo64.jpg',
//   '/assets/lawlogo192.jpg',
//   '/assets/lawlogo512.jpg',
//   '/assets/lawyersignup.svg',
//   '/assets/loginlawyer.svg',
//   '/assets/userlogin.svg',
//   '/assets/usersignup.svg',

//   '/assets/shortcuts/loginlawyer192.png',
//   '/assets/shortcuts/loginlawyer96.png',
//   '/assets/shortcuts/userlogin192.png',
//   '/assets/shortcuts/userlogin96.png'

// ];

// // cache size limit function
// const limitCacheSize = (name, size) => {
//   caches.open(name).then(cache => {
//     cache.keys().then(keys => {
//       if(keys.length > size){
//         cache.delete(keys[0]).then(limitCacheSize(name, size));
//       }
//     });
//   });
// };

// // install event
// self.addEventListener('install', evt => {
//   //console.log('service worker installed');
//   evt.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       console.log('caching shell assets');
//       cache.addAll(assets);
//     })
//   );
// });

// // activate event
// self.addEventListener('activate', evt => {
//   //console.log('service worker activated');
//   evt.waitUntil(
//     caches.keys().then(keys => {
//       //console.log(keys);
//       return Promise.all(keys
//         .filter(key => key !== staticCacheName && key !== dynamicCacheName)
//         .map(key => caches.delete(key))
//       );
//     })
//   );
// });

// // fetch events
// self.addEventListener('fetch', evt => {
//   if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
//     evt.respondWith(
//       caches.match(evt.request).then(cacheRes => {
//         return cacheRes || fetch(evt.request).then(fetchRes => {
//           return caches.open(dynamicCacheName).then(cache => {
//             cache.put(evt.request.url, fetchRes.clone());
//             // check cached items size
//             limitCacheSize(dynamicCacheName, 15);
//             return fetchRes;
//           })
//         });
//       }).catch(() => {
//         if(evt.request.url.indexOf('.html') > -1){
//           return caches.match('/pages/fallback.html');
//         } 
//       })
//     );
//   }
// });