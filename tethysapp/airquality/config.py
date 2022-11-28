# from t
from tethysapp.airqualitynp.app import Airqualitynp
TethysAppName = Airqualitynp.package


initilizationData = {
    'country': 'Bhutan',
    'navLogoImage': '/static/' + TethysAppName + '/images/nologo.png',
    'defaultView': '''
    {
        center: ol.proj.transform([90.47482193197189, 27.493171939609666], 'EPSG:4326', 'EPSG:3857'),
        zoom: 8,
        extent: [6702855.884774126, 1769255.1930753174, 12194542.852403797, 4812621.833531793]
    }
    ''',
    'TethysAppName': TethysAppName,
    'AdminLevel': 'l2Jumla',
    'regionOrCountryId': 7
}


# localhost
DataDirLocation = '/home/suman/ThreddsDataServerDataset/AQWatchAllData/cron_AirQuality_Data'


# Server
# DataDirLocation = '/smogdata01/cron_AirQuality_Data'


# Emisssion localhost
DataDir='/home/suman/ThreddsDataServerDataset/AQWatchAllData'


# Emisssion server
# DataDir='/smogdata01'


DBUser =        'suman'
DBPassword =    'suman123##.'
DBhost =        '192.168.10.211'
# DBhost =      'localhost'
DBport =        '5432'
DatabaseName =  'airqualitywatch_airqualitywatch'
DataBaseConnectionStrURL = "postgresql://" + DBUser + ":" + DBPassword + "@" + DBhost + ":" + DBport + "/" + DatabaseName



# DBUser = 'icimod'
# DBPassword = '1cim0d'
# DBhost = '192.168.10.72'
# DBport = '5432'
# DatabaseName = 'airqualitywatch_airqualitywatch'
# DataBaseConnectionStrURL = "postgresql://" + DBUser + ":" + DBPassword + "@" + DBhost + ":" + DBport + "/" + DatabaseName