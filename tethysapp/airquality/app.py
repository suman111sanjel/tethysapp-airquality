from tethys_sdk.base import TethysAppBase, url_map_maker


class Airquality(TethysAppBase):
    """
    Tethys app class for Airquality.
    """

    name = 'Airquality'
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
                controller='airquality.controllers.home.home'
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
            ),  UrlMap(
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
            ), UrlMap(
                name='slicedfromcatalog',
                url='airquality/getCityData',
                controller='airquality.controllers.rest.getCityData',
            ),
        )

        return url_maps

