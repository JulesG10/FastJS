document.querySelectorAll("#a").forEach(function(item) {
    item.addEventListener("click", function(e) {
        setTimeout(function() {
            alert("nice");
            e.target.style ? e.target.style.coucou = "nice" : null;
            alert("nice");
            e.target.style ? e.target.style.coucou = "nice" : null;
            alert("nice");
            e.target.style ? e.target.style.coucou = "nice" : null;
            if (e.target) {
                e.target.removeAttribute("ok");
                e.target.setAttribute("ok", "ok")
            }
        }, 0.5);
        ok();
    });
});
document.querySelectorAll(".ok").forEach(function(item) {
    item.addEventListener("mouseover", function(e) {
        setTimeout(function() {
            e.target.style ? e.target.style.display = "none" : null;
            if (e.target) {
                e.target.removeAttribute("voila");
                e.target.setAttribute("voila", "nice")
            }
        }, 200);
        end();
    });
});
document.querySelectorAll("[attr]")[0].addEventListener("on", function(e) {
    alert("nice");
    e.target.style ? e.target.style.coucou = "nice" : null;
    alert("nice");
    e.target.style ? e.target.style.ok = "nice" : null;
    e.target ? e.target.removeAttribute("oknicecool") : null;
    nice();
});
document.querySelectorAll("#coucou")[0].addEventListener("false", function(e) {});
document.querySelectorAll("#a").forEach(function(item) {
    item.addEventListener("click", function(e) {
        setTimeout(function() {
            alert("nice");
            e.target.style ? e.target.style.coucou = "nice" : null;
            alert("nice");
            e.target.style ? e.target.style.coucou = "nice" : null;
            alert("nice");
            e.target.style ? e.target.style.coucou = "nice" : null;
            if (e.target) {
                e.target.removeAttribute("ok");
                e.target.setAttribute("ok", "ok")
            }
        }, 0.5);
        ok();
    });
});