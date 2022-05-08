function upgrade_items(predicate, scroll_name = 'scroll0') {
  character
    .items
    .map((item, index) => [item,index])
    .filter(([item, index]) => item && G.items[item.name].upgrade && predicate(item, index))
    .slice(0,1)
    .forEach(([_, index]) => upgrade(index, locate_item(scroll_name)));
}

// upgrade_items(i => i.level <= 8)