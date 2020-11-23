import React, { createContext, useContext, useReducer } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { mapToObject } from 'utils';

const initialState = { assetOrder: [], assets: {} };
const AssetUploaderContext = createContext();
const AssetUploaderDispatchContext = createContext();
export const useAssetUploader = () => useContext(AssetUploaderContext);
export const useAssetUploaderDispatch = () =>
  useContext(AssetUploaderDispatchContext);

const reducer = (state, action) => {
  switch (action.type) {
    case 'add_assets': {
      const { assetOrder, assets } = action.payload;
      const { previewIndex } = state;
      // check asset order??
      return {
        ...state,
        previewIndex: previewIndex
          ? assetOrder.indexOf(previewIndex) !== -1
            ? previewIndex
            : assetOrder[0]
          : assetOrder[0],
        assetOrder,
        assets: mapToObject(
          assets,
          (asset) => ({
            ...asset,
            id: asset.name,
            loading: false,
          }),
          'name'
        ),
      };
    }
    case 'add_asset':
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

    case 'delete_asset':
      const { name: payloadId } = action.payload;
      const { [payloadId]: deleteThis, ...newAssets } = state.assets;
      const newAssetOrder = Array.from(state.assetOrder);
      const assetOrderIndex = state.assetOrder.findIndex((id) => id === payloadId);
      newAssetOrder.splice(assetOrderIndex, 1);
      return {
        ...state,
        previewIndex:
          state.previewIndex === payloadId ? newAssetOrder[0] : state.previewIndex,
        assetOrder: newAssetOrder,
        assets: newAssets,
      };
    case 'update_text':
      const { name, ...payload } = action.payload;
      return {
        ...state,
        assets: { ...state.assets, [name]: { ...state.assets[name], ...payload } },
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

export const AssetUploaderProvider = ({ children, handleDragEnd }) => {
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
      dispatch({ type: 'set_payload', payload: { assetOrder: newAssetOrder } });
      handleDragEnd({ assetOrder: newAssetOrder });
    }

    // const asset = state.assets[source.droppableId];
  };
  // console.log(state);
  // console.log(state);
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
