class APIFeatures<T> {
  private query: T;
  private queryString: Record<string, any>;

  constructor(query: T, queryString: Record<string, any>) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): this {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = (this.query as any).find(JSON.parse(queryStr));

    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = (this.query as any).sort(sortBy);
    } else {
      this.query = (this.query as any).sort("-createdAt");
    }

    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = (this.query as any).select(fields);
    } else {
      this.query = (this.query as any).select("-__v");
    }

    return this;
  }

  paginate(): this {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = (this.query as any).skip(skip).limit(limit);

    return this;
  }

  getQuery(): T {
    return this.query;
  }
}

export default APIFeatures;
