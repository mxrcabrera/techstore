import { createInstance } from '@optimizely/react-sdk';

// In a real case, this would be the Optimizely dashboard
export const optimizelyClient = createInstance({
  sdkKey: 'fake-sdk-key', // TODO: Replace with the actual SDK key
});