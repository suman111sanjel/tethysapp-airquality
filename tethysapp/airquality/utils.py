import os

import netCDF4
import numpy
import rasterio as rio
import datetime
import rasterstats as rstats

# geotiffdir='/home/suman/tethys3Apps/tethysapp-aqwatch/tethysapp/aqwatch'
def TimeSeriesModelDataCompute(completeFileName, parameterName, wkt,WKTType,stats='mean'):

    seriesData=[]
    AllDates=[]
    nc_fid = netCDF4.Dataset(completeFileName, 'r')  # Reading the netCDF file
    lis_var = nc_fid.variables

    lats=None
    lons=None

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

    if WKTType=='Point':
        stn_lat=float(wkt.split("(")[1].split(")")[0].split(" ")[1])
        stn_lon=float(wkt.split("(")[1].split(")")[0].split(" ")[0])
        abslat = numpy.abs(lats - stn_lat)  # Finding the absolute latitude
        abslon = numpy.abs(lons - stn_lon)  # Finding the absolute longitude

        lat_idx = (abslat.argmin())
        lon_idx = (abslon.argmin())

    minx = lons.min() - deltaLonsAbs / 2
    maxY = lats.max() + deltaLatsAbs / 2

    geotransform = rio.transform.from_origin(minx, maxY, deltaLatsAbs, deltaLonsAbs)

    for timestep, v in enumerate(time):

        nc_arr = field[timestep]
        nc_arr[nc_arr < -9000] = numpy.nan  # use the comparator to drop nodata fills
        if deltaLats > 0:
            nc_arr = nc_arr[::-1]  # vertically flip array so tiff orientation is right (you just have to, try it)

        dt_str = netCDF4.num2date(lis_var['time'][timestep], units=lis_var['time'].units,
                                  calendar=lis_var['time'].calendar)


        # # Creates geotiff raster file (filepath, x-dimensions, y-dimensions, number of bands, datatype)
        # gtiffpath = os.path.join(geotiffdir, 'geotiffImageTest' + '.tif')
        #
        # with rio.open(gtiffpath, 'w', driver='GTiff', height=len(lats), width=len(lons), count=1, dtype='float32',
        #                    nodata=numpy.nan, crs='+proj=latlong', transform=geotransform) as newtiff:
        #     newtiff.write(nc_arr, 1)  # data, band number

        strTime = str(dt_str)
        dt_str = datetime.datetime.strptime(strTime, '%Y-%m-%d %H:%M:%S')
        dateInmillisecond = dt_str.timestamp() * 1000
        AllDates.append(dt_str.date())

        interestedValue=None
        if WKTType == 'Polygon' or  WKTType ==  'MultiPolygon':
            tt = rstats.zonal_stats(wkt, nc_arr, affine=geotransform, stats=stats)
            interestedValue=tt[0][stats]
        else:
            a = field[timestep, lat_idx, lon_idx]
            if numpy.isnan(a):
                interestedValue=False
            else:
                b=str(a)
                interestedValue=float(b)
        print("hello")

        if interestedValue!=None:
            value = round(interestedValue, 3)
            seriesData.append([int(dateInmillisecond), value])
        else:
            seriesData.append([int(dateInmillisecond), None])

    nc_fid.close()
    return seriesData

    #
    # XaxisLabel=None
    # try:
    #     XaxisLabel = 'From ' + str(AllDates[0]) + " To " + str(AllDates[-1])
    # except:
    #     XaxisLabel = 'From - To - '
    # return {"SeriesData":seriesData,"status":200,"XaxisLabel":XaxisLabel}

