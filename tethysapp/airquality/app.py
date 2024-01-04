from tethys_sdk.base import TethysAppBase, url_map_maker


class Airquality(TethysAppBase):
    """
    Tethys app class for Airquality.
    """
    name = 'Air Quality - HKH'
    index = 'airquality:home'
    icon = 'airquality/images/icon.gif'
    package = 'airquality'
    root_url = 'airquality'
    color = '#f39c12'
    description = 'Air Quality Watch'
    tags = ''
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """

        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='home',
                url='airquality',
                controller='airquality.controllers.home.Recent'
            ), UrlMap(
                name='Recent',
                url='airquality/recent',
                controller='airquality.controllers.home.Recent'
            ), UrlMap(
                name='Archive',
                url='airquality/archive',
                controller='airquality.controllers.home.Archive'
            ), UrlMap(
                name='Forecast',
                url='airquality/forecast',
                controller='airquality.controllers.home.Forecast'
            ), UrlMap(
                name='Emission',
                url='airquality/emission',
                controller='airquality.controllers.home.Emission'
            ), UrlMap(
                name='Demographic',
                url='airquality/demographic',
                controller='airquality.controllers.home.Demographic'
            ),UrlMap(
                name='RGBProducts',
                url='airquality/rgbproducts',
                controller='airquality.controllers.home.RGBProducts'
            ),
            UrlMap(
                name='aeronetData',
                url='airquality/getGeoJSONofStations',
                controller='airquality.controllers.viewer.getGeoJSONofStations',
            ),
            UrlMap(
                name='getGeoJsonForOneSatation',
                url='airquality/getGeoJsonForOneSatation',
                controller='airquality.controllers.viewer.getGeoJsonForOneSatation',
            ),
            UrlMap(
                name='getData',
                url='airquality/getData',
                controller='airquality.controllers.viewer.GetData',
            ),
            UrlMap(name='WMSProxy',
                   url='airquality/WMSProxy/(?P<url>.*)',
                   # url='airquality/WMSProxy/',
                   # url=r'airquality/WMSProxy/(?P<variable_name>.*)$',
                   # regex=r'^[ A-Za-z0-9_@./#&+-]*$',
                   controller='airquality.controllers.viewer.WMSProxy',
                   # regex='variable_name'
                   ),
            UrlMap(
                name='GeojsonRegion',
                url='airquality/geojsonregion',
                controller='airquality.controllers.viewer.GeojsonRegion',
            ),
            UrlMap(
                name='AOIPolygon',
                url='airquality/aoipolygon',
                controller='airquality.controllers.viewer.AOIPolygon',
            ),
            UrlMap(
                name='GetMapPNG',
                url='airquality/getmapimage',
                controller='airquality.controllers.viewer.GetMapIMAGE',
            ), UrlMap(
                name='create_GIF_Map_IMAGE',
                url='airquality/creategifmapimage',
                controller='airquality.controllers.viewer.Create_GIF_Map_IMAGE',
            ), UrlMap(
                name='timeseriesmodeldata',
                url='airquality/timeseriesmodeldata',
                controller='airquality.controllers.viewer.TimeSeriesModelSata',
            ), UrlMap(
                name='downloadImage',
                url='airquality/downloadImage',
                controller='airquality.controllers.viewer.downloadImage',
            ), UrlMap(
                name='slicedfromcatalog',
                url='airquality/slicedfromcatalog',
                controller='airquality.controllers.viewer.SlicedFromCatalog',
            ),UrlMap(
                name='SliceFromCatalogForecast',
                url='airquality/SliceFromCatalogForecast',
                controller='airquality.controllers.viewer.SliceFromCatalogForecast',
            ), UrlMap(
                name='slicedfromcatalog',
                url='airquality/getCityData',
                controller='airquality.controllers.rest.getCityData',
            ),
            UrlMap(
                name='trueColorLegendImage',
                url='airquality/trueColorLegendImage',
                controller='airquality.controllers.viewer.trueColorLegendImage',
            ),
            UrlMap(
                name='getCascaderData',
                url='airquality/getCascaderData',
                controller='airquality.api.getCascaderData'
            ), UrlMap(
                name='getChartDataProcess',
                url='airquality/getChartDataProcess',
                controller='airquality.api.getChartDataProcess'
            ), UrlMap(
                name='getLayerInfoStat',
                url='airquality/getLayerInfoStat',
                controller='airquality.api.getLayerInfoStat'
            ),
            UrlMap(
                name='getDefaultstationForNepal',
                url='airquality/defaultobservationstation',
                controller='airquality.controllers.viewer.defaultobservationstation'
            ),
            UrlMap(
                name='ChartDataProcessSocioEconomic',
                url='airquality/getChartDataProcessSocioEconomic',
                controller='airquality.api.getChartDataProcessSocioEconomic'
            ), UrlMap(
                name='getPopulationSummary',
                url='airquality/getPopulationSummary',
                controller='airquality.api.getPopulationSummary'
            ),
        )
        return url_maps
