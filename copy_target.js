
function copy_target(leader) {
  var leader = get_player(leader);
  if (leader)
      change_target(get_target_of(leader) || leader);
}