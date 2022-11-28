export function ReDirectToSmogAppDotCom() {
    if (window.location.host == 'smog.spatialapps.net') {
        var RDirect = document.createElement('a');
        RDirect.href = 'http://smog.icimod.org' + window.location.pathname;
        RDirect.click();
    }
}



export function reDirectHTTPSToHTTP() {
    if (window.location.href.slice(0, 5) == 'https') {
        var RDirect = document.createElement('a');
        RDirect.href = document.location.href.slice(0,4) + document.location.href.slice(5)
        RDirect.click();
    }
}

