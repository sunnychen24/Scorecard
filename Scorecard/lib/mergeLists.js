const mergeLists = (list1, list2) => {
    const merged = [];
    let i = 0,
      j = 0;
  
    while (i < list1.length && j < list2.length) {
      if (list1[i].$updatedAt  > list2[j].$updatedAt ) {
        merged.push(list1[i]);
        i++;
      } else if (list1[i].$updatedAt  < list2[j].$updatedAt ) {
        merged.push(list2[j]);
        j++;
      } else {
        merged.push(list1[i]);
        i++;
        j++;
      }
    }
  
    // Add remaining items
    while (i < list1.length) merged.push(list1[i++]);
    while (j < list2.length) merged.push(list2[j++]);
  
    return merged;
  };
  
  export default mergeLists;
  