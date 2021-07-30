interface RequestUser {
  username: string;
  email: string;
  fullName: string;
  password: string;
}
interface ResponseUser {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  password: string;
  createdAt: date;
  updatedAt: date;
}
