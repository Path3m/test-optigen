
function x(s, t) {
  let _map1 = {};
  let _map2 = {};

  const x1 = Math.floor(Math.random() * (s.length - 1));
  const x2 = x1 + Math.floor(Math.random() * (s.length - x1));

  let offspring = [Array.from(s), Array.from(t)];

  for (let i = x1; i < x2; i++) {
    offspring[0][i] = t[i];
    _map1[t[i]] = s[i];

    offspring[1][i] = s[i];
    _map2[s[i]] = t[i];
  }

  for (let i = 0; i < x1; i++) {
    while (offspring[0][i] in _map1) {
      offspring[0][i] = _map1[offspring[0][i]];
    }
    while (offspring[1][i] in _map2) {
      offspring[1][i] = _map2[offspring[1][i]];
    }
  }

  for (let i = x2; i < s.length; i++) {
    while (offspring[0][i] in _map1) {
      offspring[0][i] = _map1[offspring[0][i]];
    }
    while (offspring[1][i] in _map2) {
      offspring[1][i] = _map2[offspring[1][i]];
    }
  }
  return offspring;
}

export function PMXCrossover(pop) {
  const p = pop.members;
  const rounds = p.length % 2 ? p.length - 1 : p.length;
  for (let i = 1; i < rounds; i += 2) {
    const s = p[i].genome;
    const t = p[i - 1].genome;
    x(s, t).forEach((offspring) => {
      if (new Set(offspring).size != _cities.length) {
        console.log(offspring);
        throw new Error("nope");
      }
      pop.members.push(new Citizen(offspring));
    });

  }
}