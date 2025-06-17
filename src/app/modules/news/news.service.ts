import { paginationHelper } from "../../../shared/paginationHelpers";
import prisma from "../../../shared/prisma";

// newsStore
const newsStore = async (data: any, file: any) => {
  if (file) data.image = file?.filename;
  const result = await prisma.news.create({
    data: {
      ...data,
      image: file?.filename,
    },
    include: {
      user: true,
    },
  });
  return result;
};

// getAllNews
const getAllNews = async (options: any) => {
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const result = await prisma.news.findMany({
    include: {
      user: true,
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.news.count();

  return {
    page,
    limit,
    total,
    data: result,
  };
};

const singleNews = async (id: string) => {
  const result = await prisma.news.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const newsDelete = async (id: string) => {
  const result = await prisma.news.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateNews = async (id: string, data: any) => {
  const result = await prisma.news.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const newsService = {
  newsStore,
  getAllNews,
  singleNews,
  newsDelete,
  updateNews,
};
