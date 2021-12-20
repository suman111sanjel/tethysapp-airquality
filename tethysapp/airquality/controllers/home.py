from django.shortcuts import render
from tethys_sdk.permissions import login_required
from tethys_sdk.gizmos import Button

def home(request):
    """
    Controller for the app home page.
    """

    context = {
    }

    return render(request, 'airquality/Created_airquality.html', context)