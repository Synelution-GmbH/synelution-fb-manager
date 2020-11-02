import React, { createContext, useContext, useReducer } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

const initialState = { assetOrder: [], assets: {} };
const AssetUploaderContext = createContext();
const AssetUploaderDispatchContext = createContext();
export const useAssetUploader = () => useContext(AssetUploaderContext);
export const useAssetUploaderDispatch = () =>
  useContext(AssetUploaderDispatchContext);

const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'add_asset':
      console.log(action.payload);
      const filename = action.payload.name.replace(/[ /#\\?%*:;,|"=§$!'<>]/g, '_');
      const assetOrder =
        state.assetOrder.indexOf(filename) === -1
          ? [...state.assetOrder, filename]
          : state.assetOrder;
      return {
        ...state,
        previewIndex: filename,
        assets: {
          ...state.assets,
          [filename]: {
            id: filename,
            loading: true,
            ...action.payload,
          },
        },
        assetOrder,
      };
    case 'set_payload':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const AssetUploaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'column') {
      const newAssetOrder = Array.from(state.assetOrder);
      newAssetOrder.splice(source.index, 1);
      newAssetOrder.splice(destination.index, 0, draggableId);
      console.log(newAssetOrder);
      dispatch({ type: 'set_payload', payload: { assetOrder: newAssetOrder } });
    }

    // const asset = state.assets[source.droppableId];
  };
  console.log(state);
  console.log(state);
  return (
    <>
      <AssetUploaderContext.Provider value={state}>
        <AssetUploaderDispatchContext.Provider value={{ dispatch }}>
          <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
        </AssetUploaderDispatchContext.Provider>
      </AssetUploaderContext.Provider>
    </>
  );
};
