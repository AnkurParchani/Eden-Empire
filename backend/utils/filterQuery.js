// This functionality will only be for filter function (apiFeatures)
export default (queryObj) => {
  const newQuery = { ...queryObj };
  const excludedFields = ["sort", "fields", "page", "limit"];

  excludedFields.forEach((field) => delete newQuery[field]);
  return newQuery;
};
