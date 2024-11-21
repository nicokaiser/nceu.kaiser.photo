import PhotoSwipeLightbox from "./photoswipe/photoswipe-lightbox.esm.js";
import PhotoSwipe from "./photoswipe/photoswipe.esm.js";
import * as params from "@params";

const gallery = document.getElementById("gallery");

if (gallery) {
  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: ".gallery-item",
    showHideAnimationType: "zoom",
    bgOpacity: 1,
    pswpModule: PhotoSwipe,
    imageClickAction: "close",
    arrowPrevTitle: params.arrowPrevTitle,
    arrowNextTitle: params.arrowNextTitle,
    errorMsg: params.errorMsg,
    zoom: false,
    close: false,
    counter: false,
    // arrowPrevSVG: '<svg aria-hidden="true" style="backdrop-filter: blur(20px); background: rgba(200, 200, 200, 0.25); margin: -16px 11px; padding: 8px; border-radius: 16px; width: 32px; height: 32px;" class="pswp__icn" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="rgba(0,0,0,.75)" fill-rule="evenodd" d="M6.293 2.293a1 1 0 0 1 1.414 1.414L4.414 7H14a1 1 0 0 1 .993.883L15 8a1 1 0 0 1-1 1H4.414l3.293 3.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414Z"/></svg>',
  });

  lightbox.on("change", () => {
    const target = lightbox.pswp.currSlide?.data?.element?.dataset["pswpTarget"];
    history.replaceState("", document.title, "#" + target);
  });

  lightbox.on("close", () => {
    history.replaceState("", document.title, window.location.pathname);
  });

  lightbox.init();

  if (window.location.hash.substring(1).length > 1) {
    const target = window.location.hash.substring(1);
    const items = gallery.querySelectorAll("a");
    for (let i = 0; i < items.length; i++) {
      if (items[i].dataset["pswpTarget"] === target) {
        lightbox.loadAndOpen(i, { gallery });
        break;
      }
    }
  }
}
