/**
 * 图片懒加载初始化脚本
 *
 * 支持 MkDocs Material instant navigation（SPA 式页面切换）：
 * - 初始页面加载 (DOMContentLoaded) → 处理已有图片
 * - MutationObserver 监听内容容器 → 即时导航注入新图片后自动处理
 *
 * 构建期由 ImagePlaceholderPlugin 为 <img> 注入了:
 *   - src:           ThumbHash 模糊占位图 data URL
 *   - data-src:      真实图片 URL
 *   - data-thumbhash: ThumbHash base64
 *   - loading:       lazy
 *   - width/height:  真实图片尺寸
 *   - style:         aspect-ratio 防 CLS
 */
(function () {
  'use strict';

  function markLoaded(img) {
    // 确保图片已经在 <img> 元素上完成渲染后再移除 blur
    // ——这是动画可见的关键：如果 src 刚切换而图片未解码完，
    //   blur→clear 过渡会打在空白/旧画面上，动画看起来就"消失"了
    if (img.complete && img.naturalWidth > 0) {
      _doMarkLoaded(img);
    } else {
      img.addEventListener('load', function () { _doMarkLoaded(img); }, { once: true });
      // 兜底：3 秒后如果还没 load，强制执行
      img._loadFallback = setTimeout(function () { _doMarkLoaded(img); }, 3000);
    }
  }

  function _doMarkLoaded(img) {
    img.classList.remove('lazy-blur');
    img.classList.add('lazy-loaded');
    if (img._loadFallback) { clearTimeout(img._loadFallback); img._loadFallback = null; }
    if (img._thTimeouts) {
      img._thTimeouts.forEach(function (t) { clearTimeout(t); });
      img._thTimeouts = null;
    }
    if (img._thOverlay) {
      img._thOverlay.remove();
      img._thOverlay = null;
    }
  }

  function setupImage(img) {
    if (img.classList.contains('lazy-loaded') || img.classList.contains('lazy-blur')) return;
    if (img.src && !img.src.startsWith('data:') && img.complete && img.naturalWidth > 0) {
      img.classList.add('lazy-loaded');
      return;
    }
    img.classList.add('lazy-blur');
    var wrap = document.createElement('span');
    wrap.className = 'img-placeholder-wrap';
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);
    var overlay = document.createElement('span');
    overlay.className = 'img-placeholder-overlay';
    wrap.appendChild(overlay);
    img._thOverlay = overlay;
    img._thTimeouts = [
      setTimeout(function () {
        overlay.textContent = 加载中;
        overlay.classList.add('is-visible');
      }, 5000),
      setTimeout(function () {
        overlay.textContent = 图片加载缓慢;
        overlay.classList.add('is-warning');
        overlay.classList.add('is-visible');
      }, 15000)
    ];
  }

  function processScope(scope) {
    var imgs = (scope || document).querySelectorAll('img[data-thumbhash]:not(.lazy-loaded):not(.lazy-blur)');
    if (!imgs.length) return;
    [].forEach.call(imgs, setupImage);
    if (typeof UnLazy !== 'undefined' && typeof UnLazy.lazyLoad === 'function') {
      // hash: false —— hooks.py 已经在构建期将 src 设为 ThumbHash 占位图，
      // 无需 UnLazy 重复生成，避免多余的 base64 编解码开销
      UnLazy.lazyLoad(imgs, {
        hash: false,
        onImageLoad: markLoaded
      });
      // UnLazy 不支持 onImageError，自行监听错误
      [].forEach.call(imgs, function (img) {
        img.addEventListener('error', function () {
          if (img.dataset.src) img.src = img.dataset.src;
          markLoaded(img);
        }, { once: true });
      });
    } else {
      [].forEach.call(imgs, function (img) {
        if (img.dataset.src) img.src = img.dataset.src;
        markLoaded(img);
      });
    }
  }

  function boot() {
    processScope(document);

    // 监听整个 document.body（永远不会被替换），捕捉所有 DOM 变化
    // 包括 MkDocs Material instant navigation 替换 <article> 导致的图片注入
    var observerTimer = null;
    var observer = new MutationObserver(function () {
      if (observerTimer) return; // requestAnimationFrame 防抖
      observerTimer = requestAnimationFrame(function () {
        observerTimer = null;
        processScope(document);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
