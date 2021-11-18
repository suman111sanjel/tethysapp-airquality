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
                controller='airquality.controllers.home'
            ),
        )

        return url_maps