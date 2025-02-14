export interface Paging {
  count?: number
  limit?: number
  page?: number
  total?: number
}

export interface Query {
  facet?: string
  field?: string
  filter?: string
  keyword?: string
  group?: string
  order?: string
}
