export type Data = {
    id: string;
    user_id: string | null;
    name: string | null;
    address: string | null;
    phone: string | null;
    is_active: boolean;
    deleted_at: string | null;
    created_at: string | null;
};

export type DataResponse = {
    data: Data[];
    status?: boolean;
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
    name: string | null;
    address: string | null;
    phone: string | null;
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