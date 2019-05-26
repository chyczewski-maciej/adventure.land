function choose_target(args, filter) {
  let target = get_target();
  if (!target) 
    change_target(get_nearest_monster(args, filter));
}

//Returns the distance of the character to a point in the world.
function In(x, y) {
  return Math.sqrt(Math.pow(character.real_x - x, 2) + Math.pow(character.real_y - y, 2));
}