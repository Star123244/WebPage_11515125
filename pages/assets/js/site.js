/**
 * 山嵐茶韻｜台灣烏龍茶（SHAN LAN OOLONG）
 * 共用 JavaScript：site.js
 * 主要功能：手機版漢堡選單展開/收合、無障礙屬性切換與頁首滾動效果
 */

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const siteHeader = document.querySelector('.site-header');

  if (navToggle && navMenu) {
    // 點擊漢堡按鈕切換展開 / 收合
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;

      navToggle.setAttribute('aria-expanded', String(newState));
      navMenu.classList.toggle('is-open', newState);
    });

    // 點擊選單內部連結後自動收合（便於單頁跳轉或操作）
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('is-open');
        }
      });
    });

    // 點擊導覽列外部區域時自動收合選單
    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });

    // 按下鍵盤 Esc 鍵時收合選單
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });

    // 視窗尺寸改變時（大於 768px）自動重設選單狀態
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });
  }

  // 滾動頁面時為導覽列添加精緻陰影
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
});
