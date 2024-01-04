from django.http import JsonResponse
from rest_framework.authentication import TokenAuthentication, CSRFCheck, SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
import os
from sqlalchemy import func
from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import sessionmaker
from ..config import DataBaseConnectionStrURL
import traceback
from ..model import MajorCity,NepalCity
import ast


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getCityData(request):
    NewEngine = create_engine(DataBaseConnectionStrURL, poolclass=NullPool)
    session = sessionmaker(bind=NewEngine)()

    allLocationData = []
    status = 0

    try:
        AeronetDataQuery = session.query(MajorCity).all()
        for i in AeronetDataQuery:
            geoJSONCur = {
                'type': 'FeatureCollection',
                'crs': {
                    'type': 'name',
                    'properties': {'name': 'EPSG:3857'}
                },
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-87.650175, 41.850385]
                        },
                        'properties': {
                        }
                    }
                ]
            }
            geoJSONstr = session.query(func.ST_AsGeoJSON(func.ST_Transform(i.geom, 3857)))[0][0]
            geoJSON = ast.literal_eval(str(geoJSONstr))
            geoJSONCur['features'][0]['geometry']['coordinates'] = geoJSON["coordinates"]
            geoJSONCur['features'][0]['properties']['id'] = i.gid
            geoJSONCur['features'][0]['properties']['name'] = i.cities
            itemCur = {
                "value": i.gid,
                "label": i.cities,
                "geoJSON": geoJSONCur
            }
            allLocationData.append(itemCur)
        status = 200
    except:
        status = 500
        traceback.print_exc()
    finally:
        session.close()
    Data = {"status": status, "data": allLocationData}
    return JsonResponse(Data)
