

fn crossover(&self, other: &TspTour) -> TspTour {
    // PMX crossover
    let s = &self.tour;
    let t = &other.tour;

    let mut rng = self.rng_cell.borrow_mut();
    let x1 = rng.gen_range(0, s.len() - 1);
    let x2 = rng.gen_range(x1, s.len());

    let mut offspring = vec![0; s.len()];
    let mut mapping: Vec<Option<usize>> = vec![None; s.len()];

    for i in x1..x2 {
        offspring[i] = t[i];
        mapping[t[i]] = Some(s[i]);
    }

    for i in 0..x1 {
        let mut o = mapping[s[i]];
        let mut last = None;
        while o.is_some() {
            last = o;
            o = mapping[o.unwrap()];
        }
        offspring[i] = if let Some(v) = last { v } else { s[i] };
    }

    for i in x2..s.len() {
        let mut o = mapping[s[i]];
        let mut last = None;
        while o.is_some() {
            last = o;
            o = mapping[o.unwrap()];
        }
        offspring[i] = if let Some(v) = last { v } else { s[i] };
    }

    TspTour {
        tour: offspring,
        cities: self.cities.clone(),
        rng_cell: self.rng_cell.clone(),
    }
}
