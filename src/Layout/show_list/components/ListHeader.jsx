import Select from 'react-select';
import SearchIcon from '/src/assets/icons/search.svg?react';
import { selectCustomStyle } from '../../../utils/designs.js';
import styles from '../css/ShowLists.module.css';
import { PLACEHOLDER_MAP, SHOW_TYPE, LIST_TYPE, GENRE_OPTIONS } from '../../../utils/variables.js';

export default function ListHeader({stateSetters, type, filter_data}) {
  const {
    handleFilterChange,
    handleSearchChange
  } = stateSetters;

  const genre_value = GENRE_OPTIONS.find((value) => value.value === filter_data.genre);
  const list_type_value = LIST_TYPE.find((value) => value.value === filter_data.list_type);
  const show_type_value = SHOW_TYPE.find((value) => value.value === filter_data.show_type);

  const text_placeholder = PLACEHOLDER_MAP[filter_data.show_type] || '';

  return (
    <section className={ styles.listHeader }>
      <div className={ styles.headerTextContent }>
        <h1>WhatToWatch</h1>
        <p>{`Explore amazing ${text_placeholder} around the world.`}</p>
      </div>
      <div className={ styles.inputContainer }>
        <div className={ styles.searchbar }>
          <input onChange={(e) => handleSearchChange(e)} type="text" placeholder={`Search for ${text_placeholder}...`} />
          <SearchIcon />
        </div>

        {
          type != 'person' &&
          <>
            <Select
              onChange={(option) => handleFilterChange('genre', option)}
              styles={selectCustomStyle}
              options={GENRE_OPTIONS}
              value={genre_value}
            />
            <Select
              onChange={(option) => handleFilterChange('list_type', option)}
              styles={selectCustomStyle}
              options={LIST_TYPE}
              value={list_type_value}
            />
            <Select
              onChange={(option) => handleFilterChange('show_type', option)}
              styles={selectCustomStyle}
              options={SHOW_TYPE}
              value={show_type_value}
            />
          </>
        }
      </div>
    </section>
  )
}
