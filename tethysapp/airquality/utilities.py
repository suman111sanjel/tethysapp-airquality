import sys

import requests
from sqlalchemy import desc, asc
from .model import *
from sqlalchemy import func
from sqlalchemy.sql import select, insert
from sqlalchemy import cast
import ast
from sqlalchemy import Float, BigInteger

import xarray as xr
import netCDF4
import matplotlib

matplotlib.use('Agg')
from matplotlib import pyplot as plt
from mpl_toolkits.basemap import Basemap
import uuid
import os
from sqlalchemy.dialects.postgresql import array, ARRAY
from matplotlib.animation import FuncAnimation, PillowWriter
import numpy as np
import netCDF4 as nc
import glob
import rasterio as rio
import numpy
import rasterstats as rstats
import shapely.wkt
import requests
import datetime
import xml.etree.ElementTree as ET
import traceback
from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import sessionmaker
from .config import DataBaseConnectionStrURL
from .model import *

from shapely.wkt import loads
from requests.auth import HTTPBasicAuth

from bs4 import BeautifulSoup
import cartopy.crs as ccrs

from cartopy.mpl.gridliner import LongitudeFormatter, LatitudeFormatter
from PIL import Image, ImageDraw
from io import BytesIO


def getGeoJSONStations(StationObjectString):
    """
    Get all persisted dams.
    """
    # Get connection/session to database
    NewEngine = create_engine(DataBaseConnectionStrURL, poolclass=NullPool)
    session = sessionmaker(bind=NewEngine)()

    GeojsonObject3857 = {
        'type': 'FeatureCollection',
        'crs': {
            'type': 'name',
            'properties': {'name': 'EPSG:3857'}
        },
        'features': [
        ]
    }

    try:
        ModelObject = globals()[StationObjectString]
        AeronetDataQuery = session.query(ModelObject).all()
        for i in AeronetDataQuery:
            featureObject = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-87.650175, 41.850385]
                },
                'properties': {
                }
            }
            geoJSONstr = session.query(func.ST_AsGeoJSON(func.ST_Transform(i.geom, 3857)))[0][0]
            geoJSON = ast.literal_eval(str(geoJSONstr))
            featureObject['geometry']['coordinates'] = geoJSON["coordinates"]
            featureObject['properties']['folder_name'] = i.folder_name
            featureObject['properties']['id'] = i.st_id
            featureObject['properties']['name'] = i.name
            GeojsonObject3857['features'].append(featureObject)

        session.close()
    except:
        traceback.print_exc()
    return GeojsonObject3857


def getGeoJSONSofOnetations(StationObjectString, ModelClassDataListStr, typeName, StartDate, EndDate, rid):
    """
    Get all persisted dams.
    """
    # Get connection/session to database
    NewEngine = create_engine(DataBaseConnectionStrURL, poolclass=NullPool)
    session = sessionmaker(bind=NewEngine)()
    # stationIDList=[]
    # if(StationObjectString=="AeronetAod"):
    #     stationIDList = [9, 14]
    # elif(StationObjectString=="UsEmbassyPm"):
    #     stationIDList = [6, 7]
    # else:
    #     #Nepal Station
    #     stationIDList = [70,22,73,15,57,19,5,4,10,6,14,13,7,20,58,71,68,69,59,11,72,21,3,67,16,140,12,140]

    allLocationData = []
    try:
        ModelObject = globals()[StationObjectString]
        # print(StationObjectString)
        ModelClassDataList = globals()[ModelClassDataListStr]
        startDate = datetime.datetime.strptime(StartDate, '%Y-%m-%d')
        endDate = datetime.datetime.strptime(EndDate, '%Y-%m-%d')
        AeronetDataQuery = None
        if int(rid) == 0:
            AeronetDataQuery = session.query(ModelObject).order_by(asc(ModelObject.name)).all()
        else:
            AeronetDataQuery = session.query(ModelObject).filter(ModelObject.country_id == int(rid)).order_by(
                asc(ModelObject.name))
        for i in AeronetDataQuery:
            # stID=i.st_id
            # TimeseriesData = session.query(ModelClassDataList).filter(
            #     ModelClassDataList.st_id == int(stID),
            #     ModelClassDataList.type == typeName,
            #     func.date(ModelClassDataList.date_time) >= startDate,
            #     func.date(ModelClassDataList.date_time) < endDate).order_by(
            #     ModelClassDataList.date_time.asc())
            # updated
            # if(TimeseriesData.count()):
            # if stID in stationIDList:
            # featureObject = {
            #     'type': 'Feature',
            #     'geometry': {
            #         'type': 'Point',
            #         'coordinates': [-87.650175, 41.850385]
            #     },
            #     'properties': {
            #     }
            # }
            # geoJSONstr = session.query(func.ST_AsGeoJSON(func.ST_Transform(i.geom, 3857)))[0][0]
            # geoJSON = ast.literal_eval(str(geoJSONstr))

            itemCur = {
                "value": i.st_id,
                "label": i.name,
                "folder_name": i.name,
            }

            allLocationData.append(itemCur)
        session.close()
        status = 200

    except:
        traceback.print_exc()
        status = 500

    Data = {"status": status, "data": allLocationData}
    return Data


def GetCommonRequestData(param):
    """

    Get Observation data for all.

    """

    # Get connection/session to database
    NewEngine = create_engine(DataBaseConnectionStrURL, poolclass=NullPool)
    session = sessionmaker(bind=NewEngine)()

    data = {}
    stationID = param['stId']
    ModelClass = globals()[param['ModelClass']]
    ModelClassDataList = globals()[param['ModelClassDataList']]
    typeName = param['typeName']

    startDate = getDatetimeObject(param['StartDate'])
    endDate = getDatetimeObject(param['EndDate'])

    stationNameQuery = session.query(ModelClass).filter(ModelClass.st_id == int(stationID))

    TimeseriesData = session.query(ModelClassDataList).filter(
        ModelClassDataList.st_id == int(stationID),
        ModelClassDataList.type == typeName,
        func.date(ModelClassDataList.date_time) >= startDate,
        func.date(ModelClassDataList.date_time) < endDate).order_by(
        ModelClassDataList.date_time.asc())

    seriesData = []
    for i in TimeseriesData:
        dateInmillisecond = i.date_time.timestamp() * 1000
        value = round(i.value, 3)
        seriesData.append([dateInmillisecond, value])
    # title, subTitle, SeriesData, SeriesName, YaxisLabel

    # data['title'] = stationNameQuery[0].name
    data['SeriesData'] = seriesData
    data['XaxisLabel'] = 'From ' + str(startDate) + " To " + str(endDate)

    session.close()

    return data


def regionGeojson(id):
    NewEngine = create_engine(DataBaseConnectionStrURL, poolclass=NullPool)
    session = sessionmaker(bind=NewEngine)()
    if id == 0:
        region = session.query(Region).filter(Region.gid == 1)
        geoJSONstr = session.query(func.ST_AsGeoJSON(func.ST_Transform(region[0].geom, 3857)))[0][0]
        geoJSON = ast.literal_eval(str(geoJSONstr))
        session.close()
        return geoJSON
    else:
        region = session.query(Country).filter(Country.c_id == id)
        geoJSONstr = session.query(func.ST_AsGeoJSON(func.ST_Transform(region[0].geom, 3857)))[0][0]
        geoJSON = ast.literal_eval(str(geoJSONstr))
        session.close()
        return geoJSON


# Definition of function to plot file
def plotNcFile(ncFileName, parameterName, title, labelName, dataRange, colorScheme='jet', boundingBox=[60, 15, 110, 40],
               tickSpan=10, width=4.5, height=3.89, figResolution=600, rid=0):
    '''
    Args:
        ncFileName: Input nc file name and path
        parameterName: Name of parameter as per convention e.g. for CAMS PM2.5-'CamsPm2.5' MIAC AOD- 'MiacAod550'
        title: Title of the plot
        labelName: Bottom Label of the plot
        colorScheme: name of color Scheme e.g. 'jet'
        dataRange: list of range of data in format [minValue, maximumValue]
        boundingBox:Bounding  box list  in format [llcrnrlon, llcrnrlat, urcrnrlon, urcrnrlat]
        tickSpan: gap between ticks in terms of degree, e.g. 10
        width: Width of image in inches
        height: height of image in inches
        figResolution: Resolution of the output figure, 600 dpi

    Returns: Returns the path of output file and name
    '''

    NewEngine = create_engine(DataBaseConnectionStrURL, poolclass=NullPool)
    session = sessionmaker(bind=NewEngine)()

    QueryObj = session.query(MapImage).filter(MapImage.nc_file_name == ncFileName,
                                              MapImage.parameter_name == parameterName, MapImage.title == title,
                                              MapImage.label_name == labelName,
                                              MapImage.data_range == cast(array(dataRange), ARRAY(Float)),
                                              MapImage.color_scheme == colorScheme,
                                              MapImage.bounding_box == cast(array(boundingBox), ARRAY(Float)),
                                              MapImage.tick_span == tickSpan,
                                              MapImage.width == width, MapImage.height == height,
                                              MapImage.fig_resolution == figResolution)

    countObject = QueryObj.count()
    if (countObject):
        print("inside")
        for ij in QueryObj:
            fileName = ij.image_filename
            realPath = os.path.dirname(os.path.abspath(__file__))
            completePath = os.path.join(realPath, 'workspaces', 'app_workspace', 'MapImage', fileName)
            if (os.path.exists(completePath)):
                return fileName
            else:
                session.delete(ij)
                session.commit()

    # read Data
    d1 = xr.open_dataset(ncFileName)
    print("--")
    lats = None
    lons = None
    try:
        lats = d1.latitude
        lons = d1.longitude
    except:
        lats = d1.lat
        lons = d1.lon
    print("dd")
    selectedData = d1[parameterName][0, :, :]

    # Plot the Data
    plt.figure(figsize=(width, height))
    mp = Basemap(projection='merc',
                 llcrnrlon=boundingBox[0],
                 llcrnrlat=boundingBox[1],
                 urcrnrlon=boundingBox[2],
                 urcrnrlat=boundingBox[3],
                 resolution='i')

    lon, lat = np.meshgrid(lons, lats)
    x, y = mp(lon, lat)
    c_scheme = mp.pcolor(x, y, selectedData, cmap=colorScheme, vmin=dataRange[0], vmax=dataRange[1])

    if rid == 0:
        try:
            mp.drawcoastlines()
        except:
            pass
    else:
        mp.drawcountries()

    mp.drawparallels(np.arange(-180., 180., tickSpan), labels=[1, 0, 0, 0], linewidth=0.0)
    mp.drawmeridians(np.arange(-180., 180., tickSpan), labels=[0, 0, 0, 1], linewidth=0.0)
    cbar = mp.colorbar(c_scheme, location='bottom', pad='15%', extend='max', label=labelName)
    plt.title(title)
    outputFilePath = uuid.uuid1().__str__() + '.png'
    realPath = os.path.dirname(os.path.abspath(__file__))
    realData = os.path.join(realPath, 'workspaces', 'app_workspace', 'MapImage', outputFilePath)
    plt.savefig(realData, bbox_inches='tight', dpi=figResolution)

    imageObj = MapImage(nc_file_name=ncFileName, parameter_name=parameterName, title=title, label_name=labelName,
                        data_range=dataRange, color_scheme=colorScheme, bounding_box=boundingBox, tick_span=tickSpan,
                        width=width, height=height, fig_resolution=figResolution, image_filename=outputFilePath)
    session.add(imageObj)
    session.commit()

    session.close()

    return outputFilePath


# def gifNcFile(sourceDir, today, gifFile,  parameterName, variableName, title, dataRange, durationDays=7, dataInterval=24, timeOffset=0, fps=1, colorScheme='jet', boundingBox=[60, 15, 110, 40],tickSpan=10, size=[4.5,3.89],figResolution=600):
# def gifNcFile(sourceDir, parameterName, title, dataRange, colorScheme='jet', boundingBox=[60, 15, 110, 40], tickSpan=10,
#               width=4.5, height=3.89, fps=1, figResolution=600, rid=0, TimeZone=None):
#     '''
#
#     Args:
#         sourceDir:  Folder Containing data files
#         today:  current date in format datetime
#         gifFile:    full path and name of output .gif file
#         parameterName:  name of parameter e.g. TerraModis-AOD, GEOS-PM2p5
#         variableName:   name of the variable in nc file. e.g. 'aod_550', 'PM2p5'
#         title:  Title of the plot
#         dataRange:  range of valid data as [min, max], e.g. [0, 100]
#         durationDays:   (in days) no. of days for which archive/forecast is considered. e.g. 7 days, for forecast-> -2 days
#         dataInterval:   (in hours) Interval between consecutive data. e.g. for TerraModis-> 24 hrs, for GEOS archive-> 6 hrs, for GEOS forecast-> 3 hrs
#         timeOffset:     (in minutes) # First data for GEOS-PM2p5 comes each day at 00:30 so timeOffset=30, for other data, timeOffset=0
#         fps:        frame per second
#         colorScheme:    Name of Color scheme, eg.g 'jet'
#         boundingBox:    Bounding  box list  in format [llcrnrlon, llcrnrlat, urcrnrlon, urcrnrlat]
#         tickSpan:   gap between ticks in terms of degree, e.g. 10
#         size:   Size of plot in inches in list format [width, height], default [4.5, 3.89]
#         figResolution:Resolution of the output figure, 600 dpi
#
#     Returns:
#         Returns: Returns full name and path of output gif file
#     '''
#     # Set Duration for which plot is made
#
#     NewEngine = create_engine(DataBaseConnectionStrURL, poolclass=NullPool)
#     session = sessionmaker(bind=NewEngine)()
#
#     print(type(fps))
#     sourceDirDBCheck = ','.join(sourceDir)
#     QueryObj = session.query(MapImage).filter(MapImage.nc_file_name == sourceDirDBCheck,
#                                               MapImage.parameter_name == parameterName, MapImage.title == title,
#                                               MapImage.data_range == cast(array(dataRange), ARRAY(Float)),
#                                               MapImage.color_scheme == colorScheme,
#                                               MapImage.bounding_box == cast(array(boundingBox), ARRAY(Float)),
#                                               MapImage.tick_span == tickSpan,
#                                               MapImage.width == width, MapImage.height == height,
#                                               MapImage.fig_resolution == figResolution, MapImage.fps == fps)
#
#     countObject = QueryObj.count()
#     if (countObject):
#         print("inside")
#         for ij in QueryObj:
#             fileName = ij.image_filename
#             realPath = os.path.dirname(os.path.abspath(__file__))
#             completePath = os.path.join(realPath, 'workspaces', 'app_workspace', 'MapImage', fileName)
#             print(completePath)
#             if (os.path.exists(completePath)):
#                 return fileName
#             else:
#                 session.delete(ij)
#                 session.commit()
#     AllNetCDFList = sourceDir
#     AllNetCDFList.sort()
#     dataLength = len(AllNetCDFList)
#
#     # FileNumber=[0]
#
#     # noOfFrames = int(durationDays * 24 / dataInterval)
#     # fromDate=today - datetime.timedelta(days=(durationDays + 1))+datetime.timedelta(minutes=timeOffset)
#     # Plot Data
#     fig = plt.figure(figsize=(width, height))
#
#     def animate(frame):
#         # Fetch Nc File
#         print(frame)
#         fig.clear()
#         nc_fid = netCDF4.Dataset(AllNetCDFList[frame], 'r')  # Reading the netCDF file
#         time = nc_fid.variables['time'][:]
#         lis_var = nc_fid.variables
#         field = nc_fid.variables[parameterName][:]
#         # selectedData=None
#         for timestep, v in enumerate(time):
#             # Point query using pure netCDF4 lib
#             # selectedData=field[timestep]
#             dt_str = netCDF4.num2date(lis_var['time'][timestep], units=lis_var['time'].units,
#                                       calendar=lis_var['time'].calendar)
#             labelName = str(dt_str)
#             break
#
#         ncHandle = nc.Dataset(AllNetCDFList[frame], 'r')
#         selectedData = np.array(ncHandle.variables[parameterName][:][0])
#         mp = Basemap(projection='merc',
#                      llcrnrlon=boundingBox[0],
#                      llcrnrlat=boundingBox[1],
#                      urcrnrlon=boundingBox[2],
#                      urcrnrlat=boundingBox[3],
#                      resolution='i')
#         mp.drawparallels(np.arange(-180., 180., tickSpan), labels=[1, 0, 0, 0], linewidth=0.0)
#         mp.drawmeridians(np.arange(-180., 180., tickSpan), labels=[0, 0, 0, 1], linewidth=0.0)
#         plt.title(labelName + TimeZone)
#
#         # ncHandle = nc.Dataset(ncFile, 'r')
#         lats = None
#         lons = None
#         try:
#             lats = np.array(ncHandle.variables['latitude'][:])  # Defining the latitude array
#             lons = np.array(ncHandle.variables['longitude'][:])  # Defining the longitude array
#         except:
#             lats = np.array(ncHandle.variables['lat'][:])  # Defining the latitude array
#             lons = np.array(ncHandle.variables['lon'][:])  # Defining the longitude array
#         lon, lat = np.meshgrid(lons, lats)
#         x, y = mp(lon, lat)
#         c_scheme = mp.pcolormesh(x, y, selectedData, cmap=colorScheme, vmin=dataRange[0], vmax=dataRange[1])
#         if rid == 0:
#             mp.drawcoastlines()
#         else:
#             mp.drawcountries()
#         # cbar = mp.colorbar(c_scheme, location='bottom', pad='15%', extend='max',label=labelName)
#         cbar = mp.colorbar(c_scheme, location='bottom', pad='15%', extend='max', label=title)
#
#     anim = FuncAnimation(fig, animate, frames=dataLength, interval=1000, repeat=True)
#
#     outputFilePath = uuid.uuid1().__str__() + '.gif'
#     realPath = os.path.dirname(os.path.abspath(__file__))
#     realData = os.path.join(realPath, 'workspaces', 'app_workspace', 'MapImage', outputFilePath)
#     writer = PillowWriter(fps=fps)
#     anim.save(realData, writer=writer)
#     print(outputFilePath)
#     print(realData)
#     imageObj = MapImage(nc_file_name=sourceDirDBCheck, parameter_name=parameterName, title=title, data_range=dataRange,
#                         color_scheme=colorScheme, bounding_box=boundingBox, tick_span=tickSpan,
#                         width=width, height=height, fig_resolution=figResolution, image_filename=outputFilePath,
#                         fps=fps)
#
#     session.add(imageObj)
#     session.commit()
#
#     session.close()
#
#     return (outputFilePath)


def Export2DMapAnimation(AnimationInDataList, fps):
    realPath = os.path.dirname(os.path.abspath(__file__))

    dataLength = len(AnimationInDataList)
    # figResolution = 481
    figResolution = AnimationInDataList[0]['resolution']
    dateList = []

    SLD_Body = '<?xml version="1.0" encoding="ISO-8859-1"?><StyledLayerDescriptor version="1.1.0" xsi:schemaLocation="http://www.opengis.net/sldStyledLayerDescriptor.xsd" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:se="http://www.opengis.net/se" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:resc="http://www.resc.reading.ac.uk"><NamedLayer><se:Name>red</se:Name><UserStyle><se:Name>Thesholded colour scheme</se:Name><se:CoverageStyle><se:Rule><resc:RasterRGBSymbolizer><se:Opacity>1.0</se:Opacity><se:ColorMap><resc:RedBand><resc:BandName>red</resc:BandName><resc:Range><resc:Minimum>0</resc:Minimum><resc:Maximum>255</resc:Maximum></resc:Range></resc:RedBand><resc:GreenBand><resc:BandName>green</resc:BandName><resc:Range><resc:Minimum>0</resc:Minimum><resc:Maximum>255</resc:Maximum></resc:Range></resc:GreenBand><resc:BlueBand><resc:BandName>blue</resc:BandName><resc:Range><resc:Minimum>1</resc:Minimum><resc:Maximum>255</resc:Maximum><resc:Spacing>linear</resc:Spacing></resc:Range></resc:BlueBand></se:ColorMap></resc:RasterRGBSymbolizer></se:Rule></se:CoverageStyle></UserStyle></NamedLayer></StyledLayerDescriptor>'
    fig = plt.figure()

    # Set the extent based on the WMS layer bounding box
    def animate(frame):
        print(frame)
        fig.clear()
        ax = fig.add_subplot(1, 1, 1, projection=ccrs.PlateCarree())
        wms_url = AnimationInDataList[frame]['wms_url']
        wms_layer = AnimationInDataList[frame]['wms_layer']
        wms_time = AnimationInDataList[frame]['wms_time']
        wms_style = AnimationInDataList[frame]['wms_style'] if 'wms_style' in AnimationInDataList[frame].keys() else ''
        wms_NUMCOLORBANDS = AnimationInDataList[frame]['wms_NUMCOLORBANDS'] if 'wms_NUMCOLORBANDS' in \
                                                                               AnimationInDataList[frame].keys() else 20
        ColorScale = AnimationInDataList[frame]['ColorScale'] if 'ColorScale' in AnimationInDataList[
            frame].keys() else ''
        title_text = AnimationInDataList[frame]['title_text']
        bottom_text = AnimationInDataList[frame]['bottom_text']
        bbox = AnimationInDataList[frame]['bbox']
        IsRGB = AnimationInDataList[frame]["RGB"] if "RGB" in AnimationInDataList[frame].keys() else False
        positionLegend = AnimationInDataList[frame]["positionLegend"] if "positionLegend" in AnimationInDataList[
            frame].keys() else [0.85, 0.10, 0.15, 0.78]

        ax_h, ax_w = ax.bbox.height, ax.bbox.width

        ax.set_extent([bbox[0], bbox[2], bbox[1], bbox[3]])

        plt.title(title_text, fontsize=16, fontweight='bold', loc='center')

        plt.text(0.5, 0.025, bottom_text, fontsize=12, ha='center', va='center', transform=fig.transFigure)

        if (IsRGB):
            # Add the WMS layer to the map
            ax.add_wms(wms_url, layers=[wms_layer], alpha=1, wms_kwargs={
                "TIME": wms_time,
                "SLD_BODY": SLD_Body,
                "STYLES": wms_style
            })
        else:
            ax.add_wms(wms_url, layers=[wms_layer], alpha=1, wms_kwargs={"STYLES": wms_style,
                                                                         "COLORSCALERANGE": ColorScale,
                                                                         "TIME": wms_time,
                                                                         "NUMCOLORBANDS": wms_NUMCOLORBANDS
                                                                         })
        dateList.append(wms_time)
        # # Add gridlines and parallels
        gl = ax.gridlines(draw_labels=False, color='black', alpha=0)
        gl.xlabels_left = True
        gl.ylabels_bottom = True
        gl.xlabels_top = False
        gl.ylabels_right = False

        # Extract gridline tick positions
        x_ticks = gl.xlocator.tick_values(bbox[0], bbox[2])
        y_ticks = gl.ylocator.tick_values(bbox[1], bbox[3])

        # Explicitly define tick positions and labels for the x-axis
        ax.set_xticks(x_ticks)
        ax.set_xticklabels([f'{int(tick)}°E' if tick >= 0 else f'{int(-tick)}°W' for tick in x_ticks])

        # Explicitly define tick positions and labels for the y-axis
        ax.set_yticks(y_ticks)
        ax.set_yticklabels([f'{int(tick)}°N' if tick >= 0 else f'{int(-tick)}°S' for tick in y_ticks])

        # Manually construct the legend URL
        legend_url = f"{wms_url}?REQUEST=GetLegendGraphic&LAYER={wms_layer}&FORMAT=image/png&STYLES={wms_style}&COLORSCALERANGE={ColorScale}&TIME={wms_time}&WIDTH=30&HEIGHT=500&NUMCOLORBANDS={wms_NUMCOLORBANDS}"

        print(legend_url)

        if (not IsRGB):
            response = requests.get(legend_url)
            image = Image.open(BytesIO(response.content))

            # Get the dimensions of the original image
            width, height = image.size

            # Define the width of the white region to be added
            white_width = -19  # You can adjust this value

            # Create a new image with increased width
            new_width = width + white_width
            new_image = Image.new("RGBA", (new_width, height), color="white")

            # Paste the original image onto the new image
            new_image.paste(image, (0, 0))

            # Convert PIL image to NumPy array
            img_array = np.array(new_image)

            # Get figure size in inches
            fig_size = fig.get_size_inches()
            # Calculate ax_h and ax_w as fractions of figure size
            ax_h_fraction = ax_h / (fig_size[1] * 100)
            ax_w_fraction = ax_w / (fig_size[0] * 100)

            fig.subplots_adjust(right=0.8)  # Adjust the value as needed
            # cax = fig.add_axes(
            #     [0.85, (1 - ax_w_fraction) / 2, 0.085, ax_h_fraction])  # Adjust the position as needed

            cax = fig.add_axes(positionLegend)  # Adjust the position as needed

            cax.imshow(img_array)
            cax.axis('off')

            # Add additional features if needed (coastlines, borders, etc.)
            ax.coastlines(resolution='10m', color='black', linewidth=1)

    anim = FuncAnimation(fig, animate, frames=dataLength, interval=1000, repeat=True)

    outputFilePath = uuid.uuid1().__str__() + '.gif'

    realData = os.path.join(realPath, 'workspaces', 'app_workspace', 'Animation', 'ImageFolder', outputFilePath)
    writer = PillowWriter(fps=fps)
    anim.save(realData, writer=writer, dpi=figResolution)
    returnValue = {'date': dateList, 'ImagePath': realData}
    return returnValue


def TimeSeriesModelDataCompute(collectionDir, parameterName, wkt, WKTType):
    AllNetCDFList = collectionDir
    seriesData = []
    AllDates = []
    AllNetCDFList.sort()
    for i in AllNetCDFList:
        nc_fid = netCDF4.Dataset(i, 'r')  # Reading the netCDF file
        lis_var = nc_fid.variables

        lats = None
        lons = None

        try:
            lats = nc_fid.variables['latitude'][:]  # Defining the latitude array
            lons = nc_fid.variables['longitude'][:]  # Defining the longitude array
        except:
            lats = nc_fid.variables['lat'][:]  # Defining the latitude array
            lons = nc_fid.variables['lon'][:]  # Defining the longitude array

        field = nc_fid.variables[parameterName][:]  # Defning the variable array
        time = nc_fid.variables['time'][:]

        deltaLats = lats[1] - lats[0]
        deltaLons = lons[1] - lons[0]

        deltaLatsAbs = numpy.abs(deltaLats)
        deltaLonsAbs = numpy.abs(deltaLons)

        if WKTType == 'Point':
            stn_lat = float(wkt.split("(")[1].split(")")[0].split(" ")[1])
            stn_lon = float(wkt.split("(")[1].split(")")[0].split(" ")[0])
            abslat = numpy.abs(lats - stn_lat)  # Finding the absolute latitude
            abslon = numpy.abs(lons - stn_lon)  # Finding the absolute longitude

            lat_idx = (abslat.argmin())
            lon_idx = (abslon.argmin())

        geotransform = rio.transform.from_origin(lons.min(), lats.max(), deltaLatsAbs, deltaLonsAbs)

        for timestep, v in enumerate(time):

            nc_arr = field[timestep]
            nc_arr[nc_arr < -9000] = numpy.nan  # use the comparator to drop nodata fills
            if deltaLats > 0:
                nc_arr = nc_arr[::-1]  # vertically flip array so tiff orientation is right (you just have to, try it)

            dt_str = netCDF4.num2date(lis_var['time'][timestep], units=lis_var['time'].units,
                                      calendar=lis_var['time'].calendar)

            strTime = str(dt_str)
            dt_str = datetime.datetime.strptime(strTime, '%Y-%m-%d %H:%M:%S')
            dateInmillisecond = dt_str.timestamp() * 1000
            AllDates.append(dt_str.date())

            interestedValue = None
            if WKTType == 'Polygon':
                tt = rstats.zonal_stats(wkt, nc_arr, affine=geotransform, stats='mean')
                interestedValue = tt[0]['mean']
            else:
                a = field[timestep, lat_idx, lon_idx]
                if np.isnan(a):
                    interestedValue = False
                else:
                    b = str(a)
                    interestedValue = float(b)
            # print("hello")

            if interestedValue:
                # strTime=str(dt_str)
                # print(strTime)
                # dt_str=datetime.datetime.strptime(strTime, '%Y-%m-%d %H:%M:%S')
                # dateInmillisecond = dt_str.timestamp() * 1000
                value = round(interestedValue, 3)
                seriesData.append([int(dateInmillisecond), value])
                # AllDates.append(dt_str.date())
            else:
                seriesData.append([int(dateInmillisecond), None])

        nc_fid.close()
    # print(seriesData)
    XaxisLabel = None
    try:
        XaxisLabel = 'From ' + str(AllDates[0]) + " To " + str(AllDates[-1])
    except:
        XaxisLabel = 'From - To - '
    return {"SeriesData": seriesData, "status": 200, "XaxisLabel": XaxisLabel}


def getDatetimeObject(dt):
    dtObj = None
    if (dt[-9] == '-'):
        dtObj = datetime.datetime.strptime(dt, '%Y-%m-%d-%H-%M')
    else:
        dtObj = datetime.datetime.strptime(dt, '%Y-%m-%d')

    return dtObj


def SliceFromCatalog(url, data_ext, startDate, endDate):
    '''
    Args:
        url: catalog url
        data_ext: file extension
        startDate: start date for slice
        endDate: end date for slice

    Returns: list of sliced
    '''

    # html = parse(url).getroot()
    # list = []
    # for count in html.cssselect('a'):
    #     l = count.text_content()
    #     list.append(l)

    auth = HTTPBasicAuth('smogTomcat', 'sm0gT0McaT103#')
    tree = ET.fromstring(requests.get(url, auth=auth, verify=False).text)
    list = []

    for c in tree.iter():
        l = c.get('name')
        list.append(l)

    new = [x for x in list if (x is None) == False]
    new_list = []
    for l in filter(lambda x: x.endswith(data_ext), new):
        new_list.append(l)

    final = []
    check = (new_list[0])[-12]
    addIndex = 0
    if data_ext == ".ncml":
        addIndex = -2

    if (startDate[-9 ] == '-' and endDate[-9 ] == '-'):
        startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d-%H-%M')
        endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d-%H-%M')
    elif (startDate[-9 ] == '-'):
        startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d-%H-%M')
        endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d')
    elif (endDate[-9 ] == '-'):
        startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d')
        endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d-%H-%M')
    else:
        startDate = datetime.datetime.strptime(startDate, '%Y-%m-%d')
        endDate = datetime.datetime.strptime(endDate, '%Y-%m-%d')

    if check == '-':
        for i in range(len(new_list)):
            x = new_list[i][-19 + addIndex:-3 + addIndex]
            if (x >= startDate.strftime("%Y-%m-%d-%H-%M") and x <= endDate.strftime("%Y-%m-%d-%H-%M")):
                y = new_list[i]
                final.append(y)
    else:
        for i in range(len(new_list)):
            x = new_list[i][-13 + addIndex:-3 + addIndex]
            if (x >= startDate.strftime("%Y-%m-%d") and x <= endDate.strftime("%Y-%m-%d")):
                y = new_list[i]
                final.append(y)

    final.sort()
    return final


def SliceFromCatalogForecastUt(url, data_ext, runDate):
    '''
    Args:
        url: catalog url
        data_ext: file extension
        runDate: forcaste run date
    Returns: list of sliced
    '''

    auth = HTTPBasicAuth('smogTomcat', 'sm0gT0McaT103#')
    finalList = []

    response = requests.get(url, auth=auth, verify=False)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the XML content using Beautiful Soup
        xml_content = response.text
        soup = BeautifulSoup(xml_content, 'xml')  # 'xml' is used to specify the XML parser

        # Now you can work with the parsed XML data using Beautiful Soup methods
        # For example, you can find elements by tag name
        elements = soup.find_all('catalogRef', attrs={"xlink:title": True})

        DateHavingCatalog = None
        for element in elements:
            if (element['name'] == runDate):
                DateHavingCatalog = element['xlink:href']
                break
        if (DateHavingCatalog):
            DateCatalogPath = url.replace('catalog.xml', DateHavingCatalog)
            response = requests.get(DateCatalogPath, auth=auth, verify=False)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'xml')  # 'xml' is used to specify the XML parser
                elements_Dataset = soup.find_all('dataset', attrs={"urlPath": True})
                for ii in elements_Dataset:
                    finalList.append(ii["name"])
                    print("Hello")

    else:
        print(f'Failed to fetch the XML from {url}. Status code: {response.status_code}')

    finalList.sort()
    return finalList


def getDefaultStation(typeName, sd, ed):
    defaultStation = [8, 3, 5, 9]
    NewEngine = create_engine(DataBaseConnectionStrURL, poolclass=NullPool)
    session = sessionmaker(bind=NewEngine)()
    typeName = typeName
    startDate = getDatetimeObject(sd)
    endDate = getDatetimeObject(ed)
    stList = []
    try:
        myQuery = session.query(UsEmbassyDataList.st_id, func.count(UsEmbassyDataList.st_id)).filter(
            UsEmbassyDataList.type == typeName,
            func.date(UsEmbassyDataList.date_time) >= startDate,
            func.date(UsEmbassyDataList.date_time) < endDate).group_by(UsEmbassyDataList.st_id).order_by(
            desc(func.count(UsEmbassyDataList.st_id)))
        for i in myQuery:
            stList.append(i[0])
    except:
        traceback.print_exc()
    finally:
        session.close()
    NdefaultStation = defaultStation
    for jj in defaultStation:
        if jj in stList == False:
            NdefaultStation.append(jj)
    return NdefaultStation[-4:]


def computePopulation(mf, dataPath, wkt, geometryType):
    allCatog = [{'fileNameWith': '_0_', 'age': '0-1'},
                {'fileNameWith': '_1_', 'age': '1-4'},
                {'fileNameWith': '_5_', 'age': '5-9'},
                {'fileNameWith': '_10_', 'age': '10-14'},
                {'fileNameWith': '_15_', 'age': '15-19'},
                {'fileNameWith': '_20_', 'age': '20-24'},
                {'fileNameWith': '_25_', 'age': '25-29'},
                {'fileNameWith': '_30_', 'age': '30-34'},
                {'fileNameWith': '_35_', 'age': '35-39'},
                {'fileNameWith': '_40_', 'age': '40-44'},
                {'fileNameWith': '_45_', 'age': '45-49'},
                {'fileNameWith': '_50_', 'age': '50-54'},
                {'fileNameWith': '_55_', 'age': '55-59'},
                {'fileNameWith': '_60_', 'age': '60-64'},
                {'fileNameWith': '_65_', 'age': '65-69'},
                {'fileNameWith': '_70_', 'age': '70-74'},
                {'fileNameWith': '_75_', 'age': '75-79'},
                {'fileNameWith': '_80_', 'age': '80+'}, ]

    femaleDataList = glob.glob(dataPath + '/global_' + mf + '_*_1km.tif', recursive=True)
    femaleDataList.sort()
    geometry = loads(wkt)
    for jj in femaleDataList:
        for aa in allCatog:
            if aa['fileNameWith'] in jj:
                if geometryType == 'MultiPolygon' or geometryType == 'Polygon':
                    compute = rstats.zonal_stats(wkt, jj, stats=['sum'])
                    aa['value'] = int(compute[0]['sum'])
                else:
                    # Open the TIFF file using rasterio
                    with rio.open(jj) as src:
                        # Transform the latitude and longitude coordinates to pixel coordinates
                        row, col = src.index(geometry.x, geometry.y)

                        # Read the value at the given pixel coordinates
                        value = src.read(1, window=((row, row + 1), (col, col + 1)))
                        aa['value'] = int(value)
    return allCatog


def computePopulationCount(fileFullpath, wkt, geometryType):
    DataTotal = []
    year = int(fileFullpath.split('/')[-1].split('_')[1])
    # dateY = datetime.datetime(year, 1, 1)
    # dateInMilliSeconds = dateY.timestamp() * 1000
    DataTotal.append(year)
    geometry = loads(wkt)
    if geometryType == 'MultiPolygon' or geometryType == 'Polygon':
        compute = rstats.zonal_stats(wkt, fileFullpath, stats=['sum'])
        DataTotal.append(int(compute[0]['sum']))
    else:
        # Open the TIFF file using rasterio
        with rio.open(fileFullpath) as src:
            # Transform the latitude and longitude coordinates to pixel coordinates
            row, col = src.index(geometry.x, geometry.y)

            # Read the value at the given pixel coordinates
            value = src.read(1, window=((row, row + 1), (col, col + 1)))
            DataTotal.append(int(value))
    return DataTotal
