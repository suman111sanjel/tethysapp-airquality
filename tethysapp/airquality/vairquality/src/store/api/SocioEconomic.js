import {getApiWithoutToken, getApiWithoutTokenAbsoluteURL, postApiWithoutToken} from './api';
import {Action} from '../actionType';
// import {ThreddsServer} from '../../config';

export async function getCascaderOptions(){
        const action = Action.CascaderOptions
        const response = await getApiWithoutToken(action);
        return response;
}

export async function PostChartDataProcessSocioEconomic(param){
        const action=Action.ChartDataProcessSocioEconomic;
        const response= await postApiWithoutToken(action,param);
        return response;
}

export async function PostPopulationSummary(param){
        const action=Action.GetPopulationSummary;
        const response= await postApiWithoutToken(action,param);
        return response;
}

export async function GETLayerInfoStat(param){
        const action=Action.LayerInfoStat;
        const response= await postApiWithoutToken(action,param);
        return response;
}

export async function GETCountryGeojson(){
        const action=Action.GeoServerBase+"/AirQuality/ows?ID=1&service=WFS&version=1.0.0&request=GetFeature&typeName=AirQuality%3Anepal_provincial_boundary&maxFeatures=50&outputFormat=application%2Fjson&CQL_FILTER=pr_name='Bagmati'"
        const response= await getApiWithoutTokenAbsoluteURL(action);
        return response;
}