import { createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import { fetchData,createInputTypes, updateInputTypes, deleteInputTypes, createSubInputTypes, fetchTypes, updateSubInputTypes, deleteSubInputTypes, fetchSubTypes, createAttributeTypes, updateAttributeTypes, deleteAttributeTypes, updateValidFormElement, deleteValidFormElement, createValidFormElement, createValidFormElementTypes, updateValidFormElementTypes, deleteValidFormElementTypes, createValidFormElementAttributes, deleteValidFormElementAttributes } from '../actions/data';
import { act } from 'react';

const initialState = {
  title: "",
  url: "",
  data: [],
  subTypes: [],
  types: [],
  isFetchingTypesLoading: false,
  columns: [],
  isFetchingData: false,
  isDeleting: false,
  isUpdatingInputType: false,
  isValidInputUpdating:false,
  error: null,
  isCreating: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addTitle: (state, action) => {
      state.title = action.payload;
    },
    addUrl: (state, action) => {
      state.url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isFetchingData = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isFetchingData = false;
        state.data = action.payload.data;
        const title = action.payload.title;
        if (title === "Elements") {
          state.columns = [
            { Header: "Type Name", accessor: "typeName" },
            { Header: "Created At", accessor: "createdAt" },
            { Header: "Updated At", accessor: "updatedAt" },
            {Header:"Has Child Elements", accessor:d=>d.hasChildElements?"Yes":"No",
              id:'hasChildElements'
            },
            {Header:"Self Closed Tag",
              accessor: d => d.isSelfClosed ? 'True' : 'False', id: 'isSelfClosed' },
              { Header: "Parent Element Id", accessor: d => d.parentElementId ? d.parentElementId : 'No Parent Element Found' },
          ];
        } else if (title === "SubTypes") {
          state.columns = [
            { Header: "Input Type ID", accessor: "inputTypeId" },
            { Header: "Subtype Name", accessor: "subtypeName" },
            { Header: "Created At", accessor: "createdAt" },
            { Header: "Updated At", accessor: "updatedAt" },
          ];
        } else if (title === "Attributes") {
          state.columns = [
            { Header: "Attribute Name", accessor: "attribute" },
            { Header: "Created At", accessor: "createdAt" },
            { Header: "Updated At", accessor: "updatedAt" },
          ];
        }
        else if (title === "Valid Form Element") {
          state.columns = [
            { Header: "ID", accessor: "_id" },
            { Header: "Element", accessor: "element" },
            { Header: "Created At", accessor: "createdAt" },
            { Header: "Updated At", accessor: "updatedAt" },
          ];
        } else if (title === "Valid Form Element Types") {
          state.columns = [
            { Header: "ID", accessor: "_id" },
            { Header: "Element Type", accessor: "elementType" },
            { Header: "Created At", accessor: "createdAt" },
            { Header: "Updated At", accessor: "updatedAt" },
          ];
        } else if (title === "Valid Form Element Attributes") {
          state.columns = [
            { Header: "ID", accessor: "_id" },
            { Header: "Attribute", accessor: "attribute" },
            { Header: "Created At", accessor: "createdAt" },
            { Header: "Updated At", accessor: "updatedAt" },
          ];
        }
       
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isFetchingData = false;
    if(!action.payload){  
      toast.error("Failed to fetch data", "Network Error");
    }
    else{
      toast.error("Failed to fetch data", action.payload);
    }

      });

    // builder
    //     .addCase(createInputTypes.pending, (state) => {
    //         state.isCreating = true;
    //     })
    //     .addCase(createInputTypes.fulfilled, (state, action) => {
    //         state.isCreating = false;
    //         state.data.push(action.payload.data);
    //         toast.success("Data created successfully");

    //     })
    //     .addCase(createInputTypes.rejected, (state, action) => {
    //         state.isCreating = false;
    //         toast.error(action.payload.message);
    //         state.error = action.payload;
    //     });

        builder
        .addCase(updateInputTypes.pending, (state) => {
            state.isUpdatingInputType = true;
        })
        .addCase(updateInputTypes.fulfilled, (state, action) => {
          state.isUpdatingInputType = false;
          toast.success("Data updated successfully");
          const index = state.data.findIndex((data) => data._id === action.payload.data.id);
          if (index !== -1) {
              state.data[index] = action.payload.data;
          } else {
              console.error("Item not found");
          }
        
      })
        .addCase(updateInputTypes.rejected, (state, action) => {
            state.isUpdatingInputType = false;
            state.error = action.payload;
            toast.error("Failed to update data", action.payload);
        });

        builder
        .addCase(deleteInputTypes.pending, (state) => {
            state.isDeleting = true;
        })
        .addCase(deleteInputTypes.fulfilled, (state, action) => {
          state.isDeleting = false;
          state.data = state.data.filter((dataItem) => dataItem._id !== action.payload._id);
          toast.success("Data deleted successfully");
         
      })
        .addCase(deleteInputTypes.rejected, (state, action) => {
            state.isDeleting = false;
            toast.error("Failed to delete data", action.payload);
            state.error = action.payload;
        });


        builder
        .addCase(createSubInputTypes.pending, (state) => {
            state.isCreating = true;
        }
        )

        .addCase(createSubInputTypes.fulfilled, (state, action) => {
            state.isCreating = false;
            toast.success("Data created successfully");
            state.data.push(action.payload.data);
        })

        .addCase(createSubInputTypes.rejected, (state, action) => {
            state.isCreating = false;
            toast.error(action.payload.message);
            state.error = action.payload;
        });

        builder
        .addCase(fetchTypes.pending, (state) => {
          state.isFetchingTypesLoading = true;
        })
        .addCase(fetchTypes.fulfilled, (state, action) => {
          state.isFetchingTypesLoading = false;
          state.types = action.payload;
        })
        .addCase(fetchTypes.rejected, (state, action) => {
          state.isFetchingTypesLoading = false;
          state.error = action.payload;
          toast.error("Failed to fetch data", action.payload);
        });

        builder
        .addCase(updateSubInputTypes.pending, (state) => {
            state.isUpdatingInputType = true;
        })

        .addCase(updateSubInputTypes.fulfilled, (state, action) => {
            state.isUpdatingInputType = false;
            const index = state.data.findIndex((data) => data._id === action.payload.data._id);
            if (index !== -1) {
                state.data[index] = action.payload.data;
            } else {
               toast.error("Item not found");
            }
            toast.success("Data updated successfully");

        })

        .addCase(updateSubInputTypes.rejected, (state, action) => {
            state.isUpdatingInputType = false;
            state.error = action.payload;
            toast.error("Failed to update data", action.payload);
        });


        builder
        .addCase(deleteSubInputTypes.pending, (state) => {
            state.isDeleting = true;
        }
        )

        .addCase(deleteSubInputTypes.fulfilled, (state, action) => {
            state.isDeleting = false;
            state.data = state.data.filter((dataItem) => dataItem._id !== action.payload._id);
            toast.success("Data deleted successfully");
        })

        .addCase(deleteSubInputTypes.rejected, (state, action) => {
            state.isDeleting = false;
            state.error = action.payload;
            toast.error("Failed to delete data", action.payload);
        });

        builder
          .addCase(fetchSubTypes.pending, (state) => {
            state.isFetchingTypesLoading = true;
          }
          )
          .addCase(fetchSubTypes.fulfilled, (state, action) => {
            state.isFetchingTypesLoading = false;
            state.subTypes = action.payload;
          })

          .addCase(fetchSubTypes.rejected, (state, action) => {
            state.isFetchingTypesLoading = false;
            state.error = action.payload;
            toast.error("Failed to fetch data", action.payload);
          });

          builder
          .addCase(createAttributeTypes.pending, (state) => {
              state.isCreating = true;
          }
          )

          .addCase(createAttributeTypes.fulfilled, (state, action) => {
              state.isCreating = false;
              state.data.push(action.payload.data);
              toast.success("Data created successfully");
          }

          )

          .addCase(createAttributeTypes.rejected, (state, action) => {
              state.isCreating = false;
              state.error = action.payload;
              toast.error( action.payload.message);
          }
          );

          builder
            .addCase(updateAttributeTypes.pending, (state) => {
                state.isUpdatingInputType = true;
            }
            )

            .addCase(updateAttributeTypes.fulfilled, (state, action) => {
                state.isUpdatingInputType = false;
                const index = state.data.findIndex((data) => data._id === action.payload.data.id);
                if (index !== -1) {
                    state.data[index] = action.payload.data;
                } else {
                    console.error("Item not found");
                }
            }
            )

            .addCase(updateAttributeTypes.rejected, (state, action) => {
                state.isUpdatingInputType = false;
                state.error = action.payload;
            }
          );

            builder
              .addCase(deleteAttributeTypes.pending, (state) => {
                  state.isDeleting = true;
              }
              )

              .addCase(deleteAttributeTypes.fulfilled, (state, action) => {
                  state.isDeleting = false;
                  state.data = state.data.filter((dataItem) => dataItem._id !== action.payload._id);
              }
              )

              .addCase(deleteAttributeTypes.rejected, (state, action) => {
                  state.isDeleting = false;
                  state.error = action.payload;
              }
            )

            builder
              .addCase(updateValidFormElement.pending, (state) => {
                  state.isUpdatingInputType = true;
              }
              )

              .addCase(updateValidFormElement.fulfilled, (state, action) => {
                  state.isUpdatingInputType = false;
                  const index = state.data.findIndex((data) => data._id === action.payload.data._id);
                  if (index !== -1) {
                      state.data[index] = action.payload.data;
                  } else {
                      console.error("Item not found");
                  }
              }
              )

              .addCase(updateValidFormElement.rejected, (state, action) => {
                  state.isUpdatingInputType = false;
                  state.error = action.payload;
              }
            );

            builder
            .addCase(deleteValidFormElement.pending, (state) => {
              state.isDeleting = true;
            })
            .addCase(deleteValidFormElement.fulfilled, (state, action) => {
              state.isDeleting = false;

              const index = state.data.findIndex(item => item._id === action.payload._id);
              if (index !== -1) {
                state.data = state.data.filter((dataItem) => dataItem._id !== action.payload._id);
                toast.success("Data deleted successfully");
              } else {
                toast.error("Item not found");
              }
            })
            .addCase(deleteValidFormElement.rejected, (state, action) => {
              state.isDeleting = false;
              toast.error("Deletion failed", action.error?.message || "Unknown error");
              state.error = action.error?.message || "An unknown error occurred";
            });


            builder
              .addCase(createValidFormElement.pending,(state)=>{
                state.isCreating=true;
              }
              )

              .addCase(createValidFormElement.fulfilled,(state,action)=>{
                state.isCreating =false;
                state.data.push(action.payload);
                toast.success("Data created successfully");
              }
              )

              .addCase(createValidFormElement.rejected,(state,action)=>{
                toast.error(action.payload.message);
              }
              )

              builder
                .addCase(createValidFormElementTypes.pending,(state)=>{
                  state.isCreating=true;

                }

                )

                .addCase(createValidFormElementTypes.fulfilled,(state,action)=>{
                  state.isCreating =false;
                  toast.success('Data Created Successfully')
                  state.data.push(action.payload);
                }
                  
                  )

                  .addCase(createValidFormElementTypes.rejected,(state,action)=>{
                    toast.error(action.payload.message);
                    state.isCreating =false;
                  }
                  )


                  .addCase(updateValidFormElementTypes.pending,(state)=>{
                    //
                  }

                  )

                  .addCase(updateValidFormElementTypes.fulfilled,(state,action)=>{
                    const index = state.data.findIndex((data) => data._id === action.payload.data._id);
                    if (index !== -1) {
                      state.data[index] = action.payload.data;
                    } else {
                        console.error("Item not found");
                    }
                  }
                  )

                  .addCase(updateValidFormElementTypes.rejected,(state,action)=>{
                    //
                  }
                  )

                  builder
                  .addCase(deleteValidFormElementTypes.pending,(state)=>{
                    state.isDeleting=true;
                  }
                  )

                  .addCase(deleteValidFormElementTypes.fulfilled,(state,action)=>{
                    state.isDeleting =false;
                    state.data = state.data.filter((dataItem) => dataItem._id !== action.payload._id);
                    toast.success("Data deleted successfully");
                  }
                  )

                  .addCase(deleteValidFormElementTypes.rejected,(state,action)=>{
                    state.isDeleting =false;
                  }
                  )

  //                 builder
  // .addCase(createValidFormElementAttributes.pending, (state) => {
  //   state.isCreating = true; 
  // })
  // .addCase(createValidFormElementAttributes.fulfilled, (state, action) => {
  //   state.isCreating = false; 
  //   state.data.push(action.payload); 
  //   toast.success('Created Successfully')
  // })
  // .addCase(createValidFormElementAttributes.rejected, (state, action) => {
  //   state.isCreating = false; 
  //   toast.error(action.payload.message); 
  // })

  builder
  .addCase(deleteValidFormElementAttributes.pending, (state) => {
    state.isDeleting = true; 
  })

  .addCase(deleteValidFormElementAttributes.fulfilled, (state, action) => {
    state.isDeleting = false; 
    state.data = state.data.filter((dataItem) => dataItem._id !== action.payload._id); 
    toast.success('Deleted Successfully')
  })

  .addCase(deleteValidFormElementAttributes.rejected, (state, action) => {
    state.isDeleting = false; 
    toast.error(action.payload.message); 
  })

  },


});

export const { addTitle, addUrl } = dataSlice.actions;

export default dataSlice.reducer;