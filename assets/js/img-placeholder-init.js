/**
 * 图片懒加载初始化脚本
 *
 * 职责：
 * 1. 为 img[data-thumbhash] 添加 blur class（JS 控制 blur，避免 CSS 自动生效导致时序脱节）
 * 2. 创建包裹容器 + overlay 加载指示器（5s 提示加载中，15s 警告网络慢）
 * 3. 初始化 unlazy 懒加载
 * 4. 多路归零标记加载完成：unlazy 回调 + 原生 load 事件 + 图片已缓存时的主动检查
 */
document.addEventListener('DOMContentLoaded', function () {
  var imgs = document.querySelectorAll('img[data-thumbhash]');
  if (!imgs.length) return;

  // ── 标记单张图片加载完成 ──
  function markLoaded(img) {
    // 清除 blur
    img.classList.remove('lazy-blur');
    img.classList.add('lazy-loaded');

    // 清除计时器
    if (img._thTimeouts) {
      img._thTimeouts.forEach(function (t) { clearTimeout(t); });
      img._thTimeouts = null;
    }

    // 移除 overlay
    if (img._thOverlay) {
      img._thOverlay.remove();
      img._thOverlay = null;
    }
  }

  // ── 为每张图设置包裹容器 + overlay ──
  imgs.forEach(function (img) {
    // 如果图片已实际加载完成（src 已被 unlazy 替换为非 data URL）则直接完成
    if (img.src && !img.src.startsWith('data:') && img.complete && img.naturalWidth > 0) {
      // unlazy 可能尚未处理，但图片实际已可用
      img.classList.add('lazy-loaded');
      return;
    }

    // 添加 blur class（JS 控制，而非 CSS 选择器）
    img.classList.add('lazy-blur');

    // 包裹容器
    var wrap = document.createElement('span');
    wrap.className = 'img-placeholder-wrap';
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);

    // overlay 加载指示器
    var overlay = document.createElement('span');
    overlay.className = 'img-placeholder-overlay';
    wrap.appendChild(overlay);
    img._thOverlay = overlay;

    // 延迟显示加载提示
    var id1 = setTimeout(function () {
      overlay.textContent = '加载中…';
      overlay.classList.add('is-visible');
    }, 5000);
    var id2 = setTimeout(function () {
      overlay.textContent = '图片加载缓慢';
      overlay.classList.remove('is-visible');
      overlay.classList.add('is-warning');
      // 强制显示 warning
      overlay.classList.add('is-visible');
    }, 15000);

    img._thTimeouts = [id1, id2];
  });

  // ── 初始化 unlazy ──
  if (typeof UnLazy !== 'undefined' && typeof UnLazy.lazyLoad === 'function') {
    UnLazy.lazyLoad('img[data-src][data-thumbhash]', {
      hashType: 'thumbhash',
      onImageLoad: function (img) {
        markLoaded(img);
      },
      onImageError: function (img) {
        // 加载失败：回退到原始 src
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        markLoaded(img);
      }
    });
  }
});
