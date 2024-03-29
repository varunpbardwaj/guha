interface AppRequest {
  findIdIndex?: number;
}

type Password = {
  id: number;
  site_name: string;
  username: string;
  site_url: string;
  password: string;
};

type User = { username: string; password: string };

export { AppRequest, Password, User };
