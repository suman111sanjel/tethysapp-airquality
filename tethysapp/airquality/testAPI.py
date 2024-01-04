# import netCDF4 as nc
# from netCDF4 import Dataset
# import numpy as np
# import xarray as xr
# import matplotlib.pyplot as plt
# import glob
# import os
# from shapely.geometry import Polygon
# #import geopandas as gpd
# from datetime import datetime
#
# # Replace 'your_file_path.nc' with the actual path to your NetCDF file
# #data_dir = glob.glob('/smogdata02/populationData/Processed/PopulationDensity/*.nc',recursive=True)
#
# # Directory containing the NetCDF files
# # data_dir = '/smogdata02/populationData/Processed/PopulationDensity/*.nc'
# data_dir = '/home/suman/ThreddsDataServerDataset/AQSmogdata02/populationData/Processed/PopulationDensity/*.nc'
# # Get a list of NetCDF files using glob
# nc_files = glob.glob(data_dir, recursive=True)
# nc_files.sort()
# #*********************************************
# # Latitude and Longitude of the point you're interested in
# target_latitude = 30.0
# target_longitude = 90.0
# #**************************************
# # Lists to store time and population density data
# time_series = []
# population_density_series = []
# # Loop through each NetCDF file
# for nc_file in nc_files:
#     # Open the NetCDF file
#     dataset = nc.Dataset(nc_file, 'r')
#         # Print the list of variables in the file
#     print(f"Variables in {nc_file}:")
#     for variable_name in dataset.variables:
#         print(variable_name)
#         # Find the latitude and longitude indices closest to the target point
#     latitudes = dataset.variables['latitude'][:]
#     longitudes = dataset.variables['longitude'][:]
#
#     lat_idx = (abs(latitudes - target_latitude)).argmin()
#     lon_idx = (abs(longitudes - target_longitude)).argmin()
#     # Assuming your data variable is named 'population_density'
#     data1 = dataset.variables['PopulationDensity'][:, lat_idx, lon_idx]
#     data =data1*1000
#     print(f"Data at latitude {target_latitude}, longitude {target_longitude} in {nc_file}:")
#     print(data)
#     # Read time variable
#     time_var = dataset.variables['time'][:]
#     reference_time_str = dataset.variables['time'].units.split(' ')[-2]  # Extract the reference time as a string
#     # Convert reference time string to datetime
#     reference_time = np.datetime64(reference_time_str)
#     # Convert time values to datetime objects
#     time = reference_time + np.timedelta64(1, 'h') * time_var  # Convert hours to timedelta
#     print (time)
#
#     # Append data to series lists
#     time_series.extend(time)
#     population_density_series.extend(data)
#     # Close the NetCDF file
#     dataset.close()
# # Create a time series plot
# plt.figure(figsize=(10, 6))
# plt.plot(time_series, population_density_series,linestyle='-', color='b')
# plt.xlabel('Time')
# plt.ylabel('Population Density')
# plt.title('Population Density Time Series')
# #plt.grid(True)
# plt.xticks(rotation=45)
# plt.tight_layout()
#
# # Display the plot
# plt.show()


from glob import glob
from rasterstats import zonal_stats
from rasterstats import point_query
import rasterio
from shapely.wkt import loads
from rasterio.features import geometry_mask


year = '2020'
# wkt = 'POINT (84.064839 26.995524)'
wkt = 'POINT (77.267088 28.717188)'
# wkt='POLYGON ((81 26, 86 26, 86 29, 81 29, 81 26))'
# 84.064839  26.995524
# type = 'Polygon'
type = 'Point'
geometry = loads(wkt)
AgeStructurePath = '/home/suman/ThreddsDataServerDataset/AQSmogdata02/populationData/raw_download/AgeAndSexStructure/' + year


def computePopulation(mf, dataPath, geometryType):
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
                {'fileNameWith': '_80_', 'age': '80+'},]

    femaleDataList = glob(dataPath + '/global_' + mf + '_*_1km.tif', recursive=True)
    femaleDataList.sort()
    for jj in femaleDataList:
        for aa in allCatog:
            if aa['fileNameWith'] in jj:
                if geometryType == 'MultiPolygon' or geometryType == 'Polygon':
                    compute = zonal_stats(wkt, jj, stats=['mean'])
                    aa['mean'] = round(compute[0]['mean'], 2)
                else:
                    # Open the TIFF file using rasterio
                    with rasterio.open(jj) as src:
                        # Transform the latitude and longitude coordinates to pixel coordinates
                        row, col = src.index(geometry.x,geometry.y)
                        # Read the value at the given pixel coordinates
                        value = src.read(1, window=((row, row + 1), (col, col + 1)))
                        aa['mean'] = value
    return allCatog


# MaleCompute = computePopulation('m', AgeStructurePath, type)
# FemaleCompute = computePopulation('f', AgeStructurePath, type)

# print(MaleCompute)
# print(FemaleCompute)

# {'fileNameWith': '_0_', 'age': '0-1', 'mean': 6.49},
# [{'fileNameWith': '_0_', 'age': '0-1', 'mean': 5.71},


# [{'fileNameWith': '_0_', 'age': '0-1', 'mean_rasterstat': 6.6},
# {'fileNameWith': '_0_', 'age': '0-1', 'mean_rasterstat': 5.81}


