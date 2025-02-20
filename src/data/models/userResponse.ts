import User from './User';
import Meta from './meta';
import Links from './links';

type PaginatedResponse = {
  users: User[];
  meta: Meta;
  links: Links;
};

export default PaginatedResponse;
