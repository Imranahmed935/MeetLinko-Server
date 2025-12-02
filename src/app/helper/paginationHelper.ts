export type IOptions = {
    page?: string | number;
    limit?: string | number;
}

type IOptionsResult = {
    page: number;
    limit: number;
    skip: number;
}

const calculatePagination = (options: IOptions): IOptionsResult => {
    const page: number = Number(options.page) || 1;
    const limit: number = Number(options.limit) || 10;
    const skip: number = (Number(page) - 1) * limit;



    return {
        page,
        limit,
        skip
    }
}

export const paginationHelper = {
    calculatePagination
}