import React from 'react';
import { withRouter } from "react-router";
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';
import { isEmpty } from 'lodash';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import Contact from '../../components/Contact';

const { useState, useEffect, useCallback, useMemo } = React;

const filterContact = (filter, contacts) => {
  if (isEmpty(filter)) {
    return contacts;
  }

  const filterValue = filter.toUpperCase();

  return contacts.filter(contact => {
    const contactLast = contact.name.last.toUpperCase();
    const filterLast = filterValue.toUpperCase();

    return contactLast.indexOf(filterLast) !== -1;
  });
};

const Search = withRouter((props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;
  const [ contacts, setContacts ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ rows, setRows ] = useState(5);
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    fetch(`https://randomuser.me/api/?seed=foobar&format=json&results=${rows}&page=${page}`, { signal: controller.signal })
      .then(res => res.json())
      .then(json => {
        setContacts(json.results);
        setLoading(false);
      });

    return () => controller.abort();
  }, [page, rows]);

  const onChangePage = useCallback((event, value) => {
    history.push({pathname: `/search/${value + 1}`});
  }, [history]);

  const onChangeRowsPerPage = useCallback((event) => {
    setRows(event.target.value);
  }, []);

  const onChangeFilter = (event) => {
    setFilter(event.target.value);
  }

  const filteredContacts = useMemo(() =>
    filterContact(filter, contacts), [filter, contacts]);

  return (
    <Page title="Search">
      <TextField
        id="name-search"
        label="Surname"
        placeholder="Filter by surname"
        fullWidth
        type="string"
        value={filter}
        onChange={onChangeFilter}
        disabled={loading}
      />
      <Loading loading={loading}>
        {isEmpty(filteredContacts)
          ? <div>No search results</div>
          : filteredContacts.map((contact, index) => (
            <Contact
              key={`${contact.login.uuid}`}
              data={contact}
              odd={Math.abs(index % 2) === 1}
            />
          ))
        }
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={100}
          rowsPerPage={rows}
          page={Number(page -1)}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </Loading>
    </Page>
  );
});

export default Search;
