import { getAge } from "../../../../utils/formatter";

export function heroTextPersonAdapter(adapter_data) {
  const type = adapter_data?.type || null;
  const person = adapter_data?.data?.person_data || {};

  return {
    type,
    name: person?.name || '[Unavailable Name]',
    known_for_department: person?.known_for_department || null,
    profile_path: person?.profile_path || null,
    biography: person?.biography || null,
    birth_year: person?.birthday.split('-')[0] || null,
    age: getAge(person.birthday, person.deathday) || null
  }
}