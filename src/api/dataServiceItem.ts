import apiClient from "../config/api-client";
import {
  DataResponse,
  DataResponseCreate,
  DataResponseById,
} from "../store/serviceItem/type";
import { serviceItemAPI } from "../constants/serviceItemApi";

export const getDataUser = (): Promise<DataResponse> => {
  return apiClient.get<DataResponse, any>(serviceItemAPI.getData).then((response) => {
    const responseData = response.data;
    return responseData;
  });
};

export const createDataUser = (formData: any): Promise<DataResponseCreate> => {
  return apiClient
    .post<DataResponseCreate>(`${serviceItemAPI.createData}`, formData, {
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
    .put<DataResponseCreate, any>(`${serviceItemAPI.updateData}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response);

export const deleteDataUser = async (id: string): Promise<DataResponseById> => {
  console.log("id", id);
  const response = await apiClient.delete<DataResponseById>(
    `${serviceItemAPI.deleteData}/${id}`
  );

  const responseData = response.data;
  return responseData;
};
