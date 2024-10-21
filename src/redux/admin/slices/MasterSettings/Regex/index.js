import { createSlice } from "@reduxjs/toolkit";

import { fetchAllRegex, createRegex, updateRegex, deleteRegex, fetchRegexById } from "../../../actions/MasterSettings/Regex/index";

const regexInitialState = {
    regex: {},
    regexes: [],
    isFetchingRegex: false,
    isCreatingRegex: false,
    isUpdatingRegex: false,
    isDeletingRegex: false,
    error: null,
    };

const regexSlice = createSlice({
    name: "validations",
    initialState: regexInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRegex.pending, (state) => {
                state.isFetchingRegex = true;
            })
            .addCase(fetchAllRegex.fulfilled, (state, action) => {
                console.log("action.payload",action.payload);
                
                state.isFetchingRegex = false;
                state.regexes = action.payload;
            })
            .addCase(fetchAllRegex.rejected, (state, action) => {
                state.isFetchingRegex = false;
                state.error = action.error.message;
            });

        builder
            .addCase(createRegex.pending, (state) => {
                state.isCreatingRegex = true;
            })
            .addCase(createRegex.fulfilled, (state, action) => {
                state.isCreatingRegex = false;
                state.regexes.push(action.payload.data);
            })
            .addCase(createRegex.rejected, (state, action) => {
                state.isCreatingRegex = false;
                state.error = action.error.message;
            });

        builder
            .addCase(updateRegex.pending, (state) => {
                state.isUpdatingRegex = true;
            })
            .addCase(updateRegex.fulfilled, (state, action) => {
                state.isUpdatingRegex = false;
                const index = state.regexes.findIndex((element) => element.id === action.payload.data.id);
                state.regexes[index] = action.payload.data;
            })
            .addCase(updateRegex.rejected, (state, action) => {
                state.isUpdatingRegex = false;
                state.error = action.error.message;
            });

        builder
            .addCase(deleteRegex.pending, (state) => {
                state.isDeletingRegex = true;
            })
            .addCase(deleteRegex.fulfilled, (state, action) => {
                state.isDeletingRegex = false;
                state.regexes = state.regexes.filter((element) => element.id !== action.payload.data.id);
            })
            .addCase(deleteRegex.rejected, (state, action) => {
                state.isDeletingRegex = false;
                state.error = action.error.message;
            });

            builder
                .addCase(fetchRegexById.pending, (state) => {
                    state.isFetchingRegex = true;
                })
                .addCase(fetchRegexById.fulfilled, (state, action) => {
                    state.isFetchingRegex = false;
                    state.regex = action.payload;
                })
                .addCase(fetchRegexById.rejected, (state, action) => {
                    state.isFetchingRegex = false;
                    state.error = action.error.message;
                }
            );

    },
});


export default regexSlice.reducer;