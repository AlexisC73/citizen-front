export type Organization = {
  id: string;
  name: string;
  owner: string;
  createdAt: number;
  members: Members[];
  recruiting: boolean;
};

export type Members = {
  id: string;
};
