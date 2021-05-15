const docWithIdAndTimestamp = snapshot => {
  const data = snapshot.data(), { timestamp } = data; 
  return { ...data, id: snapshot.id, timestamp: timestamp ? timestamp.toDate() : new Date() }
}; 

export default docWithIdAndTimestamp;
