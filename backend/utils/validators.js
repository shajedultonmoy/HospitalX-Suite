const requireFields = (body, fields) => {
  const missing = fields.filter((field) => body[field] === undefined || body[field] === '');
  if (missing.length) {
    return `${missing.join(', ')} ${missing.length === 1 ? 'is' : 'are'} required`;
  }
  return null;
};

module.exports = { requireFields };
