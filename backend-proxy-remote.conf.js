let backendhostname = process.env.RUNBOX7_ANGULAR_BACKEND_HOST;
if(!backendhostname) {
    backendhostname = 'https://gw01test.runbox.com:4086';
}

const PROXY_CONFIG = [
    {
        context: ["/websocket"],
        "target": backendhostname.replace(/^http/,'ws'),
        "secure": true,
        "ws": true,
        "changeOrigin": true
    },
    {
        context: [
            "/rest", "/LOGOUT", "/mail", "/ajax", "/_js", "/_img", "/_css", "/app", "/angular2"    
        ],
        onProxyRes: (proxyRes, req, res) => {            
            if (proxyRes.headers['set-cookie']) {
                const cookies = proxyRes.headers['set-cookie'].map(cookie =>
                    cookie.replace(/; secure/gi, '')
                );
                proxyRes.headers['set-cookie'] = cookies;
            }
            if(proxyRes.headers['location']) {
                proxyRes.headers['location'] = proxyRes.headers['location'].replace(backendhostname, '');
            }
        },
        "target": backendhostname,
        "secure": false,
        "cookieDomainRewrite": "localhost",
        "changeOrigin": true
        
    }
]

module.exports = PROXY_CONFIG;
