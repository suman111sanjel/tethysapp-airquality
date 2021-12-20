// import {TethysAppName} from "../config";


let BaseUrl = null;

if (process.env.NODE_ENV === "production") {
    // BaseUrl = "http://localhost:8000";

    BaseUrl = 'http://smog.icimod.org';

} else {

    BaseUrl = "http://localhost:8000";
}

export let Action = {
    Base: BaseUrl,
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
    SlicedFromCatalog: 'apps/airquality/slicedfromcatalog/',
    TimeSeriesRasterQuery: 'apps/airquality/timeseriesmodeldata/',


};