import uris from './uris';

const accountProvisionRequest = async ():Promise<Response> => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const resp = await fetch(
    uris.provisionAccount,
    {
      headers: headers,
      credentials: 'include',
      method: 'PATCH',
    }
  );

  return resp;
}

const refreshAccessTokenRequest = async (): Promise<string> => {
  const resp = await fetch(uris.token);
  const data = (await resp.json()) as { token: string };

  return data.token;
}

export default {
  accountProvisionRequest,
  refreshAccessTokenRequest
}

