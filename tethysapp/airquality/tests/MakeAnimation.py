from sqlalchemy import cast
from sqlalchemy import Float, BigInteger

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
from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import sessionmaker




# def gifNcFile(sourceDir, today, gifFile,  parameterName, variableName, title, dataRange, durationDays=7, dataInterval=24, timeOffset=0, fps=1, colorScheme='jet', boundingBox=[60, 15, 110, 40],tickSpan=10, size=[4.5,3.89],figResolution=600):
def gifNcFile(sourceDir, parameterName, title, dataRange, colorScheme='jet', boundingBox=[60, 15, 110, 40], tickSpan=10,
              width=4.5, height=3.89, fps=1, figResolution=600, rid=0, TimeZone=None):
    '''

    Args:
        sourceDir:  Folder Containing data files
        today:  current date in format datetime
        gifFile:    full path and name of output .gif file
        parameterName:  name of parameter e.g. TerraModis-AOD, GEOS-PM2p5
        variableName:   name of the variable in nc file. e.g. 'aod_550', 'PM2p5'
        title:  Title of the plot
        dataRange:  range of valid data as [min, max], e.g. [0, 100]
        durationDays:   (in days) no. of days for which archive/forecast is considered. e.g. 7 days, for forecast-> -2 days
        dataInterval:   (in hours) Interval between consecutive data. e.g. for TerraModis-> 24 hrs, for GEOS archive-> 6 hrs, for GEOS forecast-> 3 hrs
        timeOffset:     (in minutes) # First data for GEOS-PM2p5 comes each day at 00:30 so timeOffset=30, for other data, timeOffset=0
        fps:        frame per second
        colorScheme:    Name of Color scheme, eg.g 'jet'
        boundingBox:    Bounding  box list  in format [llcrnrlon, llcrnrlat, urcrnrlon, urcrnrlat]
        tickSpan:   gap between ticks in terms of degree, e.g. 10
        size:   Size of plot in inches in list format [width, height], default [4.5, 3.89]
        figResolution:Resolution of the output figure, 600 dpi

    Returns:
        Returns: Returns full name and path of output gif file
    '''
    # Set Duration for which plot is made


    print(type(fps))
    sourceDirDBCheck = ','.join(sourceDir)


    # FileNumber=[0]

    # noOfFrames = int(durationDays * 24 / dataInterval)
    # fromDate=today - datetime.timedelta(days=(durationDays + 1))+datetime.timedelta(minutes=timeOffset)
    # Plot Data
    fig = plt.figure(figsize=(width, height))



    outputFilePath = uuid.uuid1().__str__() + '.gif'
    realPath = os.path.dirname(os.path.abspath(__file__))
    realData = os.path.join(realPath, 'workspaces', 'app_workspace', 'MapImage', outputFilePath)
    writer = PillowWriter(fps=fps)
    print(outputFilePath)
    print(realData)

    return (outputFilePath)
