function choose_target(args, filter) {
  let target = get_target();
  if (!target) 
    change_target(get_nearest_monster(args, filter));
}