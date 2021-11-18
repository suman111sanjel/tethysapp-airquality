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
