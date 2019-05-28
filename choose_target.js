function choose_target(
  filter_predicate = (_ => true),
  keySelector = (monster => -parent.distance(character, monster)),
  comparer = ((x1, x2) => x1 - x2)) {

  function get_all_monsters() {
    var monsters = [];
    for (id in parent.entities) {
      var current = parent.entities[id];
      if (current.type == 'monster' && current.visible && !current.dead)
        monsters.push(current);
    }
    return monsters;
  }

  if (get_target()) // exit the function if the target is already set
    return;

  get_all_monsters()
    .filter(filter_predicate)
    .sort((monster1, monster2) => comparer(keySelector(monster1), keySelector(monster2)))
    .slice(0, 1)
    .forEach(change_target);
}