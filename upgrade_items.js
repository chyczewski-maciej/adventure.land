function upgrade_items(predicate, scroll_name = 'scroll0') {
  character
    .items
    .map((item, index) => [item,index])
    .filter(([item, index]) => item && predicate(item, index))
    .forEach(([_, index]) => { 
      var i = 0;
      while(character.items[index] && predicate(character.items[index]) && i++ < 10)
        upgrade(index, locate_item(scroll_name))
    });
}
