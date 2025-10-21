import { DataResponse } from "./type";
// import { createSlice } from "@reduxjs/toolkit";

export const initialState: DataResponse = {
    status: undefined,
    message: undefined,
    data: []
};

// export const roleTypeSlice = createSlice({
//     name: "dataMajelisTypeSlice",
//     initialState,
//     reducers:{
//         getDataMajelisType:(state,action) => ({
//             ...state,
//             data: {
//                 ...state.data,
//                 data:action.payload.data,
//                 totalData:action.payload.totalData,
//             }
//         })
//     }
// });

// export const { getDataMajelisType } = roleTypeSlice.actions;

// export const roleTypeReducer = roleTypeSlice.reducer;