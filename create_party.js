function create_party(names) {
  let party_members = Object.entries(parent.party).map(([name, _]) => name);
  let missing_members = $(names).not(party_members).get().filter(get_player);

  missing_members.forEach(send_party_invite);
  missing_members.forEach(send_party_request);
  
  missing_members.forEach(accept_party_request);
  missing_members.forEach(accept_party_invite);
}