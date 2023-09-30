export const UPDATE_USER_INFO = (state, { payload }) => ({
  ...state,
  userInfo: { ...state.userInfo, ...payload },
});
