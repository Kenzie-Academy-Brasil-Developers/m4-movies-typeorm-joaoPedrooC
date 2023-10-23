import { NextFunction, Request, Response } from "express";

export const paginationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const queryPage = Number(req.query.page);
  const queryPerPage = Number(req.query.perPage);

  const page = queryPage && queryPage >= 1 ? queryPage : 1;
  const perPage = queryPerPage && queryPerPage >= 1 && queryPerPage <= 5 ? queryPerPage : 5;

  const baseUrl = `http://localhost:3000/movies`;
  const nextPage = `${baseUrl}?page=${page+1}&perPage=${perPage}`;
  const prevPage = `${baseUrl}?page=${page-1}&perPage=${perPage}`;

  const queryOrder: any = req.query.order;
  const querySort: any = req.query.sort;

  const sortOptions = ['price', 'duration'];
  const orderOptions = ['asc', 'desc'];

  let sortType: string, orderType: string;

  if(!querySort || !(querySort && sortOptions.includes(querySort))) {
    sortType = 'id';
  } else {
    sortType = querySort;
  }

  if((!queryOrder || !(queryOrder && orderOptions.includes(queryOrder))) || !querySort) {
    orderType = 'asc';
  } else {
    orderType = queryOrder;
  }

  const pagination = {
    page: perPage * (page - 1),
    perPage,
    prevPage,
    nextPage,
    sort: sortType,
    order: orderType,
  }

  res.locals = { ...res.locals, pagination };

  return next();
}