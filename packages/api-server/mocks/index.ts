const IS_BROWSER = typeof window !== 'undefined';

export const setupMocks = async () => {
  if (IS_BROWSER) {
    console.log('Setting up mswWorker')
    const { mswWorker } = await import('./mswWorker');
    mswWorker.start();
  } else {
    console.log('Setting up mswServer')
    const { mswServer } = await import('./mswServer');
    mswServer.listen();
  }
};
