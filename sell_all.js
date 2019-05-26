function sell_all(item_name) {
  while (true) {
    let index = locate_item(item_name);
    if (index < 0)
      return;
    
    sell(index, 1000);
  }
}