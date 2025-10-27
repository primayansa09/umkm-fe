export type Data = {
    id: string;
    email: string | null;
    name: string | null;
    phone: string | null;
    is_active: boolean;
    deleted_at: string | null;
    created_at: string | null;
    role: string;
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
    name: string | null;
    email: string;
    address: string | null;
    phone: string | null;
    password: string;
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