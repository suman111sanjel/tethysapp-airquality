import netCDF4 as nc
from netCDF4 import Dataset
import numpy as np
import xarray as xr
import matplotlib.pyplot as plt
import glob
import os
from shapely.geometry import Polygon
#import geopandas as gpd
from datetime import datetime

# Replace 'your_file_path.nc' with the actual path to your NetCDF file
#data_dir = glob.glob('/smogdata02/populationData/Processed/PopulationDensity/*.nc',recursive=True)

# Directory containing the NetCDF files
#data_dir = '/smogdata02/populationData/Processed/AgeAndSexStructure/*.nc'
data_dir = '/home/suman/ThreddsDataServerDataset/AQSmogdata02/populationData/Processed/PopulationCount/*.nc'
# Get a list of NetCDF files using glob
nc_files = glob.glob(data_dir, recursive=True)
nc_files.sort()

#*********************************************
# Latitude and Longitude of the point you're interested in
target_latitude = 20.0
target_longitude = 80.0
#**************************************
# Variables you want to create bar plots for
variables_of_interest = ['PopulationCout']

# Dictionary to store aggregated data for each variable
variable_data = {var: [] for var in variables_of_interest}
aggregated_years = []
# Loop through each NetCDF file
for nc_file in nc_files:
    # Open the NetCDF file
    dataset = nc.Dataset(nc_file, 'r')
    # Find the latitude and longitude indices closest to the target point
    latitudes = dataset.variables['latitude'][:]
    longitudes = dataset.variables['longitude'][:]

    lat_idx = (abs(latitudes - target_latitude)).argmin()
    lon_idx = (abs(longitudes - target_longitude)).argmin()
    # Read data variables of interest and aggregate them
    for var in variables_of_interest:
        data = dataset.variables[var][:, lat_idx, lon_idx]
        variable_data[var].append(data.mean())  # Example: Using mean aggregation
    print (data)
    # Read time variable
    time_var = dataset.variables['time'][:]
    reference_time_str = dataset.variables['time'].units.split(' ')[-2]  # Extract the reference time as a string
    # Convert reference time string to datetime
    reference_time = np.datetime64(reference_time_str)
    # Convert time values to datetime objects
    time = reference_time + np.timedelta64(1, 'h') * time_var  # Convert hours to timedelta
    # Extract the year from the datetime object
    year = time[0].astype('datetime64[Y]').astype(int) + 1970
    print(year)

    # Append data to series lists
    aggregated_years.append(year)
    #aggregated_data.append(data1)
    # Close the NetCDF file
    dataset.close()

# Create bar plots
for var in variables_of_interest:
    plt.figure(figsize=(10, 6))
    plt.bar(aggregated_years, variable_data[var])
    plt.xlabel('Time')
    plt.ylabel(var)
    plt.title(f'{var} Bar Plot')
    #plt.xticks(np.arange(len(nc_files)), [f'File {i+1}' for i in range(len(nc_files))])
    plt.tight_layout()
    plt.show()