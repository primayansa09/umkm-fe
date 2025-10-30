import apiClient from "../config/api-client";
import {
  DataResponse,
  DataResponseCreate,
  DataResponseById,
} from "../store/users/type";
import { UserAPI } from "../constants/userApi";

interface StoreParams {
  pageNumber?: number;
  pageSize?: number;
}

export const getDataUser = (params?: StoreParams): Promise<DataResponse> => {
  return apiClient.get<DataResponse, any>(UserAPI.getData, {
    params: {
      page: params?.pageNumber ?? 1,
      page_size: params?.pageSize ?? 10
    }
  }).then((response) => {
    const responseData = response.data;
    return responseData;
  });
};

export const createDataUser = (formData: any): Promise<DataResponseCreate> => {
  return apiClient
    .post<DataResponseCreate>(`${UserAPI.createDataStoreAdmin}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const responseData = response.data;
      return responseData;
    });
};

export const updateDataUser = (
  data: any,
  id: string
): Promise<DataResponseCreate> =>
  apiClient
    .put<DataResponseCreate, any>(`${UserAPI.updateData}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response);

export const deleteDataUser = async (id: string): Promise<DataResponseById> => {
  console.log("id", id);
  const response = await apiClient.delete<DataResponseById>(
    `${UserAPI.deleteData}/${id}`
  );

  const responseData = response.data;
  return responseData;
};
