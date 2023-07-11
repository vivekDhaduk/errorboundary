import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import TablePagination from '@mui/material/TablePagination';
import { User } from '../../Models/Response/UserResponse';
import { getAllUsers } from '../../Services/users.service';
import DataTable from '../Common/Table';
import ErrorBoundry from '../Common/ErrorBoundry';
import '../../Style/index.css';

const UserList = (): JSX.Element => {
  const [user, setUser] = useState<User[]>();
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    loadAllUsers(page);
  }, [page]);

  const loadAllUsers = async (page: number) => {
    try {
      setLoader(true);
      const { data } = await getAllUsers(page);
      if (data?.data && data?.data.length > 0) {
        setUser(data?.data);
        setPagesCount(data?.meta?.pagination?.pages);
      }
    } catch (error) {
      setError((error as AxiosError)?.message);
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return (
      <div className="cutome-loader-wrapper">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <ErrorBoundry showError={!!error} message={error}>
      <p className="page-title">Users</p>
      {user && user.length > 0 ? (
        <div className="user-list-wrapper">
          <DataTable rows={user} />
          <div className="table-pagination-wrapper">
            <TablePagination
              count={pagesCount}
              page={page}
              onPageChange={(_, newPage) => {
                setPage(newPage);
              }}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event?.target?.value, 10));
                setPage(0);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="cutome-loader-wrapper">
          <p>User not found!</p>
        </div>
      )}
    </ErrorBoundry>
  );
};

export default UserList;
