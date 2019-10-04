import { Like, FindOperator, Between, Equal } from 'typeorm'

export interface SearchQuery {
  [key: string]: FindOperator<any>
}

export const operations = {
  ':': (value: string | number) => {
    if (typeof value === 'string') {
      return Like(`%${value}%`)
    }
    return Equal(value)
  }
  //   '-': (start: string | number, end: string | number) => Between(start, end)
}

export const formatSearch = (search: string) => {
  const params = search.split(',')
  return params.map(param => {
    const [prop, operation, ...value] = param.split('')
    return {}
    // return {
    //     [prop]: operations[operation](value)
    // }
  })
}
