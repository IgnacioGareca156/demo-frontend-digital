import { authentication, createDirectus, graphql, rest } from '@directus/sdk'

export const directus = createDirectus('https://xer.pascalito.com.ar/').with(rest())