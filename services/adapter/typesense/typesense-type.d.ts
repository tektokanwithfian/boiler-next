export interface Paging {
  count?: number
  page?: number
  total?: number
  limit?: number
}

export interface Query {
  facet?: string
  field?: string
  filter?: string
  keyword?: string
  group?: string
  order?: string
}
