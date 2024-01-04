// import {TethysAppName} from "../config";


let BaseUrl = null;
let GeoServerBaseVar = null;
if (process.env.NODE_ENV === "production") {
    // BaseUrl = "http://localhost:8000";

    BaseUrl = window.location.origin;
    GeoServerBaseVar = 'https://smog.icimod.org/geoserver';
} else {
    BaseUrl = "http://192.168.10.211:9001";
    // BaseUrl = "http://localhost:8000";
    GeoServerBaseVar = 'http://smog.icimod.org:8080/geoserver';
}



export let Action = {
    Base: BaseUrl,
    GeoServerBase: GeoServerBaseVar,
    // Base : 'http://110.44.114.244:8001/',
    CityData: "apps/airquality/getCityData",
    Aeronet: 'apps/airquality/aeronetaodpm',
    USEmbassyAOD: 'apps/airquality/usembassypm',
    getGeoJSONofStations: 'apps/airquality/getGeoJSONofStations',
    getGeoJsonForOneSatation: 'apps/airquality/getGeoJsonForOneSatation',
    getAllStationsID: 'apps/airquality/getAllStationsID',


    commonAPI: 'apps/airquality/getData/',
    RegionGeojson: 'apps/airquality/geojsonregion',
    AOIPolygon: 'apps/airquality/aoipolygon',
    GetMapImage: 'apps/airquality/getmapimage/',
    GetImage: 'apps/airquality/downloadImage',
    GetAnimationImage: 'apps/airquality/downloadImage',
    SlicedFromCatalog: 'apps/airquality/slicedfromcatalog/',
    SliceFromCatalogForecast: 'apps/airquality/SliceFromCatalogForecast/',
    TimeSeriesRasterQuery: 'apps/airquality/timeseriesmodeldata/',
    trueColorLegendImage: 'apps/airquality/trueColorLegendImage/?Imagename=trueColorImage.png',
    legendAMIDustRGB: 'apps/airquality/trueColorLegendImage/?Imagename=legendAMIDustRGB.png',
    defaultObservationStation: 'apps/airquality/defaultobservationstation/',
    createGIFMapImage: 'apps/airquality/creategifmapimage/',


    //emission
    CascaderOptions: 'apps/airquality/getCascaderData/',
    ChartDataProcess: 'apps/airquality/getChartDataProcess/',
    LayerInfoStat: 'apps/airquality/getLayerInfoStat/',


    //Population
    ChartDataProcessSocioEconomic: 'apps/airquality/getChartDataProcessSocioEconomic/',
    GetPopulationSummary: 'apps/airquality/getPopulationSummary/',
};
