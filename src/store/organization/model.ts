export type Organization = {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  members: Members[];
};

export type Members = {
  id: string;
};
