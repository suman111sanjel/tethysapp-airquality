from django.shortcuts import render
from tethys_sdk.permissions import login_required
from tethys_sdk.gizmos import Button

def Recent(request):
    """
    Controller for the app home page.
    """

    context = {

    }

    return render(request, 'airquality/Created_airquality_recent.html', context)

def Archive(request):
    """
    Controller for the app home page.
    """

    context = {

    }

    return render(request, 'airquality/Created_airquality_archive.html', context)

def Forecast(request):
    """
    Controller for the app home page.
    """

    context = {

    }

    return render(request, 'airquality/Created_airquality_forecast.html', context)

def Emission(request):
    """
    Controller for the app home page.
    """

    context = {

    }

    return render(request, 'airquality/Created_emission.html', context)
