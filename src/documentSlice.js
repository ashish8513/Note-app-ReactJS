import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../Helpers/axiosInstance"
import toast from "react-hot-toast"

const initialState={
    documentData:[]
}

export const getAllDocuments=createAsyncThunk("/documents/getDocument",async()=>{
    try {
        const res=axiosInstance.get("/documents/getDocuments")
        toast.promise(res,{
            loading:"loading doccuments",
            success:"documets loaded successfully",
            error:"Failed to load documents"
        })
        const response =await res
        return  response.data.documents
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
// function to create a new course
export const createNewDocuments = createAsyncThunk(
  "documents/create",
  async (data, { rejectWithValue }) => {
    try {
      // Prepare a JSON payload
      const payload = {
        panCard: data?.panCard,
        phone: data?.phone,
        department:data?.department,
        address: data?.address,
        dateOfBirth: data?.dateOfBirth,
        city: data?.city,
        state: data?.state,
        zipCode: data?.zipCode,
      };

      // Make the POST request
      const response = await axiosInstance.post("/documents/create", payload);

      // Notify the user on success
      toast.success("documents submiteed successfully");
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Something went wrong!";
      toast.error("Failed to create documents: " + errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const document = createSlice({
    name: "documents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllDocuments.fulfilled, (state, action) => {
            if (action.payload) {
                console.log(action.payload)
                state.documentData = [...action.payload];
            }
        })
    }

})

export default document.reducer;