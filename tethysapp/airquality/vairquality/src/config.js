export var TethysAppName = "airquality";

export var TethysAPIAppName = "airquality";

export let threddDataSource = 'http://smog.spatialapps.net:8080/thredds/';

let GeoServerHostLVar = null;

if (process.env.NODE_ENV === "production") {
    GeoServerHostLVar = 'http://smog.spatialapps.net:8080';
} else {
    GeoServerHostLVar = 'http://smog.spatialapps.net:8080';
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
