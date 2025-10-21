import apiClient from "../config/api-client";
import {
  DataResponse,
  DataResponseCreate,
  DataResponseById,
} from "../store/store/type";
import { storeAPI } from "../constants/StoreApi";

export const getDataStore = (): Promise<DataResponse> => {
  return apiClient.get<DataResponse, any>(storeAPI.getData).then((response) => {
    const responseData = response.data;
    return responseData;
  });
};

export const createDataStore = (formData: any): Promise<DataResponseCreate> => {
  return apiClient
    .post<DataResponseCreate>(`${storeAPI.createData}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    })
    .then((response) => {
      const responseData = response.data;
      return responseData;
    });
};

export const updateData = (
  data: any,
  id: string
): Promise<DataResponseCreate> =>
  apiClient
    .post<DataResponseCreate, any>(`${storeAPI.updateData}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    })
    .then((response) => response);

export const deleteData = async (id: string): Promise<DataResponseById> => {
  console.log("id", id);
  const response = await apiClient.delete<DataResponseById>(
    `${storeAPI.deleteData}/${id}`
  );

  const responseData = response.data;
  return responseData;
};
