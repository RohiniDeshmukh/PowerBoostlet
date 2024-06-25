export class Util {
  static load_Links(rel, href) {
    var link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    document.head.appendChild(link);
  }

  static load_Scripts(src, async = false, onload = null) {
    var script = document.createElement("script");
    script.src = src;
    script.async = async;
    if (onload) script.onload = onload;
    document.head.appendChild(script);
  }
}
