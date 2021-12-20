import {getApiWithoutToken,postApiWithoutToken} from './api';
import {Action} from '../actionType';
// import {ThreddsServer} from '../../config';

export async function getCityData(){
        const action = Action.CityData
        const response = await getApiWithoutToken(action);
        return response;
}

export async function getGeoJsonForOneSatation(stringParam){
        const action = Action.getGeoJsonForOneSatation+stringParam
        const response = await getApiWithoutToken(action);
        return response;
}


export async function PostSlicedFromCatalog(param){
        const action = Action.SlicedFromCatalog
        const response = await postApiWithoutToken(action,param);
        return response;
}

export async function PostGetStationData(param){
        const action = Action.commonAPI
        const response = await postApiWithoutToken(action,param);
        return response;
}

export async function PostGet2DImage(param){
        const action = Action.GetMapImage
        const response = await postApiWithoutToken(action,param);
        response.image=Action.Base+'/'+Action.GetImage+ "?ImageName=" + response.image
        return response;
}

export async function TimeSeriesRasterQuery(param){
        const action = Action.TimeSeriesRasterQuery
        const response = await postApiWithoutToken(action,param);
        return response;
}
