const transformUser = src => src.replace(/[\s]*user={{[\s\S]*?}}[\s]*/g, " user={user} "); 

export { transformUser };
