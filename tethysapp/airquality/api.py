from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.http import JsonResponse
from .config import DataDir, PopulationDataDir
from .dataInfo import SectorListAll, PollutantListAll
from glob import glob
import os

from .utilities import computePopulation, computePopulationCount
from .utils import TimeSeriesModelDataCompute
from shapely import wkt


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getCascaderData(request):
    EmissionDir = os.path.join(DataDir, 'emission_data')
    InventriesList = os.listdir(EmissionDir)
    responseData = {}
    # ***************************
    # sector share and sector contribution
    # ****************************
    FirstSectorShareAndSectorContribution = []
    SecondTimeSeriesList = []
    for inv in InventriesList:
        FirstInvDic = {"value": inv,
                       "label": inv,
                       "children": []
                       }
        SecondInvDic = {"value": inv,
                        "label": inv,
                        "children": []
                        }
        pollutanDir = os.path.join(EmissionDir, inv)
        pollutantList = os.listdir(pollutanDir)
        for pollu in pollutantList:
            FirstPolluDic = {"value": pollu,
                             "label": pollu,
                             "children": []
                             }
            SecondPolluDic = {"value": pollu,
                              "label": pollu,
                              "children": []
                              }
            YearlySectorDataDir = os.path.join(pollutanDir, pollu)
            YearlySectorDataList = os.listdir(YearlySectorDataDir)
            YearlySectorDataList.sort()
            for fileName in YearlySectorDataList:
                yyyy = fileName[-7:-3]
                yyyyDic = {"value": yyyy,
                           "label": yyyy,
                           }
                FirstPolluDic["children"].append(yyyyDic)

            for sect in SectorListAll:
                sectDic = {"value": sect,
                           "label": sect,
                           }
                SecondPolluDic["children"].append(sectDic)
            FirstInvDic["children"].append(FirstPolluDic)
            SecondInvDic["children"].append(SecondPolluDic)
        FirstSectorShareAndSectorContribution.append(FirstInvDic)
        SecondTimeSeriesList.append(SecondInvDic)
    responseData["SectorShare"] = FirstSectorShareAndSectorContribution
    responseData["SectorContribution"] = FirstSectorShareAndSectorContribution
    responseData["TimeSeries"] = SecondTimeSeriesList

    # ***************************
    ThirdInventriesComparison = []
    for pollut in PollutantListAll:
        PolluDic = {"value": pollut,
                    "label": pollut,
                    "children": []
                    }
        for sect in SectorListAll:
            sectDic = {"value": sect,
                       "label": sect,
                       "children": []
                       }

            # EmissionDir = os.path.join(DataDir, 'emission_data')
            EmissionDir = DataDir + '/emission_data/*/' + pollut + "/*"
            dataDirLists = glob(EmissionDir)
            dataNewDates = [dd[-7:-3] for dd in dataDirLists]
            unique_list = []
            # traverse for all elements
            for x in dataNewDates:
                # check if exists in unique_list or not
                if x not in unique_list:
                    unique_list.append(x)

            for dd in unique_list:
                dateDic = {"value": dd,
                           "label": dd
                           }
                sectDic["children"].append(dateDic)

            PolluDic["children"].append(sectDic)
        ThirdInventriesComparison.append(PolluDic)

    responseData["InventriesComparison"] = ThirdInventriesComparison
    return JsonResponse(responseData)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def getChartDataProcess(request):
    responseData = {}
    data = request.data
    if data["plotType"] == "SectorShare":
        fileName = data["cascaderValue"][0] + "_" + data["cascaderValue"][1] + "_" + data["cascaderValue"][2] + ".nc"
        DataPath = os.path.join(DataDir, 'emission_data', data["cascaderValue"][0], data["cascaderValue"][1], fileName)

        D1 = TimeSeriesModelDataCompute(DataPath, 'Energy', data["wkt"], data["geometryType"], stats="sum")
        D2 = TimeSeriesModelDataCompute(DataPath, 'Industry', data["wkt"], data["geometryType"], stats="sum")
        D3 = TimeSeriesModelDataCompute(DataPath, 'Residential', data["wkt"], data["geometryType"], stats="sum")
        D4 = TimeSeriesModelDataCompute(DataPath, 'Transport', data["wkt"], data["geometryType"], stats="sum")

        if data["geometryType"] == 'Polygon' and D1[0][1] == None and D2[0][1] == None and D3[0][1] == None and D4[0][
            1] == None:
            geomPolygon = wkt.loads(data["wkt"])
            geomPoint = geomPolygon.centroid
            D1 = TimeSeriesModelDataCompute(DataPath, 'Energy', geomPoint, data["geometryType"], stats="sum")
            D2 = TimeSeriesModelDataCompute(DataPath, 'Industry', geomPoint, data["geometryType"], stats="sum")
            D3 = TimeSeriesModelDataCompute(DataPath, 'Residential', geomPoint, data["geometryType"], stats="sum")
            D4 = TimeSeriesModelDataCompute(DataPath, 'Transport', geomPoint, data["geometryType"], stats="sum")

        if D1[0][1] == None:
            D1[0][1] = 0
        if D2[0][1] == None:
            D2[0][1] = 0
        if D3[0][1] == None:
            D3[0][1] = 0
        if D4[0][1] == None:
            D4[0][1] = 0

        # print(D1[0][1])
        # print(D2[0][1])
        print("D3")
        # print(D3[0][1])
        # print(D4[0][1])
        DTotal = D4[0][1] + D3[0][1] + D2[0][1] + D1[0][1]
        if DTotal == 0:
            responseData["status"] = "Not ok"
            responseData["code"] = 500
        else:
            responseData["data"] = [{"name": 'Energy',
                                     "y": D1[0][1] * 100 / DTotal},
                                    {"name": 'Industry', "y": D2[0][1] * 100 / DTotal},
                                    {"name": 'Residential', "y": D3[0][1] * 100 / DTotal},
                                    {"name": 'Transport', "y": D4[0][1] * 100 / DTotal}]
            responseData["code"] = 200
            responseData["status"] = "ok"
    if data["plotType"] == "SectorContribution":
        fileName = data["cascaderValue"][0] + "_" + data["cascaderValue"][1] + "_" + data["cascaderValue"][2] + ".nc"
        DataPath = os.path.join(DataDir, 'emission_data', data["cascaderValue"][0], data["cascaderValue"][1], fileName)

        D1 = TimeSeriesModelDataCompute(DataPath, 'Energy', data["wkt"], data["geometryType"], stats='sum')
        D2 = TimeSeriesModelDataCompute(DataPath, 'Industry', data["wkt"], data["geometryType"], stats='sum')
        D3 = TimeSeriesModelDataCompute(DataPath, 'Residential', data["wkt"], data["geometryType"], stats='sum')
        D4 = TimeSeriesModelDataCompute(DataPath, 'Transport', data["wkt"], data["geometryType"], stats='sum')

        if data["geometryType"] == 'Polygon' and D1[0][1] == None and D2[0][1] == None and D3[0][1] == None and D4[0][
            1] == None:
            geomPolygon = wkt.loads(data["wkt"])
            geomPoint = geomPolygon.centroid
            D1 = TimeSeriesModelDataCompute(DataPath, 'Energy', geomPoint, data["geometryType"], stats="sum")
            D2 = TimeSeriesModelDataCompute(DataPath, 'Industry', geomPoint, data["geometryType"], stats="sum")
            D3 = TimeSeriesModelDataCompute(DataPath, 'Residential', geomPoint, data["geometryType"], stats="sum")
            D4 = TimeSeriesModelDataCompute(DataPath, 'Transport', geomPoint, data["geometryType"], stats="sum")

        if D1[0][1] == None:
            D1[0][1] = 0
        if D2[0][1] == None:
            D2[0][1] = 0
        if D3[0][1] == None:
            D3[0][1] = 0
        if D4[0][1] == None:
            D4[0][1] = 0

        # print(D1[0][1])
        # print(D2[0][1])
        print("D3")
        # print(D3[0][1])
        # print(D4[0][1])
        DTotal = D4[0][1] + D3[0][1] + D2[0][1] + D1[0][1]
        if DTotal == 0:
            responseData["status"] = "Not ok"
            responseData["code"] = 500
        else:
            responseData["data"] = [{"name": 'Energy',
                                     "y": D1[0][1]},
                                    {"name": 'Industry', "y": D2[0][1]},
                                    {"name": 'Residential', "y": D3[0][1]},
                                    {"name": 'Transport', "y": D4[0][1]}]
            responseData["code"] = 200
            responseData["status"] = "ok"

    if data["plotType"] == 'InventriesComparison':
        EmissionDir = DataDir + '/emission_data/*/' + data["cascaderValue"][0] + "/*_" + data["cascaderValue"][
            0] + "_" + data["cascaderValue"][2] + ".nc"
        dataDirLists = glob(EmissionDir)

        dataList = []
        for i in dataDirLists:
            D1 = TimeSeriesModelDataCompute(i, data["cascaderValue"][1], data["wkt"], data["geometryType"], stats="sum")
            if data["geometryType"] == 'Polygon' and D1[0][1] == None:
                geomPolygon = wkt.loads(data["wkt"])
                geomPoint = geomPolygon.centroid
                D1 = TimeSeriesModelDataCompute(i, data["cascaderValue"][1], geomPoint, data["geometryType"],
                                                stats="sum")
            if D1[0][1] == None:
                D1[0][1] = 0
            a = i.split('/')[-1].split('_')[0]
            dd = {"name": a, "y": D1[0][1]}
            dataList.append(dd)
        allDataLen = len(dataList)
        allWithZero = filter(lambda x: x['y'] == 0, dataList)
        if (allDataLen != len(list(allWithZero))):
            responseData["data"] = dataList
            responseData["code"] = 200
            responseData["status"] = "ok"
        else:
            responseData["status"] = "Not ok"
            responseData["code"] = 500

    if data["plotType"] == 'Timeseries':

        EmissionDir = DataDir + '/emission_data/' + data["cascaderValue"][0] + "/" + data["cascaderValue"][1] + "/*.nc"

        dataDirLists = glob(EmissionDir)
        dataDirLists.sort()
        dataList = []
        for i in dataDirLists:
            D1 = TimeSeriesModelDataCompute(i, data["cascaderValue"][2], data["wkt"], data["geometryType"], stats="sum")
            if data["geometryType"] == 'Polygon' and D1[0][1] == None:
                geomPolygon = wkt.loads(data["wkt"])
                geomPoint = geomPolygon.centroid
                D1 = TimeSeriesModelDataCompute(i, data["cascaderValue"][2], geomPoint, data["geometryType"],
                                                stats="sum")
            if D1[0][1] == None:
                D1[0][1] = 0

            dataList.append(D1[0])
        allDataLen = len(dataList)
        allWithZero = filter(lambda x: x[1] == 0, dataList)
        if (allDataLen != len(list(allWithZero))):
            responseData["data"] = dataList
            responseData["title"] = ' '.join(data["cascaderValue"])
            responseData["code"] = 200
            responseData["status"] = "ok"
        else:
            responseData["status"] = "Not ok"
            responseData["code"] = 500

    return JsonResponse(responseData)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def getLayerInfoStat(request):
    data = request.data
    fileName = data["layerDetail"][0] + "_" + data["layerDetail"][1] + "_" + data["layerDetail"][3] + ".nc"
    DataPath = os.path.join(DataDir, 'emission_data', data["layerDetail"][0], data["layerDetail"][1], fileName)

    sum = TimeSeriesModelDataCompute(DataPath, data["layerDetail"][2], data["wkt"], data["geometryType"], stats="sum")
    min = TimeSeriesModelDataCompute(DataPath, data["layerDetail"][2], data["wkt"], data["geometryType"], stats="min")
    max = TimeSeriesModelDataCompute(DataPath, data["layerDetail"][2], data["wkt"], data["geometryType"], stats="max")
    mean = TimeSeriesModelDataCompute(DataPath, data["layerDetail"][2], data["wkt"], data["geometryType"], stats="mean")
    std = TimeSeriesModelDataCompute(DataPath, data["layerDetail"][2], data["wkt"], data["geometryType"], stats="std")

    if data["geometryType"] != 'Point' and sum[0][1] == None:
        geomPolygon = wkt.loads(data["wkt"])
        geomPoint = geomPolygon.centroid
        sum = TimeSeriesModelDataCompute(DataPath, data["layerDetail"][2], geomPoint, data["geometryType"], stats="sum")

    if data["geometryType"] != 'Point' and min[0][1] == None:
        geomPolygon = wkt.loads(data["wkt"])
        geomPoint = geomPolygon.centroid
        min = TimeSeriesModelDataCompute(DataPath, data["layerDetail"][2], geomPoint, data["geometryType"], stats="min")

    if data["geometryType"] != 'Point' and max[0][1] == None:
        geomPolygon = wkt.loads(data["wkt"])
        geomPoint = geomPolygon.centroid
        max = TimeSeriesModelDataCompute(DataPath, data["layerDetail"][2], geomPoint, data["geometryType"], stats="max")

    if data["geometryType"] != 'Point' and mean[0][1] == None:
        geomPolygon = wkt.loads(data["wkt"])
        geomPoint = geomPolygon.centroid
        mean = TimeSeriesModelDataCompute(DataPath, data["layerDetail"][2], geomPoint, data["geometryType"],
                                          stats="mean")

    if data["geometryType"] != 'Point' and std[0][1] == None:
        geomPolygon = wkt.loads(data["wkt"])
        geomPoint = geomPolygon.centroid
        std = TimeSeriesModelDataCompute(DataPath, data["layerDetail"][2], geomPoint, data["geometryType"], stats="std")

    dataResponse = [{"StatName": "Sum", "StatValue": sum[0][1] if sum[0][1] != None else 'Null'},
                    {"StatName": "Minimum", "StatValue": min[0][1] if min[0][1] != None else 'Null'},
                    {"StatName": "Maximum", "StatValue": max[0][1] if max[0][1] != None else 'Null'},
                    {"StatName": "Mean", "StatValue": mean[0][1] if mean[0][1] != None else 'Null'},
                    {"StatName": "Standard Deviation", "StatValue": std[0][1] if std[0][1] != None else 'Null'}, ]
    if data["geometryType"] == 'Point':
        dataResponse = [{"StatName": "Value", "StatValue": sum[0][1] if sum[0][1] != None else 'Null'}]
    return JsonResponse(dataResponse, safe=False)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def getChartDataProcessSocioEconomic(request):
    data = request.data
    dataResponse = {}
    if (data["plotType"] == 'Population Pyramid'):
        AgeStructurePath = PopulationDataDir + '/raw_download/AgeAndSexStructure/' + str(data["year"])
        MaleCompute = computePopulation('m', AgeStructurePath, data["wkt"], data["geometryType"])
        FemaleCompute = computePopulation('f', AgeStructurePath, data["wkt"], data["geometryType"])
        categories = [i["age"] for i in MaleCompute]
        male = [i["value"] for i in MaleCompute]
        female = [i["value"] for i in FemaleCompute]
        dataResponse = {"male": male, "female": female, "categories": categories, "code": 200, "Year":data["year"],"plotType":data["plotType"]}
    elif (data["plotType"] == 'Population Time Series'):
        dataResponse = {"Hello": "Hello"}
        PopulationDensityDataSets = glob(PopulationDataDir + '/Processed/PopulationDensity/*.nc', recursive=True)
        PopulationDensityDataSets.sort()
        VariableName = 'PopulationDensity'
        DataList = []
        for kk in PopulationDensityDataSets:
            popMean = TimeSeriesModelDataCompute(kk, VariableName, data["wkt"], data["geometryType"], stats="mean")
            DataList.append([popMean[0][0], int(popMean[0][1])])
            print(kk)
        dataResponse = {"populationDensity": DataList, "code": 200, "plotType":data["plotType"]}
    elif (data["plotType"] == 'Age Groups'):
        dataResponse = {"ok": "ok"}
        AgeGroupDataSets = PopulationDataDir + '/Processed/AgeAndSexStructure/AgeAndSexStructure_' + str(
            data["year"]) + '.nc'
        print("ageGroup")
        AllChild = TimeSeriesModelDataCompute(AgeGroupDataSets, 'AllChild', data["wkt"], data["geometryType"],
                                              stats="sum")
        AllAdult = TimeSeriesModelDataCompute(AgeGroupDataSets, 'AllAdult', data["wkt"], data["geometryType"],
                                              stats="sum")
        AllOld = TimeSeriesModelDataCompute(AgeGroupDataSets, 'AllOld', data["wkt"], data["geometryType"], stats="sum")
        all = int(AllChild[0][1]) + int(AllAdult[0][1]) + int(AllOld[0][1])
        childPer = int(AllChild[0][1]) * 100 / all
        adultPer = int(AllAdult[0][1]) * 100 / all
        oldPer = int(AllOld[0][1]) * 100 / all
        dataResponse = {"PieChartData": [{
            "name": 'Child (0 - 14)',
            "y": round(childPer, 2),
            "color":'#EEEE00'
        }, {
            "name": 'Adult (15 - 59)',
            "y": round(adultPer, 2),
            "color":'#48D1CC'
        }, {
            "name": 'Old (60 - 80+)',
            "y": round(oldPer, 2),
            'color':'#F08080'
        }], "code": 200, "Year":data["year"],"plotType":data["plotType"]}

        # elif (data["plotType"] == 'Population Time Series'):
    elif (data["plotType"] == 'Population Distribution'):
        PopulationDensityDataSets = glob(PopulationDataDir + '/raw_download/PopulationCount/*/*.tif', recursive=True)
        PopulationDensityDataSets.sort()
        DistributionData = []
        for tiffFile in PopulationDensityDataSets:
            dd = computePopulationCount(tiffFile, data["wkt"], data["geometryType"])
            DistributionData.append(dd)

        categories = [k[0] for k in DistributionData]

        dataCalc = [k[1] for k in DistributionData]
        dataResponse = {"PopulationDistribution": DistributionData, "categories": categories, "data": dataCalc, "code": 200, "plotType":data["plotType"]}

    return JsonResponse(dataResponse)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def getPopulationSummary(request):
    data = request.data
    AgeGroupDataSets = PopulationDataDir + '/Processed/AgeAndSexStructure/AgeAndSexStructure_' + str(
        data["year"]) + '.nc'
    AllChild = TimeSeriesModelDataCompute(AgeGroupDataSets, 'AllChild', data["wkt"], data["geometryType"],
                                          stats="sum")
    AllAdult = TimeSeriesModelDataCompute(AgeGroupDataSets, 'AllAdult', data["wkt"], data["geometryType"],
                                          stats="sum")
    AllOld = TimeSeriesModelDataCompute(AgeGroupDataSets, 'AllOld', data["wkt"], data["geometryType"], stats="sum")

    M_Child = TimeSeriesModelDataCompute(AgeGroupDataSets, 'M_Child', data["wkt"], data["geometryType"],
                                         stats="sum")
    M_Adult = TimeSeriesModelDataCompute(AgeGroupDataSets, 'M_Adult', data["wkt"], data["geometryType"],
                                         stats="sum")
    M_Old = TimeSeriesModelDataCompute(AgeGroupDataSets, 'M_Old', data["wkt"], data["geometryType"], stats="sum")

    F_Child = TimeSeriesModelDataCompute(AgeGroupDataSets, 'F_Child', data["wkt"], data["geometryType"],
                                         stats="sum")
    F_Adult = TimeSeriesModelDataCompute(AgeGroupDataSets, 'F_Adult', data["wkt"], data["geometryType"],
                                         stats="sum")
    F_Old = TimeSeriesModelDataCompute(AgeGroupDataSets, 'F_Old', data["wkt"], data["geometryType"], stats="sum")

    totalMale = int(M_Child[0][1]) + int(M_Adult[0][1]) + int(M_Old[0][1])
    totalFemale = int(F_Child[0][1]) + int(F_Adult[0][1]) + int(F_Old[0][1])
    totalPop = int(totalMale) + int(totalFemale)
    child = int(AllChild[0][1])
    Adult = int(AllAdult[0][1])
    Old = int(AllOld[0][1])
    dataResponse = {"totalMale": totalMale, 'totalFemale': totalFemale, 'totalPop': totalPop, 'child': child,
                    'Adult': Adult, 'Old': Old}

    return JsonResponse(dataResponse)
