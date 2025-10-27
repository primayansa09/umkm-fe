export type Data = {
    storeServiceId: string;
    name: string | null;
    Description: string | null;
    Price: number | null;
    Unit: string;
};

export type DataResponse = {
    data: Data[];
    status?: number;
    message?: string;
};

export type DataResponseCreate = {
    status?: number;
    message?: string;
    data: Data;
  };

export type DataResponseById = {
    status?: number;
    message?: string;
    data: DataInsert;
  };

export type DataFilter = {
    filter: {
        name: string;
    };
    sortBy: string | null;
    order: string | null;
    pageSize: number;
    pageNumber: number;
};


export type DataInsert = {
    name: string;
    Description: string | null;
    Price: number;
    Unit: string;
};

export type ValidateError = {
    codePenatua: boolean;
    namaPenatua: boolean;
}

export interface LocationState {
    state: AppState;
}
interface AppState {
    itemData: DataInsert;
    mode: string;
    IsEdit: boolean;
}