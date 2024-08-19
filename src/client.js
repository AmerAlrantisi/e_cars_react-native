import sanityClient from '@sanity/client';
import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'b69jv6q5', 
  dataset: 'electriccars', 
  useCdn: true, 
  apiVersion: '2023-07-27', 
});


const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source || typeof source !== 'object') {
    console.error('Invalid source object passed to urlFor');
    return ''; 
  }

  if (source._type !== 'image' || !source.asset || !source.asset._ref) {
    console.error('Invalid image source data');
    return ''; 
  }

  return builder.image(source.asset._ref);
};
export default client;