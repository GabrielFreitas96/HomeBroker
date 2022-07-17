interface IObjResponse {
  status: number;
  message?: string;
  token?: string
  payload?: any[];
}

export default IObjResponse;
