export var TethysAppName = "airquality";

export var TethysAPIAppName = "airquality";



let threddDataSourceVar=null;
if (process.env.NODE_ENV === "production") {
    // threddDataSourceVar = 'https://smog.icimod.org';
    threddDataSourceVar = window.location.origin +'/thredds/';
} else {
    threddDataSourceVar = 'http://smog.icimod.org:8080/thredds/';
}
export let threddDataSource = threddDataSourceVar;

let GeoServerHostLVar = null;

if (process.env.NODE_ENV === "production") {
    // GeoServerHostLVar = 'https://smog.icimod.org:8080';
    GeoServerHostLVar = window.location.origin;
} else {
    GeoServerHostLVar = 'http://smog.icimod.org:8080';
}

export let GeoServerHost = GeoServerHostLVar;






export var DefaultMaskWMS = false;

export var DefaultPlotInfo = {
    colorScheme: 'jet',
    BBOX: [60, 15, 110, 40],
    tickSpan: 10,
    Resolution: 600,
    width: 12,
    height: 9
}
