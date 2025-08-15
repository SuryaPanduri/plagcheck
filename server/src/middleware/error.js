export const notFound = (_req, _res, next) => next(Object.assign(new Error('Not Found'), { status: 404 }));

export const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ ok: false, status, message: err.message || 'Server Error' });
};