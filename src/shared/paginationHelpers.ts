type optionsProps ={
    page?:number,
    limit?:number,
    sortBy?:string,
    sortOrder?:string,
}

type returnProps ={
    page:number,
    skip:number,
    limit:number,
    sortBy:string,
    sortOrder:string
}

const calculatePagination=(options:optionsProps): returnProps=>{
      const page:number=Number(options.page) || 1
      const limit:number=Number(options.limit) || 10
      const skip:number=(Number(page-1)*limit)
      const sortBy:string=options.sortBy || 'createdAt'
      const sortOrder:string=options.sortOrder || 'desc'
  
      return {
        page,
        skip,
        limit,
        sortBy,
        sortOrder
      }
  }

export const paginationHelper={
    calculatePagination
}