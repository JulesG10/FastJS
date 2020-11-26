document.querySelectorAll("#a").forEach(function(item) {
    item.addEventListener("click", function(e) {
        setTimeout(function() {
            e.target.style ? e.target.style.coucou = "nice" : null;
            e.target.style ? e.target.style.coucou = "nice" : null;
            e.target.style ? e.target.style.coucou = "nice" : null;
            if (e.target) {
                e.target.removeAttribute("ok");
                e.target.setAttribute("ok", "ok")
            }
        }, 0.5);
        ok();
    });
});
document.querySelectorAll("[attr]")[0].addEventListener("on", function(e) {
    e.target.style ? e.target.style.coucou = "nice" : null;
    e.target.style ? e.target.style.ok = "nice" : null;
    e.target ? e.target.removeAttribute("oknicecool") : null;
    nice();
});
document.querySelectorAll("#coucou")[0].addEventListener("false", function(e) {});