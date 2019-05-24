function copy_target(leader) {
  setInterval(() => {
    var leader = get_player(leader);
    if (leader) {
      var target = get_target_of(leader);
      if (target)
        change_target(target);
    }
  }, 500);
}