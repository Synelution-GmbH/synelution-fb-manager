export const askClipboardPermissions = async () => {
  try {
    const { state } = await navigator.permissions.query({
      name: 'clipboard-write',
      allowWithoutGesture: false,
    });
    return state === 'granted';
  } catch (e) {
    return false;
  }
};
