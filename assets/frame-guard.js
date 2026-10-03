/*
 * Anti-clickjacking untuk GitHub Pages.
 * GitHub Pages tidak bisa mengirim header X-Frame-Options / CSP frame-ancestors,
 * dan frame-ancestors tidak berlaku bila ditulis di <meta>. Skrip ini menolak
 * dashboard ditampilkan di dalam iframe milik situs lain (origin berbeda).
 * Iframe dari origin yang sama tetap diizinkan. Untuk mengizinkan portal tertentu
 * menanamkan dashboard, tambahkan origin-nya ke ALLOWED_PARENT_ORIGINS.
 */
(function () {
  "use strict";
  const ALLOWED_PARENT_ORIGINS = [];

  if (window.top === window.self) return;

  let sameOrigin = false;
  try {
    sameOrigin = window.top.location.origin === window.location.origin;
  } catch (error) {
    sameOrigin = false;
  }
  if (sameOrigin) return;

  const ancestors = window.location.ancestorOrigins;
  const parentOrigin = ancestors && ancestors.length ? ancestors[ancestors.length - 1] : "";
  if (parentOrigin && ALLOWED_PARENT_ORIGINS.includes(parentOrigin)) return;

  const root = document.documentElement;
  root.style.setProperty("visibility", "hidden", "important");

  try {
    window.top.location.href = window.location.href;
  } catch (error) {
    // Browser bisa memblokir navigasi top-level dari iframe; tampilkan pemberitahuan.
  }

  const showNotice = () => {
    const box = document.createElement("div");
    box.setAttribute("role", "alert");
    Object.assign(box.style, {
      visibility: "visible",
      position: "fixed",
      inset: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "#ffffff",
      color: "#0f172a",
      font: "15px/1.5 system-ui, sans-serif",
      textAlign: "center",
      zIndex: "2147483647"
    });
    const inner = document.createElement("div");
    const text = document.createElement("p");
    text.textContent = "Demi keamanan, dashboard ini tidak dapat ditampilkan di dalam situs lain.";
    const link = document.createElement("a");
    link.href = window.location.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Buka dashboard di tab baru";
    link.style.color = "#0b6e99";
    link.style.fontWeight = "600";
    inner.append(text, link);
    box.append(inner);
    document.body.append(box);
  };

  if (document.body) showNotice();
  else document.addEventListener("DOMContentLoaded", showNotice, { once: true });
})();
