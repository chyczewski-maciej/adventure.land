function choose_target(
  filter_predicate = (_ => true),
  sort_functions = [
    m => get_target_of(m) == character, // attack those that attack our character first
    m => -parent.distance(character, m) // attack those who are the closest
  ])
{

  if (get_target()) // exit the function if the target is already set
    return;

  Object
    .entries(parent.entities)
    .map(([key, value]) => value)	
    .filter(e => (e.type == 'monster') && e.visible && !e.dead)
    .filter(filter_predicate)
    .sort((m1,m2) => sort_functions.map(f=>f(m2)-f(m1)).filter(x=>x).slice(0,1))
    .slice(0, 1)
    .forEach(change_target);
}