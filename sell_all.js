function sell_all(filter = (_ => true)) {
  character
    .items
    .map((item, index) => [item, index])
    .filter(([item, index]) => item && filter(item, index))
    .forEach(([_, index]) => sell(index))
}