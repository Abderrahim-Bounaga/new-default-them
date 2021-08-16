window.enableFacebookEvents = function(enabled = true) {
    !function (s, t, o, r, e, i, n, o_) {
        if(!enabled) r = 'data:application/javascript;utf-8,console.log("Fb%20Pixel%20not%20found%20")';
        if (s.fbq) return; e = s.fbq = function () { e.callMethod ? e.callMethod.apply(e, arguments) : e.queue.push(arguments); }
        if (!s.fbq) s._fbq = e; e.push = e; e.loaded = !0; e.version = '2.0'; e.queue = [];
        i = t.createElement(o); i.async = !0; i.src = r; t.head.appendChild(i);
        s.fbPixel = function (fbId, d = {}) { s.fbq(o_, String(fbId).trim(), d);}; s.fbPageView = function (d = {}) { s.fbq(n, 'PageView', d); };
        s.fbAddToCart = function (d = {}) { fbq(n, 'AddToCart', d); }; s.fbViewContent = function (d = {}) { fbq(n, 'ViewContent', d); };
        s.fbCompleteRegistration = function (d = {}) { fbq(n, 'CompleteRegistration', d); }; s.fbInitiateCheckout = function (d = {}) { fbq(n, 'InitiateCheckout', d); };
        s.fbAddPaymentInfo = function (d = {}) { fbq(n, 'AddPaymentInfo', d); };
        s.fbPurchase = function (d = {}) {
            if(d.currency && d.currency == 'XOF'){ d.currency = 'USD'; d.value = Number(d.value) * 0.0018; }
            fbq(n, 'Purchase', d);
        };
        s.fbSearch = function (d = {}) { fbq(n, 'Search', d); }; s.fbLead = function (d = {}) { fbq(n, 'Lead', d); };
        s.fbContact = function (d = {}) { fbq(n, 'Contact', d); }; s.fbAddToWishlist = function (d = {}) { fbq(n, 'AddToWishlist', d); };
        s.fbCustomizeProduct = function (d = {}) { fbq(n, 'CustomizeProduct', d); }; s.fbDonate = function (d = {}) { fbq(n, 'Donate', d); };
        s.fbStartTrial = function (d = {}) { fbq(n, 'StartTrial', d); }; s.c = function (d = {}) { fbq(n, 'SubmitApplication', d); };
        s.fbSubscribe = function (d = {}) { fbq(n, 'Subscribe', d); };
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', 0, 0, 'track', 'init');
}
window.enableSnapEvents = function(enabled = true) {
    (function (e, t, n, tr) {
        if(!enabled) r = 'data:application/javascript;utf-8,console.log("Snap%20Pixel%20not%20found")';
        if (e.snaptr) return; var a = e.snaptr = function () { a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments) };
        e.snapPixel = function (id, email = "") { snaptr('init', id, { 'user_email': email }); }
        e.snapPageView = function (d = {}) { snaptr(tr, 'PAGE_VIEW', d); }
        e.snapPurchase = function (d = {}) { snaptr(tr, "PURCHASE", d) }
        e.snapViewContent = function (d = {}) { snaptr(tr, 'VIEW_CONTENT', d) }
        e.snapAddToCart = function (d = {}) { snaptr(tr, "ADD_CART", d) }
        e.snapSignUp = function (d = {}) { snaptr(tr, 'SIGN_UP', d) }
        a.queue = []; var s = 'script'; r = t.createElement(s); r.async = !0;
        r.src = n; var u = t.getElementsByTagName(s)[0];
        u.parentNode.insertBefore(r, u);
    })(window, document, 'https://sc-static.net/scevent.min.js', 'track');
}