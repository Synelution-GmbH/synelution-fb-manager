export const askClipboardPermissions = async () => {
  try {
    const { state } = await navigator.permissions.query({
      name: 'clipboard-write',
    });
    console.log(state);
    return state === 'granted';
  } catch (e) {
    return false;
  }
};
