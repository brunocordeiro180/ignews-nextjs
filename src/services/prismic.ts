import * as prismic from '@prismicio/client'

export function getPrismicClient() {
  const endpoint = prismic.getEndpoint('ignews-cordeiro')
  const accessToken = process.env.PRISMIC_ACCESS_TOKEN; 
  const api = prismic.createClient(endpoint, {accessToken})

  return api;
}