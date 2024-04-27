export const success = (res, data) => {
  let resp = null;
  try {
    resp = JSON.parse(JSON.stringify(data));
  } catch (e) {
    resp = data;
  }
  return res.status(200).json(resp);
};

export const error = (
  res,
  status: number,
  eMsgTitle: string,
  message: string,
) => {
  return res.status(status).json({
    error: eMsgTitle,
    code: status,
    message,
    details: [
      {
        type_url: `${res.req.headers['x-forwarded-proto']}://${res.req.headers.host}`,
        value: res.req._parsedUrl.path,
        referer: res.req.headers.referer,
      },
    ],
  });
};

export const handleError = (res, message: string) => {
  message = message.split('2 UNKNOWN:').join('');
  const eMsg = message.split(':')[0]
    ? message.split(':')[0].trim()
    : message.trim();
  const msg = message.split(':')[1] ? message.split(':')[1].trim() : '';
  const status = 400;
  return error(res, status, eMsg, msg);
};
