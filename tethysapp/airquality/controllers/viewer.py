from django.shortcuts import render
import json
from ..utilities import  GetCommonRequestData, regionGeojson, plotNcFile, gifNcFile, \
    TimeSeriesModelDataCompute, SliceFromCatalog,getGeoJSONStations,getGeoJSONSofOnetations
from ..config import DataDirLocation
from django.http import JsonResponse, HttpResponse
import ast
from dateutil import parser
import os
# from osgeo import gdal, ogr
from rest_framework.decorators import api_view, authentication_classes, permission_classes

import uuid
# import rioxarray
import xarray as xr
import rasterio as rio
# import geopandas as gpd
import rasterstats as rstats
import numpy
import netCDF4
from datetime import datetime
import base64
import shapely.wkt
from django.http import HttpResponse
import traceback

def getGeoJSONofStations(request):
    ModelClass=request.GET.get('ModelClass')
    data=getGeoJSONStations(ModelClass)
    return JsonResponse(data)

import urllib.request

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def WMSProxy(request,url):
    completeURL = str(request.build_absolute_uri())
    url=completeURL.split('/apps/airquality/WMSProxy/')[-1]
    url=url.replace('/wms/?Service','/wms?Service').replace('.ncml/?FORMAT','.ncml?FORMAT').replace('.ncml/?SERVICE','.ncml?SERVICE')
    request1 = urllib.request.Request(url)
    response = urllib.request.urlopen(request1).read()
    return HttpResponse(response ,content_type="image/png")


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getGeoJsonForOneSatation(request):
    ModelClass=request.GET.get('ModelClass')
    ModelClassDataList=request.GET.get('ModelClassDataList')
    typeName=request.GET.get('typeName')
    StartDate=request.GET.get('StartDate')
    EndDate=request.GET.get('EndDate')
    rid=request.GET.get('rid')
    data=getGeoJSONSofOnetations(ModelClass,ModelClassDataList,typeName,StartDate,EndDate,rid)
    return JsonResponse(data)

# def AeronetAODData(request):
#     """
#     Controller for the app home page.
#     """
#     allinformations = AeronetData()
#
#     return JsonResponse(allinformations)
#
# def USEmbassyPM(request):
#     """
#     Controller for the app home page.
#     """
#     allinformations = USEmbassyPMData()
#
#     return JsonResponse(allinformations)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def GetData(request):
    """
    Controller for the app home page.
    """

    allinformations = GetCommonRequestData(request.data)

    return JsonResponse(allinformations)

def GeojsonRegion(request):
    """
    Controller for the app home page.
    """
    id = int(request.GET.get('id'))
    allinformations = regionGeojson(id)
    return JsonResponse(allinformations)

def AOIPolygon(request):
    DataDir = ast.literal_eval(request.POST.get('DATADIR'))
    LAYER = ast.literal_eval(request.POST.get('LAYER'))
    POLYGON = ast.literal_eval(request.POST.get('POLYGON'))
    TIME = ast.literal_eval(request.POST.get('TIME'))
    alldata = {}
    ncFile = DataDirLocation + str(DataDir)
    BreakNow = False
    if '.ncml' in ncFile:
        ncFileDir = ncFile.replace('.ncml', '')
        ncFileNameList = os.listdir(ncFileDir)
        for fileName in ncFileNameList:
            ncFileTest = os.path.join(ncFileDir, fileName)
            nc_fid_test = netCDF4.Dataset(ncFileTest, 'r')  # Reading the netCDF file
            timeTest = nc_fid_test.variables['time'][:]
            lis_var_test = nc_fid_test.variables
            for timestep, v in enumerate(timeTest):

                # Point query using pure netCDF4 lib
                dt_str = netCDF4.num2date(lis_var_test['time'][timestep], units=lis_var_test['time'].units,
                                          calendar=lis_var_test['time'].calendar)

                dt = parser.parse(TIME, ignoretz=True)
                if dt == dt_str:
                    ncFile = ncFileTest
                    BreakNow = True
                    break
            if (BreakNow):
                break

    nc_fid = netCDF4.Dataset(ncFile, 'r')  # Reading the netCDF file
    lis_var = nc_fid.variables
    lats = nc_fid.variables['latitude'][:]  # Defining the latitude array
    lons = nc_fid.variables['longitude'][:]  # Defining the longitude array
    field = nc_fid.variables[LAYER][:]  # Defning the variable array
    time = nc_fid.variables['time'][:]

    deltaLats = lats[1] - lats[0]
    deltaLons = lons[1] - lons[0]

    deltaLatsAbs = numpy.abs(deltaLats)
    deltaLonsAbs = numpy.abs(deltaLons)

    geotransform = rio.transform.from_origin(lons.min(), lats.max(), deltaLatsAbs, deltaLonsAbs)

    for timestep, v in enumerate(time):

        # Point query using pure netCDF4 lib
        dt_str = netCDF4.num2date(lis_var['time'][timestep], units=lis_var['time'].units,
                                  calendar=lis_var['time'].calendar)
        print(dt_str)
        nc_arr = field[timestep]
        # nc_arr_vals = nc_arr.values
        nc_arr[nc_arr < -9000] = numpy.nan  # use the comparator to drop nodata fills
        if deltaLats > 0:
            nc_arr = nc_arr[::-1]  # vertically flip array so tiff orientation is right (you just have to, try it)

        stat = rstats.zonal_stats(POLYGON, nc_arr, affine=geotransform, stats='mean min max std')
        print(stat)
        print("---")
        alldata = {}
        if stat[0]["mean"]:
            alldata['mean'] = round(stat[0]["mean"], 3)
        else:
            alldata['mean'] = stat[0]["mean"]

        if stat[0]["min"]:
            alldata['min'] = round(stat[0]["min"], 3)
        else:
            alldata['min'] = stat[0]["min"]

        if stat[0]["max"]:
            alldata['max'] = round(stat[0]["max"], 3)
        else:
            alldata['max'] = stat[0]["max"]

        if stat[0]["std"]:
            alldata['std'] = round(stat[0]["std"], 3)
        else:
            alldata['std'] = stat[0]["std"]

        # alldata={item: round(value,3) for (item, value) in stat[0].items()}
        print("computation zonal Stat from array \n", stat)
        print("-------------------------------------------------------------------------")
        break

    nc_fid.close()
    return JsonResponse(alldata)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def GetMapIMAGE(request):
    wmsList = request.data.get('wmsList')
    LAYER = request.data.get('LAYER')
    TIME = request.data.get('TIME')
    BBOX = request.data.get('BBOX')
    COLORSCALERANGE = request.data.get('COLORSCALERANGE')
    Resolution = int(request.data.get('Resolution'))
    colorScheme = request.data.get('colorScheme')
    labelName = request.data.get('labelName')
    title = request.data.get('title')
    tickSpan = float(request.data.get('tickSpan'))
    width = float(request.data.get('width'))
    height = float(request.data.get('height'))
    rid = int(request.data.get('rid'))
    fileList=[]
    for i in wmsList:
        fileFullPath=os.path.join(DataDirLocation,i.split('/wms/')[-1])
        fileList.append(fileFullPath)
    dataRange = [float(i) for i in COLORSCALERANGE.split(',')]
    t1 = (datetime.now())
    # outputFile=""
    # outputFile = plotNcFile(fileList[0], parameterName=LAYER, title=title,
    #                         labelName=labelName, dataRange=dataRange, colorScheme=colorScheme, boundingBox=BBOX,
    #                         tickSpan=tickSpan, width=width, height=height, figResolution=Resolution)
    outputFile = plotNcFile(fileList[0], parameterName=LAYER, title=labelName,
                            labelName=title, dataRange=dataRange, colorScheme=colorScheme, boundingBox=BBOX,
                            tickSpan=tickSpan, width=width, height=height, figResolution=Resolution,rid=rid)

    t2 = (datetime.now())
    print("Time" + str((t2 - t1)))
    print(outputFile)
    alldata = {"image": outputFile}
    return JsonResponse(alldata)

from django.http import FileResponse

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def downloadImage(request):
    imageName = request.GET.get('ImageName')
    gif = request.GET.get('gif')
    realPath = os.path.dirname(os.path.abspath(__file__))
    completePath = os.path.join(realPath[:-11], 'workspaces', 'app_workspace', 'MapImage', imageName)
    content_type = None
    if gif:
        content_type='image/gif'
    else:
        content_type='image/png'
    zip_file = open(completePath, 'rb').read()
    response = HttpResponse(zip_file, content_type=content_type)
    return response

def Create_GIF_Map_IMAGE(request):
    DataDir = ast.literal_eval(request.POST.get('DATADIR'))
    LAYER = ast.literal_eval(request.POST.get('LAYER'))
    BBOX = ast.literal_eval(request.POST.get('BBOX'))
    COLORSCALERANGE = ast.literal_eval(request.POST.get('COLORSCALERANGE'))
    Resolution = int(request.POST.get('Resolution'))
    colorScheme = ast.literal_eval(request.POST.get('colorScheme'))
    TimeZone = ast.literal_eval(request.POST.get('TimeZone'))
    title = ast.literal_eval(request.POST.get('title'))
    tickSpan = float(request.POST.get('tickSpan'))
    width = float(ast.literal_eval(request.POST.get('width')))
    height = float(ast.literal_eval(request.POST.get('height')))
    fps = float(ast.literal_eval(request.POST.get('fps')))
    rid = int(request.POST.get('rid'))

    collectionDir = []
    for i in DataDir:
        di = os.path.join(DataDirLocation, i)
        collectionDir.append(di)

    dataRange = [float(i) for i in COLORSCALERANGE.split(',')]
    t1 = (datetime.now())
    # outputFile=""


    outputFile = gifNcFile(collectionDir, LAYER, title, dataRange, colorScheme=colorScheme, boundingBox=BBOX,
                           tickSpan=tickSpan,
                           width=width, height=height, fps=fps, figResolution=Resolution,rid=rid,TimeZone=TimeZone)

    t2 = (datetime.now())
    print("Time" + str((t2 - t1)))
    print(outputFile)
    alldata = {"image": outputFile}
    return JsonResponse(alldata)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def TimeSeriesModelSata(request):
    DataDir = request.data.get('DATADIR')
    LAYER = request.data.get('LAYER')
    wkt = request.data.get('wkt')
    WKTType = request.data.get('type')
    # ncFile = DataDirLocation + str(DataDir)
    # collectionDir = None
    # if '.ncml' in ncFile:
    #     collectionDir = ncFile.replace('.ncml', '')

    collectionDir = []
    for i in DataDir:
        di = os.path.join(DataDirLocation, i)
        collectionDir.append(di)

    Data = TimeSeriesModelDataCompute(collectionDir, LAYER, wkt,WKTType)
    if WKTType == 'Polygon':
        P = shapely.wkt.loads(wkt)
        bounds = P.bounds
        miny = float(bounds[1])
        minx = float(bounds[0])
        maxx = float(bounds[2])
        maxy = float(bounds[3])
        geom = str(round(minx, 2)) + ',' + str(round(miny, 2)) + ',' + str(round(maxx, 2)) + ',' + str(round(maxy, 2))
        Data["geom"]= "at " + str(geom)
    else:
        P = shapely.wkt.loads(wkt)
        lon=P.x
        lat=P.y
        geom = str(round(lon, 2)) + ',' + str(round(lat, 2))
        Data["geom"]= "at " + geom
    print(Data)
    return JsonResponse(Data)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def SlicedFromCatalog(request):
    url = request.data.get('url')
    data_ext = request.data.get('data_ext')
    endDate = request.data.get('endDate')
    startDate = request.data.get('startDate')
    data={}
    try:
        data["data"]=SliceFromCatalog(url, data_ext, startDate, endDate)
        data["status"]=200
    except:
        data["status"]=500
        data["error"]='internal Server error'
        traceback.print_exc()
    return JsonResponse(data)
