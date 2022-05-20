const transformSourceUser = src => src.replace(/[\s]*user={{[\s\S]*?}}[\s]*/g, " user={user} "); 

export { transformSourceUser };
