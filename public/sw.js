// 这是一个简单的 Service Worker
self.addEventListener('install', () => {
  console.log('Service Worker 已安装');
});

self.addEventListener('activate', () => {
  console.log('Service Worker 已激活');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return new Response('离线模式不可用');
      })
  );
});