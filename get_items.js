function get_items(filter = (_ => true)) {
  return character
    .items
    .map((item, index) => [item, index])
    .filter(([item, index]) => item && filter(item, index))
}