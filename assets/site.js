// TODO(owner): after Chrome Web Store approval, paste the listing URL here
// and redeploy — every "Add to Chrome" button flips live automatically.
var STORE_URL = "";
(function () {
  var links = document.querySelectorAll("a[data-store]");
  for (var i = 0; i < links.length; i++) {
    if (STORE_URL) {
      links[i].href = STORE_URL;
      links[i].removeAttribute("hidden");
    }
  }
  var soon = document.querySelector("[data-soon]");
  if (soon && STORE_URL) soon.remove();

  // reveal-on-scroll (with a health check: if IntersectionObserver never
  // delivers its initial callback — odd webviews, crawlers — show everything)
  var els = document.querySelectorAll("[data-reveal]");
  function showAll() { els.forEach(function (el) { el.classList.add("in"); }); }
  if ("IntersectionObserver" in window) {
    var ioAlive = false;
    var io = new IntersectionObserver(function (entries) {
      ioAlive = true;
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () { if (!ioAlive) { io.disconnect(); showAll(); } }, 1200);
  } else {
    showAll();
  }
})();
