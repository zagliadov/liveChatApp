export const asyncDispatch = async (dispatch, actionType, actionPayload) => {
  dispatch({
    type: actionType,
    payload: await actionPayload,
  });
};