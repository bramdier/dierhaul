(function () {
    var slots = [
        { id: "include-nav", path: "partials/top-nav.html" },
        { id: "include-hero", path: "partials/hero.html" },
        { id: "include-problem", path: "partials/problem.html" },
        { id: "include-solution", path: "partials/solution.html" },
        { id: "include-how-it-works", path: "partials/how-it-works.html" },
        { id: "include-product-features", path: "partials/product-features.html" },
        { id: "include-differentiation", path: "partials/differentiation.html" },
        { id: "include-market", path: "partials/market-opportunity.html" },
        { id: "include-business-model", path: "partials/business-model.html" },
        { id: "include-vision", path: "partials/vision.html" },
        { id: "include-cta", path: "partials/cta.html" },
        { id: "include-footer", path: "partials/footer.html" },
    ];

    function loadPartial(slot) {
        var el = document.getElementById(slot.id);
        if (!el) return Promise.resolve();

        return fetch(slot.path)
            .then(function (r) {
                if (!r.ok) throw new Error(slot.path + ": " + r.status);
                return r.text();
            })
            .then(function (html) {
                el.innerHTML = html;
            });
    }

    function injectScript(src) {
        return new Promise(function (resolve, reject) {
            var s = document.createElement("script");
            s.src = src;
            s.onload = function () {
                resolve();
            };
            s.onerror = function () {
                reject(new Error("Failed to load script: " + src));
            };
            document.head.appendChild(s);
        });
    }

    // cdn.tailwindcss.com defines the global `tailwind`. Config must run after that script loads.
    Promise.all(slots.map(loadPartial))
        .then(function () {
            return injectScript(
                "https://cdn.tailwindcss.com?plugins=forms,container-queries"
            );
        })
        .then(function () {
            return injectScript("assets/js/tailwind-config.js");
        })
        .then(function () {
            if (typeof tailwind !== "undefined" && typeof tailwind.refresh === "function") {
                tailwind.refresh();
            }
        })
        .catch(function (err) {
            console.error("Failed to load page:", err);
            document.body.insertAdjacentHTML(
                "afterbegin",
                '<p style="position:fixed;z-index:9999;left:0;right:0;top:0;background:#fecaca;color:#991b1b;padding:12px;font:14px system-ui;text-align:center;">Sections load via fetch; Tailwind runs after they load. Serve this folder over HTTP (e.g. VS Code Live Server or <code style="background:#fee2e2;padding:2px 6px;border-radius:4px;">npx serve .</code>), not as a <code style="background:#fee2e2;padding:2px 6px;border-radius:4px;">file://</code> URL.</p>'
            );
        });
})();
