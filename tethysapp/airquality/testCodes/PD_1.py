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
data_dir = '/home/suman/ThreddsDataServerDataset/AQSmogdata02/populationData/Processed/PopulationDensity/*.nc'

# Get a list of NetCDF files using glob
nc_files = glob.glob(data_dir, recursive=True)
nc_files.sort()
#*********************************************
# Latitude and Longitude of the point you're interested in
target_latitude = 30.0
target_longitude = 90.0
#**************************************
# Lists to store time and population density data
time_series = []
population_density_series = []
# Loop through each NetCDF file
for nc_file in nc_files:
    # Open the NetCDF file
    dataset = nc.Dataset(nc_file, 'r')
        # Print the list of variables in the file
    print(f"Variables in {nc_file}:")
    for variable_name in dataset.variables:
        print(variable_name)
        # Find the latitude and longitude indices closest to the target point
    latitudes = dataset.variables['latitude'][:]
    longitudes = dataset.variables['longitude'][:]

    lat_idx = (abs(latitudes - target_latitude)).argmin()
    lon_idx = (abs(longitudes - target_longitude)).argmin()
    # Assuming your data variable is named 'population_density'
    data1 = dataset.variables['PopulationDensity'][:, lat_idx, lon_idx]
    data =data1*1000
    print(f"Data at latitude {target_latitude}, longitude {target_longitude} in {nc_file}:")
    print(data)
    # Read time variable
    time_var = dataset.variables['time'][:]
    reference_time_str = dataset.variables['time'].units.split(' ')[-2]  # Extract the reference time as a string
    # Convert reference time string to datetime
    reference_time = np.datetime64(reference_time_str)
    # Convert time values to datetime objects
    time = reference_time + np.timedelta64(1, 'h') * time_var  # Convert hours to timedelta
    print (time)

    # Append data to series lists
    time_series.extend(time)
    population_density_series.extend(data)
    # Close the NetCDF file
    dataset.close()
# Create a time series plot
plt.figure(figsize=(10, 6))
plt.plot(time_series, population_density_series,linestyle='-', color='b')
plt.xlabel('Time')
plt.ylabel('Population Density')
plt.title('Population Density Time Series')
#plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()

# Display the plot
plt.show()