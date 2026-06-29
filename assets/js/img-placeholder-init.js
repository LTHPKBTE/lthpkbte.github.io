/**
 * 图片懒加载初始化脚本
 *
 * 配合 unlazy 库实现 ThumbHash 模糊占位 → 懒加载 → 平滑过渡
 * 构建期由 ImagePlaceholderPlugin 为 <img> 注入了:
 *   - src:           ThumbHash 模糊占位图 data URL
 *   - data-src:      真实图片 URL
 *   - data-thumbhash: ThumbHash base64
 *   - loading:       lazy
 *   - width/height:  真实图片尺寸
 *   - style:         aspect-ratio 防 CLS
 */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof UnLazy !== 'undefined' && typeof UnLazy.lazyLoad === 'function') {
    UnLazy.lazyLoad('img[data-src][data-thumbhash]', {
      hashType: 'thumbhash',
      // 图片加载完成后移除模糊滤镜
      onImageLoad: function (img) {
        img.classList.add('lazy-loaded');
        img.style.filter = 'none';
      },
      onImageError: function (img) {
        // 加载失败时回退到原始 src
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      }
    });
  }
});
