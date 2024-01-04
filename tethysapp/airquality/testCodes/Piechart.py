import netCDF4 as nc
import matplotlib.pyplot
from netCDF4 import Dataset
import numpy as np
import xarray as xr
import matplotlib.pyplot as plt
import glob
import os
from shapely.geometry import Polygon

# List of NetCDF files
data_dir= '/smogdata02/populationData/Processed/AgeAndSexStructure/*.nc'
# Get a list of NetCDF files using glob
nc_files = glob.glob(data_dir, recursive=True)
nc_files.sort()


# List of variables to extract and plot as pie charts
variables_name = ["AllChild", "AllAdult", "AllOld"]

# Latitude and Longitude of the point you're interested in
target_latitude = 30.0
target_longitude = 90.0
#**************************************
# Dictionary to hold aggregated variable data
aggregated_years= []
aggregated_data = []

# Create a figure and axis for the pie chart
fig, ax = plt.subplots(figsize=(8, 8))
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
    data1 = dataset.variables['AllChild'][:, lat_idx, lon_idx]
    data2 = dataset.variables['AllAdult'][:, lat_idx, lon_idx]
    data3 = dataset.variables['AllOld'][:, lat_idx, lon_idx]
    print (data1)
    print (data2)
    print (data3)
    print(f"Data at latitude {target_latitude}, longitude {target_longitude} in {nc_file}:")
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
    aggregated_data.append(data1)
    aggregated_data.append(data2)
    aggregated_data.append(data3)
    # Close the NetCDF file
    dataset.close()
    # Create pie charts for different years
    unique_years = np.unique(aggregated_years)
    for year in unique_years:
        year_indices = [i for i, y in enumerate(aggregated_years) if y == year]

        year_data1 = [aggregated_data[i] for i in year_indices]
        year_data2 = [aggregated_data[i + len(aggregated_years)] for i in year_indices]
        year_data3 = [aggregated_data[i + 2 * len(aggregated_years)] for i in year_indices]

        sizes = [np.sum(year_data1), np.sum(year_data2), np.sum(year_data3)]
        labels = ['AllChild', 'AllAdult', 'AllOld']
        colors = ['gold', 'lightblue', 'lightcoral']

        fig, ax = plt.subplots(figsize=(8, 8))
        #ax.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
        #wedges, texts, autotexts = ax.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
        wedges, texts, autotexts = ax.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140,\
                                          textprops=dict(fontsize=12, fontweight='bold'))

        for text in texts:
            text.set_fontsize(16)  # Adjust the font size of the labels outside the pie chart
            text.set_fontweight('bold')

        # Increase font size of autopct values
        for autotext in autotexts:
            autotext.set_fontsize(15)  # You can adjust the font size as needed
            autotext.set_fontweight('bold')
        ax.axis('equal')
        ax.set_title(f'Year {year}',fontsize=16, fontweight='bold')
        plt.show()