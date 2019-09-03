import React from 'react';
import { withRouter } from "react-router";
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';
import Page from '../../components/Page';
import Loading from '../../components/Loading';
import Contact from '../../components/Contact';

const { useState, useEffect } = React;

const Search = withRouter((props) => {
  const { match } = props;
  const { params } = match;
  const { page: paramsPage } = params;
  const paramsPageValue = paramsPage ? Number(paramsPage) - 1 : null;
  const [ contacts, setContacts ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ page, setPage ] = useState(paramsPageValue || 0);
  const [ rows, setRows ] = useState(5);
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    fetch(`https://randomuser.me/api/?seed=foobar&format=json&results=${rows}&page=${page + 1}`, { signal: controller.signal })
      .then(res => res.json())
      .then(json => {
        setContacts(json.results);
        setLoading(false);
      });

    return () => controller.abort();
  }, [page, rows]);

  function onChangePage(event, value) {
    setPage(value);
  }

  function onChangeRowsPerPage(event) {
    setRows(event.target.value);
  }

  function onChangeFilter(event) {
    const filterValue = event.target.value;
    const filteredContacts = contacts.filter(contact => {
      const contactLast = contact.name.last.toUpperCase();
      const filterLast = filterValue.toUpperCase();

      return contactLast.indexOf(filterLast) !== -1;
    });

    setFilter(filterValue);
    setContacts(filteredContacts)
  }

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
        {contacts.map((contact, index) => (
          <Contact
            key={`${contact.login.uuid}`}
            data={contact}
            odd={Math.abs(index % 2) === 1}
          />
        ))}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={100}
          rowsPerPage={rows}
          page={page}
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
